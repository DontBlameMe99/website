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
```

## Content

Posts are React components in `app/content/posts/<slug>.tsx`. Each one exports
`meta`, `sections`and a default `Post` component that renders it as JSX.

Figures for a post live in `app/content/experiences/<slug>.tsx` and are imported
by that post. Images live in `public/posts/<slug>/` and are capped by
`app/app.css`.

The post registry also builds `/rss.xml`, `/atom.xml` and `/sitemap.xml` at
build time through the resource routes in `app/routes/`. The footer links to the
RSS feed, and pages advertise both feeds through `<link rel="alternate">`.
