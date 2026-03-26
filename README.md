# New Baseline

> Jay's definitive project starter. Clone it, delete what you don't need, ship faster.
> Everything is pre-wired and ready to run.

---

## What This Is

A complete, opinionated baseline for building full-stack web apps with Next.js 15. It's not a template — it's a **workflow operating system** that combines:

- A **runnable Next.js app** (zero config needed to `npm run dev`)
- A **workflow layer** (gstack, BMAD, GSD) that enforces planning before coding
- A **quality enforcement layer** (CI, Husky, ESLint, coverage gates)
- A **Cursor + Claude Code integration** (rules, agents, commands, hooks auto-applied)
- **33 specialized AI agents** pre-configured for every part of the development cycle
- **105+ slash commands** for every task from planning to shipping

The core philosophy: **Interrogation → Documentation → Code. Never skip these steps.**

---

## Quick Start

```bash
# 1. Clone and re-init for your project
git clone https://github.com/jaydubya818/New_baseline.git my-project
cd my-project
rm -rf .git
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 2. Install dependencies
npm install

# 3. Start local database (requires Docker)
docker compose up -d

# 4. Configure environment
cp .env.example .env.local
# Edit .env.local — at minimum set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# 5. Initialize database
npm run db:generate   # generate Prisma client
npm run db:push       # push schema to dev DB
npm run db:seed       # seed initial data

# 6. Start dev server
npm run dev
# → http://localhost:3000 ✅

# 7. Initialize gstack browser QA (one-time per machine)
cd skills/gstack && ./setup && cd ../..

# 8. Update identity files
# - Edit CLAUDE.md: update "Project Overview" section
# - Edit .gstackrc: set profile= for your project type
# - Edit .env.local: fill all required values
# - Edit src/app/layout.tsx: update metadata
```

---

## The Workflow (Jay's Optimized Pattern)

### Pre-Code Sequence (Never Skip)

```
Step 1 — Interrogate
  Prompt: "Interrogate my idea. Assume nothing. Ask until no gaps remain."

Step 2 — Generate canonical docs
  Prompt: "Based on our interrogation, generate all 6 canonical docs:
           PRD.md, APP_FLOW.md, TECH_STACK.md, FRONTEND_GUIDELINES.md,
           BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md"

Step 3 — Update CLAUDE.md with project identity

Step 4 — Session workflow
  /session-start         → warm up: reads progress.txt + IMPLEMENTATION_PLAN.md
  /autoplan --adversarial → 4 parallel lenses: CEO / Eng / Security / UX
  /test-gen              → write failing tests first (TDD red phase)
  [write code]           → make tests green, 100% coverage
  /review --dual-model   → Claude + Codex adversarial pass
  /qa                    → real Chromium, real auth, screenshots
  /cso                   → security gate (auth/agent changes only)
  /document-release      → keep canonical docs honest
  /progress              → update progress.txt, close session
```

### gstack Profile System

Set `profile=` in `.gstackrc` based on what you're building:

| Profile          | Use For                       |
| ---------------- | ----------------------------- |
| `product-ui`     | User-facing Next.js apps      |
| `platform`       | APIs, services, microservices |
| `agent-platform` | AI agent systems              |
| `monorepo-root`  | Multi-app monorepos           |
| `baseline`       | This repo (default)           |

---

## App Stack

### Runtime Dependencies

| Package                    | Version     | Purpose                         |
| -------------------------- | ----------- | ------------------------------- |
| `next`                     | ^15.0.0     | React framework with App Router |
| `react`                    | ^19.0.0     | UI library                      |
| `next-auth`                | ^5.0.0-beta | Authentication (v5 / Auth.js)   |
| `@prisma/client`           | ^6.0.0      | Database ORM                    |
| `zod`                      | ^3.23       | Schema validation               |
| `tailwindcss`              | ^3.4        | Utility CSS                     |
| `class-variance-authority` | ^0.7        | Component variants              |
| `clsx` + `tailwind-merge`  | latest      | Class merging (`cn()`)          |
| `lucide-react`             | ^0.400      | Icons                           |
| `@radix-ui/*`              | latest      | Headless UI primitives          |
| `sonner`                   | ^1.5        | Toast notifications             |
| `date-fns`                 | ^3.6        | Date utilities                  |
| `server-only`              | latest      | Server-side guard               |

### Dev Dependencies

| Package                       | Purpose                    |
| ----------------------------- | -------------------------- |
| `typescript` ^5.5             | Strict TypeScript          |
| `prisma` ^6.0                 | DB migrations + schema     |
| `eslint` ^9.9 + plugins       | Linting                    |
| `prettier` ^3.3               | Formatting                 |
| `prettier-plugin-tailwindcss` | Tailwind class sorting     |
| `vitest` ^2.0                 | Unit + integration testing |
| `@vitest/coverage-v8`         | Coverage reports           |
| `@testing-library/react`      | Component testing          |
| `@playwright/test` ^1.46      | E2E testing                |
| `husky` ^9.1                  | Git hooks                  |
| `lint-staged` ^15.2           | Staged file linting        |

---

## Config Files

| File                   | Purpose                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `next.config.ts`       | Security headers, image domains, server action config                                    |
| `tailwind.config.ts`   | shadcn/ui CSS token system, dark mode, animations, fonts                                 |
| `postcss.config.js`    | Tailwind + autoprefixer                                                                  |
| `components.json`      | shadcn/ui — `npx shadcn add <component>` ready                                           |
| `tsconfig.json`        | Strict mode, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `@/` path aliases |
| `eslint.config.js`     | Flat config — `no-any` as error, react-hooks enforced, security rules                    |
| `prettier.config.js`   | Single quotes, no semi, Tailwind class sorting                                           |
| `vitest.config.ts`     | jsdom env, 90%/85%/90% coverage thresholds, path aliases                                 |
| `vitest.setup.ts`      | jest-dom, mocked next/navigation, next/headers, next-auth                                |
| `playwright.config.ts` | Chromium, auth setup project, auto-starts dev server                                     |
| `.gstackrc`            | gstack profile + feature flags (auto-ship/deploy disabled)                               |
| `.env.example`         | All env vars templated: DB, NextAuth, OAuth, S3, email, Stripe, analytics                |
| `docker-compose.yml`   | Postgres 16 with health check — `docker compose up -d`                                   |
| `.cursorrules`         | Legacy Cursor rules fallback                                                             |
| `.mcp.json.example`    | MCP server config template (20 servers pre-configured) — copy to `.mcp.json`             |

### Claude Code Settings (`.claude/`)

| File                          | Purpose                                                                                                                                                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `settings.json`               | Team-shared permissions — deny destructive ops (`rm -rf`, `DROP TABLE`, `force-push`, secret leaks, `Edit .env`, `Edit .pem`, `chmod 777`), ask-before-executing (`git push`, `npm publish`, `prisma migrate`), pre-allow safe ops (`git`, `npm`, `prisma`, `Edit`, `Write`, `Read`) |
| `settings.local.json.example` | Personal settings template (copy to `settings.local.json`, which is gitignored)                                                                                                                                                                                                      |

**Settings hierarchy** (highest precedence wins): managed policy → CLI args → `settings.local.json` → `settings.json` → user `~/.claude/settings.json`

Deny rules always take absolute precedence regardless of which file they appear in.

---

### MCP Servers (`.mcp.json.example`)

Pre-configured MCP server integrations — copy to `.mcp.json` and fill in your keys:

| Server              | Package / URL                            | What It Does                                                                      |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| **Context7**        | `@upstash/context7-mcp`                  | Up-to-date library docs for LLMs — auto-resolves versions                         |
| **Ref Tools**       | `https://api.ref.tools/mcp`              | Reference tools — search docs, APIs, and specs                                    |
| **Docker**          | `docker mcp gateway run`                 | Docker MCP Toolkit — container management (Docker Desktop 4.62+)                  |
| **shadcn/ui**       | `shadcn@latest mcp`                      | Browse, search, and install shadcn/ui components via natural language             |
| **Google Maps**     | `https://mcp.googleapis.com/v1beta/maps` | Google Maps Grounding Lite — location & mapping                                   |
| **Notion**          | `@notionhq/notion-mcp-server`            | Search, read, create, and update Notion pages and databases                       |
| **Obsidian**        | `obsidian-mcp`                           | Read and write Obsidian vault notes — supports multiple vaults                    |
| **Supabase**        | `https://mcp.supabase.com/mcp`           | Database, auth, storage, edge functions (OAuth setup)                             |
| **Stripe**          | `@stripe/mcp`                            | Payments API — billing, subscriptions, invoices                                   |
| **Postgres**        | `@modelcontextprotocol/server-postgres`  | Direct PostgreSQL access — queries, schema inspection                             |
| **GitHub**          | `ghcr.io/github/github-mcp-server`       | GitHub API — repos, issues, PRs, actions, code search (Docker)                    |
| **Chrome DevTools** | `chrome-devtools-mcp`                    | Chrome DevTools Protocol — inspect, debug, profile web apps                       |
| **Context Mode**    | `context-mode`                           | Context optimization — 98% token savings, session continuity, sandboxed execution |
| **Vercel**          | `next-devtools-mcp`                      | Vercel / Next.js DevTools — deployment, logs, project management                  |
| **Playwright**      | `@playwright/mcp`                        | Browser automation — navigate, click, screenshot, E2E testing                     |
| **Firecrawl**       | `firecrawl-mcp`                          | Web scraping — crawl sites, extract structured data, LLM-ready markdown           |
| **Excalidraw**      | `excalidraw-mcp`                         | Diagram generation — architecture and flow diagrams from natural language         |
| **NotebookLM**      | `notebooklm-mcp`                         | Google NotebookLM — create notebooks, add sources, generate audio overviews       |
| **Figma**           | `@anthropic-ai/figma-mcp`                | Figma design integration — inspect, extract, and reference design tokens          |
| **Apple Notes**     | `apple-notes-mcp`                        | Read and write Apple Notes — search, create, update notes (macOS)                 |

> **Setup:** `cp .mcp.json.example .mcp.json` → replace `YOUR_*` placeholders with real credentials. See [Google MCP servers](https://github.com/google/mcp) for additional Google Cloud MCPs (BigQuery, Firestore, Cloud SQL, GKE, etc.).

---

## Source Code (`src/`)

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  ← NextAuth v5 route handler
│   ├── globals.css                       ← Tailwind + full shadcn CSS variables (light + dark)
│   ├── layout.tsx                        ← Root layout, Inter + JetBrains Mono fonts
│   ├── page.tsx                          ← Home page, session-aware
│   ├── robots.ts                         ← Search engine crawl rules
│   ├── manifest.ts                       ← PWA web app manifest
│   ├── sitemap.ts                        ← Dynamic sitemap generation
│   ├── api/users/route.ts               ← Example CRUD API (withAuth + withValidation)
│   └── providers.tsx                     ← SessionProvider + Sonner toaster
├── auth.ts                               ← NextAuth v5 config (GitHub + Google + Prisma adapter)
├── middleware.ts                         ← Route protection, auth redirects
├── components/
│   └── ui/                               ← shadcn/ui components (add via npx shadcn add)
├── hooks/                                ← Custom React hooks
├── lib/
│   ├── db.ts                             ← Prisma singleton (hot-reload safe)
│   └── utils.ts                          ← cn(), formatCurrency, formatRelativeTime, truncate, sleep
├── server/                               ← Server-only utilities and actions
└── types/
    ├── css.d.ts                          ← CSS module type declarations
    └── index.ts                          ← ApiResponse, ActionResult, FormState, PaginatedResult, SessionUser
```

### Server Utilities (`src/lib/`)

| Module            | Purpose                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `utils.ts`        | `cn()`, `formatCurrency()`, `formatRelativeTime()`, `truncate()`, `sleep()`, `isServer()`, `generateId()`                                                                                         |
| `error.ts`        | `AppError` class hierarchy (`NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ValidationError`, `RateLimitError`) + optional Sentry integration via `captureError()` + `toErrorResponse()` |
| `rate-limit.ts`   | In-memory sliding-window rate limiter — `checkRateLimit(key, config)`. Replace with Redis (`@upstash/ratelimit`) for production at scale.                                                         |
| `email.ts`        | Resend email utility — `sendEmail({ to, subject, html })`. Logs to console when `RESEND_API_KEY` is not set.                                                                                      |
| `auth-helpers.ts` | `requireAuth()` (throws 401), `requireAdmin()` (throws 403), `getUser()` (returns null). Use in Server Components, Server Actions, and API routes.                                                |
| `api.ts`          | Composable API route wrappers: `withAuth(handler)`, `withRateLimit(config, handler)`, `withValidation(zodSchema, handler)`. Auto-handles errors.                                                  |
| `validations.ts`  | Zod schemas: email, password, id, pagination, search, updateProfile, contactForm                                                                                                                  |
| `constants.ts`    | `APP_NAME`, rate limits, file sizes, breakpoints, HTTP status codes                                                                                                                               |
| `db.ts`           | Prisma singleton (hot-reload safe)                                                                                                                                                                |

### Key Utilities (`src/lib/utils.ts`)

| Function             | Signature                                | Purpose                                  |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| `cn`                 | `(...inputs: ClassValue[]) => string`    | Merge Tailwind classes without conflicts |
| `formatCurrency`     | `(amount, currency?, locale?) => string` | Format numbers as currency               |
| `formatRelativeTime` | `(date: Date) => string`                 | "2 hours ago" style timestamps           |
| `truncate`           | `(str, maxLength) => string`             | Truncate with ellipsis                   |
| `sleep`              | `(ms: number) => Promise<void>`          | Async delay                              |
| `isServer`           | `() => boolean`                          | Server-side check                        |
| `generateId`         | `() => string`                           | Random ID for UI keys                    |

---

## Database (`prisma/`)

### Schema

Pre-wired with NextAuth v5 adapter models:

| Model               | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `User`              | Core user (id, name, email, image, role, createdAt, updatedAt) |
| `Account`           | OAuth provider accounts linked to User                         |
| `Session`           | Active user sessions                                           |
| `VerificationToken` | Email verification tokens                                      |

`UserRole` enum: `USER | ADMIN`

All foreign keys indexed. Cascading deletes on Account and Session.

### Commands

```bash
npm run db:generate      # Regenerate Prisma client after schema changes
npm run db:push          # Push schema to dev DB (no migration file — use for prototyping)
npm run db:migrate       # Create + apply migration (use for real changes)
npm run db:migrate:prod  # Deploy migrations in production
npm run db:seed          # Run prisma/seed.ts
npm run db:studio        # Open Prisma Studio at localhost:5555
npm run db:reset         # Reset dev DB (wipes all data)
```

### Local Database

```bash
docker compose up -d     # Start Postgres 16 on :5432
docker compose down      # Stop
docker compose down -v   # Stop + delete all data
```

Default connection: `postgresql://postgres:postgres@localhost:5432/mydb`

---

## Authentication (`src/auth.ts`)

NextAuth v5 (Auth.js) with:

- **GitHub** OAuth provider
- **Google** OAuth provider
- **Prisma adapter** — sessions stored in DB
- Custom `session` callback adds `user.id` to session
- Custom pages: `/login` for sign-in and errors

### Middleware (`src/middleware.ts`)

- Protects all routes by default
- Public routes: `/`, `/login`, `/api/auth`
- Authenticated users redirected from `/login` → `/dashboard`
- Unauthenticated users redirected from protected routes → `/login?callbackUrl=...`

---

## Testing

### Unit Tests (Vitest)

```bash
npm run test:unit         # Run all unit tests
npm run test:unit:watch   # Watch mode
npm run test:unit:ui      # Visual UI
npm run test:coverage     # With coverage report (HTML + lcov)
```

Coverage thresholds enforced in CI:

- Statements: 90%
- Branches: 85%
- Functions: 90%

`vitest.setup.ts` pre-mocks: `next/navigation`, `next/headers`, `next-auth`, `@/auth`

### E2E Tests (Playwright)

```bash
npm run test:e2e          # Run E2E (starts dev server automatically)
npm run test:e2e:ui       # Playwright UI mode
```

Files:

- `e2e/auth.setup.ts` — auth setup project (runs first, saves session state)
- `e2e/home.spec.ts` — home page smoke test
- `e2e/.auth/` — auth state storage (gitignored)

---

## CI/CD (`.github/workflows/`)

### `ci.yml` — Runs on every push to `main`/`develop` and every PR

| Job            | What it checks                                             |
| -------------- | ---------------------------------------------------------- |
| `typecheck`    | `tsc --noEmit` — zero TypeScript errors                    |
| `lint`         | ESLint with `--max-warnings 0` — zero lint warnings        |
| `unit-tests`   | Vitest with coverage report uploaded as artifact           |
| `e2e-tests`    | Playwright against built app — report uploaded as artifact |
| `secrets-scan` | `scripts/secrets/secrets-scan.sh` — no committed secrets   |
| `all-checks`   | Gate job — all required checks must pass                   |

### `dependabot-auto-merge.yml`

Auto-merges Dependabot patch and minor PRs after CI passes. Major version bumps require manual review.

### `.github/dependabot.yml`

Weekly npm + GitHub Actions dependency updates. Groups patch updates together to reduce PR noise.

### `.github/PULL_REQUEST_TEMPLATE.md`

PR checklist enforcing:

- gstack workflow gates completed (`/autoplan`, `/review --dual-model`, `/qa`, `/cso`)
- Canonical docs updated
- TypeScript strict, no secrets, no console.log
- Tests pass with coverage maintained
- Security verified

### `.github/ISSUE_TEMPLATE/`

- `bug_report.md` — reproduction steps, environment, expected vs actual
- `feature_request.md` — problem, solution, acceptance criteria, doc impact

---

## Git Hooks (Husky + lint-staged)

| Hook       | File                | What it does                        |
| ---------- | ------------------- | ----------------------------------- |
| pre-commit | `.husky/pre-commit` | Runs lint-staged on staged files    |
| commit-msg | `.husky/commit-msg` | Enforces conventional commit format |
| pre-push   | `.husky/pre-push`   | Runs `tsc --noEmit` before push     |

**lint-staged** (defined in `package.json`):

- `*.{ts,tsx}` → ESLint fix + Prettier
- `*.{js,json,md,yaml}` → Prettier

**Commit format enforced:**

```
feat: add stripe webhook handler      ✅
fix(auth): resolve session expiry     ✅
chore: update dependencies            ✅
Added stripe                          ❌  (rejected)
```

Valid types: `feat | fix | chore | docs | test | refactor | perf | ci | style | build | revert`

---

## Cursor Integration (`.cursor/rules/`)

7 MDC files auto-applied by file type:

| Rule File        | Scope                          | Always On |
| ---------------- | ------------------------------ | --------- |
| `security.mdc`   | All files (`**/*`)             | ✅        |
| `workflow.mdc`   | All files (`**/*`)             | ✅        |
| `typescript.mdc` | `**/*.ts`, `**/*.tsx`          | On match  |
| `react.mdc`      | `**/*.tsx`, `**/components/**` | On match  |
| `api.mdc`        | `**/api/**`, `**/actions/**`   | On match  |
| `database.mdc`   | `**/prisma/**`, `**/*.sql`     | On match  |
| `testing.mdc`    | `**/*.test.*`, `**/e2e/**`     | On match  |

`security.mdc` and `workflow.mdc` are always active — they enforce Jay's pre-code sequence, naming conventions, anti-patterns, and commit discipline on every file in every project.

`.cursorrules` is the legacy single-file fallback for older Cursor versions.

### Adding shadcn/ui Components in Cursor

```bash
npx shadcn@latest add button card input label badge
# → Components appear in src/components/ui/
# → Import: import { Button } from '@/components/ui/button'
```

---

## Claude Code Integration (`.claude/`)

### Agents (`.claude/agents/`) — 33 Agents

#### Core Pipeline (runs in sequence for any feature)

| Agent              | File                              | Role                                          |
| ------------------ | --------------------------------- | --------------------------------------------- |
| 01 Architecture    | `01-architecture-agent.md`        | System design, ADRs, component boundaries     |
| 02 Plan Review     | `02-plan-review-agent.md`         | Adversarial plan review, gap detection        |
| 03 Planning        | `03-planning-agent.md`            | Task decomposition, phase planning            |
| 04 Task Breakdown  | `04-task-breakdown-agent.md`      | Atomic task creation with acceptance criteria |
| 05 Context Manager | `05-context-manager-agent.md`     | Context window management, memory             |
| 06 Code Generation | `06-code-generation-agent.md`     | Implementation, TDD adherence                 |
| 07 Task Validation | `07-task-validation-agent.md`     | Validates code against acceptance criteria    |
| 08 Runtime Prep    | `08-runtime-preparation-agent.md` | Pre-run environment checks                    |

#### GSD Agents (structured execution)

| Agent                      | Role                                |
| -------------------------- | ----------------------------------- |
| `gsd-advisor-researcher`   | Research and recommendations        |
| `gsd-assumptions-analyzer` | Surface and challenge assumptions   |
| `gsd-codebase-mapper`      | Understand existing code structure  |
| `gsd-debugger`             | Systematic bug investigation        |
| `gsd-executor`             | Execute planned tasks atomically    |
| `gsd-integration-checker`  | Verify integrations work end-to-end |
| `gsd-nyquist-auditor`      | Completeness and quality auditing   |
| `gsd-phase-researcher`     | Research before starting a phase    |
| `gsd-plan-checker`         | Validate plan before execution      |
| `gsd-planner`              | Create structured execution plans   |
| `gsd-project-researcher`   | Project-level research and context  |
| `gsd-research-synthesizer` | Synthesize research into action     |
| `gsd-roadmapper`           | Milestone and roadmap planning      |
| `gsd-ui-auditor`           | UI quality and consistency audit    |
| `gsd-ui-checker`           | UI component validation             |
| `gsd-ui-researcher`        | UI/UX research and patterns         |
| `gsd-user-profiler`        | User persona and needs analysis     |
| `gsd-verifier`             | Verify completed work against spec  |

#### Specialist Agents

| Agent                       | Role                                                            |
| --------------------------- | --------------------------------------------------------------- |
| `architect`                 | System architecture and design decisions                        |
| `code-reviewer`             | Code quality, patterns, correctness                             |
| `db-reviewer`               | Schema, query, migration review                                 |
| `security-reviewer`         | Security vulnerabilities, auth, secrets                         |
| `perf-analyzer`             | Performance bottlenecks, optimization                           |
| `superpowers-code-reviewer` | Advanced multi-model code review                                |
| `adversarial-reviewer`      | Fresh-eyes review — iterates until findings degrade to nitpicks |

---

### Commands (`.claude/commands/`) — 105+ Commands

#### Core Commands

| Command                  | File                       | Use When                                             |
| ------------------------ | -------------------------- | ---------------------------------------------------- |
| `/plan`                  | `plan.md`                  | Plan a feature before coding                         |
| `/review`                | `review.md`                | Code review before merging                           |
| `/spec`                  | `spec.md`                  | Write a feature spec                                 |
| `/pr`                    | `pr.md`                    | Create a PR                                          |
| `/tdd`                   | `tdd.md`                   | TDD workflow                                         |
| `/fix`                   | `fix.md`                   | Systematic bug fix                                   |
| `/feature`               | `feature.md`               | End-to-end feature workflow                          |
| `/perf`                  | `perf.md`                  | Performance analysis                                 |
| `/security`              | `security.md`              | Security audit                                       |
| `/techdebt`              | `techdebt.md`              | Tech debt analysis                                   |
| `/context`               | `context.md`               | Context window check                                 |
| `/context-check`         | `context-check.md`         | Detailed context status                              |
| `/memory`                | `memory.md`                | Load/save memory                                     |
| `/today`                 | `today.md`                 | Daily plan                                           |
| `/brainstorm`            | `brainstorm.md`            | Ideation session                                     |
| `/challenge`             | `challenge.md`             | Challenge assumptions                                |
| `/delegate`              | `delegate.md`              | Spawn subagent                                       |
| `/deploy-check`          | `deploy-check.md`          | Pre-deploy checklist                                 |
| `/optimize-instructions` | `optimize-instructions.md` | Optimize prompts                                     |
| `/prove-it`              | `prove-it.md`              | Verify a claim                                       |
| `/trace`                 | `trace.md`                 | Trace execution flow                                 |
| `/spec-interview`        | `spec-interview.md`        | AskUserQuestion-driven deep spec builder             |
| `/careful`               | `careful.md`               | Enable safety guards for production ops              |
| `/babysit-pr`            | `babysit-pr.md`            | Monitor PR through CI, retry flaky tests, auto-merge |
| `/persona-test`          | `persona-test.md`          | 6 AI personas find trust breakpoints before shipping |
| `/writer-reviewer`       | `writer-reviewer.md`       | Dual-session write+review quality gate               |

#### GSD Commands (`.claude/commands/gsd/`) — 57 Commands

| Command                   | Purpose                           |
| ------------------------- | --------------------------------- |
| `/gsd:new-project`        | Bootstrap a new GSD project       |
| `/gsd:new-milestone`      | Create a new milestone            |
| `/gsd:plan-phase`         | Plan a phase with tasks           |
| `/gsd:execute-phase`      | Execute phase with atomic commits |
| `/gsd:validate-phase`     | Validate completed phase          |
| `/gsd:complete-milestone` | Mark milestone complete           |
| `/gsd:progress`           | Session progress update           |
| `/gsd:health`             | System health check               |
| `/gsd:ship`               | Ship a milestone                  |
| `/gsd:debug`              | Structured debugging              |
| `/gsd:review`             | Phase review                      |
| `/gsd:do`                 | Execute a specific task           |
| `/gsd:fast`               | Fast execution mode               |
| `/gsd:quick`              | Quick task                        |
| `/gsd:next`               | What's next                       |
| `/gsd:update`             | Update project state              |
| `/gsd:stats`              | Project statistics                |
| `/gsd:cleanup`            | Clean up tech debt                |
| `/gsd:forensics`          | Deep investigation                |
| `/gsd:autonomous`         | Autonomous execution mode         |
| `/gsd:add-phase`          | Add a phase                       |
| `/gsd:add-backlog`        | Add to backlog                    |
| `/gsd:add-todo`           | Add a todo                        |
| `/gsd:add-tests`          | Add tests for a phase             |
| `/gsd:research-phase`     | Research before a phase           |
| `/gsd:discuss-phase`      | Discuss phase approach            |
| `/gsd:ui-phase`           | UI-focused phase                  |
| `/gsd:ui-review`          | UI review                         |
| `/gsd:audit-milestone`    | Audit milestone quality           |
| `/gsd:audit-uat`          | UAT audit                         |
| `/gsd:milestone-summary`  | Milestone summary                 |
| `/gsd:session-report`     | End-of-session report             |
| `/gsd:map-codebase`       | Map codebase structure            |
| `/gsd:workstreams`        | Parallel workstream management    |
| `/gsd:pr-branch`          | Create PR from branch             |
| `/gsd:manager`            | Project manager mode              |
| `/gsd:settings`           | GSD settings                      |
| `/gsd:set-profile`        | Set user profile                  |
| `/gsd:profile-user`       | Profile a user persona            |
| `/gsd:roadmap`            | Roadmap planning                  |
| `/gsd:check-todos`        | Check outstanding todos           |
| `/gsd:note`               | Add a note                        |
| `/gsd:thread`             | Start a discussion thread         |
| `/gsd:pause-work`         | Pause current work                |
| `/gsd:resume-work`        | Resume paused work                |

#### Superpowers Commands

| Command                     | Purpose                           |
| --------------------------- | --------------------------------- |
| `/superpowers:write-plan`   | Write a parallel execution plan   |
| `/superpowers:execute-plan` | Execute plan with parallel agents |

---

### Hooks (`.claude/hooks/`) — 14 Hooks

| Hook                     | File                     | Trigger       | Purpose                                                 |
| ------------------------ | ------------------------ | ------------- | ------------------------------------------------------- |
| GSD Prompt Guard         | `gsd-prompt-guard.js`    | Pre-prompt    | Blocks dangerous/off-scope prompts                      |
| GSD Workflow Guard       | `gsd-workflow-guard.js`  | Pre-tool      | Enforces workflow gate order                            |
| GSD Context Monitor      | `gsd-context-monitor.js` | Pre-tool      | Monitors and warns on context usage                     |
| GSD Status Line          | `gsd-statusline.js`      | Always        | Shows project status in terminal                        |
| GSD Check Update         | `gsd-check-update.js`    | Session start | Checks for GSD updates                                  |
| Pre-Tool Memory (Python) | `pre-tool-memory.py`     | Pre-tool      | Loads project memory before tool use                    |
| Pre-Tool Memory (Shell)  | `pre-tool-memory.sh`     | Pre-tool      | Shell fallback for memory loading                       |
| Pre-Tool Use             | `pre-tool-use.js`        | Pre-tool      | General pre-tool validation                             |
| File Read Guard          | `file-read-guard.sh`     | Pre-read      | Guards sensitive file access                            |
| Auto Format              | `auto-format.sh`         | Post-write    | Auto-formats files after write                          |
| Stop Validation          | `stop-validation.sh`     | Pre-stop      | Validates before Claude stops                           |
| Play Sound               | `play-sound.js`          | Post-task     | Audio notification on completion                        |
| Protect Files            | `protect-files.sh`       | Pre-tool      | Blocks edits to critical files (.env, .pem, migrations) |
| Memory (directory)       | `.claude/memory/`        | Always        | Persistent project memory store                         |

---

### Rules (`.claude/rules/`)

Applied contextually by Claude Code:

| Rule File       | Applied When                                          |
| --------------- | ----------------------------------------------------- |
| `typescript.md` | Working with `.ts` or `.tsx` files                    |
| `react.md`      | Working with React components                         |
| `api.md`        | Working with API routes or server actions             |
| `database.md`   | Working with Prisma, SQL, migrations                  |
| `security.md`   | Handling auth, secrets, tokens, user input            |
| `testing.md`    | Working with test files, Vitest, Playwright, coverage |

---

### Output Formats (`.claude/output-formats/`)

Structured output templates for consistent agent responses:

| Format          | File                        | Used By  |
| --------------- | --------------------------- | -------- |
| Architecture    | `architecture-output.md`    | Agent 01 |
| Context         | `context-output.md`         | Agent 05 |
| Plan Review     | `plan-review-output.md`     | Agent 02 |
| Planning        | `planning-output.md`        | Agent 03 |
| Task Breakdown  | `task-breakdown-output.md`  | Agent 04 |
| Task Validation | `task-validation-output.md` | Agent 07 |

### Workflows (`.claude/workflows/`)

| Workflow                   | Purpose                            |
| -------------------------- | ---------------------------------- |
| `git-commit-workflow.md`   | Step-by-step atomic commit process |
| `code-cleanup-workflow.md` | Systematic code cleanup process    |

### Context Modes (`.claude/contexts/`)

Switch Claude's operating mode to match the task:

| Mode     | File          | Behavior                                                            |
| -------- | ------------- | ------------------------------------------------------------------- |
| Dev      | `dev.md`      | Code first, explain after. Minimal discussion, maximum output.      |
| Research | `research.md` | Understand before acting. Explore, compare, summarize.              |
| Review   | `review.md`   | Severity-prioritized findings, suggest fixes, check patterns.       |
| Planning | `planning.md` | Systems thinking, ADRs, risk analysis, dependency mapping.          |
| Debug    | `debug.md`    | Reproduce → isolate → hypothesize → verify → fix → regression test. |

### Memory (`.claude/memory/`)

4-layer persistent memory system:

- **MEMORY.md** — Index file, always loaded
- **Auto-dream** (`/dream` command) — 4-phase consolidation: orientation → gather signal → consolidate → prune & index
- **Pre-tool hooks** — Load relevant memory before tool execution
- **Session bridge** — `progress.txt` carries state between sessions

---

## Skills (`skills/`)

### gstack (`skills/gstack/`)

Browser-based QA and workflow OS. Runs a persistent Chromium instance for ~100ms command execution.

**gstack commands (use in Claude Code):**

| Command                | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `/session-start`       | Load progress.txt + IMPLEMENTATION_PLAN.md, warm up context    |
| `/autoplan`            | Plan feature with adversarial CEO + Eng + Security + UX lenses |
| `/autoplan --deep`     | Multi-service / architectural features                         |
| `/test-gen`            | Write failing tests before implementation (TDD red phase)      |
| `/review`              | Code review                                                    |
| `/review --dual-model` | Adversarial Claude + Codex review                              |
| `/review --pre-merge`  | Final pre-merge checks                                         |
| `/qa`                  | Real Chromium browser QA with screenshots                      |
| `/qa --regression`     | Full regression suite                                          |
| `/cso`                 | Security/architecture gate (required for auth changes)         |
| `/document-release`    | Update PRD, APP_FLOW, TECH_STACK to match reality              |
| `/scope-check`         | Check if addition is in scope                                  |
| `/investigate`         | Debug and trace unexpected behavior                            |
| `/progress`            | Update progress.txt, session close                             |
| `/ship`                | Ship milestone (disabled by default — use sandbox first)       |
| `/land-and-deploy`     | Deploy (disabled by default — use sandbox first)               |

**gstack profiles** (set in `.gstackrc`): `product-ui`, `platform`, `agent-platform`, `monorepo-root`

### BMAD (`skills/bmad/`)

Product shaping framework — use before any new product or major feature.

| Command                               | When                                   |
| ------------------------------------- | -------------------------------------- |
| `bmad-init`                           | Start a new product                    |
| `bmad-product-brief`                  | Shape the product idea into a brief    |
| `bmad-create-architecture`            | Technical architecture decisions       |
| `bmad-create-epics-and-stories`       | Break work into epics and user stories |
| `bmad-review-adversarial-general`     | Stress-test the plan                   |
| `bmad-check-implementation-readiness` | Gate check before coding               |

Sub-frameworks: `bmad/core`, `bmad/analysis`, `bmad/planning`, `bmad/solutioning`

### GSD (`skills/gsd/`)

Get-Shit-Done — structured execution with milestones, phases, and atomic commits.

| Command              | When                        |
| -------------------- | --------------------------- |
| `/gsd:new-project`   | Bootstrap project structure |
| `/gsd:plan-phase`    | Plan next phase             |
| `/gsd:execute-phase` | Execute with atomic commits |
| `/gsd:progress`      | Status update               |
| `/gsd:health`        | System health check         |
| `/gsd:ship`          | Ship a milestone            |

### Superpowers (`skills/superpowers/`)

Advanced AI patterns:

| Skill                            | Purpose                                     |
| -------------------------------- | ------------------------------------------- |
| `dispatching-parallel-agents`    | Spawn multiple agents simultaneously        |
| `subagent-driven-development`    | Full feature built by coordinated subagents |
| `test-driven-development`        | TDD patterns and anti-patterns              |
| `systematic-debugging`           | Root cause tracing, defense-in-depth        |
| `using-git-worktrees`            | Parallel work in isolated branches          |
| `executing-plans`                | Plan execution patterns                     |
| `writing-plans`                  | Plan authoring patterns                     |
| `requesting-code-review`         | How to structure a review request           |
| `receiving-code-review`          | How to process and respond to review        |
| `verification-before-completion` | Self-verification patterns                  |
| `brainstorming`                  | Visual ideation with companion server       |
| `writing-skills`                 | Anthropic best practices, persuasion        |
| `using-superpowers`              | Codex + Gemini tool references              |
| `finishing-a-development-branch` | Branch completion checklist                 |

### Engineering Skills

| Skill                 | Location                        | Purpose                                              |
| --------------------- | ------------------------------- | ---------------------------------------------------- |
| PRD                   | `skills/prd/`                   | Product requirements documents                       |
| Project Development   | `skills/project-development/`   | Dev pipeline patterns, case studies                  |
| E2E Tester            | `skills/e2e-tester/`            | Playwright test generation                           |
| Vitest Best Practices | `skills/vitest-best-practices/` | AAA pattern, async testing, snapshots, test doubles  |
| React Best Practices  | `skills/react-best-practices/`  | Rendering, re-renders, async, bundles, server/client |
| Web Design Guidelines | `skills/web-design-guidelines/` | UI/UX standards                                      |
| Multi-Agent Patterns  | `skills/multi-agent-patterns/`  | Coordination, orchestration                          |
| Context Optimization  | `skills/context-optimization/`  | Context window management                            |
| Evaluation            | `skills/evaluation/`            | LLM evaluation patterns                              |
| Frontend Testing      | `skills/frontend-testing/`      | Component and integration testing                    |
| Frontend Code Review  | `skills/frontend-code-review/`  | UI code review patterns                              |
| Hosted Agents         | `skills/hosted-agents/`         | Agent deployment, sandbox management                 |

---

## Canonical Documentation System (`docs/`)

The **8 canonical files** are the source of truth. Code must never contradict them. Update the doc, then the code.

### Templates (`docs/templates/`)

| Template                 | Purpose                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- |
| `PRD.md`                 | Problem, goals, users, P0/P1/P2 features, success metrics, constraints            |
| `APP_FLOW.md`            | Auth flow, core user flow, screens, API routes, state transitions, error states   |
| `TECH_STACK.md`          | Stack table, key dependencies, env vars, forbidden deps, infrastructure, commands |
| `FRONTEND_GUIDELINES.md` | Typography, color palette, spacing, components, animation, accessibility          |
| `BACKEND_STRUCTURE.md`   | DB schema, auth, API endpoints, server actions, storage, security patterns        |
| `IMPLEMENTATION_PLAN.md` | Phase tracking, task breakdown, milestones, risks, architecture decisions         |
| `ARCHITECTURE.md`        | System overview, key decisions, data model, security architecture, ADR format     |

### `docs/DOCS_SYSTEM.md`

The complete interrogation workflow with copy-paste prompts for each phase. **Read this before starting any new feature.**

### Guides (`docs/guides/`) — 21 Best Practices & Lessons Learned

| Guide                                | Source                                           | What You'll Learn                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE_CODE_BEST_PRACTICES.md`      | shanraisshan/claude-code-best-practice           | Settings hierarchy, permission patterns, subagent frontmatter, Command→Agent→Skill orchestration, multi-agent teams, memory strategy                                  |
| `SKILLS_LESSONS.md`                  | Anthropic "Lessons: Building Claude Code Skills" | 9 skill categories, writing tips, gotchas sections, progressive disclosure, on-demand hooks, distribution/marketplace, measurement                                    |
| `AGENT_TOOL_DESIGN.md`               | Anthropic "Seeing Like an Agent"                 | AskUserQuestion evolution, TodoWrite→Task progression, RAG→Grep→progressive disclosure, tool design as iterative art                                                  |
| `PROMPT_CACHING_GUIDE.md`            | Anthropic "Prompt Caching Is Everything"         | Prefix matching layout, cache-safe compaction, never change tools/models mid-session, plan mode via tools not swaps                                                   |
| `PLAYGROUND_GUIDE.md`                | Anthropic playground plugin                      | Interactive HTML playgrounds for visual iteration, example prompts                                                                                                    |
| `SPEC_DRIVEN_DEVELOPMENT.md`         | Anthropic spec workflow                          | Interview-driven spec building (40+ deep questions via AskUserQuestion), separate interview/execution sessions                                                        |
| `FILE_SYSTEM_PATTERNS.md`            | Anthropic "Agents Should Use File Systems"       | File system as agent state, multi-pass problem solving, coordination through files, verification loops                                                                |
| `AGENT_TEAMS.md`                     | Claude Code docs / agent-teams                   | Multi-session coordination, shared task lists, teammate messaging, plan approval, quality gate hooks                                                                  |
| `OH_MY_CLAUDECODE.md`                | Yeachan-Heo/oh-my-claudecode                     | Staged pipelines, magic keywords, smart model routing, skill extraction, verify/fix loops, notifications                                                              |
| `SKILLS_ULTIMATE_GUIDE.md`           | Claude Skills Ultimate Guide (March 2026)        | Building skills, reverse prompting, evals, A/B testing, trigger optimization, skill categories, distribution                                                          |
| `AWESOME_CLAUDE_CODE.md`             | hesreallyhim/awesome-claude-code                 | Ecosystem catalog: skills, orchestrators, session tools, status lines, hooks, CLAUDE.md patterns                                                                      |
| `CLAUDE_MEM.md`                      | thedotmack/claude-mem                            | Persistent memory: automatic capture, vector search, progressive disclosure, ~10x token savings                                                                       |
| `UI_UX_PRO_MAX.md`                   | nextlevelbuilder/ui-ux-pro-max-skill             | Design intelligence: 67 UI styles, 161 palettes, 57 fonts, industry rules, design system generation                                                                   |
| `ECOSYSTEM_TOOLS.md`                 | LightRAG + Obsidian Skills + integrations        | Graph-based RAG, Obsidian vault management, knowledge pipeline patterns                                                                                               |
| `CLAUDE_CODE_FROM_TOOL_TO_SYSTEM.md` | "From Tool to System" article (March 2026)       | 200-line CLAUDE.md ceiling, 6 AI persona testing, writer/reviewer dual-session, hook enforcement patterns, auto-learning, compression retention                       |
| `AGENT_SKILLS.md`                    | Agent Skills for Claude Code (2026)              | 10 must-have skills (frontend-design, browser-use, simplify, Remotion, GWS, Valyu, Antigravity, PlanetScale, Shannon, Excalidraw), install commands, Context Mode MCP |
| `AI_AGENT_BUILD_PIPELINE.md`         | AI Agent Build Pipeline                          | Actor-first PRD → architecture.md → frontend prototype → client approval → API spec → schema → backend last                                                           |
| `SECOND_BRAIN_OBSIDIAN.md`           | Second Brain with Obsidian + AI Agents           | Persistent context, bidirectional updates, skill acceleration, cross-agent portability, team scaling, vault structure, CLAUDE.md navigation                           |
| `SKILL_CREATOR.md`                   | Skill Creator — Official Anthropic Guide         | Full pipeline: capture intent → write SKILL.md → test cases → eval with subagents → benchmark → iterate → optimize description triggering                             |
| `CLAUDE_AGENT_SDK.md`                | Claude Agent SDK                                 | Build production agents in Python/TS — `query()` API, built-in tools, subagents, hooks, MCP, sessions, permissions, Claude Code feature integration                   |
| `SCHEDULED_TASKS.md`                 | Scheduled Tasks MCP                              | Recurring AI automation — daily standups, weekly dep audits, nightly test triage, cron syntax, integration patterns                                                   |

### Specs (`docs/specs/`)

Feature specs generated by the `/spec-interview` command. Each is a detailed, interview-driven document capturing every decision needed to build a feature.

---

## Project Templates (`templates/`)

Pre-configured starting points for different project types. After cloning New Baseline, copy the relevant template's config if building something specific:

| Template          | Use For                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `agent-project/`  | AI agent systems, multi-agent orchestration                             |
| `api/`            | REST/GraphQL APIs, backend services                                     |
| `full-stack/`     | Full-stack web apps (default — already configured)                      |
| `nextjs/`         | Lightweight Next.js apps without the full workflow layer                |
| `obsidian-vault/` | Second brain starter — CLAUDE.md + folder structure + context templates |

---

## VS Code / Cursor Settings (`.vscode/`)

### `settings.json`

- Format on save with Prettier
- ESLint fix on save
- TypeScript uses workspace `tsdk`
- Tailwind intellisense with CVA/clsx/cn regex patterns
- Prisma auto-format
- `.cursor/*.mdc` files treated as Markdown

### `extensions.json`

Recommended extensions auto-prompted on repo open:
`prettier-vscode`, `vscode-eslint`, `vscode-typescript-next`, `vscode-tailwindcss`, `Prisma.prisma`, `vitest.explorer`, `ms-playwright.playwright`, `eamodio.gitlens`, `github.vscode-pull-request-github`, `anthropics.claude-code`, `errorlens`

---

## Scripts (`scripts/`)

| Script                                                  | Purpose                                     |
| ------------------------------------------------------- | ------------------------------------------- |
| `scripts/secrets/secrets-scan.sh`                       | Scan for accidentally committed secrets     |
| `scripts/secrets/secrets-scan-patterns.txt`             | Patterns to detect (API keys, tokens, etc.) |
| `scripts/continual-learning/continual-learning-lint.js` | Lint learning entries                       |
| `scripts/continual-learning/continual-learning-run.js`  | Run learning pipeline                       |

Run manually: `npm run secrets:scan`
Run in CI: automatic on every push

---

## Key Files Reference

| File              | Purpose                                                       | Update When            |
| ----------------- | ------------------------------------------------------------- | ---------------------- |
| `CLAUDE.md`       | Master agent instructions, project identity, active rules     | Starting a new project |
| `progress.txt`    | Session log — what happened, what's next                      | Every session          |
| `SETUP.md`        | One-time machine setup guide                                  | Never (reference only) |
| `CONTRIBUTING.md` | Developer guide, branch strategy, workflow                    | Rarely                 |
| `.gstackrc`       | gstack profile and feature flags                              | Per-project            |
| `.env.local`      | Your actual environment variables                             | Per-environment        |
| `CHANGELOG.md`    | Release history and notable changes                           | Each release           |
| `Makefile`        | Shortcuts: `make dev`, `make test`, `make setup`, `make help` | Rarely                 |

---

## Full Directory Structure

```
New_baseline/
├── .claude/
│   ├── agents/          # 33 specialized subagents
│   ├── commands/        # 105+ slash commands
│   │   ├── gsd/         # 45 GSD-specific commands
│   │   └── superpowers/ # Parallel agent commands
│   ├── contexts/        # 5 operating modes (dev, research, review, planning, debug)
│   ├── hooks/           # 14 automation hooks
│   ├── memory/          # Persistent project memory (4-layer system)
│   ├── output-formats/  # 6 structured output templates
│   ├── rules/           # 6 contextual code rules
│   ├── settings.json    # Team-shared Claude Code permissions
│   ├── settings.local.json.example  # Personal settings template
│   └── workflows/       # Git commit + cleanup workflows
├── .cursor/
│   └── rules/           # 7 MDC rules (Cursor auto-applies by file type)
├── .github/
│   ├── CODEOWNERS       # Auto-assign reviewers by path
│   ├── ISSUE_TEMPLATE/  # Bug report + feature request
│   ├── workflows/       # CI + Dependabot auto-merge
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
├── .husky/              # pre-commit, commit-msg, pre-push hooks
├── .vscode/             # Editor settings + extension recommendations
├── docs/
│   ├── guides/          # 21 best practice guides (Anthropic lessons learned)
│   ├── specs/           # Feature specs from /spec-interview
│   ├── architecture/    # ADR template + initial stack decision
│   ├── templates/       # 7 canonical doc templates
│   ├── DOCS_SYSTEM.md   # Interrogation workflow guide
│   └── SKILLS_GUIDE.md  # Skills 2.0 authoring guide
├── e2e/                 # Playwright E2E tests
│   └── .auth/           # Auth state (gitignored)
├── mcp-configs/         # MCP server reference docs
├── prisma/
│   ├── schema.prisma    # DB schema (NextAuth models + your models)
│   └── seed.ts          # Database seed script
├── scripts/
│   ├── secrets/         # Secrets scanning
│   └── continual-learning/
├── skills/
│   ├── gstack/          # Browser QA + workflow OS (v1.1.0)
│   ├── bmad/            # Product shaping framework
│   ├── gsd/             # Structured execution system
│   ├── superpowers/     # 12 advanced AI patterns
│   ├── react-best-practices/  # 50+ React performance rules
│   ├── vitest-best-practices/ # Testing patterns
│   ├── e2e-tester/      # Playwright patterns
│   ├── web-design-guidelines/
│   ├── multi-agent-patterns/
│   ├── context-optimization/
│   ├── evaluation/
│   ├── frontend-testing/
│   ├── frontend-code-review/
│   ├── hosted-agents/
│   ├── prd/
│   └── project-development/
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/auth/    # NextAuth route handler
│   │   ├── globals.css  # Tailwind + shadcn CSS vars
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   ├── robots.ts    # Search engine crawl rules
│   │   ├── manifest.ts  # PWA web app manifest
│   │   ├── sitemap.ts   # Dynamic sitemap generation
│   │   ├── api/users/  # Example CRUD API route
│   │   └── providers.tsx # Client providers
│   ├── auth.ts          # NextAuth v5 config
│   ├── middleware.ts     # Route protection
│   ├── components/ui/   # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/
│   │   ├── api.ts       # withAuth/withRateLimit/withValidation wrappers
│   │   ├── auth-helpers.ts # requireAuth, requireAdmin, getUser
│   │   ├── db.ts        # Prisma client singleton
│   │   ├── email.ts     # Resend email utility
│   │   ├── error.ts     # AppError classes + Sentry
│   │   ├── rate-limit.ts # Sliding-window rate limiter
│   │   ├── utils.ts     # cn(), formatCurrency, etc.
│   │   ├── validations.ts # Zod schemas
│   │   └── constants.ts # App constants
│   ├── server/          # Server-only code
│   └── types/           # TypeScript types (css.d.ts, index.ts)
├── templates/           # Project type templates (agent, api, full-stack, nextjs)
├── .cursorrules         # Legacy Cursor rules fallback
├── CHANGELOG.md         # Release history
├── Makefile             # make dev, make test, make setup, make help
├── .env.example         # Environment variable template
├── .mcp.json.example    # MCP server config template
├── .gstackrc            # gstack config
├── .gitignore
├── CLAUDE.md            # Master agent instructions
├── CONTRIBUTING.md      # Developer guide
├── README.md            # This file
├── SETUP.md             # Machine setup guide
├── components.json      # shadcn/ui config
├── docker-compose.yml   # Local Postgres
├── eslint.config.js     # ESLint flat config
├── next.config.ts       # Next.js config
├── package.json         # Dependencies + scripts
├── playwright.config.ts # Playwright config
├── postcss.config.js    # PostCSS config
├── prettier.config.js   # Prettier config
├── progress.txt         # Session log
├── tailwind.config.ts   # Tailwind + shadcn token system
├── tsconfig.json        # TypeScript strict config
├── vitest.config.ts     # Vitest config
└── vitest.setup.ts      # Test setup + mocks
```

---

## Built From

| Source                                   | What It Contributed                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `jaydubya818/baseline-project`           | Original baseline structure                                                                                                       |
| `garrytan/gstack` v1.1.0                 | Browser QA + workflow OS                                                                                                          |
| BMAD Method                              | Product shaping framework                                                                                                         |
| Get-Shit-Done (GSD)                      | Structured execution system                                                                                                       |
| Superpowers                              | Parallel agents, TDD, worktrees                                                                                                   |
| Everything Claude Code                   | Agents, commands, hooks, rules                                                                                                    |
| React Best Practices                     | 50+ performance rules                                                                                                             |
| Vitest Best Practices                    | Testing patterns                                                                                                                  |
| `shanraisshan/claude-code-best-practice` | Settings hierarchy, permissions, subagent patterns, orchestration workflow, memory strategy                                       |
| Anthropic "Lessons: Skills"              | 9 skill categories, progressive disclosure, gotchas, distribution, hooks                                                          |
| Anthropic "Seeing Like an Agent"         | Tool design evolution, AskUserQuestion, search patterns                                                                           |
| Anthropic "Prompt Caching"               | Prefix matching, cache-safe patterns, compaction, plan mode                                                                       |
| Anthropic spec-driven workflow           | Interview-driven spec building, /spec-interview command                                                                           |
| Anthropic file system patterns           | File system as agent state, multi-pass problem solving                                                                            |
| Claude Code agent-teams docs             | Agent Teams guide — multi-session coordination, task lists, messaging                                                             |
| Yeachan-Heo/oh-my-claudecode             | Staged pipelines, magic keywords, smart model routing, verify/fix loops                                                           |
| Claude Skills Ultimate Guide             | Skills 2.0 — evals, A/B testing, trigger optimization, reverse prompting                                                          |
| hesreallyhim/awesome-claude-code         | Ecosystem catalog — skills, orchestrators, tools, hooks, status lines                                                             |
| thedotmack/claude-mem                    | Persistent memory — auto capture, vector search, progressive disclosure                                                           |
| nextlevelbuilder/ui-ux-pro-max-skill     | Design intelligence — 67 UI styles, 161 palettes, industry-specific rules                                                         |
| HKUDS/LightRAG                           | Graph-based RAG — entity-relationship retrieval, dual-level indexing                                                              |
| kepano/obsidian-skills                   | Obsidian vault management — markdown, canvas, CLI, defuddle                                                                       |
| "From Tool to System" article            | 200-line ceiling, persona testing, writer/reviewer, hook patterns, auto-learning                                                  |
| Context7 MCP                             | Up-to-date library docs for LLMs — `@upstash/context7-mcp`                                                                        |
| Ref Tools MCP                            | Reference search — docs, APIs, specs — `ref-tools-mcp`                                                                            |
| Docker MCP                               | Docker MCP Toolkit — container management via CLI plugin                                                                          |
| shadcn/ui MCP                            | Component browsing and installation via natural language                                                                          |
| Google MCPs                              | Maps Grounding Lite + BigQuery, Firestore, Cloud SQL, GKE ecosystem                                                               |
| Notion MCP                               | `@notionhq/notion-mcp-server` — pages, databases, search                                                                          |
| Obsidian MCP                             | `obsidian-mcp` — vault read/write, multiple vaults                                                                                |
| Supabase MCP                             | Remote MCP — database, auth, storage, edge functions                                                                              |
| Agent Skills article (2026)              | 10 must-have skills — frontend-design, browser-use, simplify, Remotion, GWS, Valyu, Antigravity, PlanetScale, Shannon, Excalidraw |
| AI Agent Build Pipeline                  | Actor-first PRD → prototype → backend-last pipeline (Jenny Wen / Simon Willison insights)                                         |
| mksglu/context-mode                      | Context optimization MCP — 98% token savings, FTS5 search, session continuity                                                     |
| ChromeDevTools/chrome-devtools-mcp       | Chrome DevTools Protocol MCP — inspect, debug, profile                                                                            |
| github/github-mcp-server                 | GitHub API MCP — repos, issues, PRs, actions, code search                                                                         |
| Obsidian Second Brain pattern            | Persistent context vault — CLAUDE.md navigation, wiki links, bidirectional updates, skill reference pointing, team scaling        |
| anthropics/skills/skill-creator          | Official Anthropic skill creation pipeline — eval framework, benchmark viewer, description optimization                           |
| Vercel / next-devtools-mcp               | Next.js DevTools MCP — deployment, logs, project management                                                                       |
| Microsoft @playwright/mcp                | Browser automation MCP — navigate, click, screenshot, E2E testing                                                                 |
| Firecrawl MCP                            | Web scraping MCP — crawl, extract, LLM-ready markdown                                                                             |
| Excalidraw MCP                           | Diagram generation MCP — architecture diagrams from natural language                                                              |
| NotebookLM MCP                           | Google NotebookLM — notebooks, sources, audio overviews                                                                           |
| Claude Agent SDK (Anthropic)             | Production agent framework — `query()` API, built-in tools, subagents, hooks, MCP, sessions                                       |
| Claude Code scheduled-tasks MCP          | Recurring AI automation — cron-based task scheduling, on-demand execution                                                         |
| Jay's custom layer                       | Interrogation system, canonical docs, workflow integration                                                                        |
