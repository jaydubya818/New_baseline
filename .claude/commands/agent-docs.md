---
name: agent-docs
description: Generate agent-readable documentation for a codebase — Markdown optimized for LLM consumption, not human browsing (Karpathy insight #9)
allowed-tools: Read, Glob, Grep, Bash, Write
---

Generate documentation for this codebase optimized for AI agent consumption — not human-readable HTML guides. The goal is that any Claude session starting cold in this repo can immediately understand the architecture, patterns, and conventions.

**Generate these files:**

1. **CLAUDE.md** (or update existing) — The agent's entry point
   - Project purpose in 1 sentence
   - Tech stack with exact versions
   - How to run: dev server, tests, build, lint (exact commands)
   - File structure overview (what lives where)
   - Key architectural decisions and WHY they were made
   - Common gotchas and pitfalls specific to this codebase
   - Stay under 200 lines

2. **`.claude/rules/`** — Conditional rules for this project
   - Analyze the codebase for patterns (ORM usage, API conventions, component patterns)
   - Create `<important if="...">` rules for each pattern
   - Include specific examples of DO and DON'T from the actual codebase

3. **Key file headers** — For complex files, add a brief comment block:
   ```
   // AGENT CONTEXT: This file handles X. It depends on Y and is consumed by Z.
   // Key invariant: [something non-obvious about this file]
   ```

**Principles:**
- Write for an agent that has infinite patience but zero prior context
- Focus on the irreducible insights the agent can't infer from code alone
- Include the "why" behind non-obvious choices
- Omit anything an agent can figure out by reading the code itself

$ARGUMENTS
