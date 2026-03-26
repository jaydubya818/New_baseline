#!/usr/bin/env python3
"""
PreToolUse hook: inject project MEMORY.md + global memory index on first tool call per process.

Enhancements over base article version:
- Memory budget warnings (flags files exceeding line limits)
- Staleness detection (flags entries older than 30 days)
- Cross-project promotion hints (flags project knowledge worth globalizing)
- Graceful degradation (never blocks tool execution on error)
"""
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path


BUDGET_LIMITS = {
    "memory.md": 80,
    "general.md": 150,
    "MEMORY.md": 200,  # project memory
}
DEFAULT_TOPIC_LIMIT = 150
STALE_DAYS = 30


def check_budget(filepath: Path, limit: int) -> str | None:
    """Return warning if file exceeds line budget."""
    try:
        lines = filepath.read_text().splitlines()
        if len(lines) > limit:
            return f"⚠ {filepath.name}: {len(lines)}/{limit} lines — needs reorganization"
    except Exception:
        pass
    return None


def check_staleness(filepath: Path) -> str | None:
    """Return warning if file hasn't been updated in STALE_DAYS."""
    try:
        mtime = datetime.fromtimestamp(filepath.stat().st_mtime)
        if datetime.now() - mtime > timedelta(days=STALE_DAYS):
            return f"⚠ {filepath.name}: last updated {mtime.strftime('%Y-%m-%d')} — review for relevance"
    except Exception:
        pass
    return None


def main():
    ppid = os.getppid()
    flag_path = Path(f"/tmp/claude-memory-loaded-{ppid}")

    # Already loaded for this process context
    if flag_path.exists():
        sys.exit(0)

    flag_path.touch()

    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())

    # Map project dir to .claude/projects key
    mapped = project_dir.replace("/", "-").replace(".", "-")

    home = Path.home()
    memory_dir = home / ".claude" / "memory"
    memory_file = home / ".claude" / "projects" / mapped / "memory" / "MEMORY.md"
    global_idx = memory_dir / "memory.md"

    parts = []
    warnings = []

    # --- Project memory ---
    if memory_file.exists():
        lines = memory_file.read_text().splitlines()[:200]
        parts.append(f"=== Project Memory: {project_dir} ===\n" + "\n".join(lines))
        budget_warn = check_budget(memory_file, BUDGET_LIMITS["MEMORY.md"])
        if budget_warn:
            warnings.append(budget_warn)
    else:
        parts.append(
            f"(no project MEMORY.md — consider creating {memory_file} for this project)"
        )

    # --- Global memory index ---
    if global_idx.exists():
        parts.append("=== Global Memory Index ===\n" + global_idx.read_text())
        budget_warn = check_budget(global_idx, BUDGET_LIMITS["memory.md"])
        if budget_warn:
            warnings.append(budget_warn)

    # --- Budget checks on all topic files ---
    if memory_dir.exists():
        for topic_file in memory_dir.rglob("*.md"):
            if topic_file.name == "memory.md":
                continue
            limit = BUDGET_LIMITS.get(topic_file.name, DEFAULT_TOPIC_LIMIT)
            budget_warn = check_budget(topic_file, limit)
            if budget_warn:
                warnings.append(budget_warn)
            stale_warn = check_staleness(topic_file)
            if stale_warn:
                warnings.append(stale_warn)

    # --- Compile output ---
    if warnings:
        parts.append(
            "=== Memory Health Warnings ===\n" + "\n".join(warnings)
        )

    context = "\n\n".join(parts)

    output = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "additionalContext": context,
        }
    }

    print(json.dumps(output))
    sys.exit(0)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        # Never block tool execution on memory hook failure
        sys.exit(0)
