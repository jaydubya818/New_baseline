---
name: techdebt
description: Scan codebase for technical debt and refactoring opportunities
allowed-tools: Bash, Read, Grep, Glob
---

Scan the current project for technical debt. Look for:

1. **Duplicated code** — similar logic in multiple files (DRY violations)
2. **Dead code** — unused exports, unreachable branches, commented-out blocks
3. **TODOs/FIXMEs** — catalog all TODO, FIXME, HACK, XXX comments with file:line
4. **Outdated dependencies** — run `npm outdated` or equivalent
5. **Missing tests** — identify files with 0 test coverage (heuristic: no corresponding .test/.spec file)
6. **Large files** — files over 300 lines that could be split
7. **Type safety** — any `any` types, missing return types, untyped parameters
8. **Error handling** — bare catch blocks, swallowed errors, missing error boundaries

Output a prioritized list (high/medium/low impact) with specific file:line references. Group by category.
