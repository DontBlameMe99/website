# dontblameme.dev

Personal site and blog of DontBlameMe. React Router 8 in prerendered SPA mode,
React 19, TypeScript, Tailwind CSS 4, Bun.

The chrome is a tiling window manager: workspaces in the status bar, hairline
tiles, and real keybindings (`alt+1..4`, `alt+t`, `alt+r`). One typeface
(Montserrat) for the whole site, JetBrains Mono for code. Catppuccin Mocha and
Latte, with Malva (mauve) as the accent.

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

`app/content/posts/*.md` holds the post text, converted once from the author's
Typst sources. Nothing in the app rewrites that prose. Each post can add its own
interactive figures through `app/content/experiences/<slug>.tsx`, which registers
components against heading ids. A post without an experience file still renders
as a normal article.

Images live in `public/posts/<slug>/`.

## Layout

- `app/components/wm/` status bar, key bar, tile, wallpaper
- `app/components/post/` article renderer and the shared figure kit
- `app/routes/` home, blog index, post, projects, contact, 404
- `app/lib/` content loading, markdown subset, theme, keybindings
