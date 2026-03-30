# Tool Decision Matrix

> Master "I need X → use Y" reference. Consolidates all selection matrices from individual guides into one place.

---

## Search & Research

| Need                      | Tool                                                                                     | Type  | Setup                   |
| ------------------------- | ---------------------------------------------------------------------------------------- | ----- | ----------------------- |
| Web search (AI-optimized) | [Tavily](https://github.com/tavily-ai/tavily-mcp)                                        | MCP   | `.mcp.json` + API key   |
| Library documentation     | [Context7](https://github.com/upstash/context7)                                          | MCP   | `.mcp.json` (no key)    |
| Deep site scraping        | [Firecrawl](https://github.com/mendableai/firecrawl)                                     | MCP   | `.mcp.json` + API key   |
| Deep research (8-phase)   | [Deep Research Skill](https://github.com/199-biotechnologies/claude-deep-research-skill) | Skill | `skills/deep-research/` |
| Codebase understanding    | [Codebase Memory](https://github.com/DeusData/codebase-memory-mcp)                       | MCP   | `.mcp.json`             |

## Code Generation & Editing

| Need                      | Tool                                                                 | Type     | Setup                               |
| ------------------------- | -------------------------------------------------------------------- | -------- | ----------------------------------- |
| Full feature development  | Claude Code + GSD/gstack                                             | Built-in | Already configured                  |
| Spec → deterministic code | [Spec Kit](https://github.com/github/spec-kit)                       | CLI      | `npm install -g spec-kit`           |
| Quick targeted edits      | [Aider](https://github.com/paul-gauthier/aider)                      | CLI      | `pip install aider-chat`            |
| Task breakdown from PRD   | [Task Master AI](https://github.com/eyaltoledano/claude-task-master) | CLI/MCP  | `npm install -g claude-task-master` |
| Voice coding              | [Aider](https://github.com/paul-gauthier/aider)                      | CLI      | Built-in voice mode                 |

## Testing & QA

| Need                     | Tool                                                                  | Type     | Setup              |
| ------------------------ | --------------------------------------------------------------------- | -------- | ------------------ |
| Browser QA (screenshots) | gstack `/qa`                                                          | Built-in | `skills/gstack/`   |
| Browser automation       | [Playwright MCP](https://github.com/executeautomation/mcp-playwright) | MCP      | `.mcp.json`        |
| Unit test generation     | gstack `/test-gen`                                                    | Built-in | `skills/gstack/`   |
| E2E test generation      | `skills/e2e-tester/`                                                  | Skill    | Already configured |
| Component testing        | `skills/frontend-testing/`                                            | Skill    | Already configured |

## Review & Security

| Need                  | Tool                                    | Type     | Setup              |
| --------------------- | --------------------------------------- | -------- | ------------------ |
| Code review           | gstack `/review`                        | Built-in | `skills/gstack/`   |
| Multi-model review    | gstack `/review --dual-model`           | Built-in | `skills/gstack/`   |
| Security audit        | gstack `/cso`                           | Built-in | `skills/gstack/`   |
| Agent quality tracing | [lmnr](https://github.com/lmnr-ai/lmnr) | Platform | Docker self-hosted |

## Design & UI

| Need                     | Tool                                                                                     | Type        | Setup                          |
| ------------------------ | ---------------------------------------------------------------------------------------- | ----------- | ------------------------------ |
| Production design system | [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Skill       | Install from Anthropic         |
| Design intelligence      | UI/UX Pro Max                                                                            | Skill guide | `docs/guides/UI_UX_PRO_MAX.md` |
| React patterns           | `skills/react-best-practices/`                                                           | Skill       | Already configured             |
| Figma integration        | [Figma MCP](https://github.com/anthropics/figma-mcp)                                     | MCP         | `.mcp.json` + token            |
| Diagrams from NL         | [Excalidraw MCP](https://github.com/excalidraw/excalidraw-mcp)                           | MCP         | `.mcp.json`                    |

## Workflow & Automation

| Need                       | Tool                                                | Type      | Setup                  |
| -------------------------- | --------------------------------------------------- | --------- | ---------------------- |
| Visual workflow automation | [n8n](https://github.com/n8n-io/n8n)                | Platform  | Docker                 |
| Visual agent pipelines     | [Langflow](https://github.com/langflow-ai/langflow) | Platform  | `pip install langflow` |
| Self-hosted monitoring     | [Huginn](https://github.com/huginn/huginn)          | Platform  | Docker                 |
| Deterministic LLM programs | [DSPy](https://github.com/stanfordnlp/dspy)         | Framework | `pip install dspy`     |
| Crash-proof workflows      | [Temporal](https://github.com/temporalio/temporal)  | Platform  | Docker Compose         |
| Recurring AI tasks         | Scheduled Tasks MCP                                 | MCP       | Already configured     |

## Infrastructure & LLM Routing

| Need                       | Tool                                                     | Type      | Setup                 |
| -------------------------- | -------------------------------------------------------- | --------- | --------------------- |
| Multi-provider LLM routing | [Portkey Gateway](https://github.com/Portkey-AI/gateway) | Gateway   | Docker                |
| Lightweight LLM proxy      | [OmniRoute](https://github.com/diegosouzapw/OmniRoute)   | Gateway   | `npm install`         |
| Python AI services         | [FastAPI](https://github.com/tiangolo/fastapi)           | Framework | `pip install fastapi` |
| Custom MCP server          | [fastmcp](https://github.com/jlowin/fastmcp)             | Framework | `pip install fastmcp` |

## Document Processing

| Need                       | Tool                                                           | Type  | Setup                   |
| -------------------------- | -------------------------------------------------------------- | ----- | ----------------------- |
| PDF/image/audio → Markdown | [markdownify-mcp](https://github.com/zcaceres/markdownify-mcp) | MCP   | `.mcp.json`             |
| Web → clean Markdown       | [Firecrawl](https://github.com/mendableai/firecrawl)           | MCP   | `.mcp.json` + key       |
| Web → Markdown (Obsidian)  | Obsidian `defuddle` skill                                      | Skill | Install obsidian-skills |

## Knowledge & Memory

| Need                          | Tool                                                               | Type        | Setup                        |
| ----------------------------- | ------------------------------------------------------------------ | ----------- | ---------------------------- |
| Session memory                | `.claude/memory/`                                                  | Built-in    | Already configured           |
| Persistent codebase graph     | [Codebase Memory](https://github.com/DeusData/codebase-memory-mcp) | MCP         | `.mcp.json`                  |
| Vector memory across sessions | [claude-mem](https://github.com/thedotmack/claude-mem)             | CLI         | See CLAUDE_MEM.md            |
| Long-term knowledge base      | Obsidian + obsidian-skills                                         | Skill + App | See SECOND_BRAIN_OBSIDIAN.md |
| Graph RAG from documents      | [LightRAG](https://github.com/hkuds/lightrag)                      | Framework   | See ECOSYSTEM_TOOLS.md       |
| Context optimization          | `skills/context-optimization/` + context-mode MCP                  | Skill + MCP | Already configured           |

## MCP Server Management

| Need                      | Tool                                           | Type      | Setup                           |
| ------------------------- | ---------------------------------------------- | --------- | ------------------------------- |
| Manage 10+ MCP servers    | [MCPHub](https://github.com/samanhappy/mcphub) | Dashboard | Docker                          |
| Profile-based MCP configs | `mcp-configs/`                                 | Local     | See per-profile configs         |
| Interactive MCP setup     | `/setup-mcp` command                           | Command   | `.claude/commands/setup-mcp.md` |

## Learning & Discovery

| Need                       | Resource              | URL                                                                                                                    |
| -------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Official docs              | Anthropic Docs        | [docs.anthropic.com](https://docs.anthropic.com)                                                                       |
| Hands-on prompting course  | Prompt Eng Tutorial   | [github.com/anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) |
| Prompt technique reference | PromptingGuide        | [promptingguide.ai](https://www.promptingguide.ai)                                                                     |
| Discover skills            | Awesome Claude Skills | [github.com/travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)                         |
| Skill marketplace          | SkillsMP              | [skillsmp.com](https://skillsmp.com)                                                                                   |
| Agent tools catalog        | Awesome Agents        | [github.com/kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents)                                       |
| Daily AI repo feed         | MAGI//ARCHIVE         | [tom-doerr.github.io/repo_posts/](https://tom-doerr.github.io/repo_posts/)                                             |

---

## By Project Profile

What to enable based on your `.gstackrc` profile:

### `product-ui` (user-facing Next.js apps)

**Essential:** Context7, Playwright, Figma, Frontend Design skill, shadcn MCP
**Useful:** Tavily (research), markdownify (spec processing), n8n (deploy notifications)
**Skip:** Codebase Memory (overkill for small apps), DSPy, Temporal

### `platform` (APIs, services, microservices)

**Essential:** Context7, Postgres MCP, Codebase Memory, lmnr (tracing)
**Useful:** Tavily, Portkey/OmniRoute (multi-LLM), FastAPI, Temporal (durable workflows)
**Skip:** Figma, Excalidraw, Frontend Design skill

### `agent-platform` (AI agent systems)

**Essential:** Context7, Tavily, Codebase Memory, fastmcp, Portkey, lmnr
**Useful:** Langflow (prototyping), DSPy (deterministic), Temporal (durable agents)
**Skip:** Figma, Apple Notes, shadcn MCP

### `monorepo-root` (multi-app monorepos)

**Essential:** Context7, Codebase Memory, GitHub MCP, Docker MCP
**Useful:** MCPHub (manage many servers), n8n (cross-app automation)
**Skip:** Most app-specific MCPs — enable per-package instead

### `baseline` (this repo, getting started)

**Essential:** Context7, Playwright
**Useful:** Everything else as needed
**Skip:** Nothing permanently — explore and add as your project evolves
