# ADR-001: Initial Technology Stack

**Status:** Accepted
**Date:** 2026-03-25
**Deciders:** Jay West

## Context

Needed a baseline stack for full-stack web apps that supports rapid prototyping, scales to production, and integrates deeply with AI-assisted development (Claude Code, Cursor).

## Decision

Adopt the following stack:
- **Framework:** Next.js 15 (App Router, React 19, Server Components)
- **Language:** TypeScript 5.5+ (strict mode, `noUncheckedIndexedAccess`)
- **Database:** PostgreSQL 16 via Prisma 6
- **Auth:** NextAuth v5 (Auth.js) with GitHub + Google OAuth
- **Styling:** Tailwind CSS 3.4 + shadcn/ui (Radix UI primitives)
- **Testing:** Vitest (unit) + Playwright (E2E)
- **CI:** GitHub Actions with typecheck, lint, test, secrets scan
- **AI Integration:** Claude Code (agents, commands, hooks, skills, memory)

## Consequences

### Positive
- Next.js App Router provides RSC, streaming, and server actions out of the box
- Prisma gives type-safe DB access with zero raw SQL in application code
- shadcn/ui components are copy-paste (no lock-in), built on accessible Radix primitives
- Claude Code integration pre-wired: 34 agents, 65+ commands, 13 hooks, memory system
- Cursor MDC rules auto-apply by file type
- TDD pipeline enforced via Husky + CI

### Negative
- Next.js beta features (Server Actions, NextAuth v5) may have breaking changes
- Prisma adds a query engine binary (~15MB) to the deploy artifact
- shadcn/ui requires manual component installation (no package update)

### Risks
- NextAuth v5 is still in beta — mitigated by pinning version and having auth abstraction layer
- Prisma cold starts in serverless — mitigated by connection pooling (PgBouncer or Prisma Accelerate)

## Alternatives Considered

### Option A: tRPC + Drizzle
- Pros: End-to-end type safety without code gen, lighter ORM
- Cons: Smaller ecosystem, less mature migration tooling, steeper learning curve for new devs

### Option B: Remix + Drizzle
- Pros: Better progressive enhancement, simpler mental model
- Cons: Smaller ecosystem, less Claude Code tooling support, fewer deployment options

### Option C: SvelteKit + Drizzle
- Pros: Smaller bundles, simpler reactivity model
- Cons: Smaller talent pool, less shadcn/ui equivalent, less AI tooling support
