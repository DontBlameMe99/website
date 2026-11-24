# dontblameme.dev

Personal site and blog of DontBlameMe (https://dontblameme.dev).

## Development

```bash
nix develop        # Bun, Node, Biome, Chromium
bun install
./scripts/dev.sh start   # per-worktree dev server, prints the URL
```

## Verification

```bash
bun run verify     # tests, typecheck, prerendered build
bun run contrast   # contrast only, against an existing build
```

The contrast audit serves `build/client` and drives every route through every
colorscheme and interface style, in the base and hover states. It also sweeps
every accent hue on the theme page. A second screenshot with the text fill made
transparent gives the colors actually painted behind each run, so translucent
fills, gradients, and backdrop blur are measured as rendered. WCAG AAA is
required: any color pair below 7:1, or 4.5:1 for large text, fails and blocks
the PR. Every palette clears it on the surfaces it renders on, in both states,
for the neutral ink ramp (`--text`, `--subtext*`, `--overlay*`), for each accent
as text, and for each accent as a fill carrying `--on-accent`. The fixed XP Luna
chrome is tuned the same way. It needs Chromium: the dev shell has it, and CI
installs Chrome. Set `CHROME_BIN` to point at another binary.

Use `CONTRAST_ONLY=<substring>` to run a single page or theme while debugging,
and `CONTRAST_WORKERS` to change the number of browser workers. CI splits the
combinations eight ways with `CONTRAST_SHARD=<n>/8`.

Custom palettes and styles are visitor data: they live in `localStorage` and are
not part of the catalog, so the audit does not cover them. The theme page reports
the same pairs while a visitor paints and saves regardless.

## Content

Posts are React components in `app/content/posts/<slug>.tsx`. Each one exports
`meta`, `sections`and a default `Post` component that renders it as JSX.

Figures for a post live in `app/content/experiences/<slug>.tsx` and are imported
by that post. Images live in `public/posts/<slug>/` and are sized by the post
prose rules.

The post registry also builds `/rss.xml`, `/atom.xml` and `/sitemap.xml` at
build time through the resource routes in `app/routes/`. The footer links to the
RSS feed, and pages advertise both feeds through `<link rel="alternate">`.
