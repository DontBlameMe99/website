#!/usr/bin/env bash
# Run the dev server with the watchers owned by scripts/dev.sh.

# The slot lock inherited on fd 10 must stay with the server, so the watchers
# close their copies. The start lock on fd 9 is already closed by dev.sh.

if [ -e "$1/.git" ]; then
	( while [ -e "$1/.git" ] && kill -0 $$; do sleep "$4"; done; kill -TERM 0 ) 10>&- &
else
	echo "dev: no .git under $1, this server will not stop itself." >&2
fi

(
	trap "expire=1" TERM
	for _ in $(seq 1 "$5"); do
		[ -n "${expire:-}" ] && break
		kill -0 $$ 2>/dev/null || exit 0
		sleep 1
	done
	kill -TERM -- -$$ 2>/dev/null || kill -TERM $$ 2>/dev/null || true
	for _ in $(seq 1 50); do
		kill -0 $$ 2>/dev/null || exit 0
		sleep 0.2
	done
	kill -KILL -- -$$ 2>/dev/null || kill -KILL $$ 2>/dev/null || true
) 10>&- &

exec env NODE_ENV=development "$2" dev --host 127.0.0.1 --port "$3" --strictPort
