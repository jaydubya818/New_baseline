---
name: Code Cleanup Workflow
description: Workflow for cleaning up code at milestone boundaries before starting the next milestone.
---

# Code Cleanup Workflow

Run this at the end of each milestone, before beginning the next.

## Phase 1 — Dead Code Audit
For each file touched in this milestone:
- Remove any commented-out code blocks
- Remove unused imports
- Remove console.log / debug statements
- Remove TODO comments that were resolved

## Phase 2 — Consistency Check
- Confirm all files follow the same naming convention (camelCase vs snake_case)
- Confirm error handling pattern is consistent (AppError vs native Error vs Result type)
- Confirm async patterns are consistent (all async/await, no mixed Promise.then())
- Confirm all exported functions have JSDoc comments with param/return types

## Phase 3 — Test Coverage
Run the test suite:
```bash
npm test -- --coverage
```
Minimum coverage targets:
- Functions: 80%
- Branches: 70%

Any function with 0% coverage that is exported must have at least one test added before cleanup is complete.

## Phase 4 — Lint and Format
```bash
npm run lint -- --fix
npm run format
```
Zero lint errors allowed. Warnings must be acknowledged (either fix or add an eslint-disable with a reason comment).

## Phase 5 — Cleanup Commit
After all phases pass, commit with:
```
chore: milestone {N} cleanup

- removed dead code in {list files}
- fixed lint warnings in {list files}
- added missing tests for {list functions}
```

## Definition of Done
A milestone is clean when:
- [ ] Zero lint errors
- [ ] Zero console.log statements
- [ ] All exported functions have type signatures
- [ ] Test coverage meets minimums
- [ ] Cleanup commit is on main branch
