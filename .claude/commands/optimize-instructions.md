---
name: optimize-instructions
description: Meta-optimize CLAUDE.md and skills based on what's actually working (Karpathy insight #5 — treat instructions as tunable code)
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

Analyze and optimize the project's agent instructions based on observed patterns.

**Process:**

1. **Gather evidence**
   - Read the current CLAUDE.md
   - Read all files in `.claude/rules/`
   - Read recently used skills (check `~/.claude.json` skillUsage)
   - Check git log for recent commits — what kinds of tasks are being done?

2. **Identify gaps**
   - What mistakes keep happening? (check git log for "fix" commits after recent features)
   - What patterns are repeated in prompts that should be in CLAUDE.md?
   - Are there rules that never trigger because the `if` condition is too narrow?
   - Are there skills that should exist based on frequent task patterns?

3. **Optimize**
   - Tighten vague instructions into specific, testable ones
   - Remove instructions that are obvious (don't state what the model already knows)
   - Add a "gotchas" section for project-specific pitfalls
   - Ensure every rule has a concrete example, not just an abstract principle
   - Check line count — stay under 200 lines, move details to referenced docs

4. **Report changes**
   - Show before/after diff for each change
   - Explain the reasoning for each optimization
   - Predict what behavior should improve

$ARGUMENTS
