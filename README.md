# chuangcaleb.com

Personal site: portfolio + blog/digital garden. Built with Astro, React, TypeScript.

## Getting Started

```bash
pnpm install          # Install deps
pnpm dev              # Sync content + start dev server
pnpm dev:nosetup      # Dev server only
pnpm build            # Sync, check, build + pagefind
pnpm build:nosetup    # Check + build only (no B2 sync/pagefind)
pnpm preview          # Full build + wrangler preview
pnpm lint             # Lint with XO (report)
pnpm format           # Auto-fix with XO
pnpm typecheck        # astro check
pnpm test             # Vitest unit suite
pnpm test:watch       # Vitest in watch mode
pnpm b2:download      # Download Obsidian md notes from B2
```

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Astro 7](https://astro.build) |
| UI Library | [React 19](https://react.dev) |
| CSS Preprocessor | [Sass/SCSS](https://sass-lang.com) |
| Fluid Type & Space | [utopia-core-scss](https://utopia.fyi) |
| Content source | Obsidian → Backblaze B2 |
| Search | [Pagefind](https://pagefind.app) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com) |
| Lint/Format | [XO](https://github.com/xojs/xo) |
| Unit Tests | [Vitest](https://vitest.dev) |
| Git Hooks | [Lefthook](https://github.com/evilmartians/lefthook) |

## Design

Warm, editorial, paper-like. A full spec is at [DESIGN.md](./DESIGN.md) — tokens, typography scale, color, components.

Layout uses composable CUBE CSS-inspired primitives (flow, cluster, grid-auto, wrapper, sidebar, switcher, repel) instead of media queries. Each primitive is one file with CSS custom properties for tuning. See [docs/design/layout-primitives.md](docs/design/layout-primitives.md) for the catalogue.

Design specs split into modular docs under `docs/design/`.

## Content Pipeline

Notes written in Obsidian, synced via Backblaze B2 at build time. Custom remark plugins handle wiki links (`[[note]]`), strip Obsidian-specific syntax, and manage frontmatter-driven bidirectional linking. Three content collections: `obsidian-note`, `project`, `experience`.

## Project Structure

```text
.
├── lib/
│   ├── b2/               # B2 download
│   ├── chuangcaleb/      # Redirect gen
│   ├── google/           # Sheets API (guestbook)
│   ├── remark/           # Custom remark plugins
│   └── rehype/
├── src/
│   ├── components/
│   │   ├── layout/       # Page structure
│   │   ├── note/         # Notes-related
│   │   └── emphasis/     # Text styling
│   ├── content/          # Content collection .md files
│   ├── pages/
│   │   └── _components/  # Page-scoped sections
│   └── styles/
│       ├── tokens/       # design-tokens.scss + fluid.scss
│       ├── global/       # Reset + base typography
│       ├── compositions/ # layout primitives
│       ├── utilities/    # Single-purpose helpers
│       ├── blocks/       # Blocks
│       └── index.css     # Entry point
├── DESIGN.md             # Visual identity spec
├── AGENTS.md             # AI agent context
└── docs/design/          # Modular design specs
```

Pages use co-located section components under `src/pages/_components/` — no distant imports for page-scoped code.

`main` currently points to `v3` rewrite of the site. `v2` branch holds that version's source and implementation docs (I wrote a lot there too).
