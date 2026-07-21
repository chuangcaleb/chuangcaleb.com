---
description: Run the verify loop, then commit and push the current feature branch
---

Ship the current work on this feature branch. Follow these steps in order and
stop if any step fails:

1. **Confirm the branch.** Run `git branch --show-current`. If it is `main` or
   `staging`, STOP — never commit or push to those branches. Ask the user to
   switch to a feature branch first.
2. **Verify.** Run the verify loop from `AGENTS.md` (or invoke the `verify`
   skill): `pnpm lint` → `pnpm typecheck` → `pnpm test`. Fix issues in files you
   changed; do not proceed while any step fails.
3. **Review the diff.** Run `git status` and `git diff` (and `git diff --staged`)
   so the commit is intentional. Stage the relevant files.
4. **Commit.** Use a conventional-commit message (`feat:`, `fix:`, `chore:`,
   `test:`, `docs:`, ...) matching the git log style, summarising the change.
   End the message body with:
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
5. **Push the feature branch.** `git push -u origin <current-branch>`. The
   pre-push hook runs the Vitest suite; if it blocks the push, fix and retry.
   The owner opens and merges the PR — do not merge.

$ARGUMENTS may contain a hint for the commit message or scope; use it if present.
