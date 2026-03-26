# AI Agent Build Pipeline

AI agent workflows replace the old design-to-code handoff. This guide covers the full build pipeline — PRD, prototype, and backend — following principles that apply across Claude Code, Codex, Cursor, and Antigravity tools.

## Why the Old Process Collapsed

The old pipeline (requirements → Figma mockup → frontend handoff → parallel backend) existed to protect against expensive mistakes. As Simon Willison noted, AI significantly reduces the cost of building the wrong thing, making that protection unnecessary overhead.

Key shifts (per Jenny Wen, head of design at Claude, formerly design director at Figma):
- Engineering speed changed first — prototyping time dropped from 60-70% to 30-40%
- Vision timelines dropped from 2-5 years to 3-6 months
- The PRD + architecture file replaces the old Figma handoff entirely

## The Replacement Pipeline

### Stage 1: Requirements (PRD)

Start with **actors, not features**. Who uses the system determines what it needs.

For each actor, define:
1. How they get in (auth, onboarding)
2. What they see on arrival (landing state)
3. What they're trying to do (core actions)
4. What they cannot do (permissions, guardrails)

Use an interview-style PRD prompt that asks structured questions and produces a requirements file. This repo's `/spec-interview` command follows this pattern.

### Stage 2: Architecture Layer

Convert the PRD into pages, modals, and user flows → `architecture.md`.

This file becomes the single source of truth for both the agent and stakeholders. It maps actors to screens, screens to components, and components to data requirements.

### Stage 3: Frontend Prototype

Build a Next.js prototype using a general-purpose frontend skill (e.g., the [Anthropic frontend-design skill](https://claude.com/blog/improving-frontend-design-skill)). Use mock data only — no backend yet.

**Show the client something real and get approval before writing a line of backend code.**

This is the key insight: prototypes are cheap now. Get feedback on the real thing, not a static mockup.

### Stage 4: Task List Generation

Generate a task list from `architecture.md` to keep the agent on track. Each task maps to a screen, flow, or integration point. This prevents the agent from losing context mid-build.

### Stage 5: API Spec

The agent reads three documents to write the API spec:
1. Frontend code (what the UI expects)
2. PRD (what the business requires)
3. Architecture file (how it all connects)

This produces a complete API contract before any backend code is written.

### Stage 6: Database Schema

Generated from the same three documents. The schema reflects actual data requirements, not guesses.

If using Supabase: the Supabase MCP automates project creation, schema queries, and migrations — no manual SQL.

### Stage 7: Backend Layer (Last)

Backend is added last: payments, notifications, rate limiting, analytics. By this point the contract is locked — the backend just fulfills it.

## Pipeline Summary

```
Actors → PRD → Architecture.md → Frontend Prototype → Client Approval
                                                            ↓
                                    Task List → API Spec → Schema → Backend
```

## How This Maps to Our Repo

| Pipeline Stage | Repo Tool |
|---------------|-----------|
| PRD / Requirements | `/spec-interview` command, `docs/specs/` output |
| Architecture | `docs/templates/ARCHITECTURE_TEMPLATE.md` |
| Frontend Prototype | Frontend Design skill + shadcn/ui components |
| Task Management | Agent teams task list, `/careful` for production |
| API Spec | `src/app/api/users/route.ts` as pattern, `withAuth`/`withValidation` wrappers |
| Database Schema | `prisma/schema.prisma`, Supabase MCP in `.mcp.json.example` |
| Backend Layer | `src/lib/` utilities (rate-limit, email, error handling, auth helpers) |

## Tool-Agnostic Applications

This pipeline works regardless of tooling:
- **Claude Code**: PRD + architecture.md replace Figma handoff
- **Cursor / Codex / Antigravity**: Same sequencing — requirements before execution
- **n8n / automation**: Actor-first logic applies to pipeline design
- **Vibe coding**: Same process, less ceremony — prototype first, connect services last

The principle is universal: **structure before execution, actors before features, frontend before backend.**
