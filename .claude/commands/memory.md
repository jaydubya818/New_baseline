# /memory — Memory Management Command

Manage the structured memory system. Supports these subcommands:

## Usage: /memory [subcommand]

### /memory status
Show memory health: file count, total lines, budget usage per file, staleness warnings.
Read `~/.claude/memory/memory.md` and scan all `*.md` files in `~/.claude/memory/`.
For each file, report: name, line count, budget limit, % used, last modified date.
Flag any file over budget or stale (>30 days since last update).

### /memory search [query]
Search across all memory files (global + current project) for the given query.
Use grep/ripgrep across `~/.claude/memory/` and the current project's `MEMORY.md`.
Show matching lines with file paths.

### /memory reorganize
1. Read all memory files (global + project)
2. Remove duplicates and outdated entries
3. Merge entries that belong together
4. Split files that cover too many topics (>150 lines)
5. Re-sort entries by date within each file
6. Update memory.md index
7. Show summary of what changed

**IMPORTANT**: Run in plan mode. Show proposed changes before executing. Never delete without confirmation.

### /memory promote [topic]
Check if a domain topic has enough accumulated knowledge to become a skill.
If the topic file has >100 entries or covers multiple distinct subtopics:
1. Suggest creating a skill in `~/.claude/skills/[topic]/`
2. Convert the memory file to a 3-line pointer to the skill
3. Update memory.md index

### /memory init
Initialize MEMORY.md for the current project if it doesn't exist.
Template:
```
# {Project Name} — Project Memory

## Global Memory
Read ~/.claude/CLAUDE.md for memory rules and topic files.

## Project Notes
(Populated as you work in this project)

## Key Decisions

## Known Issues

## Verification Commands
```

### /memory diff [days]
Show what changed in memory files in the last N days (default: 7).
Use git log or file timestamps to show additions, removals, and modifications.
