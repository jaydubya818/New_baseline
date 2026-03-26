# MCP Configs

> Model Context Protocol server configurations for common integrations.
> Copy the relevant config into your project's `.claude/mcp.json` or `~/.claude/mcp.json`.

---

## Available Configs

Copy and paste the relevant sections into your MCP config file.

### Desktop Commander (filesystem + terminal)
Provides: file read/write, terminal execution, process management on your Mac.
Install via: Claude Desktop app plugins or `claude mcp add desktop-commander`

### Obsidian
Provides: read/write access to your Obsidian vault.
Install via: Claude Desktop app + obsidian-mcp plugin

### Figma
Provides: read design files, get component specs, inspect variables.
Install via: Claude Desktop app + Figma MCP plugin

### GitHub (via gh CLI)
Already available — use `gh` commands directly via Desktop Commander bash.

---

## Adding a New MCP

1. Find the MCP on the Claude plugin registry or npm
2. Install it: `claude mcp add <name>`
3. Document it here with: what it provides, how to install, any required env vars
4. Add any required env vars to your project's `.env.local`

---

## Useful MCPs for Jay's Stack

| MCP | What it gives you | How to get it |
|-----|--------------------|---------------|
| Desktop Commander | Full Mac filesystem + terminal | Pre-installed |
| Obsidian | Vault read/write | Pre-installed |
| Figma | Design file access | Pre-installed |
| GitHub | Enhanced GitHub ops | `gh` CLI (already available) |
| Context7 | Library docs (React, Next.js, etc.) | Claude plugin |
| Playwright | Browser automation (alternative to gstack) | npm |
