# Project Guidelines

## Code Style

- Follow XO + Prettier defaults; lint config in [xo.config.ts](xo.config.ts) and TypeScript alias in [tsconfig.json](tsconfig.json).
- Prefer Astro component patterns used in layout and blocks, e.g. [src/components/layout/Base.astro](src/components/layout/Base.astro).
- Prefer named exports over default exports

## Architecture

- Routes live in [src/pages](src/pages); page-scoped pieces go in [src/pages/_components](src/pages/_components).
- Content collections and schemas are defined in [src/content.config.ts](src/content.config.ts).
- Global layout composition is centralized in [src/components/layout/Base.astro](src/components/layout/Base.astro).

## Build and Test

- `pnpm install`
- `pnpm dev` (runs `setup:external` then `astro dev`)
- `pnpm dev:nosetup`
- `pnpm build` (runs `setup:external`, `astro check`, `astro build`, then `pagefind`)
- `pnpm build:nosetup`
- `pnpm preview`, `pnpm preview:nosetup`, `pnpm preview:nobuild`
- `pnpm test` (XO)
- `pnpm format:check`, `pnpm format:fix`

## Project Conventions

- Co-locate page-only sections under each route's `_components` folder instead of `src/components` (see [src/pages/index.astro](src/pages/index.astro)).
- Styling is CSS-variable driven; global entry is [src/styles/global.css](src/styles/global.css) and token composition is [src/styles/tokens/composer.scss](src/styles/tokens/composer.scss).
- Theme is controlled via `data-theme` and a client-side toggle in [src/components/block/ThemeToggle.astro](src/components/block/ThemeToggle.astro).

## Integration Points

- External content sync uses Backblaze B2 via [lib/b2/index.mjs](lib/b2/index.mjs), invoked by `pnpm b2:download` / `pnpm setup:external`.
- Pagefind indexing is part of the build pipeline (`pnpm pagefind`).
- Obsidian notes live in [src/content/obsidian-note](src/content/obsidian-note) and redirects/data in [src/data](src/data).

## Security

- Secrets are declared in Astro `env.schema` in [astro.config.ts](astro.config.ts).
- B2 credentials are read from env vars in [lib/b2/index.mjs](lib/b2/index.mjs); keep these scoped to trusted environments.
- Image domains are configured via env in [astro.config.ts](astro.config.ts).
