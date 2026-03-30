# Skills Index

> "I want to do X" → "use this skill." Decision tree for all skills in New Baseline.

---

## Quick Decision Tree

```
What are you trying to do?
│
├── Plan & Design
│   ├── Shape a new product idea ──────────── bmad/
│   ├── Write a PRD ───────────────────────── prd/
│   ├── Plan a feature (adversarial) ──────── gstack (/autoplan)
│   ├── Break work into phases ────────────── gsd/
│   └── Write a detailed spec ─────────────── gstack (/spec-interview)
│
├── Execute & Build
│   ├── Structured task execution ─────────── gsd/ (/gsd:execute-phase)
│   ├── Parallel agent execution ──────────── superpowers/ (dispatching-parallel-agents)
│   ├── Subagent-driven feature ───────────── superpowers/ (subagent-driven-development)
│   ├── TDD workflow ──────────────────────── superpowers/ (test-driven-development)
│   └── Full feature pipeline ─────────────── gstack (session-start → progress)
│
├── Review & Quality
│   ├── Code review ───────────────────────── frontend-code-review/ or gstack (/review)
│   ├── Multi-model adversarial review ────── gstack (/review --dual-model)
│   ├── Security audit ────────────────────── gstack (/cso)
│   ├── Browser QA ────────────────────────── gstack (/qa)
│   ├── Frontend testing ──────────────────── frontend-testing/
│   ├── Unit test best practices ──────────── vitest-best-practices/
│   ├── E2E test generation ───────────────── e2e-tester/
│   └── Quality compounding ───────────────── compound-engineering/
│
├── Design & UI
│   ├── React component patterns ──────────── react-best-practices/
│   ├── Web design standards ──────────────── web-design-guidelines/
│   ├── Frontend Design (production UI) ───── Install: anthropics/skills/frontend-design
│   └── Full design system gen ────────────── See: docs/guides/UI_UX_PRO_MAX.md
│
├── Research & Context
│   ├── Deep research (8-phase) ───────────── Install: 199-biotechnologies/claude-deep-research-skill
│   ├── Context optimization ──────────────── context-optimization/
│   ├── LLM evaluation patterns ───────────── evaluation/
│   └── Agent deployment ──────────────────── hosted-agents/
│
├── Knowledge & Memory
│   ├── Obsidian vault management ─────────── Install: kepano/obsidian-skills
│   ├── Session memory ────────────────────── .claude/memory/ system
│   └── Codebase knowledge graph ──────────── MCP: codebase-memory-mcp
│
├── Multi-Agent & Orchestration
│   ├── Coordination patterns ─────────────── multi-agent-patterns/
│   ├── Git worktree parallelism ──────────── superpowers/ (using-git-worktrees)
│   └── Plan authoring & execution ────────── superpowers/ (writing-plans, executing-plans)
│
└── Meta & Documentation
    ├── Build a new skill ─────────────────── See: docs/guides/SKILL_CREATOR.md
    ├── Development workflow patterns ─────── project-development/
    └── Update canonical docs ─────────────── gstack (/document-release)
```

---

## Skills by Location

### Core Workflow Skills

| Skill                    | Path                           | Primary Commands                                                         |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------ |
| **gstack**               | `skills/gstack/`               | `/session-start`, `/autoplan`, `/review`, `/qa`, `/cso`, `/progress`     |
| **GSD**                  | `skills/gsd/`                  | `/gsd:new-project`, `/gsd:plan-phase`, `/gsd:execute-phase`, `/gsd:ship` |
| **BMAD**                 | `skills/bmad/`                 | `bmad-init`, `bmad-product-brief`, `bmad-create-architecture`            |
| **Compound Engineering** | `skills/compound-engineering/` | 41 skills, 6 agent groups, plan/work/review/compound loop                |

### Quality & Review Skills

| Skill                     | Path                            | Purpose                                |
| ------------------------- | ------------------------------- | -------------------------------------- |
| **Frontend Code Review**  | `skills/frontend-code-review/`  | UI code review patterns                |
| **Frontend Testing**      | `skills/frontend-testing/`      | Component and integration testing      |
| **Vitest Best Practices** | `skills/vitest-best-practices/` | AAA pattern, async, snapshots, doubles |
| **E2E Tester**            | `skills/e2e-tester/`            | Playwright test generation             |
| **Evaluation**            | `skills/evaluation/`            | LLM evaluation patterns                |

### Design & UI Skills

| Skill                     | Path                            | Purpose                               |
| ------------------------- | ------------------------------- | ------------------------------------- |
| **React Best Practices**  | `skills/react-best-practices/`  | Rendering, re-renders, async, bundles |
| **Web Design Guidelines** | `skills/web-design-guidelines/` | UI/UX standards                       |

### Advanced Skills

| Skill                    | Path                           | Purpose                                                  |
| ------------------------ | ------------------------------ | -------------------------------------------------------- |
| **Superpowers**          | `skills/superpowers/`          | 14 advanced patterns (parallelism, TDD, debugging, etc.) |
| **Multi-Agent Patterns** | `skills/multi-agent-patterns/` | Coordination, orchestration                              |
| **Context Optimization** | `skills/context-optimization/` | Token savings, KV-cache efficiency                       |
| **Hosted Agents**        | `skills/hosted-agents/`        | Agent deployment, sandbox management                     |
| **PRD**                  | `skills/prd/`                  | Product requirements documents                           |
| **Project Development**  | `skills/project-development/`  | Dev pipeline patterns, case studies                      |

---

## External Skills (Install Separately)

These are not bundled with New Baseline but are recommended. See [docs/guides/SKILLS_REFERENCE.md](../docs/guides/SKILLS_REFERENCE.md) for installation instructions.

| Skill                           | Source                                                                                     | Stars/Installs |
| ------------------------------- | ------------------------------------------------------------------------------------------ | -------------- |
| Frontend Design                 | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 277k installs  |
| Skill Creator                   | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator)   | Official       |
| Obsidian Skills                 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)                        | By CEO         |
| Deep Research                   | [199-biotechnologies](https://github.com/199-biotechnologies/claude-deep-research-skill)   | —              |
| Context Optimization (extended) | [muratcankoylan](https://github.com/muratcankoylan/agent-skills-for-context-engineering)   | 13.9k          |

---

## Common Workflows → Skill Chains

| Workflow               | Skill Chain                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **New feature (full)** | gstack `/session-start` → `/autoplan` → superpowers TDD → gstack `/review` → `/qa` → `/cso` → `/progress` |
| **New product**        | BMAD `init` → `product-brief` → `create-architecture` → `create-epics` → `review-adversarial`             |
| **Bug fix**            | gstack `/investigate` → superpowers `systematic-debugging` → GSD `/gsd:do` → gstack `/review`             |
| **Refactor**           | frontend-code-review → superpowers `verification-before-completion` → gstack `/review --dual-model`       |
| **Research spike**     | Deep Research skill → evaluation patterns → project-development case study                                |
| **New skill**          | Skill Creator → evaluation → superpowers `writing-skills`                                                 |
