# dontblameme.dev

Personal site and blog of DontBlameMe. React Router 8 in prerendered SPA mode,
React 19, TypeScript, Tailwind CSS 4, Bun.

The chrome is a tiling window manager: workspaces in the status bar, hairline
panes, and real keybindings (`alt+1..4`, `alt+t`, `alt+r`). Panes tile by
default, detach into a draggable and resizable floating pane, go fullscreen, and
close and reopen. One typeface (Montserrat) for the whole site, JetBrains Mono
for code. Catppuccin Mocha and Latte, with Malva (mauve) as the accent.

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
use any component, and its interactive figures live in the flow next to the
paragraphs they belong to.

Figures for a post live in `app/content/experiences/<slug>.tsx` and are
imported by that post. Images live in `public/posts/<slug>/`.

## Layout

- `app/components/wm/` status bar, key bar, tile pane, wallpaper
- `app/components/post/` prose primitives and the shared figure kit
- `app/routes/` home, blog index, post, projects, contact, 404
- `app/lib/` post registry view, theme, keybindings, slug helper
