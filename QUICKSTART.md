# Quickstart — 5-Minute Setup

> You just cloned New Baseline. Here's what to do right now.

---

## 1. Clone & Re-Init (1 min)

```bash
git clone https://github.com/jaydubya818/New_baseline.git my-project
cd my-project
rm -rf .git
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

## 2. Install & Start (2 min)

```bash
npm install
docker compose up -d          # Postgres 16 on :5432
cp .env.example .env.local    # then edit .env.local
npm run db:generate && npm run db:push
npm run dev                   # → http://localhost:3000
```

**Minimum .env.local edits:**

- `DATABASE_URL` — use the Docker default: `postgresql://postgres:postgres@localhost:5432/mydb?schema=public`
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32` and paste the result
- `NEXTAUTH_URL` — `http://localhost:3000`

## 3. Personalize (1 min)

```bash
# Set your identity
# Open CLAUDE.md → replace the "CUSTOMIZE" comment with your name
# Open .gstackrc → set profile= to match your project type:
#   product-ui | platform | agent-platform | monorepo-root
```

## 4. Configure MCP Servers (1 min)

```bash
# Option A: Use a profile config
cp mcp-configs/product-ui.json .mcp.json

# Option B: Use all servers
cp .mcp.json.example .mcp.json

# Option C: Interactive (in Claude Code)
# Run: /setup-mcp

# Then replace YOUR_* placeholders with real API keys
```

## 5. You're Ready

```bash
# Start a Claude Code session:
# /session-start    ← warms up context
# /autoplan         ← plan your first feature
```

---

## What to Read Next

| Time              | Read                                                       |
| ----------------- | ---------------------------------------------------------- |
| **Now**           | `CLAUDE.md` — your project's brain                         |
| **First feature** | `docs/DOCS_SYSTEM.md` — the interrogation workflow         |
| **Need a tool?**  | `docs/guides/TOOL_DECISION_MATRIX.md` — "I need X → use Y" |
| **Need a skill?** | `skills/INDEX.md` — "I want to do X → use this skill"      |
| **All guides**    | `docs/guides/INDEX.md` — categorized with quick-find       |
| **Deep dive**     | `README.md` — the complete reference                       |

---

## Common First Commands

| Command          | What It Does                                      |
| ---------------- | ------------------------------------------------- |
| `/session-start` | Load context, warm up                             |
| `/autoplan`      | Plan a feature (CEO + Eng + Security + UX lenses) |
| `/test-gen`      | Write failing tests before code (TDD)             |
| `/review`        | Code review                                       |
| `/qa`            | Browser QA with real Chromium                     |
| `/progress`      | End-of-session update                             |
| `/setup-mcp`     | Configure MCP servers for your profile            |

---

## Profiles Cheat Sheet

| Profile          | Set When Building             |
| ---------------- | ----------------------------- |
| `product-ui`     | User-facing Next.js apps      |
| `platform`       | APIs, services, microservices |
| `agent-platform` | AI agent systems              |
| `monorepo-root`  | Multi-app monorepos           |
| `baseline`       | Default — exploring or unsure |

Set in `.gstackrc`: `profile=product-ui`
