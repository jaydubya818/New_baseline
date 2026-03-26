# Feature Development Workflow

Execute the standard feature implementation pattern for this project.

## Pre-Implementation
1. Read `CLAUDE.md` and `progress.txt` for current context
2. Read the relevant canonical docs (`docs/PRD.md`, `docs/APP_FLOW.md`, `docs/IMPLEMENTATION_PLAN.md`)
3. Understand what exists before changing anything

## Implementation Pattern

### Assess
- What files are affected?
- What tests exist?
- What could break?

### Plan
- Break the feature into atomic tasks
- Identify the test strategy (what needs unit tests vs E2E)
- Determine the order of implementation

### Build (TDD)
1. Write failing tests first
2. Implement minimum code to pass
3. Refactor with tests green
4. Repeat for each task

### Verify
- Run `npm run typecheck`
- Run `npm run lint`
- Run `npm run test:unit`
- Run E2E if UI changed

### Document
- Update relevant canonical docs
- Update `progress.txt`
- Commit with conventional message

## Commit Pattern
```
feat: add [feature name]
test: add tests for [feature name]
docs: update [doc] for [feature name]
```

This is a scaffold — adapt to the specific feature. Understand the current state before editing.
