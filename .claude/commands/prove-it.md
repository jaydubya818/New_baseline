---
name: prove-it
description: Challenge Claude to verify its own work with evidence
allowed-tools: Bash, Read, Grep, Glob
---

Review the most recent changes made in this session and prove they work:

1. **Trace the data flow** — for each change, trace the happy path AND the three shadow paths (null, empty, upstream error)
2. **Run tests** — execute relevant tests and show results
3. **Manual verification** — write and run a quick smoke test if no automated test exists
4. **Edge cases** — identify and test at least 2 edge cases per change
5. **Regression check** — verify nothing else broke by running the full test suite

Be brutally honest. If something doesn't work, say so and fix it. Don't rationalize failures.
