# File System Patterns for Agents

Every agent should use a file system. The file system is an elegant way to represent state that agents can read into context, enabling verification and multi-pass problem solving.

---

## Why File Systems Matter

The key insight: **you don't need to remember everything, you just need to know how to find it.** Context windows won't get long enough to fit everything — but agents can search, read, and write files just like humans.

File systems give agents:
- **Multiple passes** at a problem (write, read back, refine)
- **Persistent state** across turns and sessions
- **Searchable context** via grep across files
- **Verification** — write output to file, lint/test it, fix errors
- **Coordination** — multiple subagents write findings, orchestrator reads and synthesizes

---

## Patterns

### Email/Message Processing
Instead of dumping emails into context, write them to files and let the agent grep across them. Fundamentally works because it gives the agent multiple passes at the problem.

### Memory
Store previous conversations as markdown or JSON files. Agent searches them to find context and link to exact prior decisions.

### React Artifacts & Code Generation
Write code to a file, run a linting script, fix errors. This iteration loop is much easier than generating correct code from scratch.

### Deep Research
Spin off multiple subagents that write findings to the file system as markdown. Orchestrator reads and searches across those files to summarize and ground itself in references.

### Planning & Scratch Pads
Store plans and notes on solving a problem. Especially for hard problems with multiple subagents — prevents redoing work.

### Game Mastering (D&D Example)
Instead of remembering everything, write files describing locations, characters, monsters, secrets. Organize well. The AI reads only the context it needs based on what's happening.

---

## Implementation in This Repo

This repo implements file system patterns throughout:

- **`.claude/memory/`** — Persistent memory files agents can search and update
- **`docs/architecture/`** — ADRs and decision records grounded in files
- **`/dream` command** — Consolidates session learnings into file-based memory
- **Agent worktrees** — Isolated file system copies for safe parallel work
- **Skill folders** — Progressive disclosure via file system structure (not just a single markdown file)

---

## Principles

1. **Write first, read later** — Don't try to hold everything in context. Write to files, search when needed.
2. **Structure matters** — Well-organized files let agents navigate efficiently
3. **Files enable iteration** — Write → verify → fix loops are natural with a file system
4. **Multiple agents, shared filesystem** — Coordination through files, not through context
5. **Sandbox for safety** — Use Claude Code SDK sandboxing and permission settings to control file access
