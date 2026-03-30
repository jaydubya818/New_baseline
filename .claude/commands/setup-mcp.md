# /setup-mcp — Interactive MCP Server Setup

Generate a project-specific `.mcp.json` from `.mcp.json.example` based on your gstack profile.

## Instructions

You are setting up MCP servers for a New Baseline project. Follow this sequence:

### Step 1: Detect Profile

Read `.gstackrc` to determine the current profile. If no profile is set, ask the user.

### Step 2: Recommend Servers

Based on the profile, recommend MCP servers using this mapping:

**product-ui:**

- Essential: context7, shadcn, playwright, figma, vercel
- Recommended: tavily, markdownify, excalidraw
- Optional: notion, stripe, google-maps

**platform:**

- Essential: context7, postgres, github, docker
- Recommended: tavily, codebase-memory, vercel
- Optional: notion, obsidian

**agent-platform:**

- Essential: context7, tavily, codebase-memory, github, docker
- Recommended: playwright, markdownify, mcphub
- Optional: notion, obsidian

**monorepo-root:**

- Essential: context7, github, docker, codebase-memory
- Recommended: playwright, vercel, mcphub
- Optional: tavily, notion

**baseline (default):**

- Essential: context7, playwright
- Recommended: github, postgres, docker
- Optional: everything else

### Step 3: Interactive Selection

Use AskUserQuestion to let the user confirm or modify the recommendations:

1. Show the recommended servers for their profile
2. Ask if they want to add or remove any
3. Ask which servers they already have API keys for

### Step 4: Generate Config

1. Read `.mcp.json.example` as the source template
2. Filter to only the selected servers
3. Write the result to `.mcp.json`
4. List which `YOUR_*` placeholders still need real values
5. Remind the user to add API keys to `.env.local`

### Step 5: Validate

Run a quick check:

- Verify `.mcp.json` is valid JSON
- Verify no `YOUR_*` placeholders remain for keyless servers (context7, shadcn, excalidraw, etc.)
- List servers that need API keys with instructions on where to get them

### Output

```
✅ MCP config generated: .mcp.json
   Servers enabled: [list]
   Servers needing API keys: [list with URLs]

   Next: Add your API keys to .env.local or directly in .mcp.json
```
