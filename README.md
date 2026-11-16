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
fills, gradients, and backdrop blur are measured as rendered. Anything below
WCAG AA fails and blocks the PR. Anything above AA but below AAA is reported as
a warning. It needs Chromium: the dev shell has it, and CI installs Chrome. Set
`CHROME_BIN` to point at another binary.

Use `CONTRAST_ONLY=<substring>` to run a single page or theme while debugging,
and `CONTRAST_WORKERS` to change the number of browser workers. CI splits the
combinations eight ways with `CONTRAST_SHARD=<n>/8`.

## Content

Posts are React components in `app/content/posts/<slug>.tsx`. Each one exports
`meta`, `sections`and a default `Post` component that renders it as JSX.

Figures for a post live in `app/content/experiences/<slug>.tsx` and are imported
by that post. Images live in `public/posts/<slug>/` and are capped by
`app/app.css`.

The post registry also builds `/rss.xml`, `/atom.xml` and `/sitemap.xml` at
build time through the resource routes in `app/routes/`. The footer links to the
RSS feed, and pages advertise both feeds through `<link rel="alternate">`.
