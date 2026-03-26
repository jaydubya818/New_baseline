---
paths: ["**/*.test.*", "**/*.spec.*", "**/e2e/**", "**/tests/**", "vitest.*", "playwright.*"]
---

# Testing Rules

## Unit Tests (Vitest)

- Use AAA pattern: Arrange → Act → Assert, separated by blank lines
- One assertion per test when possible, multiple only if testing the same behavior
- Name tests as: `it('should [expected behavior] when [condition]')`
- Mock external dependencies, never real databases or APIs in unit tests
- Use `vi.fn()` for function mocks, `vi.spyOn()` for partial mocks
- Always restore mocks with `afterEach(() => { vi.restoreAllMocks() })`
- Test edge cases: null, undefined, empty string, boundary values, error paths
- Never use `any` in test files — type your mocks properly

## E2E Tests (Playwright)

- Use Page Object Model for shared selectors and actions
- Always wait for network idle or specific elements, never `sleep()`
- Use `data-testid` attributes for selectors, never CSS classes
- Each test must be independent — no shared state between tests
- Use `test.describe()` to group related tests
- Screenshot on failure is automatic — don't add manual screenshots

## Coverage

- New code must maintain: statements 90%, branches 85%, functions 90%
- Don't write tests just for coverage — test behavior, not implementation
- If a function is hard to test, it's probably doing too much — refactor first

## Anti-Patterns

- No `test.skip()` without a linked issue explaining why
- No snapshot tests for dynamic content (timestamps, IDs, random values)
- No testing private functions directly — test through the public API
- No `console.log` in test files — use proper assertions
- No hardcoded ports or URLs — use environment variables or config
