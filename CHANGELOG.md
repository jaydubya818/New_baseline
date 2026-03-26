# Changelog

All notable changes to New Baseline are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- shadcn/ui components: card, input, label, badge, skeleton, separator, avatar, textarea, tooltip
- `src/lib/error.ts` — AppError classes + optional Sentry integration
- `src/lib/rate-limit.ts` — In-memory sliding-window rate limiter
- `src/lib/email.ts` — Resend email utility (logs to console when unconfigured)
- `src/lib/auth-helpers.ts` — requireAuth, requireAdmin, getUser server-side guards
- `src/lib/api.ts` — withAuth, withRateLimit, withValidation API route wrappers
- `.github/CODEOWNERS` — Auto-assign reviewers by path
- `docs/architecture/` — ADR template + ADR-001 (initial stack decision)
- `docs/guides/` — 15 best-practice guides from Anthropic articles + community repos
- `docs/specs/` — Feature spec directory for /spec-interview output
- `.claude/settings.json` — Team-shared Claude Code permissions
- `.claude/settings.local.json.example` — Personal settings template
- `.claude/commands/spec-interview.md` — Deep feature spec builder
- `.claude/commands/careful.md` — Production safety guards
- `.claude/commands/babysit-pr.md` — PR monitoring + CI retry
- `.claude/agents/adversarial-reviewer.md` — Fresh-eyes code review subagent
- `.claude/contexts/` — 5 operating modes (dev, research, review, planning, debug)
- Auto-dream memory consolidation (`/dream` command)
- Makefile with common shortcuts
- `docs/guides/AGENT_TEAMS.md` — Multi-session Claude Code coordination guide
- `docs/guides/OH_MY_CLAUDECODE.md` — oh-my-claudecode orchestration patterns
- `docs/guides/SKILLS_ULTIMATE_GUIDE.md` — Skills 2.0 comprehensive guide (evals, A/B testing, triggers)
- TypeScript strict mode fixes for env vars, tsconfig exclusions
- `docs/guides/AWESOME_CLAUDE_CODE.md` — Ecosystem resource catalog (32k+ stars repo)
- `docs/guides/CLAUDE_MEM.md` — Persistent memory system with vector search
- `docs/guides/UI_UX_PRO_MAX.md` — Design intelligence skill (67 styles, 161 palettes)
- `docs/guides/ECOSYSTEM_TOOLS.md` — LightRAG, Obsidian Skills, knowledge pipeline patterns
- `docs/guides/CLAUDE_CODE_FROM_TOOL_TO_SYSTEM.md` — Practical patterns from 1yr daily use
- `.claude/commands/persona-test.md` — 6 AI persona trust breakpoint testing
- `.claude/commands/writer-reviewer.md` — Dual-session write+review quality gate
- Hardened permissions: deny Edit(.env*), Edit(*.pem), Edit(*.key), Write equivalents, chmod 777
- Compression retention instructions added to CLAUDE.md
- Instruction format template added to CLAUDE.md
- `ask` permissions in settings.json (git push, npm publish, prisma migrate, workflow edits)
- `src/app/robots.ts` — SEO crawl rules
- `src/app/manifest.ts` — PWA web app manifest
- `.mcp.json.example` — MCP server config template (10 servers: Context7, Ref Tools, Docker, shadcn/ui, Google Maps, Notion, Obsidian, Supabase, Stripe, Postgres)
- `.claude/hooks/protect-files.sh` — PreToolUse hook blocking edits to critical files
- `src/app/api/users/route.ts` — Example CRUD API using withAuth/withValidation wrappers
- `.claude/rules/testing.md` — Testing rules (AAA pattern, coverage, anti-patterns)

## [1.0.0] — 2026-03-25

### Added
- Initial baseline release
- Next.js 15 App Router with React 19 and TypeScript 5.5+
- NextAuth v5 with GitHub + Google OAuth, Prisma adapter
- Prisma 6 with PostgreSQL schema (User, Account, Session, VerificationToken)
- Tailwind CSS + shadcn/ui (button component, CSS variables, dark mode)
- Vitest + Playwright test infrastructure with coverage thresholds
- ESLint 9 flat config + Prettier + Husky + lint-staged
- GitHub Actions CI (typecheck, lint, unit tests, E2E, secrets scan)
- Dependabot + auto-merge workflow
- Cursor integration: 7 MDC rules, `.cursorrules` fallback
- Claude Code integration: 33 agents, 100+ commands, 13 hooks, 5 rules
- gstack browser QA + workflow OS
- BMAD product shaping framework
- GSD structured execution system
- Superpowers parallel agent patterns
- 17 engineering skills
- Canonical documentation system with 7 templates
- Interrogation-first workflow
- Docker Compose for local Postgres
- VS Code settings + 13 recommended extensions
