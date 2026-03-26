# Auto-Dream: Memory Consolidation

Consolidate and clean up project memory files. This is the manual trigger for the auto-dream system that normally runs automatically every 24h + 5 sessions.

## Process

You are now in **memory consolidation mode**. Your goal is to improve the quality of memory, not add to it.

### Phase 1 — Orientation
1. Read `.claude/memory/MEMORY.md` to understand current organization
2. List all files in `.claude/memory/`
3. Read each topic file

### Phase 2 — Gather Signal
Search recent session activity for:
- User corrections and redirects ("no, I meant...", "actually...", "don't do that")
- Explicit memory saves ("remember this", "note that")
- Recurring patterns across sessions
- Architecture decisions
- Workflow changes

Use targeted grep, not full transcript reads.

### Phase 3 — Consolidate
For each memory entry:
- Convert relative dates ("yesterday") to absolute dates (YYYY-MM-DD)
- Remove contradicted or superseded information (keep the latest)
- Prune stale debugging notes referencing deleted files
- Merge duplicate entries into single, cleaner versions
- Remove low-signal observations that haven't recurred

### Phase 4 — Prune and Index
1. Update `MEMORY.md` index — keep it under 200 lines
2. Remove stale topic references
3. Reorganize by relevance (most-used topics first)
4. Add timestamp: `*Last consolidated: YYYY-MM-DD*`

## Safety Rules
- **Read-only for project code** — only modify files in `.claude/memory/`
- **Never delete topic files** — merge them instead
- **Preserve user corrections** — these are highest signal
- **Keep architecture decisions** — these rarely go stale
- **When in doubt, keep it** — false negatives are worse than false positives

## Output
After consolidation, report:
- Files reviewed
- Entries removed (with reason)
- Entries merged
- New topics created
- MEMORY.md line count (must be < 200)
