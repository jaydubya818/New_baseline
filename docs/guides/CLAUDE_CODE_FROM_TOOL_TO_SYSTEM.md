# Claude Code: From Tool to System

> Battle-tested patterns from a year of daily Claude Code use. Turns a chatbot-in-a-terminal into a controlled engineering system.

Source: "Claude Code Best Practices: From Tool to System" (March 2026)

## The 200-Line CLAUDE.md Rule

Claude's attention degrades as context grows. Shorter CLAUDE.md files produce better adherence.

**Guidelines:**
- Keep a single CLAUDE.md under ~200 lines
- Put the "why" Claude can't read from code: architecture decisions, historical lessons, business constraints, style preferences
- Don't put: API docs, file-by-file descriptions (Claude reads code itself)
- Overflow goes to `.claude/rules/` with path-matching frontmatter

**4-line global CLAUDE.md template** (put in `~/.claude/CLAUDE.md`):

```markdown
- commit messages use conventional commits
- explain your plan before making changes, wait for my confirmation
- prefer simple solutions, no over-engineering
- don't refactor files I didn't mention
```

**Three-layer approach:**
1. **Global** (`~/.claude/CLAUDE.md`): Behavior preferences (commit style, plan-first, simplicity)
2. **Project** (`./CLAUDE.md`): Project facts (stack, off-limits, current focus)
3. **Rules** (`.claude/rules/`): Path-specific rules with YAML frontmatter

## 6 AI Persona Testing

The most novel pattern: use subagents not to write code, but to simulate users finding trust breakpoints.

### The 6 Personas

| Persona | Focus |
| ------- | ----- |
| **Skeptical Staff Engineer** | Security, side effects, hidden dependencies |
| **Security Reviewer** | Secret leaks, permission boundaries, remote execution risks |
| **New Maintainer** | Documentation clarity, onboarding path |
| **Heavy CLI User** | Command consistency, composability, idempotency |
| **Operator / SRE** | Observability, failure recovery, notification pipelines |
| **Docs-First Newcomer** | README completeness, example accuracy |

### How It Works

1. Create 6 subagent tasks, each playing a different persona
2. Each persona evaluates the system through their specific lens
3. Aggregate results — trust breakpoints appear
4. Fix high-priority issues
5. Run second round — verify fixes, remaining issues drop to cosmetic

**Real result:** 5 trust breakpoints found in 15 minutes that were missed in 2 weeks of manual use:
- Silent failure with no error message
- Missing 30-second quick start in README
- Feature description didn't match behavior
- "Read-only" command had hidden side effects
- Health check pipeline had no liveness probe

This pattern is implemented as `/persona-test` in our commands.

## Writer/Reviewer Dual-Session Mode

Two separate Claude sessions with role separation:
- **Writer session**: Generates code normally
- **Reviewer session**: Only sees results, doesn't know how code was generated. Reports problems only, no fix suggestions.

```
# Reviewer session instructions
You are a code reviewer. Does this code have:
1. Hallucinated APIs (methods that don't exist)
2. Race conditions
3. Changes outside the task scope
Only report problems. Don't suggest fixes.
@src/auth/service.ts
```

Problems go back to writer for fixes. Usually 2-3 rounds produces much better quality than single-session.

This pattern complements our `adversarial-reviewer` agent, which does this within a single session.

## Three-Element Instruction Format

Good instructions need exactly three elements:

```
Goal: Reduce getUserData() response time from 800ms to under 200ms
Constraints: Don't change the interface signature, don't add new dependencies, only touch this one function
Context: @src/services/user.ts#L45-L89
Verification: user.test.ts must all pass
Don't: Don't change the database schema, don't add a caching layer
```

**"Don't" is more important than "do."** Claude gets overeager. "Don't add new dependencies" is more effective than listing 10 allowed libraries.

**Exception:** Exploration benefits from vague instructions. "Look at this module for potential issues" catches things precise specs would miss. Switch back to precise mode when implementing.

## Hook Patterns (Beyond Basics)

### Auto-Format After Every Edit

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"}]
    }]
  }
}
```

### Protect Critical Files (PreToolUse)

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": ".claude/hooks/protect-files.sh"}]
    }]
  }
}
```

Exit code 0 = allow, exit code 2 = block. **Only PreToolUse can block** — PostToolUse runs after execution, too late to prevent.

### Re-Inject After Compression

When long conversations get compacted, important instructions can get lost:

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "compact",
      "hooks": [{"type": "command", "command": "echo 'Use Bun, not npm. Run bun test before committing.'"}]
    }]
  }
}
```

**Rules in CLAUDE.md are suggestions. Hooks are code-level enforcement that never forgets.**

## Auto-Learning From Behavior

Advanced pattern: let AI extract rules from your editing behavior.

### The Flow

```
AI writes draft → You edit until satisfied → observe.py records original/final
→ improve.py diffs both versions → extracts "what you changed"
→ Rules ranked by confidence: P0 (5+ occurrences) / P1 (low-freq) / P2 (logged only)
→ After human review, P0 rules get written to SKILL.md
```

### Caveats

- **Core safety rules must be handwritten** — never delegate permission boundaries, secret protection, or destructive command blocking to automation
- **Incidental edits get falsely extracted** — one-off formatting changes become permanent rules without human review
- **All P0 rules require human confirmation** before being written in
- Auto-learning handles style preferences only

## Compression Retention Instructions

Tell Claude what to preserve when running `/compact`:

```markdown
# Compression instructions
When compressing context, always keep:
- Complete list of modified files
- Test commands and results
- Key architecture decisions
- Current task goal and constraints
- Error messages and their resolutions
```

Put this in CLAUDE.md. Without it, Claude may discard critical context during compaction.

## MCP Overhead Awareness

Each MCP server adds tool definitions to context — roughly 100-500+ tokens per server. Running 8+ at once noticeably degrades code generation quality.

**Rule:** Keep 2-3 active MCP servers per session. Add per project as needed, remove when done. Use `/mcp` to manage connections.

## Effort Level Heuristic

```bash
/effort high    # >3 files, architecture, complex bugs
/effort low     # single-file, rename, typo, log line
```

Only raise effort when changes touch more than 3 files. Architecture design, complex bug diagnosis, multi-constraint reasoning — those are worth the extra tokens. Single-file edits, default is fine.

## Four Red Lines

1. **Don't do what you don't understand.** Claude can generate anything, but if you can't read it, you can't maintain it. Code you don't understand in production is both tech debt and a security risk.
2. **Don't use it without version control.** No Git means no rollback. Claude's changes might overwrite your files.
3. **Don't throw massive tasks at it.** "Refactor the entire auth system" = disaster. "Extract JWT parsing from validateToken into its own function" = controllable.
4. **Don't expect perfection on first try.** First drafts are always drafts. `/rewind` to roll back, give precise feedback. Iteration is the correct approach.

## Multi-System Collaboration

When using Claude Code alongside Codex, Cursor, or other AI tools:

- **Single source of truth for knowledge**: `~/.ai-core/` (or equivalent) containing shared behavior rules, commands, and skills
- **Each system generates its own config** from the shared source
- **Share the knowledge layer, not the runtime layer**: Permission settings, auth credentials, MCP tokens, local state — each system manages its own
- **Clear boundaries**: Claude Code for quick edits + exploration + debugging. Codex for heavy cross-file refactors. Other tools for scheduling and notifications.

## Quick Reference

| Pattern | When to Use |
| ------- | ----------- |
| 4-line CLAUDE.md | Global behavior defaults |
| 200-line ceiling | Per-project CLAUDE.md |
| 6 persona test | Before shipping any user-facing system |
| Writer/reviewer | Complex features needing quality gates |
| Goal+Constraints+Context | Every non-trivial instruction |
| Plan Mode | Tasks touching >3 files |
| /effort high | Architecture, complex bugs |
| Compression retention | Long sessions that will compact |
| Hook enforcement | Rules that must never be skipped |
| Auto-learning | Style preference extraction (advanced) |

## References

- Original article: "Claude Code Best Practices: From Tool to System" (March 2026)
- [CLAUDE_CODE_BEST_PRACTICES.md](./CLAUDE_CODE_BEST_PRACTICES.md) — Settings hierarchy and permission patterns
- [PROMPT_CACHING_GUIDE.md](./PROMPT_CACHING_GUIDE.md) — Context optimization
- [SPEC_DRIVEN_DEVELOPMENT.md](./SPEC_DRIVEN_DEVELOPMENT.md) — Plan-before-code workflow
