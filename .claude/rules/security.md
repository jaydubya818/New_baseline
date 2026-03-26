<important if="handling auth, secrets, tokens, passwords, or user input">
- Never hardcode secrets — use environment variables
- Never log secrets, tokens, or passwords (even partially)
- Never commit .env files — verify .gitignore includes them
- Sanitize all user input before rendering (XSS prevention)
- Use parameterized queries for all database operations (SQL injection)
- Hash passwords with bcrypt/argon2 — never store plaintext
- Set secure cookie flags: httpOnly, secure, sameSite
- Validate JWT signatures on every protected request
- Check CORS configuration explicitly — never use wildcard in production
</important>
