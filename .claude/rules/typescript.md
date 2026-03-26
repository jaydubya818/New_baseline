<important if="working with .ts or .tsx files">
- Use strict TypeScript — no `any` types without explicit justification
- All functions must have explicit return types
- Prefer `interface` over `type` for object shapes (extendability)
- Use discriminated unions for state machines
- Prefer `unknown` over `any` for untyped inputs, then narrow
- Never use non-null assertion `!` without a comment explaining why it's safe
- Error types must be named and extend Error: `class FooError extends Error {}`
</important>
