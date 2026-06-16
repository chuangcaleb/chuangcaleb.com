# Dependabot Auto-merge Setup with Staging Branch Workflow

Note: AI-generated

This repository uses GitHub's Dependabot auto-merge flow with a staging branch workflow to safely handle dependency updates and keep production promotion manual.

## Architecture Overview

```text
Dependabot PR -> staging (auto-merge minor/patch if build passes) -> PR to main (manual review) -> Production
```

## Workflow Stages

1. Dependabot creates a PR targeting `staging`.
2. CI installs dependencies and runs the build.
3. Dependabot metadata is fetched to determine semver update type.
4. Minor/patch updates get `--auto --squash` merge enabled only when build succeeds.
5. Minor/patch updates that fail build get a manual review comment.
6. Major updates always require manual review and get a checklist comment.
7. After merge to `staging`, the staging-to-main flow handles promotion to `main`.

## How It Works

### 1. Dependency Validation Workflow (`.github/workflows/validate-deps.yml`)

- Runs on Dependabot pull requests targeting `staging`.
- Performs lightweight dependency validation:
  - `pnpm install --frozen-lockfile`
- Keeps CI cost low while catching lockfile/install breakages early.

### 2. Dependabot Auto-merge Workflow (`.github/workflows/dependabot-auto-merge.yml`)

- Runs only for Dependabot PRs to `staging`.
- Installs dependencies and runs build in CI.
- Reads update type using `dependabot/fetch-metadata@v2`.
- Minor/patch updates:
  - Build success: enables auto-merge (`gh pr merge --auto --squash`).
  - Build failure: posts a manual review comment, no auto-merge.
- Major updates:
  - Always posts a manual review checklist comment.
  - No auto-merge.

### 3. Staging to Main PR (`.github/workflows/staging-to-main-pr.yml`)

- Automatically creates or updates a PR from `staging` to `main`.
- Keeps production deployment gated behind explicit human review.

### 4. Dependabot Configuration (`.github/dependabot.yml`)

- Targets the `staging` branch.
- Groups patch/minor updates.
- Uses PR limits and schedule controls to manage CI cost.

## Build Environment Requirements

The auto-merge workflow runs `pnpm build` and injects environment values from GitHub contexts:

- `IMAGE_DOMAIN` from `vars['IMAGE_DOMAIN']`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` from `secrets['GOOGLE_SERVICE_ACCOUNT_EMAIL']`
- `GOOGLE_PRIVATE_KEY` from `secrets['GOOGLE_PRIVATE_KEY']`
- `GUESTBOOK_GOOGLE_SHEET_ID` from `secrets['GUESTBOOK_GOOGLE_SHEET_ID']``

If these are missing, build can fail and auto-merge for minor/patch updates will not be enabled.

## Required Repository Configuration

- Staging branch exists (`staging`).
- Auto-merge is enabled in repository settings.
- GitHub Actions permissions allow PR merge operations via `GITHUB_TOKEN`.
- CI config values are set:
  - Repository variable: `IMAGE_DOMAIN`
  - Secrets: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GUESTBOOK_GOOGLE_SHEET_ID`

Note for Dependabot-triggered workflows: if your repository setup restricts normal Actions secrets on Dependabot PRs, set equivalent values in Dependabot secrets so this workflow can still build.

## Handling Scenarios

### Minor/Patch Update

1. Dependabot opens PR to `staging`.
2. Workflow installs and builds.
3. If build passes, auto-merge is enabled.
4. If build fails, workflow comments and leaves PR for manual review.

### Major Update

1. Dependabot opens PR to `staging`.
2. Workflow comments with a review checklist.
3. Manual review and merge are required.

### Build Failure

1. Workflow does not auto-merge.
2. PR receives a guidance comment.
3. Fix or recreate PR, then rerun checks.

### Merge Conflicts

1. In Dependabot PR: comment `@dependabot rebase`.
2. Or resolve conflicts manually and push to the PR branch.

## Testing the Setup

1. Trigger a Dependabot check or wait for scheduled updates.
2. Confirm PR targets `staging`.
3. Confirm auto-merge behavior:
   - Minor/patch + green build -> auto-merge enabled.
   - Minor/patch + failed build -> manual review comment.
   - Major -> manual review comment.
4. Confirm staging-to-main PR creation/update after merges.

## Notes on Cost and Safety

- CI remains intentionally focused on dependency and build validation.
- Auto-merge is restricted to lower-risk semver updates.
- Production remains manually controlled through staging-to-main PR review.
