# /plan — Implementation Planning

Create a detailed implementation plan for $ARGUMENTS before writing any code.

## Planning Process

### Step 1: Understand the Scope
- Restate the goal in your own words
- Identify what already exists that's relevant
- List what needs to be created vs. modified
- Identify external dependencies or APIs

### Step 2: Map Affected Files
Read the codebase and identify:
```
Files to CREATE:
  - path/to/new-file.ts — [purpose]

Files to MODIFY:
  - path/to/existing.ts — [what changes]

Files to READ (context only):
  - path/to/reference.ts — [what to learn from it]
```

### Step 3: Define Interfaces First
Before any implementation, define the types/interfaces/schemas:
- Request/response shapes
- Database schema changes
- Internal API contracts between modules

### Step 4: Identify Risks & Dependencies
- What could go wrong?
- What needs to be done first (ordering dependencies)?
- What external systems are involved?
- What are the rollback steps if something breaks?

### Step 5: Write the Plan
```
## Implementation Plan: [Feature Name]

**Goal**: [one sentence]
**Estimated complexity**: [Low / Medium / High]
**Estimated time**: [X hours/days]

### Phase 1: Foundation
1. [ ] [action item]
2. [ ] [action item]

### Phase 2: Core Implementation
3. [ ] [action item]
4. [ ] [action item]

### Phase 3: Testing & Verification
5. [ ] Write unit tests for [X]
6. [ ] Write integration tests for [Y]
7. [ ] Run full verification loop

### Risks
- [risk] → [mitigation]

### Definition of Done
- [ ] All tests pass
- [ ] Coverage ≥ 80%
- [ ] Security checklist complete
- [ ] Docs updated
```

### Step 6: Confirm Before Executing
Present the plan and ask: **"Should I proceed with this plan, or would you like to adjust anything?"**

## Usage
```
/plan add Stripe payment processing to checkout
/plan refactor the authentication system to use JWT
/plan migrate the users table to add multi-tenancy
```
