# /feature — Full Feature Development

Build the feature described in $ARGUMENTS end-to-end, from plan to verified implementation.

## Full Workflow

### Phase 1: Plan (always do this first)
Run `/plan $ARGUMENTS` mentally:
1. Restate the feature goal clearly
2. Map existing code that's relevant
3. List all files to create/modify
4. Define types/interfaces/schemas before implementation
5. Identify risks and dependencies

Present the plan before writing any code.

### Phase 2: Foundation
- Create/update database schema or data models
- Define TypeScript interfaces or Python dataclasses
- Set up any new API routes (stubs only, no logic yet)

### Phase 3: Tests First (TDD)
Write failing tests before implementation:
```
[feature].unit.test.ts    → unit tests for business logic
[feature].api.test.ts     → integration tests for API routes
[feature].spec.ts         → E2E tests for user journey (if applicable)
```

### Phase 4: Implementation
Implement in dependency order:
1. Data layer (models, DB queries)
2. Service layer (business logic)
3. API layer (controllers/routes)
4. UI layer (components, pages)

At each layer: run tests, confirm they pass before moving to the next.

### Phase 5: Verification Loop
Run all six verification phases:
```
Build → Types → Lint → Tests → Security → Diff
```

All must pass before calling the feature complete.

### Phase 6: Documentation
- Update README if this is a user-facing feature
- Add/update JSDoc/docstrings on public functions
- Add entry to CHANGELOG.md
- Create ADR if a significant architectural decision was made

### Phase 7: PR Preparation
Run `/pr` to create the pull request.

## Output at Each Phase

After each phase, report:
- ✅ What was completed
- 📊 Test results and coverage
- 🔜 What comes next

## Usage
```
/feature add user profile editing with avatar upload
/feature implement Stripe webhook for subscription renewals
/feature add dark mode toggle to the settings page
```
