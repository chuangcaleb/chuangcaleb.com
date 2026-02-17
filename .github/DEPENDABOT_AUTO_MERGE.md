# Dependabot Auto-merge Setup with Staging Branch Workflow

This repository uses GitHub's official Dependabot auto-merge feature with a **staging branch workflow** and Copilot Autofix to safely handle dependency updates, validate builds, and control deployment to production with minimal cost.

## Architecture Overview

```
Dependabot PR → staging (auto-merge minor/patch) → PR to main (manual review) → Production
```

### Workflow Stages

1. **Dependabot creates PR** → targeting `staging` branch
2. **CI validates** → runs dependency installation and build check
3. **Copilot Autofix** runs if build fails, and PR is auto-merged only if fixes are limited to version bumps
4. **Auto-merge to staging** → minor/patch updates merge automatically after CI passes or non-substantive autofix
5. **Manual review required** if Copilot Autofix makes substantive code changes or for major updates
6. **PR to main created** → automatically when staging is updated
7. **Manual review & merge** → deploy to production when ready

## How It Works

### 1. Dependency Validation Workflow (`.github/workflows/validate-deps.yml`)

- Runs on Dependabot pull requests targeting the `staging` branch
- **Lightweight validation** for minimal cost:
  - Installs dependencies with `pnpm install --frozen-lockfile`
  - **Does NOT** run full lint/type check or build to keep costs minimal
  - Catches broken dependency installations (the most common Dependabot issue)
  - Copilot Autofix is handled in the auto-merge workflow if build fails
  - Must pass before Dependabot PRs can be auto-merged to staging (unless only version bumps are changed by autofix)

### 2. Dependabot Auto-merge to Staging (`.github/workflows/dependabot-auto-merge.yml`)

- Uses the official `dependabot/fetch-metadata@v2` action
- Only runs on PRs targeting the `staging` branch
- **Automatically enables auto-merge** for:
  - Patch and minor updates (e.g., 1.0.0 → 1.0.1 or 1.1.0)
    - If build fails, Copilot Autofix runs. If only version bumps are changed, auto-merge proceeds. If substantive code changes are made, manual review is required.
- **Requires manual review** for:
  - Major updates (e.g., 1.0.0 → 2.0.0) — comment with review checklist is posted
  - Any Copilot Autofix that makes substantive code changes (comment is posted)
- **Handles CI failures** by running Copilot Autofix and posting guidance comments
- Uses squash merge strategy for clean history

### 3. Staging to Main PR (`.github/workflows/staging-to-main-pr.yml`)

- **Automatically creates PR** from `staging` to `main` when staging is updated
- PR includes:
  - List of recent commits/changes
  - Review checklist
  - Change count summary
- **Updates existing PR** if one is already open (adds comment about new changes)
- Enables controlled, batched deployment to production

### 4. Dependabot Configuration (`.github/dependabot.yml`)

- Monthly update schedule for dependencies
- **Targets `staging` branch** for all updates
- Groups minor and patch updates together
- Limits open PRs to 5 at a time (cost optimization)
- Also monitors GitHub Actions versions (limit: 3 PRs)

## Handling Different Scenarios

### ✅ Minor/Patch Updates (Auto-merged to Staging)

1. Dependabot creates PR to `staging`
2. CI runs: installs dependencies and builds
3. If build passes, auto-merge is enabled
4. If build fails, Copilot Autofix runs:
   - If only version bumps are changed, auto-merge proceeds
   - If substantive code changes are made, a comment is posted and manual review is required
5. PR merges to `staging` automatically if eligible
6. Staging-to-main PR is created/updated
7. Manual review and merge to `main` when ready

### ⚠️ Major Updates (Manual Review Required)

1. Dependabot creates PR to `staging` with major version bump
2. CI runs: installs dependencies and builds
3. **Workflow adds comment** with review checklist and manual review required
4. Copilot Autofix runs if build fails, but manual review is always required for major updates
5. Review, test, and manually merge to `staging` when confident
6. Staging-to-main PR is created/updated
7. Final review and merge to `main` when ready

### ❌ CI Failures (Copilot Autofix/Manual Intervention)

1. Dependabot creates PR to `staging`
2. CI runs and **fails**
3. **Copilot Autofix runs** to attempt to fix the build
4. If only version bumps are changed, auto-merge proceeds
5. If substantive code changes are made, a comment is posted and manual review is required
6. If fixes are needed, push to the PR branch or use `@dependabot recreate`
7. Once CI passes or only version bumps are changed, auto-merge proceeds (for minor/patch)

### 🔄 Merge Conflicts

1. **In Dependabot PR to staging:**
   - Use `@dependabot rebase` command in PR comment
   - Or manually resolve and push to the PR branch
2. **In staging-to-main PR:**
   - Manually resolve conflicts as needed
   - Usually indicates staging was updated outside of the normal flow

## Cost Optimization

This setup is designed for **minimal cost**:

- ✅ **Monthly schedule** instead of daily/weekly
- ✅ **Groups updates** to reduce number of PRs
- ✅ **PR limits** (5 for npm, 3 for actions) to control concurrent runs
- ✅ **Lightweight CI** that validates dependency installation **and build** (~30-60s runtime)
- ✅ **Copilot Autofix** attempts to fix build failures automatically
- ✅ **Auto-merge to staging** eliminates first layer of manual intervention
- ✅ **Batched deployment** via staging-to-main PR reduces production deployment frequency

## Manual Workflows

### When Staging Needs Manual Changes

If you need to make changes directly to `staging` (outside of Dependabot or Copilot Autofix):

```bash
git checkout staging
# make changes
git commit -am "Manual fix"
git push origin staging
```

This will trigger the staging-to-main PR workflow automatically.

### When You Want to Deploy Staging to Main

1. Go to Pull Requests tab
2. Find the open staging→main PR (created automatically)
3. Review all changes in the PR
4. Ensure CI passes
5. Merge when ready to deploy to production

### Emergency Hotfix to Main

If you need to hotfix `main` directly:

```bash
git checkout main
# make hotfix
git commit -am "Hotfix: ..."
git push origin main
```

Then sync staging:

```bash
git checkout staging
git merge main
git push origin staging
```

## Testing the Setup

### Initial Setup

1. **Create the staging branch** (if not exists):

   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

2. **Enable auto-merge** in repository settings:
   - Go to Settings → General → Pull Requests
   - Check "Allow auto-merge"

3. **Optional: Set up branch protection** for `main`:
   - Require PR reviews before merging
   - Require status checks to pass

### Testing Dependabot Flow

1. Wait for Dependabot to create PRs (monthly schedule)
2. Or trigger manually: Insights → Dependency graph → Dependabot → "Check for updates"
3. Watch the workflow:
   - Dependabot PR created targeting `staging`
   - CI runs: install and build
   - Copilot Autofix runs if build fails
   - Auto-merge enabled for minor/patch if build passes or only version bumps are changed
   - Comment posted for major updates or substantive autofix
   - PR merges to `staging` if eligible
   - Staging-to-main PR created

## Latest Official Methods

This setup uses the latest official GitHub features:

- ✅ `dependabot/fetch-metadata@v2` (official Dependabot action, released 2024)
- ✅ `github/copilot-autofix-action@v1` (Copilot Autofix for failed builds)
- ✅ `gh pr merge --auto` (GitHub CLI with native auto-merge API)
- ✅ `target-branch` configuration (Dependabot native feature)
- ✅ GitHub Actions permissions (no PAT required)
- ✅ Semantic version detection (patch/minor/major)

## Repository Settings Required

The repository must have:

- ✅ **Staging branch created** (`git checkout -b staging && git push origin staging`)
- ✅ **Allow auto-merge** enabled in Settings → General → Pull Requests
- ✅ **Require status checks** (optional) in branch protection rules for both `main` and `staging`

No additional secrets or tokens are required - uses built-in `GITHUB_TOKEN`.

## Why Staging Branch?

The staging branch workflow provides several benefits:

**Safety:**

- ⚡ Test dependency updates in isolation before production
- 🛡️ Multiple review gates (staging merge + main merge)
- 🔄 Easy rollback if issues found in staging

**Control:**

- 📦 Batch multiple updates together for single production deployment
- ⏱️ Deploy to production on your schedule, not Dependabot's
- 👥 Separate concerns: auto-updates vs. production deployment

**Efficiency:**

- 🤖 Auto-merge routine updates to staging
- 👁️ Manual review only for production deployment
- 💰 Minimal cost with maximum safety

## Why Lightweight CI?

This setup intentionally uses a **minimal CI workflow** that only validates dependency installation:

**Pros:**

- ⚡ Fast (~30-60s vs 3-5min for full lint/build)
- 💰 Minimal cost (1 minute vs 5+ minutes of runner time per PR)
- ✅ Catches the most common Dependabot issues (broken lockfiles, incompatible versions, build failures)
- 🤖 Copilot Autofix can resolve simple build issues automatically
- 🔄 Allows auto-merge to work smoothly for most dependency updates

**Trade-offs:**

- ⚠️ Does not catch new lint errors (check at deployment time instead)
- ⚠️ Does not run type checking (requires env secrets, adds complexity)
- ⚠️ Relies on production builds/deploys to catch integration issues
- ⚠️ Copilot Autofix may require manual review if it makes substantive code changes

This trade-off is intentional for **minimal cost** as requested. The staging branch provides a testing ground before production deployment.
