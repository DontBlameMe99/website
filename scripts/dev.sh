#!/usr/bin/env bash
# Start and inspect this worktree's dev server.
#
# A server stops itself once its worktree is deleted, so there is nothing to
# stop by hand.
#
#   ./scripts/dev.sh start
#   ./scripts/dev.sh status
#   ./scripts/dev.sh url
set -euo pipefail

root="$(git rev-parse --show-toplevel)"
cd "$root"

cache_root="${XDG_CACHE_HOME:-$HOME/.cache}/dbm-dev"
hash="$(printf '%s' "$root" | sha256sum | cut -c1-12)"
state_dir="$cache_root/$hash"
pid_file="$state_dir/pid"
port_file="$state_dir/port"
log_file="$state_dir/dev.log"
server_bin="$root/node_modules/.bin/react-router"
poll_seconds=60

die() {
	echo "dev: $*" >&2
	exit 1
}

pid_alive() {
	[[ -n ${1:-} ]] && kill -0 "$1" 2>/dev/null
}

port_listening() {
	(exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null
}

url_of() {
	printf 'http://127.0.0.1:%s\n' "$1"
}

in_nix() {
	[[ -n ${DBM_DEV_NIX:-} ]] && return 1
	return 0
}

# Kills the server recorded in this worktree's state, if the process is still
# ours. The pid can be recycled, so check what it is running before signalling.
stop_saved() {
	local pid
	pid="$(cat "$pid_file" 2>/dev/null || true)"
	[[ -n $pid ]] || return 0
	pid_alive "$pid" || return 0
	grep -qaF -- "$server_bin" "/proc/$pid/cmdline" 2>/dev/null || return 0
	kill -- -"$pid" 2>/dev/null || true
	for _ in $(seq 1 50); do
		pid_alive "$pid" || return 0
		sleep 0.2
	done
	kill -9 -- -"$pid" 2>/dev/null || true
}

# Drops the state of servers that no longer run, which their own worktree would
# otherwise never do once it is gone. A directory without a recorded pid belongs
# to a start still in flight, so leave it alone.
prune_state() {
	local dir pid
	for dir in "$cache_root"/*/; do
		[[ $dir == "$state_dir/" ]] && continue
		pid="$(cat "$dir/pid" 2>/dev/null || true)"
		[[ -n $pid ]] || continue
		if ! pid_alive "$pid"; then
			rm -rf "$dir"
		fi
	done
}

start() {
	if ! command -v bun >/dev/null; then
		command -v nix >/dev/null || die "bun and nix are both unavailable."
		DBM_DEV_NIX=1 exec nix develop -c "$0" start
	fi

	mkdir -p "$state_dir"
	prune_state

	if [[ -f $pid_file ]]; then
		local saved_pid saved_port
		saved_pid="$(cat "$pid_file")"
		saved_port="$(cat "$port_file" 2>/dev/null || true)"
		if pid_alive "$saved_pid" && curl -fsS -m 2 -o /dev/null "$(url_of "$saved_port")" 2>/dev/null; then
			echo "Already running on port $saved_port."
			echo "URL: $(url_of "$saved_port")"
			return 0
		fi
		stop_saved
		rm -f "$pid_file" "$port_file"
	fi

	[[ -x $server_bin ]] || die "node_modules/.bin/react-router is missing. Run 'nix develop -c bun install'."

	rm -rf "$root/build"

	local base port="" offset
	base=$((5200 + (16#${hash:0:2} % 200)))
	for offset in $(seq 0 199); do
		local candidate=$((5200 + (base - 5200 + offset) % 200))
		if ! port_listening "$candidate"; then
			port="$candidate"
			break
		fi
	done
	[[ -n $port ]] || die "No free port between 5200 and 5399."

	echo "Starting the dev server on port $port..."
	# The watcher exits with the server, or takes the whole group down once this
	# worktree is gone. It watches .git because the server itself recreates files
	# under the root, and exec keeps the pid equal to the server's.
	setsid bash -c '
		if [ -e "$1/.git" ]; then
			( while [ -e "$1/.git" ] && kill -0 $$; do sleep "$4"; done; kill -TERM 0 ) &
		else
			echo "dev: no .git under $1, this server will not stop itself." >&2
		fi
		exec env NODE_ENV=development "$2" dev --host 127.0.0.1 --port "$3" --strictPort
	' _ "$root" "$server_bin" "$port" "$poll_seconds" \
		>"$log_file" 2>&1 </dev/null &
	local pid=$!
	printf '%s\n' "$pid" >"$pid_file"
	printf '%s\n' "$port" >"$port_file"

	local ready=0
	for _ in $(seq 1 120); do
		pid_alive "$pid" || {
			tail -n 20 "$log_file" >&2 || true
			die "The dev server exited. See $log_file."
		}
		if curl -fsS -m 2 -o /dev/null "$(url_of "$port")" 2>/dev/null; then
			ready=1
			break
		fi
		sleep 1
	done
	[[ $ready -eq 1 ]] || die "The dev server did not answer. See $log_file."

	echo "Running on port $port."
	echo "URL: $(url_of "$port")"
	echo "Log: $log_file"
}

status() {
	[[ -f $pid_file ]] || die "No dev server for this worktree."
	local pid port
	pid="$(cat "$pid_file")"
	port="$(cat "$port_file")"
	pid_alive "$pid" || die "Not running (stale state for port $port)."
	curl -fsS -m 2 -o /dev/null "$(url_of "$port")" 2>/dev/null || die "Not answering on port $port."
	echo "PID: $pid"
	echo "URL: $(url_of "$port")"
}

url() {
	[[ -f $pid_file ]] || die "No dev server for this worktree."
	pid_alive "$(cat "$pid_file")" || die "No running dev server for this worktree."
	url_of "$(cat "$port_file")"
}

case "${1:-}" in
	start) start ;;
	status) status ;;
	url) url ;;
	*)
		echo "usage: $0 {start|status|url}" >&2
		exit 2
		;;
esac
