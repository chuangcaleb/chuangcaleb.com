---
name: verify
description: Run this repo's verify loop (lint, typecheck, unit tests, dev smoke) before committing or when asked to check that a change is sound. Use after non-trivial edits to src/ or lib/.
---

# Verify

Run the canonical verify loop defined in `AGENTS.md` (see the "Build and Test"
section — that is the source of truth; this skill only sequences it). Stop and
report at the first failing step.

1. `pnpm lint` — XO report. If it fails on files you touched, run `pnpm format`
   to auto-fix, then re-run. Do not fix pre-existing failures in files unrelated
   to your change.
2. `pnpm typecheck` — `astro check`. Must report 0 errors.
3. `pnpm test` — Vitest unit suite. All tests must pass. Add a test for any new
   pure function in `src/utils/*` or `lib/*`.
4. `pnpm dev:nosetup` smoke (when the change has a runtime surface) — start the
   offline dev server and load `/`, `/notes`, a note detail, and `/guestbook`;
   confirm no regressions, then stop it.

Notes:
- `pnpm build:nosetup` is an optional deeper check; it needs the synced
  `src/content/obsidian-note` folder present locally.
- A full `pnpm build` and `pnpm b2:download` need network + secrets — do not run
  them as part of routine verification.
