---
name: babysit-pr
description: Monitor a PR through CI — retry flaky tests, resolve merge conflicts, enable auto-merge when green
allowed-tools: Bash, Read, Glob, Grep, Edit
args:
  prNumber: PR number or URL to babysit
---

# Babysit PR

Monitor PR `$ARGUMENTS.prNumber` and shepherd it to merge.

## Workflow

### 1. Status Check
```bash
gh pr view $ARGUMENTS.prNumber --json state,mergeable,statusCheckRollup,mergeStateStatus
```

### 2. Handle Failures
- **Flaky test**: Re-run the failed workflow
  ```bash
  gh run rerun <run-id> --failed
  ```
- **Merge conflict**: Pull latest base, resolve conflicts, push
- **Lint/type errors**: Fix and push a new commit

### 3. Monitor Loop
- Check CI status every pass
- If all checks pass and PR is approved, enable auto-merge:
  ```bash
  gh pr merge $ARGUMENTS.prNumber --auto --squash
  ```
- Report final status to user

## Rules
- Never force-push
- Never skip CI checks
- If conflicts require non-trivial resolution, ask the user
- Max 3 retry attempts for flaky tests before escalating
