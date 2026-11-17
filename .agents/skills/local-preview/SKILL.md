---
name: local-preview
description: Use when observing the site in a browser, taking screenshots, or measuring layout.
---

## Goal

Observe this worktree's own dev server with real input, and produce numbers that
hold up as evidence.

## Rules

- Run `./scripts/dev.sh status` and confirm it reports this worktree before any
  browser observation. A server owned by another worktree serves another
  checkout, so its screenshots prove nothing about this change.
- Motion animations run on `requestAnimationFrame`, which is paused in a hidden
  preview tab. If a pane looks blank, open the tab, wait, then screenshot.
  `document.getAnimations().finish()` does not affect them.
- Lazy images do not start loading in a hidden tab. Measure them after scrolling
  into view, or force `img.loading = "eager"` before reading the box.
- Check both themes: the palette lives on `<html class="dark|light">`. The theme
  button uses a view transition that can stall in a hidden tab, so set
  `localStorage.setItem("dbm-theme", "light")` and reload to inspect Latte.

## Running a server

```sh
./scripts/dev.sh start
./scripts/dev.sh status
./scripts/dev.sh url
```

`start` deletes `build/` first, picks a free port in 5200-5399, and prints the
URL. State and logs live in `~/.cache/dbm-dev/`. Never stop one by hand: it
shuts itself down within a minute of its worktree being deleted, and the next
`start` prunes the state of servers that are already gone.
