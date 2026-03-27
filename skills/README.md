# Skills Index

Skills are `SKILL.md` files that give Claude Code specialized playbooks for specific tasks. They trigger automatically when the agent recognizes a relevant task, or can be invoked explicitly.

## Available Skills

| Skill                     | Description                              | When to Use                                                         |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| **gstack**                | Browser QA + workflow OS (gstack v1.1.0) | Full project lifecycle — plan, build, test, ship                    |
| **bmad**                  | Product shaping framework                | Feature discovery, PRDs, method-driven development                  |
| **gsd**                   | Get-Shit-Done structured execution       | 57 agents for systematic task completion                            |
| **superpowers**           | Parallel agents, TDD, worktrees          | Complex multi-file changes, test-driven development                 |
| **prd**                   | Product Requirements Documents           | Writing structured PRDs from scratch                                |
| **project-development**   | Full project development workflow        | End-to-end project setup and execution                              |
| **react-best-practices**  | 50+ React performance rules              | React component design, optimization                                |
| **vitest-best-practices** | Testing patterns for Vitest              | Unit test writing, mocking, coverage                                |
| **frontend-testing**      | Frontend E2E + component testing         | Testing React components, user interactions                         |
| **e2e-tester**            | End-to-end test generation               | Playwright E2E test creation                                        |
| **frontend-code-review**  | Frontend-specific code review            | React/Next.js code quality checks                                   |
| **context-optimization**  | Context window management                | Long sessions, large codebases                                      |
| **evaluation**            | Skill evaluation framework               | Testing and benchmarking skills                                     |
| **hosted-agents**         | Cloud-hosted agent patterns              | Deploying agents to production                                      |
| **compound-engineering**  | Every.to engineering OS                  | Plan/work/review/compound loop, 41 skills, 14-agent parallel review |
| **multi-agent-patterns**  | Multi-agent orchestration                | Agent coordination, task delegation                                 |
| **web-design-guidelines** | Web design best practices                | UI/UX implementation patterns                                       |

## How Skills Work

1. Claude Code reads the `SKILL.md` when the skill triggers
2. The skill provides step-by-step instructions for the task
3. Optional `scripts/`, `references/`, and `assets/` folders provide supporting resources

## Adding New Skills

```bash
# Install from the community
npx skills add <source> --skill <name>

# Or create manually
mkdir skills/my-skill
# Create skills/my-skill/SKILL.md with instructions
```

See `docs/guides/SKILL_CREATOR.md` for the full creation pipeline and `docs/guides/SKILLS_ULTIMATE_GUIDE.md` for ecosystem patterns.
