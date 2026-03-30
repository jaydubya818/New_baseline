# Learning & Community Resources

> Curated list of the best resources for learning AI-assisted development, prompt engineering, and agent building. Organized from essential reading to community discovery.

---

## Essential Reading

### Anthropic Official Docs

**URL:** [docs.anthropic.com](https://docs.anthropic.com)

Covers the API, prompting best practices, tool use, agents, and everything else. Read this cover to cover before building anything serious.

Key sections:

- **Prompt Engineering** — Systematic approach to writing effective prompts
- **Tool Use** — How to define and use tools with Claude
- **Agent Patterns** — Building autonomous agents
- **MCP** — Model Context Protocol integration
- **Claude Code** — CLI tool for agentic coding

### Anthropic Prompt Engineering Tutorial

**URL:** [anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)

9 chapters of hands-on exercises with Jupyter notebooks. The best structured way to learn prompting.

| Chapter | Topic                                    |
| ------- | ---------------------------------------- |
| 1       | Basic Prompt Structure                   |
| 2       | Being Clear and Direct                   |
| 3       | Assigning Roles                          |
| 4       | Using Examples (Few-Shot)                |
| 5       | Formatting Output                        |
| 6       | Thinking Step by Step (Chain of Thought) |
| 7       | Using Tools                              |
| 8       | Long Context Handling                    |
| 9       | Advanced Techniques                      |

```bash
# Clone and run locally
git clone https://github.com/anthropics/prompt-eng-interactive-tutorial.git
cd prompt-eng-interactive-tutorial
pip install jupyter anthropic --break-system-packages
jupyter notebook
```

### PromptingGuide

**URL:** [promptingguide.ai](https://www.promptingguide.ai)

Comprehensive prompt engineering reference covering every technique from basics to advanced agent prompting. Community-maintained, regularly updated.

Key topics:

- Zero-shot, few-shot, chain-of-thought
- Self-consistency, tree-of-thought
- ReAct, Reflexion, multi-agent prompting
- Model-specific techniques
- Adversarial prompting and safety

---

## Skill & Agent Discovery

### Awesome Claude Skills

**URL:** [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 22,000+ stars

The best curated skill list. Start here when looking for new skills to install.

Categories covered:

- Development skills
- Writing & documentation
- Design & UI
- Data & analysis
- DevOps & infrastructure
- Research & learning

### Anthropic Skills Repo

**URL:** [anthropics/skills](https://github.com/anthropics/skills)

Official reference implementations from Anthropic. The gold standard for how skills should be built.

Notable skills:

- `frontend-design` — Production-grade UI (277k+ installs)
- `skill-creator` — Meta-skill for building skills
- Reference patterns for SKILL.md structure

### SkillsMP

**URL:** [skillsmp.com](https://skillsmp.com) — 80,000+ community skills

Marketplace for discovering and installing Claude Code skills. The largest catalog available.

Features:

- Search by category, popularity, or use case
- One-click install via Claude Code
- Community ratings and reviews
- Skill version management

### Awesome Agents

**URL:** [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents)

100+ open-source agent tools in one curated list. Covers:

- Agent frameworks (LangChain, CrewAI, AutoGen, etc.)
- Agent tools and MCPs
- Agent evaluation and monitoring
- Multi-agent orchestration

---

## Staying Current

### MAGI//ARCHIVE

**URL:** [tom-doerr.github.io/repo_posts/](https://tom-doerr.github.io/repo_posts/)

Daily feed of fresh AI repos. Stay on top of what's shipping in the AI tools ecosystem. Useful for discovering new MCP servers, skills, and agent frameworks before they become mainstream.

---

## Recommended Learning Path

For someone new to the New Baseline ecosystem:

### Week 1: Foundations

1. Read [Anthropic Official Docs](https://docs.anthropic.com) — API, tools, agents sections
2. Complete chapters 1-5 of the [Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
3. Read this repo's `CLAUDE.md` and `docs/DOCS_SYSTEM.md`

### Week 2: Skills & Workflow

4. Read [docs/guides/SKILLS_ULTIMATE_GUIDE.md](./SKILLS_ULTIMATE_GUIDE.md)
5. Read [docs/guides/CLAUDE_CODE_BEST_PRACTICES.md](./CLAUDE_CODE_BEST_PRACTICES.md)
6. Complete chapters 6-9 of the Prompt Engineering Tutorial
7. Try the full workflow: interrogation → docs → code → review → QA

### Week 3: Advanced Patterns

8. Read [docs/guides/CLAUDE_CODE_FROM_TOOL_TO_SYSTEM.md](./CLAUDE_CODE_FROM_TOOL_TO_SYSTEM.md)
9. Read [docs/guides/AGENT_TEAMS.md](./AGENT_TEAMS.md)
10. Explore [PromptingGuide](https://www.promptingguide.ai) advanced sections
11. Build a custom skill using [docs/guides/SKILL_CREATOR.md](./SKILL_CREATOR.md)

### Week 4: Ecosystem Expansion

12. Browse [Awesome Claude Skills](https://github.com/travisvn/awesome-claude-skills) and install 2-3 new skills
13. Set up 2-3 additional MCP servers from [docs/guides/MCP_TOOLS_REFERENCE.md](./MCP_TOOLS_REFERENCE.md)
14. Read [docs/guides/WORKFLOW_AUTOMATION.md](./WORKFLOW_AUTOMATION.md) and set up n8n for CI notifications
15. Subscribe to [MAGI//ARCHIVE](https://tom-doerr.github.io/repo_posts/) for ongoing discovery

---

## Quick Reference: All External Links

### Official Anthropic

| Resource                    | URL                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Anthropic Docs              | [docs.anthropic.com](https://docs.anthropic.com)                                                                       |
| Prompt Engineering Tutorial | [github.com/anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) |
| Official Skills             | [github.com/anthropics/skills](https://github.com/anthropics/skills)                                                   |

### Community Curated Lists

| Resource              | URL                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Awesome Claude Skills | [github.com/travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) |
| Awesome Agents        | [github.com/kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents)               |
| PromptingGuide        | [promptingguide.ai](https://www.promptingguide.ai)                                             |

### Marketplaces & Feeds

| Resource      | URL                                                                        |
| ------------- | -------------------------------------------------------------------------- |
| SkillsMP      | [skillsmp.com](https://skillsmp.com)                                       |
| MAGI//ARCHIVE | [tom-doerr.github.io/repo_posts/](https://tom-doerr.github.io/repo_posts/) |
