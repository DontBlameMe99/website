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
- Remotion/motion animations run on `requestAnimationFrame`, which is paused in a
  hidden preview tab. If a page looks blank, open the tab first, wait, then
  screenshot. `document.getAnimations().finish()` does not affect them.
- Headless Chromium defaults to `(hover: none)`, so Tailwind `hover:` rules and
  the dock/tile hover states need a real pointer.
- Check both themes: the palette lives on `<html class="dark|light">`, and the
  status bar wraps it in `theme-vt` for the duration of the reveal.

## Start and stop

```sh
./scripts/dev.sh start
./scripts/dev.sh status
./scripts/dev.sh url
./scripts/dev.sh stop
```

`start` deletes `build/` first, picks a free port in 5200-5399, and prints the
URL. State and logs live in `~/.cache/dbm-dev/`.
