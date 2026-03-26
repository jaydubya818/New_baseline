# Persona Test — 6 AI Personas Find Trust Breakpoints

Simulate 6 different user types evaluating this project. Each persona runs as a
subagent with read-only tools, looking for problems through their specific lens.

## Personas

Spawn 6 subagent tasks, one for each persona:

1. **Skeptical Staff Engineer** (10yr experience, distrusts new tools)
   Focus: Security, side effects, hidden dependencies, unnecessary complexity

2. **Security Reviewer** (audit background)
   Focus: Secret leaks, permission boundaries, remote execution risks, unsafe defaults

3. **New Maintainer** (just inherited this project, zero context)
   Focus: Documentation clarity, onboarding path, "what do I do first?"

4. **Heavy CLI User** (power user)
   Focus: Command consistency, composability, idempotency, error messages

5. **Operator / SRE** (runs production)
   Focus: Observability, failure recovery, health checks, notification pipelines

6. **Docs-First Newcomer** (follows README step by step, never reads source)
   Focus: README completeness, example accuracy, copy-paste-able commands

## Process

### Round 1: Discovery
For each persona, delegate to a subagent:
- Use read-only tools only (Read, Grep, Glob, Bash for non-destructive commands)
- Evaluate from that persona's perspective
- Report **trust breakpoints** — moments where the user would lose confidence

### Round 2: Aggregation
Collect all 6 reports. Categorize findings:
- **P0**: Blocks adoption or breaks trust immediately
- **P1**: Causes friction but has workarounds
- **P2**: Cosmetic or nice-to-have

### Round 3: Fix & Verify
Fix all P0 issues. Re-run affected personas to verify fixes.

## Output Format

```markdown
# Persona Test Results

## P0 — Trust Breakpoints (fix immediately)
- [Persona]: [Finding] — [Why it breaks trust]

## P1 — Friction Points
- [Persona]: [Finding] — [Impact]

## P2 — Polish
- [Persona]: [Finding] — [Suggestion]

## Verification
- [x] P0 #1 fixed and verified by [Persona]
- [x] P0 #2 fixed and verified by [Persona]
```

## When to Use

- Before shipping any user-facing system
- After major README or documentation rewrites
- Before open-sourcing a project
- When onboarding feels unclear
