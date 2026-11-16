# dontblameme.dev

Personal site and blog of DontBlameMe.

Neobrutalist shell by default: flat surfaces, 2px ink borders, hard offset
shadows, square corners, one heavy grotesque doing all the typographic work.
Montserrat everywhere, JetBrains Mono only inside code, and Malva (mauve) as the
only accent, used sparingly on links, labels and buttons.

`/theme` switches the shape (Neobrutalist, Flat) and the Catppuccin colorscheme
for each brightness (Frappé, Macchiato, Mocha for dark; Latte for light). The
two axes are independent, the choice is per device, and the header toggle flips
dark and light. A style owns a lot more than geometry: edges, fills, backdrop
blur, and type, all through tokens in `app/app.css`.

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
- `app/routes/` index, writing, post, projects, contact, theme, 404
- `app/lib/` post registry view, theme provider and palette catalog, slug helper
