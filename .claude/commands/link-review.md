# /link-review — Analyze Autolink Report

Read a dry-run report and flag risky terms before approving a write run.

## Setup
```bash
VAULT="/Users/jaywest/Documents/Obsidian Vault"
```

## When invoked, do this:

1. **Read the latest dry-run report**
```bash
# Find most recent dry-run report
ls -t "$VAULT/scripts/"*dry-run*.md 2>/dev/null | head -1 | xargs cat
```

2. **Flag risky patterns**:

   🔴 **High risk — review carefully:**
   - Any term with > 20 replacements across files (possible over-broad alias)
   - Short aliases (≤3 chars) like "AMS", "ARM", "MCP" — check they're not matching unrelated content
   - Terms appearing in unexpected file paths (e.g., "conductor" matching in a music context)

   🟡 **Medium risk — worth checking:**
   - Terms matching in `projects/` docs where they might already be linked
   - Any term where the match count jumped significantly from a previous run

   🟢 **Low risk — safe to proceed:**
   - All counts are 1 per file (--first-only working correctly)
   - Terms only appear in contextually relevant files
   - No short ambiguous aliases triggering

3. **Produce a recommendation**:
   - List any terms to remove or make `case_sensitive` before write
   - Confirm which terms are safe to apply
   - Give a go/no-go on the write run

4. **If approved, run write**:
```bash
FOLDER="${1:-daily-notes}"
python3 "$VAULT/scripts/autolink.py" \
  --vault "$VAULT" \
  --entity-map "$VAULT/scripts/entity-map.json" \
  --first-only \
  --write \
  --folder "$FOLDER" \
  --report "$VAULT/scripts/write-report.md"

git -C "$VAULT" add . && git -C "$VAULT" commit -m "Apply autolinks to $FOLDER"
echo "✅ Done. $(git -C "$VAULT" log --oneline -1)"
```

## Usage
- `/link-review` — review the most recent dry-run report
- `/link-review [report path]` — review a specific report
