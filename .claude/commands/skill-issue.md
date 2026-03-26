---
name: skill-issue
description: Debug why Claude isn't delivering — diagnose prompt, CLAUDE.md, memory, or orchestration issues (Karpathy insight #2)
allowed-tools: Read, Glob, Grep, Bash
---

Something isn't working well with Claude Code's output. Before blaming the model, systematically diagnose the setup.

**Diagnostic checklist:**

1. **CLAUDE.md audit**
   - Read the project's CLAUDE.md (and any ancestor/descendant CLAUDE.md files)
   - Check: Is it under 200 lines? Are instructions specific enough? Any contradictions?
   - Check: Are there `<important if="...">` rules in `.claude/rules/` that should trigger but aren't?

2. **Memory check**
   - Read `~/.claude/memory/memory.md` — is the index current?
   - Check if relevant domain knowledge exists in `~/.claude/memory/domain/`
   - Look for stale or contradictory entries

3. **Skills audit**
   - List available skills in `~/.claude/skills/`
   - Check if a relevant skill exists but isn't being triggered (bad description?)
   - Check if the skill's SKILL.md has clear trigger conditions

4. **Context pollution**
   - Is the context window bloated? Check if there are huge files being read unnecessarily
   - Are hooks injecting too much content? Review `~/.claude/hooks/`

5. **Permission friction**
   - Check `~/.claude/settings.json` and `settings.local.json` for overly restrictive permissions
   - Are common commands blocked that should be pre-approved?

**Output a diagnosis** with:
- Root cause identified
- Specific fix (file edit, config change, or new skill/rule needed)
- Before/after prediction of behavior change
