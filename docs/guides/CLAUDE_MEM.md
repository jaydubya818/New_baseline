# Claude-Mem: Persistent Memory System

> Automatic context capture, compression, and retrieval across Claude Code sessions — no manual intervention needed.

Source: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

## What It Does

Claude-Mem automatically captures everything Claude does during coding sessions, compresses it with AI, and injects relevant context back into future sessions. It solves the "context amnesia" problem where each new session starts from scratch.

## Architecture

### 3-Layer Search (Progressive Disclosure)

| Stage | Tool | What It Returns | Token Cost |
| ----- | ---- | --------------- | ---------- |
| **1. Index Search** | `search` | Compact results with IDs | ~50-100 tokens |
| **2. Context Timeline** | `timeline` | Chronological context around observations | ~200-500 tokens |
| **3. Full Details** | `get_observations` | Complete data for filtered IDs | ~500-1000 tokens |

This achieves ~10x token savings by filtering before fetching details.

### Components

1. **Lifecycle Hooks** — SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
2. **Worker Service** — HTTP API on port 37777 with web viewer UI and 10 search endpoints
3. **SQLite + Chroma** — SQLite for sessions/observations/summaries, Chroma vector DB for semantic + keyword search (FTS5)
4. **Privacy Control** — Use `<private>` tags to exclude sensitive content from capture

## Setup

```bash
# Install as Claude Code plugin
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

Requirements: Node.js 18+, Bun (auto-installed), uv Python package manager (auto-installed), SQLite 3 (bundled).

Config lives at `~/.claude-mem/settings.json` — model selection, worker port, data directory, log level, context injection settings.

## How It Compares to Our Memory System

| Feature | Our 4-Layer Memory | Claude-Mem |
| ------- | ------------------ | ---------- |
| **Storage** | Markdown files in `.claude/memory/` | SQLite + Chroma vector DB |
| **Search** | File-based, manual | Semantic + keyword + full-text |
| **Capture** | Manual via `/dream` + hooks | Fully automatic via lifecycle hooks |
| **Token efficiency** | Loads full files | Progressive disclosure (~10x savings) |
| **Cross-session** | Via `progress.txt` bridge | Automatic with vector similarity |
| **Privacy** | Gitignored files | `<private>` tag exclusion |

## Key Patterns Worth Adopting

1. **Progressive disclosure for memory** — Don't load everything; search → filter → fetch details
2. **Automatic capture** — Hook into PostToolUse to passively build knowledge base
3. **Vector search over memory** — Semantic similarity finds relevant context better than keyword matching
4. **Token-aware retrieval** — Show token cost estimates before fetching full context
5. **Citation-backed recall** — Reference specific observation IDs for verifiable context

## References

- [claude-mem repo](https://github.com/thedotmack/claude-mem)
- [claude-mem docs](https://docs.claude-mem.ai)
