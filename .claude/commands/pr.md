# /pr — Pull Request Preparation

Prepare a complete, review-ready pull request for the current branch changes.

## Procedure

### Step 1: Run Full Verification Loop
```bash
# Build
[build command]

# Types
tsc --noEmit  # or mypy

# Lint
eslint . --max-warnings=0  # or ruff check

# Tests
[test command] --coverage

# Security quick scan
grep -rn "console.log\|debugger\|TODO\|FIXME\|HACK\|XXX" src/ --include="*.ts"
```

If any step fails → **stop and fix before continuing**.

### Step 2: Analyze the Changes
```bash
git diff main...HEAD --stat
git log main...HEAD --oneline
```

Summarize:
- What files changed and why
- What the net behavior change is
- What tests were added/modified

### Step 3: Generate PR Description
```markdown
## Summary
[1-3 sentence description of what this PR does and why]

## Changes
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Manual testing: [describe what you tested]

## Security Checklist
- [ ] No secrets committed
- [ ] Input validation in place
- [ ] Auth checks on new endpoints
- [ ] Dependencies audited

## Screenshots (if UI changes)
[Add before/after if relevant]

## Breaking Changes
[List any breaking changes, or "None"]

## Related Issues
Closes #[issue number]
```

### Step 4: Create the PR
```bash
gh pr create \
  --title "[type(scope)]: [description]" \
  --body "$(cat /tmp/pr-body.md)" \
  --assignee "@me"
```

### Step 5: Self-Review Checklist
Before submitting, confirm:
- [ ] PR title follows conventional commit format
- [ ] Description explains WHY, not just WHAT
- [ ] No debug code left
- [ ] All verification phases passed
- [ ] PR is focused on one thing (not a catch-all)

## Usage
```
/pr
/pr add a summary of the auth refactor
```
