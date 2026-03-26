---
name: Task Breakdown Output Format
description: Standard output template for the Task Breakdown Agent.
---

# Task Breakdown Output Format

The Task Breakdown Agent MUST produce output in exactly this structure.

---

## TASK BREAKDOWN: Milestone {N} — {Milestone Name}

### Context
- Architecture doc: {path}
- Milestone goal: {one sentence}
- Inputs from previous milestone: {list key files/interfaces this milestone receives}

---

### M{N}-T1: {Task Name}

**File**: `src/path/to/file.ts`
**Target**: `functionName(params: Type): ReturnType`
**Complexity**: S/M/L

**Acceptance Criteria**:
1. {Observable, testable outcome}
2. {Observable, testable outcome}
3. (optional third criterion)

**Scope Limit**: This task does NOT handle {explicitly excluded thing}.

**Dependencies**: M{N}-T{prev} must be complete first. _(or "none" if first task)_

---

_(repeat for each task, max 8 tasks per milestone)_

### Blocked Tasks
| Task ID | Blocked By | Resolution Needed |
|---------|------------|-------------------|
| M{N}-T{x} | {reason} | {what needs to be clarified} |

---

_Tasks are ordered. No forward references. Each task is implementable in one sitting._
