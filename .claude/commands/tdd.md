# /tdd — Test-Driven Development Workflow

Launch a TDD session for the feature or function described in $ARGUMENTS.

## Procedure

1. **Understand the requirement**
   - Parse what $ARGUMENTS is asking to build
   - Identify inputs, outputs, and edge cases
   - Ask one clarifying question if the spec is ambiguous

2. **Write the test file first**
   - Create `[feature].test.ts` (or language equivalent)
   - Write tests for: happy path, error cases, edge cases, boundary values
   - Use the pattern: `describe('[feature]') → it('should [behavior] when [condition]')`
   - Run tests — they should FAIL (Red phase)

3. **Implement the minimum code**
   - Write only enough code to make the failing tests pass
   - No gold-plating, no premature optimization
   - Run tests — they should PASS (Green phase)

4. **Refactor**
   - Clean up: extract functions, improve naming, reduce duplication
   - Run tests after each refactor to confirm nothing broke (Refactor phase)

5. **Verify coverage**
   ```bash
   # JavaScript/TypeScript
   npx jest --coverage --coverageThreshold='{"global":{"lines":80}}'

   # Python
   pytest --cov=. --cov-fail-under=80

   # Go
   go test ./... -cover
   ```

6. **Report**
   - List all test cases written
   - Show coverage percentage
   - Flag any areas below 80% threshold

## Success Criteria
- All tests green
- Coverage ≥ 80%
- No implementation details tested (only behavior)
- Tests serve as living documentation of the feature

## Usage
```
/tdd add user authentication with email/password
/tdd refactor the shopping cart module
/tdd the PaymentProcessor class
```
