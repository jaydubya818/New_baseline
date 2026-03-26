# Writer/Reviewer — Dual-Session Quality Gate

Two-pass code review where roles are strictly separated. The reviewer doesn't know
how the code was generated — it only sees results and asks questions.

## Process

### Pass 1: Write
Complete the implementation as normal. Commit or stage the changes.

### Pass 2: Review (spawn as subagent)
Delegate to a subagent with this system prompt:

```
You are a code reviewer. You did NOT write this code.
Examine the following files for:

1. Hallucinated APIs — methods/functions that don't exist in the actual SDK/library
2. Race conditions — async operations without proper synchronization
3. Scope creep — changes outside the stated task scope
4. Missing error handling — uncaught exceptions, silent failures
5. Type safety — any type usage, unsafe casts, missing null checks
6. Security — injection vectors, exposed secrets, missing validation

Only report problems. Do NOT suggest fixes or refactors.
Rate each finding: CRITICAL / HIGH / MEDIUM / LOW

Files to review: [list the changed files]
```

### Pass 3: Fix
Take reviewer findings back to the writer context.
Fix CRITICAL and HIGH issues. Re-run reviewer for verification.

## When to Use

- Complex features touching >5 files
- Security-sensitive code (auth, payments, permissions)
- Code that will be hard to change later (schemas, public APIs)
- When you want higher quality than single-pass review

## Relationship to adversarial-reviewer

Our `adversarial-reviewer` agent does a similar fresh-eyes review within
a single session. This command adds an extra layer by using truly separate
contexts — the reviewer has zero knowledge of the writer's reasoning.
