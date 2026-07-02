# Project Guidelines

## Code Style

- Follow XO + Prettier defaults; lint config in [xo.config.ts](xo.config.ts) and TypeScript alias in [tsconfig.json](tsconfig.json).
- XO config ignores `_archived/**` via flat config `ignores` array.
- Prefer named exports over default exports.

## Architecture

- **Clean break**: All old components and non-landing pages archived to `_archived/`. New components built from scratch.
- **Design system**: Visual identity defined in `DESIGN.md`. CSS tokens live in `src/styles/tokens/design-tokens.css` — single source of truth for colors, typography, spacing, shapes, elevation.
- **Light-only**: `data-theme` removed from `<html>`. Dark mode deferred to follow-up.
- **Fonts deferred**: Asap (body) and Courier Prime (mono) from Astro `fonts` config. Charter + JetBrains Mono migration is follow-up work.
- Routes live in [src/pages](src/pages); page-scoped pieces go in [src/pages/_components](src/pages/_components).
- Content collections and schemas are defined in [src/content.config.ts](src/content.config.ts).

## Build and Test

- `pnpm install`
- `pnpm dev` (runs `setup:external` then `astro dev`)
- `pnpm dev:nosetup`
- `pnpm build` (runs `setup:external`, `astro check`, `astro build`, then `pagefind`)
- `pnpm build:nosetup` — currently broken until new components exist (archived imports removed)
- `pnpm preview`, `pnpm preview:nosetup`, `pnpm preview:nobuild`
- `pnpm test` (XO)
- `pnpm format:check`, `pnpm format:fix`

## Project Conventions

- Co-locate page-only sections under each route's `_components` folder instead of `src/components` (see [src/pages/index.astro](src/pages/index.astro)).
- Styling is CSS-variable driven via DESIGN.md tokens; global entry is [src/styles/index.css](src/styles/index.css) (imports tokens first, then global reset, compositions, utilities, blocks).
- Layout primitives (flow, cluster, grid-auto, wrapper, sidebar, switcher, repel) in `src/styles/compositions/` — documented in `design/layout-primitives.md`.

## Integration Points

- External content sync uses Backblaze B2 via [lib/b2/index.mjs](lib/b2/index.mjs), invoked by `pnpm b2:download` / `pnpm setup:external`.
- Pagefind indexing is part of the build pipeline (`pnpm pagefind`).
- Obsidian notes live in [src/content/obsidian-note](src/content/obsidian-note) and redirects/data in [src/data](src/data).

## Security

- Secrets are declared in Astro `env.schema` in [astro.config.ts](astro.config.ts).
- B2 credentials are read from env vars in [lib/b2/index.mjs](lib/b2/index.mjs); keep these scoped to trusted environments.
- Image domains are configured via env in [astro.config.ts](astro.config.ts).