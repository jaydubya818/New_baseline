# /review — Comprehensive Code Review

Perform a thorough code review on $ARGUMENTS (file path, directory, or PR diff).

## Review Dimensions

### 1. Correctness
- Does the logic actually do what's intended?
- Are there off-by-one errors, null dereferences, or race conditions?
- Are all error paths handled?
- Are return types and values consistent?

### 2. Security
- Hardcoded secrets or credentials?
- SQL injection vectors?
- XSS vulnerabilities?
- Missing auth/authorization checks?
- Unvalidated user inputs?
- Sensitive data in logs?

### 3. Performance
- N+1 query patterns?
- Missing database indexes for queried columns?
- Unbounded data fetches without pagination?
- Unnecessary re-renders or recomputations?
- Missing caching opportunities?

### 4. Code Quality
- Does it follow project naming conventions?
- Are functions single-responsibility?
- Are there magic numbers needing named constants?
- Is there unnecessary duplication (DRY)?
- Is complexity justified or can it be simplified?

### 5. Testing
- Are there tests for this code?
- Are edge cases and error states tested?
- Is coverage adequate?

### 6. Documentation
- Are complex functions documented?
- Are non-obvious decisions explained in comments?
- Is the public API documented?

## Output Format

```
## Code Review: [file/feature]

### 🔴 Critical (must fix before merge)
- [issue] → [suggested fix]

### 🟡 Important (should fix)
- [issue] → [suggested fix]

### 🟢 Minor (suggestions)
- [observation] → [suggestion]

### ✅ Strengths
- [what was done well]

### Summary
[Overall assessment: APPROVE / REQUEST CHANGES / NEEDS DISCUSSION]
```

## Usage
```
/review src/auth/login.ts
/review src/api/
/review  (reviews staged changes)
```
