# Skills

Pre-loaded skill library for AI-assisted development. Each skill is a SKILL.md or folder
of prompts that instructs the agent to perform a specific workflow.

## Core Workflow Skills

| Skill | Purpose | Key Commands |
|-------|---------|-------------|
| `gstack/` | Browser QA + full workflow OS | `/autoplan`, `/review`, `/qa`, `/cso`, `/document-release` |
| `bmad/` | Product shaping framework | `bmad-init`, `bmad-product-brief`, `bmad-create-architecture` |
| `gsd/` | Structured task execution | `/gsd:new-project`, `/gsd:execute-phase`, `/gsd:progress` |
| `superpowers/` | Parallel agents, TDD, debugging | subagent-driven-development, test-driven-development |

## Engineering Skills

| Skill | Purpose |
|-------|---------|
| `prd/` | PRD creation and refinement |
| `project-development/` | Full project development patterns |
| `e2e-tester/` | End-to-end test writing |
| `vitest-best-practices/` | Vitest unit test patterns |
| `react-best-practices/` | React component patterns |
| `frontend-testing/` | Frontend test strategies |
| `frontend-code-review/` | Frontend PR review checklist |
| `multi-agent-patterns/` | Multi-agent orchestration |
| `evaluation/` | Agent evaluation frameworks |
| `hosted-agents/` | Hosted agent deployment patterns |
| `web-design-guidelines/` | UI/UX design rules |
| `context-optimization/` | Context window management |

## Usage

Reference any skill from CLAUDE.md or invoke directly:
```
# In CLAUDE.md, reference the skill path
# Or tell the agent: "Use skills/gstack/review/SKILL.md"
# Or activate via slash command: /gsd:execute-phase
```

## Adding New Skills

1. Create a new folder under `skills/`
2. Add a `SKILL.md` file with the skill definition
3. Document it in this README
4. Reference it from `CLAUDE.md` if it should be globally active
