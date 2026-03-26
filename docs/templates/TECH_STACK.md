# TECH_STACK — [Project Name]

> Single source of truth for all versions, deps, and infra.
> Updated by `/document-release`. Never let this drift from package.json.

---

## Core Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16.x | App Router, RSC, Server Actions |
| Language | TypeScript | 5.x | Strict mode |
| Database | PostgreSQL + Prisma | 6.x | |
| Auth | NextAuth | v5 beta | |
| Payments | Stripe | latest | |
| UI | Tailwind CSS + shadcn/ui | | |
| Deployment | Vercel | | |

> Update this table to match your actual stack before starting development.

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "16.x",
    "react": "19.x",
    "@prisma/client": "6.x"
  },
  "devDependencies": {
    "typescript": "5.x",
    "vitest": "latest",
    "@playwright/test": "latest"
  }
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | NextAuth secret |
| `NEXTAUTH_URL` | Yes | App URL |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook secret |

---

## Forbidden Dependencies

- Redux (use Zustand or Context)
- Axios (use native fetch)
- Moment.js (use date-fns or dayjs)
- Lodash (use native JS)
- Bootstrap / Material-UI (use Tailwind + shadcn)

---

## Infrastructure

| Service | Provider | Notes |
|---------|----------|-------|
| Hosting | Vercel | |
| Database | [Provider] | |
| Auth | [Provider] | |
| Storage | [Provider] | |
| Email | [Provider] | |

---

## Commands

```bash
npm run dev          # Start development
npm run build        # Production build
npm run test         # Run unit tests
npm run test:e2e     # Run Playwright E2E
npm run lint         # Lint
npm run type-check   # TypeScript check
```
