#!/usr/bin/env bash
# Run the whole check suite, inside the flake when needed.
set -euo pipefail

self="$(readlink -f "$0")"
cd "$(git rev-parse --show-toplevel)"

if ! command -v bun >/dev/null; then
	exec nix develop -c "$self" "$@"
fi

bun run verify
