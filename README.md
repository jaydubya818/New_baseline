# New Baseline — Jay's Ultimate Project Starter

> Clone this. Delete what you don't need. Ship faster.
> Everything is pre-wired: gstack browser QA, BMAD product shaping, GSD execution, 30+ agents, hooks, skills, commands, and rules.

---

## What's In Here

| Layer | What | Where |
|-------|------|-------|
| **Workflow OS** | gstack (browser QA, plan/review/ship cycle) | `skills/gstack/` |
| **Product shaping** | BMAD (briefs, architecture, stories, adversarial review) | `skills/bmad/` |
| **Task execution** | GSD (milestones, phases, atomic commits) | `skills/gsd/` |
| **Superpowers** | Parallel agents, TDD, git worktrees, debugging | `skills/superpowers/` |
| **Agents** | 30+ specialized subagents | `.claude/agents/` |
| **Commands** | 50+ slash commands | `.claude/commands/` |
| **Hooks** | Pre-tool guards, memory, formatting | `.claude/hooks/` |
| **Rules** | TypeScript, React, API, DB, Security | `.claude/rules/` |
| **Skills** | PRD, E2E testing, Vitest, React, multi-agent | `skills/` |
| **Doc templates** | PRD, APP_FLOW, TECH_STACK, IMPLEMENTATION_PLAN | `docs/templates/` |
| **Scripts** | Secrets scanning, continual learning | `scripts/` |

---

## Quick Start (New Project)

```bash
# 1. Clone this baseline
git clone https://github.com/jaydubya818/New_baseline.git my-project
cd my-project

# 2. Re-init git for your new project
rm -rf .git && git init

# 3. Update remote
git remote add origin https://github.com/jaydubya818/YOUR_REPO.git

# 4. Copy doc templates
cp docs/templates/PRD.md docs/PRD.md
cp docs/templates/APP_FLOW.md docs/APP_FLOW.md
cp docs/templates/TECH_STACK.md docs/TECH_STACK.md
cp docs/templates/IMPLEMENTATION_PLAN.md docs/IMPLEMENTATION_PLAN.md

# 5. Setup gstack browser (one-time per machine)
cd skills/gstack && ./setup && cd ../..

# 6. Update CLAUDE.md with your project identity
# Edit the "Project Overview" section at top of CLAUDE.md

# 7. Create progress.txt
echo "# Progress\n\n## Session: $(date +%Y-%m-%d)\n- Project initialized from New_baseline" > progress.txt

# 8. Start your first session
# Run: /session-start
```

---

## The Workflow (Jay's Optimized Pattern)

```
/session-start         → warm up: reads progress.txt + IMPLEMENTATION_PLAN.md
/autoplan --adversarial → 4 adversarial lenses in parallel (CEO/Eng/Security/UX)
/test-gen              → write failing tests first (TDD red-phase)
[CC codes]             → make tests green, 100% coverage
/review --dual-model   → Claude + Codex adversarial pass
/qa                    → real Chromium browser, real auth, screenshots
/cso                   → security gate (auth/agent changes only)
/document-release      → keep PRD, APP_FLOW, TECH_STACK honest
/progress              → update progress.txt, session close
```

---

## Key Skills Reference

### gstack Commands
| Command | When |
|---------|------|
| `/autoplan` | Before any feature |
| `/autoplan --deep` | Multi-service features |
| `/review --dual-model` | Before any PR |
| `/qa` | After any UI change |
| `/cso` | Auth / agent permission changes |
| `/document-release` | Before every merge |
| `/session-start` | Every session open |
| `/progress` | Every session close |
| `/investigate` | Bugs and flaky behavior |
| `/scope-check` | Before unplanned additions |

### BMAD Commands
| Command | When |
|---------|------|
| `bmad-init` | Start a new product |
| `bmad-product-brief` | Shape the product idea |
| `bmad-create-architecture` | Architecture decisions |
| `bmad-create-epics-and-stories` | Break down the work |
| `bmad-review-adversarial-general` | Stress-test the plan |
| `bmad-check-implementation-readiness` | Ready to code? |

### GSD Commands
| Command | When |
|---------|------|
| `/gsd:new-project` | Bootstrap project |
| `/gsd:plan-phase` | Plan next phase |
| `/gsd:execute-phase` | Execute with atomic commits |
| `/gsd:progress` | Status update |
| `/gsd:health` | System check |
| `/gsd:ship` | Ship a milestone |

---

## Agents Available

**Core planning pipeline:** `01-architecture` → `02-plan-review` → `03-planning` → `04-task-breakdown` → `05-context-manager` → `06-code-generation` → `07-task-validation` → `08-runtime-prep`

**GSD agents:** executor, planner, debugger, verifier, ui-auditor, codebase-mapper, integration-checker, nyquist-auditor, phase-researcher, research-synthesizer, roadmapper, user-profiler

**Specialist agents:** architect, code-reviewer, db-reviewer, security-reviewer, perf-analyzer, superpowers-code-reviewer

---

## Hooks (Auto-active)

| Hook | What it does |
|------|-------------|
| `gsd-prompt-guard.js` | Blocks dangerous prompts |
| `gsd-workflow-guard.js` | Enforces workflow gates |
| `gsd-context-monitor.js` | Monitors context window |
| `pre-tool-memory.py` | Loads memory before tool use |
| `prompt-injection-defender/` | Blocks prompt injection |
| `auto-format.sh` | Auto-formats on file write |
| `stop-validation.sh` | Validates before stopping |

---

## Doc Templates

Start every project with these templates from `docs/templates/`:
- `PRD.md` — product requirements document
- `APP_FLOW.md` — user flows and screens
- `TECH_STACK.md` — stack, deps, versions
- `IMPLEMENTATION_PLAN.md` — task breakdown
- `ARCHITECTURE.md` — system design decisions
- `PROGRESS.md` — session log template

---

## Repo Source

Built from:
- **jaydubya818/baseline-project** — original baseline
- **garrytan/gstack** v1.1.0 — browser QA + workflow OS
- **bmad-method** — product shaping framework
- **get-shit-done (GSD)** — structured execution system
- **everything-claude-code** — agents, commands, hooks
- **superpowers** — parallel agents, TDD, worktrees
- Jay's custom agents, commands, skills, and rules

---

## Structure

```
New_baseline/
├── .claude/
│   ├── agents/          # 30+ specialized subagents
│   ├── commands/        # 50+ slash commands (+ /gsd + /superpowers)
│   ├── hooks/           # Pre-tool guards, memory, formatting
│   ├── rules/           # TypeScript, React, API, DB, Security rules
│   ├── workflows/       # Git commit, code cleanup workflows
│   └── output-formats/  # Structured output templates
├── skills/
│   ├── gstack/          # Browser QA + workflow OS
│   ├── bmad/            # Product shaping framework
│   ├── gsd/             # Structured execution system
│   ├── superpowers/     # Parallel agents, TDD, debugging
│   ├── prd/             # PRD creation skill
│   ├── project-development/ # Project dev patterns
│   ├── e2e-tester/      # E2E testing skill
│   ├── vitest-best-practices/
│   ├── react-best-practices/
│   ├── web-design-guidelines/
│   ├── multi-agent-patterns/
│   ├── evaluation/
│   └── [more]
├── docs/
│   └── templates/       # PRD, APP_FLOW, TECH_STACK, etc.
├── scripts/
│   ├── secrets/         # Secrets scanning
│   └── continual-learning/
├── .gstackrc            # gstack config (update per-project)
├── CLAUDE.md            # Master agent instructions
└── README.md            # This file
```

---

## Using with Cursor

The repo is fully wired for Cursor via `.cursor/rules/` (modern MDC format) and `.cursorrules` (legacy fallback).

### What's Auto-Active in Cursor

| Rule File | Scope | Always On |
|-----------|-------|-----------|
| `security.mdc` | All files | ✅ Yes |
| `workflow.mdc` | All files | ✅ Yes |
| `typescript.mdc` | `**/*.ts`, `**/*.tsx` | Auto on match |
| `react.mdc` | `**/*.tsx`, `**/components/**` | Auto on match |
| `api.mdc` | `**/api/**`, `**/actions/**` | Auto on match |
| `database.mdc` | `**/prisma/**`, `**/*.sql` | Auto on match |
| `testing.mdc` | `**/*.test.*`, `**/e2e/**` | Auto on match |

### Skills & Agents in Cursor

Cursor can read and reference all skills directly. When starting a feature, paste the relevant skill path into your Cursor context:

```
@skills/gstack/SKILL.md        — browser QA + workflow OS
@skills/bmad/                  — product shaping (briefs, architecture, stories)
@skills/gsd/                   — structured execution (milestones, phases, commits)
@skills/superpowers/           — parallel agents, TDD, git worktrees
@skills/vitest-best-practices/ — unit/integration test patterns
@skills/e2e-tester/            — Playwright E2E patterns
@skills/react-best-practices/  — component + hooks patterns
@skills/web-design-guidelines/ — UI/UX standards
@.claude/agents/README.md      — full agent catalog
@.claude/commands/             — all slash commands
@docs/templates/               — canonical doc templates
```

### Cursor Workflow (Jay's Pattern)

```
1. Open project in Cursor
2. @CLAUDE.md + @progress.txt → context loaded
3. Describe feature → Cursor applies workflow.mdc automatically
4. Interrogation prompt → gap-free requirements
5. @docs/templates/ → fill canonical docs
6. TDD: write tests first (@skills/vitest-best-practices/)
7. Code → Cursor enforces typescript.mdc + react.mdc + api.mdc inline
8. Security checked automatically via security.mdc on every file
9. Commit atomically (feat:/fix:/chore: prefix)
```

### Updating Rules Per-Project

When you clone this baseline for a new project, update `.cursor/rules/workflow.mdc` with:
- Project name and description
- Tech stack specifics
- Any project-specific anti-patterns or conventions

The `.cursorrules` file is the single-file fallback — keep both in sync.
