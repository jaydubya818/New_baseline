# Second Brain with Obsidian + AI Agents

Your AI agent gets smarter the more context it has. A second brain in Obsidian gives every AI session — Claude Code, Cowork, Codex, Cursor — persistent access to your business context, decisions, preferences, and project history. Context compounds over time: the agent you have after 6 months is far more powerful than the one on day one.

## Why This Matters

Five advantages of a second brain:

1. **Persistent context** — No more re-explaining your situation, projects, and workflows in every chat. The agent reads your vault.
2. **Bidirectional updates** — Decisions, rules, and corrections made in any AI chat get logged back into the vault. Say "remember this in my second brain" and it's saved.
3. **Skill acceleration** — Skills point to reference files in your vault instead of embedding them. Update your ICP doc once → every skill that references it is instantly updated.
4. **Cross-agent portability** — Your vault is just a folder of markdown files. Point any agent (Claude Code, Cowork, Codex, Antigravity) at the same folder.
5. **Team scaling** — Share the vault across your team. Everyone's AI agent gets the same strategy docs, ICP, tone of voice, SOPs.

## How It Works

```
┌─────────────────┐     reads/writes     ┌──────────────────┐
│  AI Agent        │ ◄──────────────────► │  Obsidian Vault   │
│  (Claude/Codex)  │                      │  (local folder)   │
└────────┬────────┘                      └────────┬─────────┘
         │                                        │
         │ reads first                            │ visualizes
         ▼                                        ▼
┌─────────────────┐                      ┌──────────────────┐
│  CLAUDE.md       │                      │  Obsidian App     │
│  (navigation     │                      │  (graph view,     │
│   instructions)  │                      │   wiki links,     │
└─────────────────┘                      │   search)         │
                                         └──────────────────┘
```

The CLAUDE.md file is the bridge — it tells the agent how the vault is structured and where to find/save data. The agent reads it first, then navigates to the right documents.

## Vault File Structure

### Business Setup

```
vault/
├── CLAUDE.md              # Navigation instructions for AI agents
├── context/               # Who you are, your business, always-on context
│   ├── about-me.md
│   ├── business-overview.md
│   ├── strategy.md
│   ├── icp.md             # Ideal customer profile
│   ├── brand-identity.md
│   ├── team-overview.md
│   └── pain-points.md
├── daily/                 # Daily logs — gives AI session continuity
│   ├── 2026-03-26.md
│   └── ...
├── departments/           # SOPs and processes per department
│   ├── engineering/
│   ├── content/
│   ├── operations/
│   └── community/
├── intelligence/          # Meeting transcripts, decisions, research
│   ├── meetings/
│   ├── decisions/
│   └── market-research/
├── onboarding/            # Team/client onboarding SOPs
├── projects/              # Active projects with context
│   ├── project-alpha/
│   └── project-beta/
├── resources/             # Reusable: prompts, templates, frameworks, examples
├── skills/                # Skill reference files (ICP, voice, etc.)
│   ├── linkedin/
│   └── newsletter/
├── tasks/                 # To-do lists and task tracking
└── teams/                 # Per-member role, responsibilities, context
```

### Personal / Solopreneur Setup

Same structure minus `departments/`, `teams/`, and `onboarding/`:

```
vault/
├── CLAUDE.md
├── context/
├── daily/
├── intelligence/
├── projects/
├── resources/
├── skills/
└── tasks/
```


## Quick Setup

### 1. Install Obsidian

Download free from [obsidian.md](https://obsidian.md). Create a new vault — this creates a folder on your computer.

### 2. Connect the Obsidian MCP

The repo's `.mcp.json.example` already includes the Obsidian MCP:

```json
"obsidian": {
  "command": "npx",
  "args": ["-y", "obsidian-mcp", "/path/to/your/vault"]
}
```

Replace `/path/to/your/vault` with your actual vault path. This gives Claude Code direct read/write access to your vault files.

### 3. Create the CLAUDE.md

This is the navigation layer. Place it at the root of your vault:

```markdown
# Second Brain — AI Navigation

## System
This is my second brain. Read this file first to understand the structure.

## File Structure
- `context/` — Always-on context: who I am, my business, strategy, ICP, brand
- `daily/` — Daily logs with session summaries and decisions
- `intelligence/` — Meeting transcripts, decisions, market research
- `projects/` — Active project context and status
- `resources/` — Reusable prompts, templates, frameworks
- `skills/` — Reference files that skills point to
- `tasks/` — Current to-do lists

## Knowledge Routing
- Questions about me/business → `context/`
- Questions about past meetings/decisions → `intelligence/`
- Questions about what to work on → `tasks/` + `daily/`
- Questions about a specific project → `projects/{project-name}/`
- Writing content → `skills/` for reference files + `context/` for ICP/voice

## Rules
- When I say "remember this" → save to the appropriate file
- Log daily session summaries to `daily/YYYY-MM-DD.md`
- When referencing a document, use [[wiki links]] so Obsidian can track connections
- If you need more context on a topic, follow wiki links in documents to related files
```

### 4. Point Your AI Agent to the Vault

**Claude Code / Cowork:** Select the vault folder when starting a session, or mount it as the working directory.

**Any agent:** Just point it at the folder. The CLAUDE.md (or equivalent) tells it how to navigate.

### 5. Populate Initial Context

Spend 30-60 minutes on the essentials:

1. `context/about-me.md` — Who you are, what you do
2. `context/business-overview.md` — What your business does, key metrics
3. `context/icp.md` — Ideal customer profile, pain points
4. `context/strategy.md` — Current priorities and goals
5. `tasks/current.md` — What you're working on right now

Everything else grows naturally as you use AI. The agent will create and update files as you work.

## Key Patterns

### Bidirectional Updates

When the agent learns something new in a conversation:

> "Never use em dashes when writing content for me"

Tell it: "Remember this in my second brain" → it saves to `context/writing-preferences.md`. Now every skill that references writing preferences picks up the rule automatically.

### Skills Point to Vault (Not Embedded)

Old way: each skill has its own copy of ICP, voice, examples inside the skill folder.

New way: the skill's `SKILL.md` says "read ICP from `context/icp.md`" and "read voice guide from `context/brand-identity.md`". Update once, all skills get the update.

```markdown
# LinkedIn Post Skill

## Process
1. Read `context/icp.md` for audience understanding
2. Read `context/brand-identity.md` for tone of voice
3. Read `skills/linkedin/hook-templates.md` for hook patterns
4. Write post following the structure below...
```

### Daily Logs for Session Continuity

At the end of each AI session, the agent logs a summary to `daily/YYYY-MM-DD.md`:
- What was worked on
- Decisions made
- Open questions
- Next steps

This gives the next session full continuity without re-explaining anything.

### Wiki Links for Knowledge Graph

Use `[[double brackets]]` in your markdown files to create connections:

```markdown
Our brand voice targets the [[ICP]] with emphasis on [[pain-points]].
```

Obsidian visualizes these as a graph. Your AI agent can follow them to find related context.

## Team Setup

For teams, sync the vault using Obsidian Sync, Git, or a shared drive. Everyone's AI agent reads from the same context:

- Shared: `context/`, `resources/`, `skills/`, `departments/`
- Personal: each team member can have their own `daily/` and `tasks/`

One person updates the strategy doc → every team member's agent has the new strategy immediately.

## MCP + Vault Integration

The repo includes two Obsidian-related MCPs in `.mcp.json.example`:

| MCP | What It Does |
|-----|-------------|
| `obsidian-mcp` | Direct file read/write to vault — create notes, search, update |
| `context-mode` | Context optimization — compresses vault data for token efficiency |

Together: `obsidian-mcp` gives access, `context-mode` keeps token usage efficient when the vault grows large.

## The Compounding Effect

Context compounds. Every decision logged, every correction saved, every project documented makes the agent better. After 6 months of daily use, you have an AI agent that understands your business deeply — not because the model improved, but because the context did.

Start with 5 files. Let it grow naturally. The setup you have in 6 months will be far more valuable than the one you start with today.
