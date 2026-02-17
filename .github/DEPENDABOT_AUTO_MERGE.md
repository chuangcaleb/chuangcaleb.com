# Dependabot Auto-merge Setup

This repository uses GitHub's official Dependabot auto-merge feature to automatically handle dependency updates with minimal cost and manual intervention.

## How It Works

### 1. CI Workflow (`.github/workflows/ci.yml`)
- Runs on all pull requests and pushes to `main`
- **Lightweight validation** for minimal cost:
  - Installs dependencies with `pnpm install --frozen-lockfile`
  - Verifies lockfile integrity and dependency resolution
  - **Does NOT** run full lint/type check to keep costs minimal
- Catches broken dependency installations (the most common Dependabot issue)
- Must pass before Dependabot PRs can be auto-merged

### 2. Dependabot Auto-merge (`.github/workflows/dependabot-auto-merge.yml`)
- Uses the official `dependabot/fetch-metadata@v2` action
- **Automatically enables auto-merge** for:
  - Patch updates (e.g., 1.0.0 → 1.0.1)
  - Minor updates (e.g., 1.0.0 → 1.1.0)
- **Requires manual review** for:
  - Major updates (e.g., 1.0.0 → 2.0.0)
  - Comments are left on major update PRs
- Merges automatically once CI checks pass
- Uses squash merge strategy for clean history

### 3. Dependabot Configuration (`.github/dependabot.yml`)
- Monthly update schedule for dependencies
- Groups minor and patch updates together
- Limits open PRs to 5 at a time (cost optimization)
- Also monitors GitHub Actions versions (limit: 3 PRs)

## Cost Optimization

This setup is designed for **minimal cost**:
- ✅ **Monthly schedule** instead of daily/weekly
- ✅ **Groups updates** to reduce number of PRs
- ✅ **PR limits** (5 for npm, 3 for actions) to control concurrent runs
- ✅ **Lightweight CI** that only validates dependency installation (~30s runtime)
- ✅ **Auto-merge** eliminates manual intervention time
- ✅ **No build/test** in CI to save compute time

## Manual Intervention

Manual intervention is **required** for:
- ❌ Major version updates (breaking changes possible)
- ❌ Dependency installation failures
- ❌ Merge conflicts
- ❌ Failed deployments (detected post-merge)

Manual intervention is **optional** for:
- ✅ Minor and patch updates (auto-merged if CI passes)
- ✅ Pre-existing lint/test issues (not validated in CI)

## Testing the Setup

To test this setup:
1. Wait for Dependabot to create PRs (monthly schedule)
2. Or trigger Dependabot manually from the repository's "Insights" → "Dependency graph" → "Dependabot" tab
3. Watch for:
   - CI workflow runs on the PR
   - Auto-merge enabled for minor/patch updates
   - Comment on major updates

## Latest Official Methods

This setup uses the latest official GitHub features:
- ✅ `dependabot/fetch-metadata@v2` (official Dependabot action, released 2024)
- ✅ `gh pr merge --auto` (GitHub CLI with native auto-merge API)
- ✅ GitHub Actions permissions (no PAT required)
- ✅ Semantic version detection (patch/minor/major)

## Repository Settings Required

The repository must have:
- ✅ **Allow auto-merge** enabled in Settings → General → Pull Requests
- ✅ **Require status checks to pass** (optional) in branch protection rules

No additional secrets or tokens are required - uses built-in `GITHUB_TOKEN`.

## Why Lightweight CI?

This setup intentionally uses a **minimal CI workflow** that only validates dependency installation:

**Pros:**
- ⚡ Fast (~30s vs 3-5min for full lint/build)
- 💰 Minimal cost (1 minute vs 5+ minutes of runner time per PR)
- ✅ Catches the most common Dependabot issues (broken lockfiles, incompatible versions)
- 🔄 Allows auto-merge to work smoothly for most dependency updates

**Trade-offs:**
- ⚠️ Does not catch new lint errors (check at deployment time instead)
- ⚠️ Does not run type checking (requires env secrets, adds complexity)
- ⚠️ Relies on production builds/deploys to catch integration issues

This trade-off is intentional for **minimal cost** as requested. If you need stricter validation, you can add lint/test steps to the CI workflow, but this will increase runner time and costs.
