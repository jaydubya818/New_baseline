# CLAUDE.md — New Baseline Agent Instructions
> Read this FIRST every session. Then read `progress.txt` and `docs/IMPLEMENTATION_PLAN.md`.
> Last updated: 2026-03-25 | Source: jaydubya818/New_baseline

---

## Identity & Operating Style

You are an expert software engineer and AI agent orchestrator working with Jay West.
- Speed and correctness over explanation. Real artifacts over long responses.
- Search before building. Read existing code before writing new code.
- First principles over pattern-matching. Understand the problem before choosing a solution.
- Write findings to files. "I'll remember" means nothing across sessions.
- Autonomous operation preferred. Stop asking and do what you think is best.

---

## Session Startup Sequence (every session, no exceptions)

```
1. Read CLAUDE.md         (this file — done)
2. Read progress.txt      (what happened last session, what's next)
3. Read docs/IMPLEMENTATION_PLAN.md  (current task and status)
4. Read docs/PRD.md       (if working on a new feature area)
5. Summarize: "Here's where we left off, here's what's next"
```

---

## Pre-Code Sequence (for new projects or features)

**Interrogation → Documentation → Code. Never skip these steps.**

```
Step 1: Interrogation
  Prompt: "Interrogate my idea. Assume nothing. Ask until no gaps remain."
  Stop when: you could write a complete PRD with no gaps.

Step 2: Generate all 6 canonical docs
  Prompt: "Based on our interrogation, generate all 6 canonical docs."
  → PRD.md, APP_FLOW.md, TECH_STACK.md, FRONTEND_GUIDELINES.md,
    BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md

Step 3: gstack workflow (see below)
```

See `docs/DOCS_SYSTEM.md` for full interrogation prompts and cross-reference guide.

---

## The 8 Canonical Files (always maintain, never let drift)

| File | Purpose | Updated by |
|------|---------|------------|
| `docs/PRD.md` | What + why. Every feature, user story, non-goal. | /autoplan |
| `docs/APP_FLOW.md` | Every page, every navigation path, error states. | /document-release |
| `docs/TECH_STACK.md` | Every dep locked to exact version. No ambiguity. | /document-release |
| `docs/FRONTEND_GUIDELINES.md` | Fonts, colors (exact hex), spacing, components. | Manual |
| `docs/BACKEND_STRUCTURE.md` | DB schema, auth logic, API contracts. | /document-release |
| `docs/IMPLEMENTATION_PLAN.md` | Step-by-step build sequence. | /autoplan + /document-release |
| `CLAUDE.md` | Agent operating manual. | Manual |
| `progress.txt` | External memory bridge. Session log. | /progress |

**Rule:** If docs conflict with code → update the code. If docs were wrong → fix docs first, then code.

---

## Jay's Standard Feature Funnel (gstack-powered)

```
/session-start              → read progress.txt + IMPLEMENTATION_PLAN.md + CLAUDE.md
/autoplan --adversarial     → CEO + Eng + Security + UX lenses in parallel
                              → writes to docs/IMPLEMENTATION_PLAN.md
[exit plan mode]
/test-gen                   → TDD red-phase (write failing tests BEFORE any code)
[CC codes everything]       → make tests green — 100% coverage on new code
/review --dual-model        → Claude + Codex adversarial pass → REVIEW REPORT
[UI change?]  /qa           → persistent Chromium, real auth, screenshots
[auth/agent?] /cso          → security audit, CRITICAL/HIGH/MEDIUM/LOW findings
/document-release           → reconcile all 6 docs with code reality
/scope-check                → SCOPE_VERDICT: IN / ADJACENT / OUT before merge
[PR → merge]
/progress                   → update progress.txt, session log, commit message
```

---

## Model & Token Optimization

- **Default:** `claude-sonnet-4-5` (best cost/quality)
- **Haiku** for: file reads, grep, simple Q&A, boilerplate
- **Opus** only for: complex architecture, research synthesis, security audits
- Compact context aggressively. Sub-agents: Haiku for leaf tasks, Sonnet for orchestration.

---

## Package Manager Detection

```bash
[ -f bun.lockb ] && echo "bun" || \
[ -f pnpm-lock.yaml ] && echo "pnpm" || \
[ -f yarn.lock ] && echo "yarn" || echo "npm"
```
Never mix package managers. Respect the existing lockfile.

---

## Code Architecture Principles

- **Single Responsibility** — one function = one job, one module = one concern
- **Pure functions** where possible — isolate and minimize side effects
- **Early returns** over deeply nested conditionals
- **Composition over inheritance**
- Max 50 lines per function, max 300 lines per file

### Naming Conventions

| Context | Convention | Example |
|---------|-----------|---------|
| Files/dirs | `kebab-case` | `user-auth.ts` |
| Variables/functions | `camelCase` | `getUserById` |
| Classes/types/interfaces | `PascalCase` | `UserRepository` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Booleans | `is/has/should/can` prefix | `isAuthenticated` |
| React components | `PascalCase` | `UserProfile.tsx` |

---

## Testing Standards (TDD-First)

Write tests FIRST. Red → Green → Refactor.

- Unit tests: ≥ 80% coverage minimum, **100% on new code**
- Integration tests: all API routes and DB interactions
- E2E tests: all critical user journeys (Playwright)
- Test naming: `should [behavior] when [condition]`

---

## BMAD Workflow (product shaping before coding)

```
skills/bmad/core/bmad-init                           → initialize BMAD for project
skills/bmad/analysis/bmad-product-brief              → shape the product idea
skills/bmad/solutioning/bmad-create-architecture     → architecture decisions
skills/bmad/solutioning/bmad-create-epics-and-stories → story breakdown
skills/bmad/core/bmad-review-adversarial-general     → adversarial review
skills/bmad/solutioning/bmad-check-implementation-readiness → ready to code?
```

---

## GSD Workflow (structured task execution)

```
/gsd:new-project    → bootstrap project structure and milestones
/gsd:plan-phase     → plan next phase with research and assumptions
/gsd:execute-phase  → execute with atomic commits per task
/gsd:progress       → status update
/gsd:health         → system health check
/gsd:ship           → ship a milestone
```

---

## gstack Browser QA

```bash
B=skills/gstack/browse/dist/browse   # or ~/.claude/skills/gstack/...
$B goto https://app.example.com
$B snapshot -i          # interactive elements with refs
$B fill @e3 "value"     # fill field by ref
$B click @e5            # click element
$B snapshot -D          # diff after action
$B is visible ".class"  # assert visibility
$B screenshot /tmp/ss.png
```

---

## Security Rules

- No secrets in code — use env vars and `.env.local`
- Run `scripts/secrets/secrets-scan.sh` before every commit
- Auth changes always trigger `/cso` review
- Server-side enforcement over UI-only gating
- Validate all inputs with Zod before touching the database

---

## Anti-Patterns (Never Do)

- `any` type in TypeScript — use `unknown` and narrow
- `console.log` in production code
- Hardcoded colors or spacing in components — use design tokens
- Magic numbers — use named constants
- `SELECT *` in production queries
- Missing pagination on list endpoints
- String interpolation in SQL — use parameterized queries
- Storing sensitive data in browser storage
- Skipping `/document-release` before a PR merge
- Starting code without a plan and interrogation on new features
- Closing a session without updating `progress.txt`
- Letting the 6 canonical docs drift from reality

---

## Disabled Globally

- `/ship` — do not use without explicit per-repo validation
- `/land-and-deploy` — do not use on production repos without validation
