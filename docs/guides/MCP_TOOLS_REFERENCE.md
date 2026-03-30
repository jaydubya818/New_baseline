# MCP Tools Reference

> Complete guide to MCP (Model Context Protocol) servers and tools integrated with New Baseline. Covers installation, configuration, and usage patterns for each MCP tool.

---

## Already Configured (in `.mcp.json.example`)

These are pre-wired in the repo. Copy `.mcp.json.example` to `.mcp.json` and fill in API keys.

| Server                  | Status            | Notes                                   |
| ----------------------- | ----------------- | --------------------------------------- |
| Context7                | ✅ Pre-configured | No API key needed                       |
| Playwright              | ✅ Pre-configured | `@playwright/mcp` — headless by default |
| Firecrawl               | ✅ Pre-configured | Needs `FIRECRAWL_API_KEY`               |
| Excalidraw              | ✅ Pre-configured | Diagram generation                      |
| Docker                  | ✅ Pre-configured | Requires Docker Desktop 4.62+           |
| shadcn/ui               | ✅ Pre-configured | Component browser                       |
| See full list in README |                   | 20 servers total                        |

---

## Tavily MCP — AI-Native Search Engine

**Source:** [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp)

### What It Does

Search engine purpose-built for AI agents. Returns clean, structured, LLM-ready data — not blue links. Four core tools: **search**, **extract**, **crawl**, **map**.

### Setup

```bash
# Already added to .mcp.json.example — just add your API key
# Get key at https://tavily.com (free tier available)
```

`.mcp.json` entry:

```json
{
  "tavily": {
    "command": "npx",
    "args": ["-y", "tavily-mcp"],
    "env": {
      "TAVILY_API_KEY": "YOUR_TAVILY_API_KEY"
    }
  }
}
```

### Tools Provided

| Tool             | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `tavily_search`  | Search the web with AI-optimized results       |
| `tavily_extract` | Extract structured data from a URL             |
| `tavily_crawl`   | Crawl a site and return structured content     |
| `tavily_map`     | Map a site's structure and return sitemap data |

### When to Use

- Research during planning phases (`/autoplan`, `/gsd:research-phase`)
- Fetching current library docs or API references
- Competitive research for PRDs
- Gathering structured data for agent workflows

### Integration with New Baseline

Tavily pairs well with:

- **Context7** — Context7 handles library-specific docs, Tavily handles general web search
- **Firecrawl** — Firecrawl for deep site scraping, Tavily for quick structured searches
- **GSD research agents** — `gsd-advisor-researcher` and `gsd-phase-researcher` can use Tavily for real-time data

---

## Context7 — Library Documentation for LLMs

**Source:** [upstash/context7](https://github.com/upstash/context7)

### What It Does

Injects up-to-date library documentation into your LLM context. Eliminates hallucinated APIs and deprecated methods. Add "use context7" to your prompt and it pulls current docs for thousands of libraries.

### Setup

Already configured in `.mcp.json.example`:

```json
{
  "context7": {
    "command": "npx",
    "args": ["@upstash/context7-mcp"]
  }
}
```

No API key required.

### Usage

In any Claude Code prompt:

```
use context7: How do I set up middleware in Next.js 15?
```

Context7 resolves the library version and injects the relevant documentation section into context before Claude responds.

### Supported Libraries

Thousands of libraries including: Next.js, React, Prisma, Tailwind CSS, Zod, NextAuth, Playwright, Vitest, and most npm packages.

---

## Codebase Memory MCP — Persistent Knowledge Graph

**Source:** [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)

### What It Does

Converts your codebase into a persistent knowledge graph. Claude remembers your entire project structure, architectural decisions, and code relationships across sessions.

### Setup

```bash
# Install globally
npm install -g codebase-memory-mcp
```

`.mcp.json` entry:

```json
{
  "codebase-memory": {
    "command": "npx",
    "args": ["-y", "codebase-memory-mcp"]
  }
}
```

### How It Works

1. **Indexing** — Scans your codebase and builds a graph of files, functions, classes, imports, and dependencies
2. **Persistence** — Stores the graph locally so it survives session restarts
3. **Query** — Claude can query the graph to understand relationships without re-reading files
4. **Updates** — Incrementally updates as files change

### When to Use

- Large codebases where context window limits are a problem
- Projects with complex dependency graphs
- When Claude needs to understand cross-file relationships quickly
- Complements our `.claude/memory/` system — Codebase Memory handles code structure, our memory system handles decisions and learnings

---

## MCP Playwright — Browser Automation for LLMs

**Source:** [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)

### What It Does

Control a real browser through natural language via MCP. Testing, scraping, and interaction — all through Claude.

### Note on Existing Config

New Baseline already includes `@playwright/mcp` (the official Playwright MCP). This is a community alternative with different capabilities:

| Feature                  | `@playwright/mcp` (official) | `mcp-playwright` (executeautomation) |
| ------------------------ | ---------------------------- | ------------------------------------ |
| Headless mode            | ✅                           | ✅                                   |
| Natural language control | Basic                        | Extended                             |
| Form interaction         | ✅                           | ✅ + enhanced selectors              |
| Screenshot               | ✅                           | ✅                                   |
| Multi-tab                | Limited                      | ✅                                   |

### Setup

```json
{
  "mcp-playwright": {
    "command": "npx",
    "args": ["-y", "@anthropic-ai/mcp-playwright"]
  }
}
```

---

## fastmcp — Build MCP Servers in Python

**Source:** [jlowin/fastmcp](https://github.com/jlowin/fastmcp)

### What It Does

The fastest way to build custom MCP tool integrations. Minimal Python — define a function, expose it as an MCP tool.

### Setup

```bash
pip install fastmcp
```

### Quick Example

```python
from fastmcp import FastMCP

mcp = FastMCP("My Custom Tools")

@mcp.tool()
def search_internal_docs(query: str) -> str:
    """Search internal documentation."""
    # Your search logic here
    return results

mcp.run()
```

### When to Use

- Building custom tool integrations for your specific project
- Wrapping internal APIs as MCP tools for Claude
- Prototyping new MCP servers before production deployment
- Creating project-specific tools (e.g., search your Notion, query your DB)

### Integration with New Baseline

Use fastmcp to extend our MCP ecosystem:

1. Wrap your project's custom APIs as tools
2. Create project-specific search tools
3. Build deployment automation tools
4. Add custom CI/CD integration tools

---

## markdownify-mcp — Document Conversion

**Source:** [zcaceres/markdownify-mcp](https://github.com/zcaceres/markdownify-mcp)

### What It Does

Convert PDFs, images, and audio into Markdown. Feed any document type into your AI workflow.

### Setup

```json
{
  "markdownify": {
    "command": "npx",
    "args": ["-y", "markdownify-mcp"]
  }
}
```

### Supported Formats

- **PDF** → Markdown (text extraction + structure preservation)
- **Images** → Markdown (OCR + description)
- **Audio** → Markdown (transcription)
- **HTML** → Clean Markdown

### When to Use

- Converting design specs or PDFs into markdown for the canonical docs system
- Processing client-provided documents into AI-friendly format
- Extracting text from screenshots or images during QA
- Feeding audio meeting notes into project documentation

---

## MCPHub — Multi-Server Dashboard

**Source:** [samanhappy/mcphub](https://github.com/samanhappy/mcphub)

### What It Does

Manage multiple MCP servers through a single HTTP dashboard. One interface for all your tool connections.

### Setup

```bash
# Clone and run
git clone https://github.com/samanhappy/mcphub.git
cd mcphub
npm install && npm start
# Dashboard at http://localhost:3000
```

`.mcp.json` entry (to connect Claude Code to MCPHub):

```json
{
  "mcphub": {
    "type": "http",
    "url": "http://localhost:3000/mcp"
  }
}
```

### When to Use

- Managing 10+ MCP servers and need a central dashboard
- Team environments where MCP server configs are shared
- Monitoring MCP server health and request logs
- Routing requests across multiple MCP instances

---

## Tool Selection Matrix

| Need                   | Recommended MCP | Why                                      |
| ---------------------- | --------------- | ---------------------------------------- |
| Web search for agents  | Tavily          | Structured, LLM-optimized results        |
| Library documentation  | Context7        | Auto-resolves versions, no hallucination |
| Deep site scraping     | Firecrawl       | Full crawl + structured extraction       |
| Browser automation     | Playwright MCP  | Official, headless, screenshot capable   |
| Codebase understanding | Codebase Memory | Persistent knowledge graph               |
| Document conversion    | markdownify     | PDF/image/audio → Markdown               |
| Custom tool building   | fastmcp         | Minimal Python, fast prototyping         |
| Server management      | MCPHub          | Dashboard for 10+ servers                |
| Diagrams               | Excalidraw      | Natural language → architecture diagrams |
| Database               | Postgres MCP    | Direct SQL + schema inspection           |

---

## References

- [MCP Specification](https://modelcontextprotocol.io) — Official protocol spec
- [Anthropic MCP Docs](https://docs.anthropic.com/en/docs/agents-and-tools/mcp) — Claude + MCP integration guide
- [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp)
- [upstash/context7](https://github.com/upstash/context7)
- [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)
- [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)
- [jlowin/fastmcp](https://github.com/jlowin/fastmcp)
- [zcaceres/markdownify-mcp](https://github.com/zcaceres/markdownify-mcp)
- [samanhappy/mcphub](https://github.com/samanhappy/mcphub)
