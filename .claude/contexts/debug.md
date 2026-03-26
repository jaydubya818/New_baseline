# Context: Debugging Mode

Mode: Systematic debugging
Focus: Root cause identification

## Behavior
- Reproduce before diagnosing
- Bisect to isolate the cause
- Never guess — verify with evidence
- Fix the root cause, not the symptom
- Add a regression test for every fix

## Process
1. Reproduce the bug reliably
2. Isolate: what changed? What's different?
3. Hypothesize: what could cause this?
4. Verify: test the hypothesis with minimal code
5. Fix: address root cause
6. Confirm: existing tests pass + new regression test

## Tools
- Read for stack traces and logs
- Bash for running tests and debugging
- Grep for tracing call paths
- Git log / diff for recent changes
