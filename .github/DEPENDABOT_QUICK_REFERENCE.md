# Dependabot Staging Workflow - Quick Reference

## Visual Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPENDABOT UPDATE FLOW                        │
└─────────────────────────────────────────────────────────────────┘

1. DEPENDABOT CREATES PR
   │
   ├─> Target: staging branch
   ├─> Update type detected: patch/minor/major
   └─> validate-deps runs automatically (install)
       │
       ├─> ✅ validate-deps PASSES
       │   │
       │   ├─> Patch/Minor: AUTO-MERGE to staging ✓
       │   │   └─> Staging-to-main PR auto-created/updated
       │   │
       │   └─> Major: COMMENT posted, awaiting manual review
       │       └─> Manual merge to staging required
       │           └─> Staging-to-main PR auto-created/updated
       │
       └─> ❌ validate-deps FAILS
           └─> Copilot Autofix runs
               │
               ├─> Only version bumps changed: AUTO-MERGE to staging ✓
               │   └─> Staging-to-main PR auto-created/updated
               └─> Substantive code changes: COMMENT posted, manual review required
                   └─> Manual merge to staging required
                       └─> Staging-to-main PR auto-created/updated

2. STAGING UPDATED
   │
   └─> Staging-to-main PR workflow triggers
       │
       ├─> No PR exists: Creates new PR with full summary
       │
       └─> PR exists: Adds comment with new changes

3. STAGING TO MAIN PR
   │
   ├─> Manual review required
   ├─> validate-deps runs on the PR
   └─> Manual merge to deploy to production
       └─> Main in sync with staging ✓
```

## Decision Tree

```
Is update Patch/Minor?
├─> YES
│   └─> Does validate-deps pass?
│       ├─> YES → Auto-merge to staging ✓
│       └─> NO → Copilot Autofix runs
│           ├─> Only version bumps changed? → Auto-merge ✓
│           └─> Substantive code changes? → Manual review required
│
└─> NO (Major)
    └─> Manual review required
        └─> Does validate-deps pass?
            ├─> YES → Manual merge decision
            └─> NO → Copilot Autofix runs, then manual review
```

## Command Quick Reference

### Trigger Dependabot Manually

```bash
# Via GitHub UI
Repository → Insights → Dependency graph → Dependabot → Check for updates
```

### Create Staging Branch (Initial Setup)

```bash
git checkout -b staging
git push -u origin staging
```

### Interact with Dependabot PR

```bash
# Recreate PR if something went wrong
@dependabot recreate

# Rebase PR to resolve conflicts
@dependabot rebase

# Manually checkout and fix
gh pr checkout <PR_NUMBER>
# make fixes
git commit -am "Fix CI issues"
git push
```

### Manual Staging Operations

```bash
# Push changes directly to staging
git checkout staging
# make changes
git commit -am "Manual update"
git push origin staging
# → Staging-to-main PR auto-created/updated

# Sync staging with main (after hotfix)
git checkout staging
git merge main
git push origin staging
```

### Deploy to Production

```bash
# Via GitHub UI
Pull Requests → Find staging→main PR → Review → Merge
```

## Troubleshooting

### validate-deps Fails on Dependabot PR

**Symptom:** PR shows failed validate-deps check, auto-merge doesn't proceed

**Solutions:**

1. Copilot Autofix runs automatically if validate-deps fails
2. If only version bumps are changed, auto-merge proceeds
3. If substantive code changes are made, a comment is posted and manual review is required
4. Review validate-deps logs and Copilot Autofix changes
5. Use `@dependabot recreate` to start fresh, or manually fix and push to the PR branch
6. If unrelated, fix the underlying issue in staging first

### No Staging-to-Main PR Created

**Symptom:** Staging was updated but no PR appeared

**Check:**

1. Verify staging branch exists
2. Check Actions tab for workflow run errors
3. Ensure `staging` and `main` have different commits

**Fix:**

```bash
# Manually trigger the workflow
git checkout staging
git commit --allow-empty -m "Trigger PR workflow"
git push origin staging
```

### Dependabot PRs Not Auto-Merging

**Symptom:** Minor/patch PRs not merging automatically

**Check:**

1. Verify "Allow auto-merge" is enabled in repo settings
2. Check if validate-deps passed or Copilot Autofix only changed version bumps
3. Verify PR targets `staging` branch
4. Check workflow run in Actions tab

### Merge Conflicts in Staging-to-Main PR

**Symptom:** Cannot merge staging to main due to conflicts

**Cause:** Changes made directly to main outside of staging workflow

**Fix:**

```bash
# Sync main changes to staging first
git checkout staging
git merge main
git push origin staging

# Then merge staging to main
# Go to the staging→main PR and merge
```

## Best Practices

### ✅ DO

- Let Dependabot handle routine updates automatically
- Review the staging-to-main PR before merging to production
- Use staging branch for testing updates
- Batch multiple updates together before deploying to main
- Enable branch protection on main (require PR reviews)
- Review Copilot Autofix changes if substantive code changes are made

### ❌ DON'T

- Don't push directly to main (breaks the staging workflow)
- Don't delete the staging branch
- Don't merge main into staging unless syncing after hotfix
- Don't disable auto-merge for minor/patch updates without reason
- Don't skip reviewing major version updates
- Don't skip reviewing Copilot Autofix changes if not just version bumps
