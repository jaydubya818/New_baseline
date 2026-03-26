---
name: Plan Review Output Format
description: Standard output template for the Plan Review Agent. Includes reviewed architecture, error registry, and failure modes.
---

# Plan Review Output Format

The Plan Review Agent MUST produce output in exactly this structure.

---

## PLAN REVIEW: {Project Name}

### Review Mode: EXPANSION | HOLD SCOPE | REDUCTION

### System Audit Summary
- Current state: {what exists}
- In-flight work: {branches, stashes, open PRs}
- Relevant pain points: {existing issues that matter}

---

### Premise Challenge Results
- Right problem? {yes/no + reasoning}
- Existing code leverage: {what can be reused}
- Scope assessment: {files touched, services added, complexity rating}

---

### Revised Architecture
_{Include the full architecture output with all agreed changes applied. Same format as architecture-output.md but with review amendments marked.}_

---

### Error & Failure Registry

```
METHOD/CODEPATH              | ERROR TYPE                  | CAUGHT? | RECOVERY              | USER SEES
-----------------------------|-----------------------------|---------|-----------------------|------------------
{path}                       | {specific error type}       | Y/N     | {retry/degrade/throw} | {user message}
```

**CRITICAL GAPS** (CAUGHT=N where it matters):
- {list each with the fix that was agreed}

---

### Failure Modes Map

```
CODEPATH         | FAILURE MODE        | CAUGHT? | TESTED? | USER SEES      | LOGGED?
-----------------|---------------------|---------|---------|----------------|--------
{path}           | {how it fails}      | Y/N     | Y/N     | Error/Silent   | Y/N
```

Any row with CAUGHT=N, TESTED=N, USER SEES=Silent → **CRITICAL GAP**.

---

### Shadow Paths Traced
For each data flow, the four paths (happy, null, empty, error) and their status:

| Data Flow | Happy | Null | Empty | Error | All Handled? |
|-----------|-------|------|-------|-------|-------------|
| {flow}    | OK    | ?    | ?     | ?     | Y/N         |

---

### Security Findings

| # | Finding | Severity | Mitigated? | Action |
|---|---------|----------|------------|--------|
| 1 | {finding} | HIGH/MED/LOW | Y/N | {what to do} |

---

### Deployment & Rollback Plan
- Migration order: {sequence}
- Feature flags needed: {list or none}
- Rollback procedure: {step-by-step}
- Estimated rollback time: {duration}

---

### Observability Requirements
- Logs needed: {list}
- Metrics needed: {list or none}
- Alerts needed: {list or none}

---

### Test Requirements Map

| New Codepath | Test Type | Covers Happy? | Covers Failure? | Covers Edge? |
|-------------|-----------|---------------|-----------------|-------------|
| {path}      | Unit/Int/E2E | Y/N        | Y/N             | Y/N         |

---

### Deferred Items
| # | Item | Why Deferred | Effort | Priority |
|---|------|-------------|--------|----------|
| 1 | {item} | {reason} | S/M/L/XL | P1/P2/P3 |

---

### Review Summary

```
+==============================================================+
|                   PLAN REVIEW SUMMARY                         |
+==============================================================+
| Mode                  | {EXPANSION/HOLD/REDUCTION}            |
| Premise challenged    | {outcome}                             |
| Error paths mapped    | {count}, {gaps} CRITICAL GAPS         |
| Failure modes mapped  | {count}, {gaps} CRITICAL GAPS         |
| Shadow paths traced   | {count} flows, {gaps} unhandled       |
| Security findings     | {count}, {high_count} HIGH            |
| Deployment risks      | {count}                               |
| Tests required        | {count}                               |
| Items deferred        | {count}                               |
| Unresolved decisions  | {count}                               |
+--------------------------------------------------------------+
```

---

_All CRITICAL GAPS must be resolved before handing off to Planning Agent (03)._
