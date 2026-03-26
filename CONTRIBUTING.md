# Contributing

## Getting Started

```bash
# 1. Clone and install
git clone https://github.com/jaydubya818/New_baseline.git
cd New_baseline
npm install

# 2. Start local database
docker compose up -d

# 3. Set up environment
cp .env.example .env.local
# Fill in .env.local values

# 4. Set up database
npm run db:generate
npm run db:push
npm run db:seed

# 5. Start dev server
npm run dev
# → http://localhost:3000

# 6. Initialize gstack browser (one-time)
cd skills/gstack && ./setup && cd ../..
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — protected, requires PR + CI green |
| `develop` | Integration branch (optional) |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `chore/*` | Maintenance, deps, config |
| `docs/*` | Documentation only |

## Commit Convention

```
feat: add stripe webhook handler
fix: resolve null ref in UserCard
chore: update prisma schema
docs: update API docs
test: add auth flow E2E tests
```

One logical change per commit. CI enforces this via the commit-msg Husky hook.

## Workflow (Jay's Pattern)

Before writing any code:
1. **Interrogate** — "Interrogate my idea. Assume nothing. Ask until no gaps remain."
2. **Document** — Update the relevant canonical docs in `docs/`
3. **Plan** — `/autoplan --adversarial`
4. **Test-first** — `/test-gen` → write failing tests
5. **Code** — make tests green
6. **Review** — `/review --dual-model`
7. **QA** — `/qa` (real browser)
8. **PR** — use the PR template, all checkboxes must pass

## Running Tests

```bash
npm run test:unit          # Vitest unit tests
npm run test:unit:watch    # Watch mode
npm run test:coverage      # With coverage report
npm run test:e2e           # Playwright E2E (starts dev server)
npm run test:e2e:ui        # Playwright UI mode
```

## Code Quality

```bash
npm run typecheck    # TypeScript strict check
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier
npm run format:check # Prettier check (no write)
npm run secrets:scan # Check for committed secrets
```

Husky enforces lint-staged on pre-commit and typecheck on pre-push automatically.

## Database

```bash
npm run db:generate    # Generate Prisma client after schema changes
npm run db:push        # Push schema to dev DB (no migration file)
npm run db:migrate     # Create and apply migration (use for real changes)
npm run db:seed        # Seed dev data
npm run db:studio      # Open Prisma Studio UI
npm run db:reset       # Reset dev DB (deletes all data)
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc — components go to src/components/ui/
```

## Skills Reference

| Task | Command |
|------|---------|
| Start session | `/session-start` |
| Plan a feature | `/autoplan --adversarial` |
| Write tests first | `/test-gen` |
| Review before PR | `/review --dual-model` |
| QA in browser | `/qa` |
| Security gate | `/cso` |
| Update docs | `/document-release` |
| Close session | `/progress` |
| Shape product | `bmad-product-brief` |
| Execute tasks | `/gsd:execute-phase` |
