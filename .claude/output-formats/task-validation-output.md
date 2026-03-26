---
name: Task Validation Output Format
description: Standard output template for the Task Validation Agent.
---

# Task Validation Output Format

The Task Validation Agent MUST produce output in exactly this structure.

---

## VALIDATION REPORT: M{N}-T{N} — {Task Name}

### Result: PASS ✅ | FAIL ❌

---

**If PASS**:

All criteria met. Handoff to next task: M{N}-T{N+1}.

Optional notes (max 2 bullet points if relevant):
- {Minor observation that doesn't block progress}

---

**If FAIL**:

### Failures Found

| # | File | Line | Severity | Issue |
|---|------|------|----------|-------|
| 1 | `src/file.ts` | 42 | CRITICAL / MAJOR / MINOR | {Description} |
| 2 | `src/other.ts` | 17 | MAJOR | {Description} |

**Severity Guide**:
- CRITICAL: Acceptance criteria not met, or will break other tasks
- MAJOR: Code quality or integration issue that must be fixed
- MINOR: Style or improvement suggestion (can be deferred)

### Minimal Fix Required
For each CRITICAL/MAJOR issue, the exact change needed:

**Issue 1**: In `src/file.ts` line 42, replace `{current code}` with `{correct code}` because {reason}.

---

_No vague feedback. Every failure has a file, line number, and specific fix._
