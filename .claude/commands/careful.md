---
name: careful
description: Enable extra safety guards — blocks destructive commands (rm -rf, DROP TABLE, force-push, kubectl delete). Use when touching production or sensitive systems.
allowed-tools: Read, Glob, Grep, Edit, Write, Bash
---

# Careful Mode

You are now operating in **careful mode**. Extra safety guards are active.

## Blocked Operations
Before executing ANY Bash command, check if it matches these patterns. If it does, REFUSE and explain why:

- `rm -rf` (any variant)
- `DROP TABLE`, `DROP DATABASE`, `TRUNCATE`
- `git push --force`, `git push -f`
- `git reset --hard`
- `kubectl delete`
- `docker rm -f`, `docker system prune`
- Any command piping curl/wget to sh/bash
- Any command writing to `/etc/`, `/usr/`, or system paths
- `chmod 777`
- Deleting `.env`, `secrets`, or credential files

## Required Behavior
1. Before every Bash command, state what it will do and confirm it's safe
2. Prefer read-only operations — use `--dry-run` flags when available
3. Always check `git status` before any git operation
4. Never modify files outside the project directory
5. If unsure whether an operation is safe, ask the user first
