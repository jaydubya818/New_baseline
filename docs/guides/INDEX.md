# Guide Index

> Categorized directory of all guides in `docs/guides/`. Start here to find what you need.

---

## Fundamentals — How Claude Code Works

These explain the core patterns and mental models behind Claude Code development.

| Guide                                                                    | TL;DR                                                                       |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| [CLAUDE_CODE_BEST_PRACTICES.md](CLAUDE_CODE_BEST_PRACTICES.md)           | Settings, permissions, subagent frontmatter, Command→Agent→Skill pattern    |
| [CLAUDE_CODE_FROM_TOOL_TO_SYSTEM.md](CLAUDE_CODE_FROM_TOOL_TO_SYSTEM.md) | 200-line CLAUDE.md ceiling, persona testing, writer/reviewer, auto-learning |
| [PROMPT_CACHING_GUIDE.md](PROMPT_CACHING_GUIDE.md)                       | Prefix matching, cache-safe compaction, never change tools mid-session      |
| [FILE_SYSTEM_PATTERNS.md](FILE_SYSTEM_PATTERNS.md)                       | File system as agent state, multi-pass problem solving, coordination        |
| [AGENT_TOOL_DESIGN.md](AGENT_TOOL_DESIGN.md)                             | AskUserQuestion evolution, TodoWrite progression, tool design as art        |
| [CLAUDE_AGENT_SDK.md](CLAUDE_AGENT_SDK.md)                               | Build production agents in Python/TS — query API, tools, subagents          |

---

## Skills — Building & Finding Skills

How to build, evaluate, and discover Claude Code skills.

| Guide                                                | TL;DR                                                                        |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| [SKILLS_ULTIMATE_GUIDE.md](SKILLS_ULTIMATE_GUIDE.md) | Building skills: reverse prompting, evals, A/B testing, trigger optimization |
| [SKILLS_LESSONS.md](SKILLS_LESSONS.md)               | 9 categories, gotchas, progressive disclosure, hooks, distribution           |
| [SKILL_CREATOR.md](SKILL_CREATOR.md)                 | Official pipeline: intent → SKILL.md → test → eval → benchmark → iterate     |
| [AGENT_SKILLS.md](AGENT_SKILLS.md)                   | 10 must-have skills, install commands, Context Mode MCP                      |
| [SKILLS_REFERENCE.md](SKILLS_REFERENCE.md)           | Frontend Design, Deep Research, Obsidian Skills, Context Optimization        |
| [PLAYGROUND_GUIDE.md](PLAYGROUND_GUIDE.md)           | Interactive HTML playgrounds for visual iteration                            |

---

## Workflow — How to Ship

Execution frameworks, planning, and development pipelines.

| Guide                                                                  | TL;DR                                                             |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [GSD_VS_SUPERPOWERS.md](GSD_VS_SUPERPOWERS.md)                         | GSD = what/when, Superpowers = how/how-well                       |
| [GSTACK_VS_COMPOUND_ENGINEERING.md](GSTACK_VS_COMPOUND_ENGINEERING.md) | gstack (speed) vs CE (quality) — combined workflow                |
| [SPEC_DRIVEN_DEVELOPMENT.md](SPEC_DRIVEN_DEVELOPMENT.md)               | Interview→spec→execute in separate sessions                       |
| [AI_AGENT_BUILD_PIPELINE.md](AI_AGENT_BUILD_PIPELINE.md)               | Actor-first PRD → frontend prototype → API spec → backend         |
| [SCHEDULED_TASKS.md](SCHEDULED_TASKS.md)                               | Recurring AI automation — cron syntax, integration patterns       |
| [OH_MY_CLAUDECODE.md](OH_MY_CLAUDECODE.md)                             | Staged pipelines, magic keywords, model routing, verify/fix loops |

---

## Tools — External Ecosystem

MCP servers, AI dev tools, automation platforms, infrastructure.

| Guide                                                              | TL;DR                                                           |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| [MCP_TOOLS_REFERENCE.md](MCP_TOOLS_REFERENCE.md)                   | Tavily, Context7, Codebase Memory, fastmcp, markdownify, MCPHub |
| [AI_DEV_TOOLS.md](AI_DEV_TOOLS.md)                                 | Spec Kit, Aider, Task Master AI — comparison with GSD/gstack    |
| [WORKFLOW_AUTOMATION.md](WORKFLOW_AUTOMATION.md)                   | n8n, Langflow, Huginn, DSPy, Temporal                           |
| [INFRASTRUCTURE_OBSERVABILITY.md](INFRASTRUCTURE_OBSERVABILITY.md) | FastAPI, Portkey Gateway, OmniRoute, lmnr                       |
| [ECOSYSTEM_TOOLS.md](ECOSYSTEM_TOOLS.md)                           | LightRAG, Obsidian Skills, knowledge pipeline patterns          |
| [AWESOME_CLAUDE_CODE.md](AWESOME_CLAUDE_CODE.md)                   | Ecosystem catalog: skills, orchestrators, session tools, hooks  |
| [TOOL_DECISION_MATRIX.md](TOOL_DECISION_MATRIX.md)                 | Master "I need X → use Y" reference across all tools            |

---

## Knowledge — Memory, Context & Research

How to manage knowledge, memory, and context across sessions.

| Guide                                                | TL;DR                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| [CLAUDE_MEM.md](CLAUDE_MEM.md)                       | Persistent memory: auto capture, vector search, ~10x token savings |
| [SECOND_BRAIN_OBSIDIAN.md](SECOND_BRAIN_OBSIDIAN.md) | Obsidian + AI agents — vault structure, bidirectional updates      |
| [AGENT_TEAMS.md](AGENT_TEAMS.md)                     | Multi-session coordination, shared tasks, teammate messaging       |

---

## Design — UI/UX Patterns

| Guide                                | TL;DR                                                                |
| ------------------------------------ | -------------------------------------------------------------------- |
| [UI_UX_PRO_MAX.md](UI_UX_PRO_MAX.md) | 67 styles, 161 palettes, 57 fonts, industry rules, design system gen |

---

## Learning — Getting Started & Resources

| Guide                                          | TL;DR                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| [LEARNING_RESOURCES.md](LEARNING_RESOURCES.md) | Anthropic docs, tutorials, Awesome lists, SkillsMP, 4-week learning path |

---

## Quick Find

**"I want to..."**

| Goal                               | Read This                                                      |
| ---------------------------------- | -------------------------------------------------------------- |
| Set up a new project               | `CLAUDE_CODE_BEST_PRACTICES.md` → `SPEC_DRIVEN_DEVELOPMENT.md` |
| Build a new skill                  | `SKILL_CREATOR.md` → `SKILLS_ULTIMATE_GUIDE.md`                |
| Choose between GSD and Superpowers | `GSD_VS_SUPERPOWERS.md`                                        |
| Add MCP servers to my project      | `MCP_TOOLS_REFERENCE.md`                                       |
| Find a tool for a specific need    | `TOOL_DECISION_MATRIX.md`                                      |
| Set up persistent memory           | `CLAUDE_MEM.md` → `SECOND_BRAIN_OBSIDIAN.md`                   |
| Improve my prompts                 | `LEARNING_RESOURCES.md` (prompt eng tutorial)                  |
| Automate workflows                 | `WORKFLOW_AUTOMATION.md` → `SCHEDULED_TASKS.md`                |
| Monitor agent quality              | `INFRASTRUCTURE_OBSERVABILITY.md` (lmnr section)               |
| Understand the ecosystem           | `AWESOME_CLAUDE_CODE.md` → `ECOSYSTEM_TOOLS.md`                |
