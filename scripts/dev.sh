#!/usr/bin/env bash
# Start, stop, and inspect this worktree's dev server.
#
#   ./scripts/dev.sh start
#   ./scripts/dev.sh status
#   ./scripts/dev.sh stop
#   ./scripts/dev.sh restart
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

start() {
	if ! command -v bun >/dev/null; then
		command -v nix >/dev/null || die "bun and nix are both unavailable."
		DBM_DEV_NIX=1 exec nix develop -c "$0" start
	fi

	mkdir -p "$state_dir"

	if [[ -f $pid_file ]]; then
		local saved_pid saved_port
		saved_pid="$(cat "$pid_file")"
		saved_port="$(cat "$port_file" 2>/dev/null || true)"
		if pid_alive "$saved_pid" && curl -fsS -m 2 -o /dev/null "$(url_of "$saved_port")" 2>/dev/null; then
			echo "Already running on port $saved_port."
			echo "URL: $(url_of "$saved_port")"
			return 0
		fi
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
	setsid env NODE_ENV=development "$server_bin" dev --host 127.0.0.1 --port "$port" --strictPort \
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

stop() {
	[[ -f $pid_file ]] || {
		echo "No dev server saved for this worktree."
		return 0
	}
	local pid port
	pid="$(cat "$pid_file")"
	port="$(cat "$port_file" 2>/dev/null || true)"
	if pid_alive "$pid"; then
		kill "$pid" 2>/dev/null || true
		for _ in $(seq 1 50); do
			pid_alive "$pid" || break
			sleep 0.2
		done
		pid_alive "$pid" && kill -9 "$pid" 2>/dev/null || true
	fi
	rm -f "$pid_file" "$port_file"
	echo "Stopped port ${port:-unknown}."
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
	stop) stop ;;
	restart) stop; start ;;
	status) status ;;
	url) url ;;
	*)
		echo "usage: $0 {start|stop|restart|status|url}" >&2
		exit 2
		;;
esac
