# BACKEND_STRUCTURE — [Project Name]

> Database schema, auth logic, API contracts, storage rules.
> AI builds the backend against this blueprint, not its own assumptions.
> Updated by `/document-release`. Run `/cso` after any auth changes.

---

## Database Schema

### Users
```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user', -- 'user' | 'admin'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### [Entity Name]
```sql
CREATE TABLE [entities] (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  [field]     [TYPE] NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_[entities]_user_id ON [entities](user_id);
```

### Prisma Schema Equivalent
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  items     Item[]
}

enum Role {
  USER
  ADMIN
}

model Item {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

---

## Authentication

**Provider:** NextAuth v5
**Strategy:** [Email+Password | OAuth | Magic Link | JWT]

```typescript
// Auth config location: lib/auth.ts
// Session strategy: jwt | database
// Providers: credentials | github | google

// Protected route pattern:
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // ...
}
```

**Roles & Permissions:**
| Role | Permissions |
|------|------------|
| `user` | [permissions] |
| `admin` | [permissions] |

---

## API Endpoint Contracts

### [Resource] Endpoints

```
GET    /api/[resource]          → list (paginated)
GET    /api/[resource]/[id]     → get one
POST   /api/[resource]          → create
PATCH  /api/[resource]/[id]     → update
DELETE /api/[resource]/[id]     → delete (soft or hard)
```

**Response envelope:**
```typescript
// Success
{ data: T, meta?: { page: number, total: number } }

// Error
{ error: string, code?: string, details?: Record<string, string> }
```

**Pagination:**
```
GET /api/[resource]?page=1&limit=20&sort=createdAt&order=desc
```

### Webhook Endpoints (if applicable)
```
POST /api/webhooks/stripe    → Stripe payment events
POST /api/webhooks/[service] → [Service] events
```
All webhooks verify signature before processing.

---

## Server Actions (Next.js App Router)

```typescript
// Location: lib/actions/[feature].ts
'use server'

export async function createItem(data: CreateItemInput) {
  const session = await getServerSession(authConfig)
  if (!session) throw new Error('Unauthorized')

  const validated = createItemSchema.parse(data)
  return await db.item.create({ data: { ...validated, userId: session.user.id } })
}
```

---

## Storage Rules

**File storage:** [Provider — Vercel Blob | S3 | Supabase Storage]

| File type | Max size | Location | Access |
|-----------|----------|----------|--------|
| User avatar | 2MB | `avatars/[userId]/` | Public |
| [Type] | [Size] | `[path]/` | [Access] |

**Rules:**
- Validate file type server-side (not just extension)
- Scan uploads before storing
- User-owned files: always scope by userId before serving

---

## Background Jobs (if applicable)

| Job | Trigger | Frequency | Description |
|-----|---------|-----------|-------------|
| [Job] | Cron | [Schedule] | [Description] |

---

## Error Handling Patterns

```typescript
// API routes: always return structured errors
try {
  const result = await riskyOperation()
  return NextResponse.json({ data: result })
} catch (error) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Validation failed', details: error.flatten() }, { status: 400 })
  }
  console.error('[API][resource]', error)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

---

## Security Rules

- Never trust client-provided IDs without server-side auth check
- All mutations require session + ownership check
- Validate all inputs with Zod before touching the database
- Rate limit all public endpoints
- Log all auth events (login, logout, failed attempts)
- Never expose internal error details to clients
- Webhook endpoints verify signature before any processing
