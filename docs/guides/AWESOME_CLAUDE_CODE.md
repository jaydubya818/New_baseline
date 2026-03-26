# Awesome Claude Code: Ecosystem Resource Guide

> Curated catalog of the best Claude Code skills, agents, plugins, hooks, tools, and workflows from the community (32k+ stars).

Source: [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

## Agent Skills

Notable skills worth evaluating for your project:

| Skill | What It Does |
| ----- | ------------ |
| **Context Engineering Kit** | Advanced context engineering with minimal token footprint |
| **Everything Claude Code** | Comprehensive resources across engineering domains |
| **Superpowers** | Core competencies across SDLC phases (already in this repo) |
| **Trail of Bits Security Skills** | 12+ security-focused skills for code auditing |
| **Fullstack Dev Skills** | 65 specialized skills for full-stack frameworks + Jira/Confluence |
| **Compound Engineering Plugin** | Agent-based discipline focusing on learning from errors |
| **Claude Codex Settings** | Plugins for GitHub, Azure, MongoDB, Tavily, Playwright |
| **read-only-postgres** | PostgreSQL query skill with strict validation |
| **Web Assets Generator** | Favicon, PWA icons, social media meta images |

## Workflow Methodologies

Key patterns the community has converged on:

### RIPER Workflow
Five phases: **Research → Innovate → Plan → Execute → Review** with a persistent memory bank between phases.

### Ralph Wiggum (Autonomous Loop)
Autonomous execution with safety guardrails and circuit breakers. The pattern loops `plan → execute → verify → fix` until the task is complete. Multiple implementations exist:
- **ralph-orchestrator** — Robust orchestration with comprehensive testing
- **Ralph for Claude Code** — Framework with safety guardrails
- **ralph-wiggum-bdd** — BDD-flavored standalone script

### Spec-Driven Development
Transform large problems into incremental missions via specs. The AB Method is the community's most popular variant. (See also our `SPEC_DRIVEN_DEVELOPMENT.md`.)

### Context Priming
Systematic approach through specialized commands that load relevant context before each task phase. Similar to our `/session-start` pattern.

## Tooling Highlights

### Orchestrators (Multi-Agent)

| Tool | Pattern |
| ---- | ------- |
| **Claude Squad** | Terminal app managing multiple agents in separate workspaces |
| **Claude Swarm** | Connect session to swarm of Claude Code agents |
| **Auto-Claude** | Autonomous multi-agent with kanban UI |
| **Claude Code Flow** | Code-first orchestration for recursive agent cycles |
| **Claude Task Master** | Task management for AI-driven development |
| **Happy Coder** | Spawn multiple Claude Codes in parallel + push notifications |
| **Ruflo** | Multi-agent swarm with self-learning and vector memory |
| **sudocode** | Lightweight orchestration integrated with spec frameworks |

### Session & Usage Tools

| Tool | Purpose |
| ---- | ------- |
| **cchistory** | Shell history equivalent for Claude Code sessions |
| **cclogviewer** | HTML viewer for conversation .jsonl files |
| **recall** | Full-text search across Claude Code sessions |
| **claude-code-tools** | Session continuity + full-text search + tmux integration |
| **Claude Session Restore** | Context recovery from previous sessions with time filtering |
| **Vibe-Log** | Session analysis with HTML reports and statusline integration |

### Usage Monitors

| Tool | Purpose |
| ---- | ------- |
| **CC Usage** | CLI for managing and analyzing local logs with dashboard |
| **ccflare / better-ccflare** | Web-UI usage dashboard with metrics |
| **Claude Code Usage Monitor** | Real-time terminal tool with burn rate predictions |
| **Claudex** | Web browser for conversation history + analytics |

### Config & IDE

| Tool | Purpose |
| ---- | ------- |
| **ClaudeCTX** | Switch entire Claude Code config with single command |
| **claude-rules-doctor** | Detect dead rules files by checking glob matches |
| **Rulesync** | Convert configs between AI agents bidirectionally |
| **claude-code.nvim** | Neovim integration |
| **claude-code.el** | Emacs integration with ediff + LSP diagnostics |
| **Claudix** | VS Code extension with chat, file ops, terminal execution |

## Status Lines

| Statusline | Highlights |
| ---------- | ---------- |
| **CCometixLine** | Rust-based, Git integration, usage tracking |
| **claude-powerline** | Vim-style powerline with real-time tracking |
| **claudia-statusline** | High-perf Rust with SQLite persistence + themes |
| **claude-code-statusline** | 4-line with themes and cost tracking |

## Hooks

| Hook | Purpose |
| ---- | ------- |
| **CC Notify** | Desktop notifications with one-click VS Code jumps |
| **cchooks** | Python SDK with clean API for hook integration |
| **Claude Code Hook Comms (HCOM)** | Real-time multi-agent communication with dashboard |
| **Britfix** | Converts American → British English with context awareness |

## CLAUDE.md Patterns

The community has converged on CLAUDE.md as the primary project instruction file. Common patterns:
- **Language-specific**: JS/TS, Python, Go, Rust each have community templates
- **Domain-specific**: Full-stack web, mobile, DevOps/infra, data science
- **Project scaffolding**: Starter templates with pre-wired MCP configs

## Quality Patterns from the Community

1. **Deterministic detection + LLM judgment** — Use regex/AST for detection, LLM for nuanced decisions
2. **Context isolation** — Each agent/task gets minimal necessary context
3. **Safety guardrails** — Circuit breakers, max iteration limits, rollback checkpoints
4. **Progressive skill stacking** — Skills build on each other, loaded incrementally
5. **Master-clone architecture** — One lead agent coordinates specialized clones
6. **Parallel tool calling** — Multiple independent operations run simultaneously

## What We Already Have

This repo already includes many patterns from the awesome-claude-code ecosystem:
- Superpowers (parallel agents, TDD, worktrees)
- Spec-driven development workflow
- Multi-agent orchestration patterns
- 33 specialized agents with pipeline ordering
- 100+ slash commands covering full SDLC
- 13 hooks for lifecycle automation
- 4-layer memory system with auto-dream

## Worth Exploring Next

Based on gaps in our current setup:
1. **Trail of Bits Security Skills** — More rigorous security auditing than our current security-reviewer
2. **Claude Squad / Claude Swarm** — For true multi-instance coordination beyond Agent Teams
3. **cchistory / recall** — Session search and history across projects
4. **Claude Code Usage Monitor** — Token burn rate tracking
5. **Context Engineering Kit** — Minimize token footprint for long sessions

## References

- [awesome-claude-code repo](https://github.com/hesreallyhim/awesome-claude-code)
- [Claude Code Repos Index](https://github.com/nicobailey/claude-code-repos-index) — 75+ indexed repos
