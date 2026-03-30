# MCP Configs — Per-Profile Server Configurations

> Pre-built MCP server configs for each gstack profile. Copy the one that matches your project type.

---

## Quick Setup

```bash
# 1. Check your profile
cat .gstackrc | grep profile=

# 2. Copy the matching config
cp mcp-configs/product-ui.json .mcp.json     # for user-facing apps
# OR
cp mcp-configs/platform.json .mcp.json       # for APIs/services
# OR
cp mcp-configs/agent-platform.json .mcp.json # for AI agent systems
# OR
cp mcp-configs/monorepo-root.json .mcp.json  # for monorepos

# 3. Replace YOUR_* placeholders with real credentials
# 4. Or use the interactive command:
#    /setup-mcp
```

---

## Available Profiles

### `product-ui.json` — User-Facing Next.js Apps

**9 servers** — Optimized for frontend development with design tools.

| Server      | Needs API Key              | Purpose            |
| ----------- | -------------------------- | ------------------ |
| Context7    | No                         | Library docs       |
| shadcn/ui   | No                         | Component browser  |
| Playwright  | No                         | Browser QA         |
| Figma       | Yes (`FIGMA_ACCESS_TOKEN`) | Design integration |
| Vercel      | No                         | Deployment & logs  |
| Tavily      | Yes (`TAVILY_API_KEY`)     | Research           |
| markdownify | No                         | Doc conversion     |
| Excalidraw  | No                         | Diagrams           |
| Stripe      | Yes (`STRIPE_SECRET_KEY`)  | Payments           |

### `platform.json` — APIs, Services, Microservices

**7 servers** — Optimized for backend development with database and infra tools.

| Server          | Needs API Key               | Purpose              |
| --------------- | --------------------------- | -------------------- |
| Context7        | No                          | Library docs         |
| Postgres        | No (uses connection string) | Direct DB access     |
| GitHub          | Yes (`GITHUB_PAT`)          | Repo management      |
| Docker          | No (needs Docker Desktop)   | Container management |
| Tavily          | Yes (`TAVILY_API_KEY`)      | Research             |
| Codebase Memory | No                          | Code knowledge graph |
| Vercel          | No                          | Deployment & logs    |

### `agent-platform.json` — AI Agent Systems

**8 servers** — Optimized for building and managing AI agents.

| Server          | Needs API Key             | Purpose                |
| --------------- | ------------------------- | ---------------------- |
| Context7        | No                        | Library docs           |
| Tavily          | Yes (`TAVILY_API_KEY`)    | Agent web search       |
| Codebase Memory | No                        | Code knowledge graph   |
| GitHub          | Yes (`GITHUB_PAT`)        | Repo management        |
| Docker          | No (needs Docker Desktop) | Container management   |
| Playwright      | No                        | Browser automation     |
| markdownify     | No                        | Doc conversion         |
| MCPHub          | No (self-hosted)          | Multi-server dashboard |

### `monorepo-root.json` — Multi-App Monorepos

**7 servers** — Optimized for managing multiple packages/apps.

| Server          | Needs API Key             | Purpose                |
| --------------- | ------------------------- | ---------------------- |
| Context7        | No                        | Library docs           |
| GitHub          | Yes (`GITHUB_PAT`)        | Repo management        |
| Docker          | No (needs Docker Desktop) | Container management   |
| Codebase Memory | No                        | Code knowledge graph   |
| Playwright      | No                        | Browser automation     |
| Vercel          | No                        | Deployment & logs      |
| MCPHub          | No (self-hosted)          | Multi-server dashboard |

---

## Full Server Reference

For the complete list of all 25 available MCP servers, see `.mcp.json.example` in the project root.

For detailed setup and usage guides for each server, see [docs/guides/MCP_TOOLS_REFERENCE.md](../docs/guides/MCP_TOOLS_REFERENCE.md).

---

## Adding Servers to a Profile

1. Find the server config in `.mcp.json.example`
2. Copy the entry into your `.mcp.json`
3. Replace any `YOUR_*` placeholders
4. Restart Claude Code to pick up the new server

Or use `/setup-mcp` for interactive selection.

---

## Where to Get API Keys

| Key                            | Get it at                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `TAVILY_API_KEY`               | [tavily.com](https://tavily.com) (free tier available)                                        |
| `FIGMA_ACCESS_TOKEN`           | [Figma Settings → Personal Access Tokens](https://www.figma.com/developers/api#access-tokens) |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | [GitHub Settings → Developer Settings → Tokens](https://github.com/settings/tokens)           |
| `STRIPE_SECRET_KEY`            | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)                           |
| `FIRECRAWL_API_KEY`            | [firecrawl.dev](https://firecrawl.dev)                                                        |
| `NOTION_TOKEN`                 | [Notion Integrations](https://www.notion.so/my-integrations)                                  |
| `RESEND_API_KEY`               | [resend.com](https://resend.com)                                                              |
