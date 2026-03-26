# Database Migration Workflow

Handle database schema changes safely with Prisma migrations.

## Pre-Migration Checklist
1. Read current `prisma/schema.prisma`
2. Check for pending migrations: `npx prisma migrate status`
3. Understand what data exists (will this break existing rows?)

## Migration Pattern

### 1. Schema Change
- Edit `prisma/schema.prisma`
- Add indexes for any new WHERE/JOIN columns
- Use `@default()` for new required fields on existing tables
- Consider soft-delete (`deletedAt DateTime?`) over hard-delete

### 2. Generate Migration
```bash
npm run db:migrate -- --name descriptive-migration-name
```

### 3. Verify
- Check the generated SQL in `prisma/migrations/`
- Ensure migration is reversible
- Test with: empty table, single row, realistic volume

### 4. Update Code
- Regenerate client: `npm run db:generate`
- Update affected server actions in `src/server/actions.ts`
- Update affected API routes
- Update Zod schemas in `src/lib/validations.ts`
- Update TypeScript types in `src/types/index.ts`

### 5. Test
- Run `npm run typecheck` — no type errors
- Run `npm run test:unit` — existing tests pass
- Test new queries manually via `npm run db:studio`

### 6. Seed
- Update `prisma/seed.ts` if new models need test data

## Safety Rules
- Never use raw SQL without parameterized queries
- Always use transactions for multi-table writes
- Never drop columns in production without a deprecation period
- Always back up production data before running migrations
- Test migrations against a copy of production data first
