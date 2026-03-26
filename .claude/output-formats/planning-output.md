---
name: Planning Output Format
description: Standard output template for the Planning Agent.
---

# Planning Output Format

The Planning Agent MUST produce output in exactly this structure.

---

## PROJECT PLAN: {Project Name}

### Milestone 1 — Skeleton (S)
**Goal**: App boots, folder structure matches architecture, all modules export empty stubs, one smoke test passes.
**Depends on**: nothing

| ID | Task | Complexity | File(s) |
|----|------|------------|---------|
| M1-T1 | Scaffold folder structure | S | all top-level dirs |
| M1-T2 | Create empty exports for {module} | S | src/{module}/index.ts |
| M1-T3 | Add smoke test | S | tests/smoke.test.ts |

---

### Milestone 2 — {Feature Name} (M)
**Goal**: {One sentence describing the observable outcome}
**Depends on**: M1 complete

| ID | Task | Complexity | File(s) |
|----|------|------------|---------|
| M2-T1 | {Task description} | S/M/L | src/.../filename.ts |

---

_(repeat for each milestone, max 5 milestones total)_

### Complexity Key
- S = Small: under 50 lines, isolated change
- M = Medium: 50-150 lines, touches 2-3 files
- L = Large: 150+ lines, consider splitting
- XL = Flag for review before starting

---

_First milestone is always skeleton only. No milestone has more than 6 tasks._
