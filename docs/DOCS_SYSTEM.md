# The Documentation System

> **Rule:** Documentation before code. Always. No exceptions.
> This system eliminates AI hallucinations by eliminating ambiguity.

---

## The Problem This Solves

AI hallucinates when your clarity ends.

Every time you say "build me a dashboard" without specifying what's in it, what data it shows, who sees it, and what they can do — the AI invents answers. Those invented answers stack up. By the time you notice something is wrong, you're 3 features deep in the wrong direction.

The fix is to extend your clarity before the AI starts building.

**Interrogation → Documentation → Code. Never skip these steps.**

---

## Phase 1: Interrogation (Before Writing Anything)

Before you write a single doc, make AI tear your idea apart.

### The Interrogation Prompt

```
Before writing any code or documentation, interrogate my idea in planning mode only.
Assume nothing. Ask me questions until there are no assumptions left.
Do not stop until you have enough clarity to write a complete PRD with no gaps.

My idea: [your idea in one sentence]
```

### What AI Must Uncover

AI should not stop until it can answer all of these:

**Product**
- Who exactly is this for? (job title, context, frequency of use)
- What is the ONE core action this product enables?
- What does success look like for the user after they complete that action?
- What is explicitly OUT of scope for v1?

**Data**
- What data gets created? Who owns it?
- What data gets displayed? Where does it come from?
- What persists between sessions? What is ephemeral?
- What data is sensitive? How is it protected?

**Flows**
- What happens on success? (step by step)
- What happens on error? (every error case)
- What happens when a user comes back the next day?
- What flows require authentication?

**Technical**
- Does it need a database? What kind?
- Does it need real-time updates?
- Does it need to work on mobile?
- What integrations are required (payments, email, OAuth)?
- What are the performance requirements?

**Business**
- How does this make money (or save money)?
- What does the MVP absolutely need to launch?
- What's the success metric for the first 30 days?

### When to Stop Interrogating

Stop when you can say: "I could write a detailed spec right now with no gaps."
If you feel uncertainty about any user flow, data model, or feature — keep going.

---

## Phase 2: The Six Canonical Docs

Once interrogation is complete, generate all six docs at once:

### The Generation Prompt

```
Based on our interrogation, generate my complete canonical documentation:

1. PRD.md — Product requirements, user stories, features (P0/P1/P2), success criteria, non-goals
2. APP_FLOW.md — Every page, every navigation path, decision points, error paths, screen inventory
3. TECH_STACK.md — Every dependency locked to exact version, forbidden deps, env vars, commands
4. FRONTEND_GUIDELINES.md — Complete design system: fonts, colors (exact hex), spacing, components
5. BACKEND_STRUCTURE.md — Full DB schema (SQL + Prisma), auth logic, API contracts, storage rules
6. IMPLEMENTATION_PLAN.md — Step-by-step build sequence, numbered to the subtask level

Use our conversation as the source material. Be specific and exhaustive. No ambiguity.
Cross-reference between docs (PRD features → APP_FLOW screens → BACKEND endpoints).
```

### What Each Doc Does

| Doc | Answers | AI Uses It To |
|-----|---------|---------------|
| `PRD.md` | What and why | Know what "done" looks like |
| `APP_FLOW.md` | How users move | Not guess navigation and flows |
| `TECH_STACK.md` | Exact tools and versions | Not hallucinate dependencies |
| `FRONTEND_GUIDELINES.md` | Every visual decision | Not invent colors and spacing |
| `BACKEND_STRUCTURE.md` | Data model and API contracts | Build against a blueprint |
| `IMPLEMENTATION_PLAN.md` | Build order | Execute in the right sequence |

### How They Cross-Reference

```
PRD.md (feature list)
  → APP_FLOW.md (how users access each feature)
  → BACKEND_STRUCTURE.md (what data each feature needs)
  → FRONTEND_GUIDELINES.md (how each feature looks)
  → IMPLEMENTATION_PLAN.md (what order to build each feature)
  → TECH_STACK.md (what tools implement each feature)
```

---

## Phase 3: The Two Session Files

These are not part of the knowledge base — they are the persistence layer.

### CLAUDE.md

The file AI reads first automatically every session.

**Contains:**
- Project identity (name, purpose, current phase)
- Tech stack summary (link to TECH_STACK.md for full detail)
- Naming conventions and file structure
- What's allowed and what's forbidden
- gstack workflow (autoplan → code → review → qa → document-release)
- The session startup sequence

**Rule:** Never let this file become stale. If a convention changes, update CLAUDE.md immediately.

### progress.txt

AI has no memory between sessions. This file is your external memory bridge.

**Contains:**
- What was built last session
- What is currently in progress
- What is broken or blocked
- What to do next

**Rule:** Update at the end of EVERY session. Use `/progress` to automate this.

Without `progress.txt`, every session starts from zero context. With it, AI picks up where you left off.

---

## The Complete Pre-Code Sequence

```
Step 1: Interrogation
  → Prompt: "Interrogate my idea. Assume nothing. Ask until no gaps remain."
  → Continue until you have full clarity
  → Should take 10-30 minutes for a real product

Step 2: Doc Generation
  → Prompt: "Generate all 6 canonical docs from our conversation"
  → Review each doc — push back on anything vague or wrong
  → Docs should be specific enough that a stranger could build from them

Step 3: CLAUDE.md Setup
  → Copy template from docs/templates/
  → Fill in project-specific rules and context
  → Add the gstack workflow section

Step 4: progress.txt
  → Start it with "Session 1: Initialized project docs"
  → List the 6 docs as completed

Step 5: First /autoplan
  → Run /autoplan with docs as context
  → This generates IMPLEMENTATION_PLAN.md if not already done
  → Adversarial review confirms the plan is sound

Step 6: /test-gen
  → Write failing tests for first feature before any code

Step 7: Code
  → CC implements against the tests
  → 100% coverage on new code

Step 8: /review --dual-model → /qa → /document-release → /progress
```

---

## Maintaining the Docs

### After Every Feature
Run `/document-release` which:
1. Diffs what changed vs. what the docs say
2. Updates APP_FLOW.md for new/modified flows
3. Updates BACKEND_STRUCTURE.md for schema changes
4. Updates IMPLEMENTATION_PLAN.md task status
5. Updates progress.txt

### When Docs Conflict With Code
**Docs win.** If the code doesn't match the docs, update the code — not the docs.
Unless the docs were wrong, in which case: update docs first, then code, then re-test.

### Signs Your Docs Are Stale
- AI asks questions the docs should answer
- AI makes different choices each session for the same thing
- You're unsure what the current state of a feature is
- progress.txt is more than 3 sessions behind

---

## Templates

All 6 canonical docs + CLAUDE.md + progress.txt templates live in `docs/templates/`.

Copy them at project start:
```bash
cp docs/templates/PRD.md docs/PRD.md
cp docs/templates/APP_FLOW.md docs/APP_FLOW.md
cp docs/templates/TECH_STACK.md docs/TECH_STACK.md
cp docs/templates/FRONTEND_GUIDELINES.md docs/FRONTEND_GUIDELINES.md
cp docs/templates/BACKEND_STRUCTURE.md docs/BACKEND_STRUCTURE.md
cp docs/templates/IMPLEMENTATION_PLAN.md docs/IMPLEMENTATION_PLAN.md
```
