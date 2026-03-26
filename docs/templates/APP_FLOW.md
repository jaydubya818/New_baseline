# APP_FLOW — [Project Name]

> User flows and screens. Updated by `/document-release` after code changes.
> Do not let this drift from the actual app.

---

## Authentication Flow

```
Landing → Sign Up / Sign In
  Sign Up: email + password → verify email → onboarding → dashboard
  Sign In: email + password → MFA (if enabled) → dashboard
  Forgot Password: email → reset link → new password → sign in
```

---

## Core User Flow

```
[Entry point]
  → [Step 1]
  → [Step 2: decision point]
      ├── [Path A]
      └── [Path B]
  → [Outcome]
```

---

## Screens Inventory

| Screen | Route | Auth Required | Description |
|--------|-------|---------------|-------------|
| Landing | `/` | No | [Description] |
| Dashboard | `/dashboard` | Yes | [Description] |
| [Screen] | `/route` | Yes/No | [Description] |

---

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/[resource]` | Yes | [Description] |
| POST | `/api/[resource]` | Yes | [Description] |

---

## State Transitions

```
[State A] → [Event] → [State B]
[State B] → [Event] → [State C]
```

---

## Error States

| Error | User-facing message | Recovery |
|-------|--------------------|---------:|
| [Error] | [Message] | [Action] |
