# dontblameme.dev

Personal site and blog of DontBlameMe. React Router 8 in prerendered SPA mode,
React 19, TypeScript, Tailwind CSS 4, Bun.

Neobrutalist shell: flat surfaces, 2px ink borders, hard offset shadows, square
corners, one heavy grotesque doing all the typographic work. Catppuccin Mocha
and Latte with Malva (mauve) as the only accent, used sparingly on links,
labels and buttons. Montserrat everywhere, JetBrains Mono only inside code.

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
`meta` (title, date, summary, tags, accent, words, minutes), `sections` (heading
ids for the table of contents) and a default `Post` component that renders the
prose as JSX. There is no markdown or Typst pipeline at runtime, so a post can
use any component and its figures sit in the flow next to the paragraphs they
belong to.

Figures for a post live in `app/content/experiences/<slug>.tsx` and are imported
by that post. Images live in `public/posts/<slug>/` and are capped by
`app/app.css` so they fit the reading measure and the viewport.

## Layout

- `app/components/layout/` header, footer, page masthead, theme toggle
- `app/components/post/` prose primitives and the shared figure kit
- `app/routes/` index, writing, post, projects, contact, 404
- `app/lib/` post registry view, theme, slug helper
