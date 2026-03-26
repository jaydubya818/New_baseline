---
name: Context Output Format
description: Standard output template for the Context Manager Agent.
---

# Context Output Format

The Context Manager Agent MUST produce output in exactly this structure. Total output MUST be under 400 tokens.

---

## CONTEXT BRIEF: M{N}-T{N} — {Task Name}

### Read These Files
1. `src/path/to/file.ts` — reason (e.g. "contains UserService interface this task implements")
2. `src/path/to/other.ts` — reason

### Ignore These Files
- `src/unrelated/` — not needed for this task
- `tests/integration/` — unit test only

### Inlined Contracts
```typescript
// Paste the exact interface/type this task must conform to
interface RelevantInterface {
  method(param: Type): ReturnType;
}
```

### Watch-Outs
- {Known gotcha}: e.g. "userId is UUID string, not integer"
- {Existing pattern}: e.g. "all errors throw AppError, not native Error"

---

_Under 400 tokens. No summaries. No prose. Minimum viable context only._
