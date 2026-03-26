<important if="working with Prisma, SQL, database schemas, or migrations">
- Every Prisma write must be in try-catch with a named error
- Always check for existing records before create (upsert or findFirst)
- Migrations must be reversible — provide both up and down
- Add indexes for any column used in WHERE, JOIN, or ORDER BY
- Use transactions for multi-table writes
- Never use raw SQL without parameterized queries (SQL injection prevention)
- Test with empty tables, single row, and realistic volume
</important>
