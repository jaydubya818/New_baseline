---
name: Architecture Output Format
description: Standard output template for the Architecture Agent.
---

# Architecture Output Format

The Architecture Agent MUST produce output in exactly this structure.

---

## ARCHITECTURE DECISION: {Project Name}

### Stack
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Runtime | ... | ... |
| Framework | ... | ... |
| Database | ... | ... |
| Auth | ... | ... |

### Folder Structure
```
project-root/
├── src/
│   ├── {module}/
│   │   ├── index.ts       # public exports only
│   │   ├── types.ts       # interfaces and types
│   │   └── ...
├── tests/
├── docs/
└── package.json
```

### Data Models
```typescript
// List primary entities with field names and types
interface EntityName {
  id: string;
  // ...fields
}
```

### Service Boundaries
- **{ServiceName}**: Responsible for X. Owns: file1.ts, file2.ts. Exposes: functionA(), functionB().
- _(repeat for each service/module)_

### API Contracts
```
POST /endpoint
Body: { field: type }
Response: { field: type }
Errors: 400 (reason), 401 (reason)
```
_(list all external interfaces)_

### Security Surface
- **New attack vectors**: {new endpoints, params, file uploads, background jobs}
- **Auth boundaries**: {which routes are public, which require auth, which require specific roles}
- **Input validation**: {where user input enters the system, how it's validated}
- **Secrets required**: {list env vars for credentials, with dummy examples}

### Rollback Posture
- **Migration reversibility**: {can DB migrations be rolled back? Are they backward-compatible?}
- **Feature flags**: {which parts should be flagged for staged rollout? List or "none"}
- **Rollback procedure**: {git revert? flag toggle? migration rollback?}
- **Deploy-time risk**: {what breaks if old code and new code run simultaneously?}

### Observability Requirements
- **Key logs**: {what log lines tell you the system is working vs. broken}
- **Error context**: {what gets logged on failure — user ID, request ID, input summary}
- **Health checks**: {endpoints or signals for monitoring}

### Open Questions
- [ ] {Question that needs product/business input before implementation can begin}

### Decisions Made
- {Decision}: Chose X over Y because Z. Trade-off accepted: [trade-off].

---

_No ambiguity allowed. Every item above must be filled in before review begins. Hand off to Plan Review Agent (02)._
