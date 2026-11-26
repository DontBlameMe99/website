#!/usr/bin/env bash
# Run the whole check suite, inside the flake when needed.
set -euo pipefail

self="$(readlink -f "$0")"
cd "$(git rev-parse --show-toplevel)"

die() {
	echo "verify: $*" >&2
	exit 1
}

if ! command -v bun >/dev/null; then
	[[ -z ${DBM_VERIFY_NIX:-} ]] || die "bun is still missing inside 'nix develop'."
	command -v nix >/dev/null || die "bun and nix are both unavailable."
	DBM_VERIFY_NIX=1 exec nix develop -c "$self" "$@"
fi

bun run verify
