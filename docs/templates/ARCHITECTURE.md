# ARCHITECTURE — [Project Name]

> System design decisions. Updated when major architectural choices are made.
> Run `/autoplan --deep` to update. Run `/cso` after any security-relevant changes.

---

## System Overview

```
[Client]
    ↓ HTTPS
[Next.js App (Vercel)]
    ├── [Auth Layer (NextAuth)]
    ├── [API Routes]
    └── [Server Components]
          ↓
    [Database (PostgreSQL + Prisma)]
```

---

## Key Design Decisions

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| [Area] | [Choice] | [Why] | [Date] |

---

## Data Model (key entities)

```
User
  id, email, role, createdAt

[Entity]
  id, userId (FK), ...
```

---

## Security Architecture

- Auth: [Method]
- Authorization: [Method]
- Data at rest: [Encryption approach]
- Data in transit: TLS everywhere
- API: [Rate limiting, input validation]

---

## Scalability Notes

- [Current approach and known limits]
- [When to revisit]

---

## ADRs (Architecture Decision Records)

### ADR-001: [Title]
- **Date:** [Date]
- **Status:** Accepted
- **Context:** [Why we needed to decide]
- **Decision:** [What we decided]
- **Consequences:** [Trade-offs]
