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
   └─> CI runs automatically
       │
       ├─> ✅ CI PASSES
       │   │
       │   ├─> Patch/Minor: AUTO-MERGE to staging ✓
       │   │   └─> Staging-to-main PR auto-created/updated
       │   │
       │   └─> Major: COMMENT posted, awaiting manual review
       │       └─> Manual merge to staging required
       │           └─> Staging-to-main PR auto-created/updated
       │
       └─> ❌ CI FAILS
           └─> Auto-merge blocked
               └─> Manual intervention needed (see troubleshooting)

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
   ├─> CI runs on the PR
   └─> Manual merge to deploy to production
       └─> Main in sync with staging ✓
```

## Decision Tree

```
Is update Patch/Minor?
├─> YES
│   └─> Does CI pass?
│       ├─> YES → Auto-merge to staging ✓
│       └─> NO → Manual fix required, then auto-merge
│
└─> NO (Major)
    └─> Manual review required
        └─> Does CI pass?
            ├─> YES → Manual merge decision
            └─> NO → Fix CI, then manual merge decision
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

### CI Fails on Dependabot PR
**Symptom:** PR shows failed CI check, auto-merge doesn't proceed

**Solutions:**
1. Check if failure is related to the dependency update
2. Review CI logs for actual error
3. Options:
   - Use `@dependabot recreate` to start fresh
   - Manually fix and push to the PR branch
   - If unrelated, fix the underlying issue in staging first

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
2. Check if CI passed
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

### ❌ DON'T
- Don't push directly to main (breaks the staging workflow)
- Don't delete the staging branch
- Don't merge main into staging unless syncing after hotfix
- Don't disable auto-merge for minor/patch updates without reason
- Don't skip reviewing major version updates

## Costs

### Estimated Monthly Costs (GitHub Actions)
- **Dependabot PRs to staging:** ~5 PRs × 30s CI = 2.5 minutes
- **Staging-to-main PR creation:** ~1 PR × 10s = 10 seconds
- **Staging-to-main PR CI:** ~1 PR × 30s = 30 seconds
- **Total:** ~3 minutes/month (free tier covers 2,000 minutes/month)

### Cost Breakdown by Activity
- Creating PR: ~5-10 seconds
- Running CI: ~30 seconds per PR
- Auto-merge: ~5 seconds
- PR updates: ~5 seconds

**Conclusion:** Extremely minimal cost, well within free tier limits.
