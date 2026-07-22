# Project Guidelines

## Working agreement

- **Plan then execute**: propose a plan for non-trivial work before changing
  code; execute small, obvious changes directly.
- **Branches + conventional commits**: work on a feature branch, never on
  `main`/`staging`. Branch names are descriptive (e.g. `fix/notes-scroll`,
  `dark-mode-palette`). Commit messages use conventional commits (`feat:`,
  `fix:`, `chore:`, `test:`, ... matching the git log).
- **Push scope**: the agent may commit and push its own **feature branch**, but
  must **never push to `main` or `staging`**. The owner opens and merges PRs.
- **Verify before committing**: run the verify loop (see Build and Test) before
  each commit.

## Development

When starting the dev server, use background mode `astro dev --background`

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Worktrees

When creating git worktrees, ensure `.env` is copied over from the main workspace. Agents must copy the `.env` file but **never read or access it**.

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
- **Design system**: `DESIGN.md` defines core visual identity. Modularized design specs live in `docs/design/`. CSS tokens in `src/styles/tokens/design-tokens.scss` — the single source of truth for implementation values.
- **Light-only**: `data-theme` removed. Dark mode deferred.
- **Fonts deferred**: Charter (serif), Courier Prime (mono) loaded via Astro `fonts` config. JetBrains Mono deferred.
- Components in `src/components/`, page sections in `src/pages/_components/`.

## Implementation Conventions

- Avoid media queries where possible. Prefer layout primitives (`docs/design/layout-primitives.md`).
- Use or override existing DESIGN.md tokens from `design-tokens.scss`.
- Don't set `var(--foo, fallback)` fallbacks — PostCSS handles this.
- Use Fluid scale for spacing and type.

## Build and Test

Requires Node `>=22` (see `.nvmrc`).

**Verify loop** — run before committing:

1. `pnpm lint` — XO report (`pnpm format` auto-fixes).
2. `pnpm typecheck` — `astro check`.
3. `pnpm test` — Vitest unit suite (`vitest run`). This is no longer a lint
   alias. Use `pnpm test:watch` while iterating.
4. `pnpm dev:nosetup` smoke — offline Astro dev server (`astro dev`); load `/`,
   `/notes`, a note detail, `/guestbook`.

Add a unit test for any new pure function in `src/utils/*` or `lib/*`.

Other scripts:

- `pnpm dev` also runs B2 content sync first (`setup-external`), which needs
  network + secrets. Use `pnpm dev:nosetup` for offline work.
- `pnpm build:nosetup` (`astro check && astro build`) works when the synced
  `src/content/obsidian-note` folder is present locally; it skips the B2 sync
  and pagefind steps that `pnpm build` runs. The previously-broken archived-page
  references have been resolved. A full `pnpm build` still needs network/secrets
  for B2 + pagefind.

## Integration Points

- B2 sync via `lib/b2/index.mjs` (invoked via `pnpm b2:download` / `pnpm setup:external`).
- Pagefind indexing in build pipeline (`pnpm pagefind`).
- Obsidian notes in `src/content/obsidian-note`.

## Security

- Secrets in Astro `env.schema` in `astro.config.ts`.
- B2 credentials from env vars in `lib/b2/index.mjs`.
