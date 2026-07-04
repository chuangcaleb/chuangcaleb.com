# Project Guidelines

## Development

When starting the dev server, use background mode `astro dev --background`

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: <https://docs.astro.build>

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles](https://docs.astro.build/en/guides/styling/)

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
- Use Fluid scale for spacing and type.

## Build and Test

- `pnpm install` | `pnpm dev:nosetup` | `pnpm lint` / `pnpm format`
- `pnpm build:nosetup` — currently broken (archived pages removed)

## Integration Points

- B2 sync via `lib/b2/index.mjs` (invoked via `pnpm b2:download` / `pnpm setup:external`).
- Pagefind indexing in build pipeline (`pnpm pagefind`).
- Obsidian notes in `src/content/obsidian-note`.

## Security

- Secrets in Astro `env.schema` in `astro.config.ts`.
- B2 credentials from env vars in `lib/b2/index.mjs`.
