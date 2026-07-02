# Project Guidelines

## Code Style

- Follow XO + Prettier defaults; lint config in [xo.config.ts](xo.config.ts) and TypeScript alias in [tsconfig.json](tsconfig.json).
- XO config ignores `_archived/**` via flat config `ignores` array.
- Prettier configured in [.prettierrc](.prettierrc) with `prettier-plugin-astro` for .astro file formatting.
- Use kebab-case for filenames (XO enforces `unicorn/filename-case`).
- Include file extensions in relative imports (XO enforces `import-x/extensions`).
- Prefer named exports over default exports.

## Architecture

- **Clean break**: All old components and non-landing pages archived to `_archived/`. New components built from scratch.
- **Design system**: Visual identity defined in `DESIGN.md`. CSS tokens in `src/styles/tokens/design-tokens.css` — single source for colors, typography, spacing, shapes, elevation.
- **Light-only**: `data-theme` removed from `<html>`. Dark mode deferred.
- **Fonts deferred**: Asap (body) and Courier Prime (mono) from Astro `fonts` config. Charter + JetBrains Mono deferred.
- **Layouts** in `src/layouts/` per Astro convention.
- **Components** in `src/components/`.
- **Page sections** co-located in `src/pages/_components/`.
- Routes live in [src/pages](src/pages); content collections in [src/content.config.ts](src/content.config.ts).

## Build and Test

- `pnpm install`
- `pnpm dev` (runs `setup:external` then `astro dev`)
- `pnpm dev:nosetup`
- `pnpm build` (runs `setup:external`, `astro check`, `astro build`, then `pagefind`)
- `pnpm build:nosetup` — currently broken (archived pages removed)
- `pnpm preview`, `pnpm preview:nosetup`, `pnpm preview:nobuild`
- `pnpm test` (XO)
- `pnpm format:check`, `pnpm format:fix`

## Project Conventions

- Co-locate page-only sections under each route's `_components` folder.
- Styling is CSS-variable driven via DESIGN.md tokens; entry is [src/styles/index.css](src/styles/index.css) (imports tokens → global → compositions → utilities → blocks).
- Layout primitives (flow, cluster, grid-auto, wrapper, sidebar, switcher, repel) in `src/styles/compositions/`.

## Integration Points

- Backblaze B2 sync via [lib/b2/index.mjs](lib/b2/index.mjs), invoked by `pnpm b2:download` / `pnpm setup:external`.
- Pagefind indexing in build pipeline (`pnpm pagefind`).
- Obsidian notes in [src/content/obsidian-note](src/content/obsidian-note).

## Security

- Secrets in Astro `env.schema` in [astro.config.ts](astro.config.ts).
- B2 credentials from env vars in [lib/b2/index.mjs](lib/b2/index.mjs).
- Image domains configured via env in [astro.config.ts](astro.config.ts).
