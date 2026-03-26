---
name: deploy-check
description: Pre-deployment safety checklist
allowed-tools: Bash, Read, Grep, Glob
---

Run a pre-deployment safety checklist for the current project:

1. **Build** — run the build command and verify it succeeds with no warnings
2. **Type check** — run tsc/type checker if available
3. **Lint** — run linter and report any errors (warnings OK)
4. **Tests** — run test suite, report pass/fail count
5. **Env vars** — verify .env.example exists and all required vars are documented
6. **Secrets scan** — grep for hardcoded API keys, tokens, passwords (patterns: `sk-`, `ghp_`, `AKIA`, `password =`, `secret =`)
7. **Console artifacts** — check for `console.log`, `debugger`, `TODO`, `FIXME`, `HACK` in staged changes
8. **Dependencies** — check for known vulnerabilities (`npm audit` / `pip audit`)
9. **Git status** — confirm working tree is clean or all changes are committed

Report as a checklist: ✅ PASS / ❌ FAIL / ⚠️ WARN for each item.
