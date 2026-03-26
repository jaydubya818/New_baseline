<important if="working with API routes, endpoints, or serverless functions">
- Validate all inputs at the boundary (zod/joi/yup) — never trust client data
- Return consistent error shapes: `{ error: string, code: string, details?: unknown }`
- Rate limit sensitive endpoints (auth, payment, admin)
- Log request ID, duration, status code, and error name for every response
- Auth middleware runs before business logic — never inline auth checks
- API responses must handle: success, validation error, auth error, not found, server error
- Document expected request/response shapes in comments or schema files
</important>
