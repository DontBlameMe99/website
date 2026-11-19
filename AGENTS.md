# website

Personal site and blog. React Router, Bun, Nix flake. Default branch is `main`.

## Checks

Run `./scripts/verify.sh`. It runs `bun run verify` inside `nix develop`, so it
works from a plain shell. `bun` and `biome` exist only in the flake. Never paste
a `/nix/store` binary path into a command.

## Browser

`./scripts/dev.sh start|status|url` owns the dev server for this worktree. Read
`.agents/skills/local-preview/SKILL.md` before any browser observation.

## Interface styles

A `[data-style]` block changes shape, edges, fills, depth, and type. Do not
repaint palette tokens, and add no chrome text, boot overlay, or extra
animation the request did not name.
