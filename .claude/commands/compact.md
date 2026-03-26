# Pre-Compact: Save State

Before context compaction, preserve the current working state.

## Steps

1. **Save progress** — Update `progress.txt` with:
   - What was being worked on
   - What's done
   - What's next
   - Any blockers or decisions pending

2. **Save memory** — Check `.claude/memory/MEMORY.md`:
   - Any new architecture decisions this session?
   - Any user corrections to capture?
   - Any new patterns or preferences learned?

3. **Check git state** — Run `git status`:
   - Are there uncommitted changes?
   - Should they be committed before compaction?
   - Stage and commit if work is at a logical stopping point

4. **Context summary** — Write a brief note about:
   - Current file being edited
   - Current task in progress
   - Key context that would be lost

## Output
After saving state, confirm:
- progress.txt updated: yes/no
- Memory updated: yes/no
- Git state: clean/dirty (with details)
- Ready for compaction: yes/no
