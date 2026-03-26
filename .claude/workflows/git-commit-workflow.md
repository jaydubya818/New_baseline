---
name: Git Commit Workflow
description: Standard workflow for creating clean, atomic git commits at task completion.
---

# Git Commit Workflow

Run this workflow after each completed task passes validation.

## Step 1 — Verify clean state
```bash
git status
git diff --stat
```
Confirm: only files listed in the task definition have changed. If extra files changed, investigate before committing.

## Step 2 — Stage atomically
Stage only the files for this task. Do NOT use `git add .` or `git add -A`.
```bash
git add src/path/to/changed-file.ts
git add tests/path/to/test-file.test.ts
```

## Step 3 — Commit with structured message
Format:
```
{type}({scope}): {short description}

Task: M{N}-T{N}
Milestone: {milestone name}

- {what was implemented}
- {key design decision if non-obvious}
```

Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`

Example:
```
feat(auth): add JWT validation middleware

Task: M2-T3
Milestone: Core Authentication

- Validates Bearer tokens on protected routes
- Returns 401 with WWW-Authenticate header on failure
```

## Step 4 — Verify commit
```bash
git log --oneline -3
git show --stat HEAD
```

## Rules
- One task = one commit (no "fix + feature" mixed commits)
- Never commit commented-out code
- Never commit console.log or debug statements
- If tests are failing, do NOT commit — fix first
- Commit message first line: max 72 characters
