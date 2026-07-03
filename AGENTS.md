# Project Guidelines

## Code Style

- XO + Prettier via `xo.config.ts` (flat config, `prettier: true`). `prettier-plugin-astro` in devDependencies.
- XO ignores `_archived/**`.
- kebab-case filenames (`unicorn/filename-case`).
- File extensions in relative imports (`import-x/extensions`).
- Prefer named exports.

## Architecture

- **Clean break**: All old components/pages archived to `_archived/`. New components built from scratch.
- **Design system**: `DESIGN.md` defines core visual identity. Modularized design specs live in `docs/design/`. CSS tokens in `src/styles/tokens/design-tokens.css` — the single source of truth for implementation values.
- **Light-only**: `data-theme` removed. Dark mode deferred.
- **Fonts deferred**: Asap (body) / Courier Prime (mono) from Astro `fonts` config. Charter + JetBrains Mono deferred.
- Layouts in `src/layouts/`, components in `src/components/`, page sections in `src/pages/_components/`.

## Implementation Conventions

- Avoid media queries where possible. Prefer layout primitives (`docs/design/layout-primitives.md`).
- Use or override existing DESIGN.md tokens from `design-tokens.css`.
- Don't set `var(--foo, fallback)` fallbacks — PostCSS handles this.

## Build and Test

- `pnpm install` | `pnpm dev:nosetup` | `pnpm format:check` / `pnpm format:fix`
- `pnpm build:nosetup` — currently broken (archived pages removed)
- `pnpm test` (XO)

## Integration Points

- B2 sync via `lib/b2/index.mjs` (invoked via `pnpm b2:download` / `pnpm setup:external`).
- Pagefind indexing in build pipeline (`pnpm pagefind`).
- Obsidian notes in `src/content/obsidian-note`.

## Security

- Secrets in Astro `env.schema` in `astro.config.ts`.
- B2 credentials from env vars in `lib/b2/index.mjs`.
