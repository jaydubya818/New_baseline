# /link-dry-run — Run Autolinker Dry-Run

Generate a dry-run report for a target folder without writing any changes.

## Setup
```bash
VAULT="/Users/jaywest/Documents/Obsidian Vault"
ENTITY_MAP="$VAULT/scripts/entity-map.json"
SCRIPT="$VAULT/scripts/autolink.py"
```

## When invoked, do this:

1. **Git snapshot first** (non-negotiable)
```bash
git -C "$VAULT" add . && git -C "$VAULT" commit -m "Vault snapshot before autolink $(date +%Y-%m-%d)" 2>/dev/null || echo "Nothing to commit"
```

2. **Run the dry-run**
```bash
FOLDER="${1:-daily-notes}"  # default to daily-notes if no arg given
REPORT="$VAULT/scripts/dry-run-${FOLDER//\//-}.md"

python3 "$SCRIPT" \
  --vault "$VAULT" \
  --entity-map "$ENTITY_MAP" \
  --first-only \
  --folder "$FOLDER" \
  --report "$REPORT"

echo "Report: $REPORT"
```

3. **Read and display the report**
```bash
cat "$REPORT"
```

4. **Ask for review before proceeding**
Present the report to Jay and ask:
- Any terms that look risky or match things they shouldn't?
- Any terms matching too many files (potential false positives)?
- Ready to run the write pass, or need entity-map adjustments first?

## Usage
- `/link-dry-run` — dry-run on daily-notes (default)
- `/link-dry-run 04 - Concepts` — dry-run on concepts folder
- `/link-dry-run projects/MissionControl` — dry-run on a project folder
- `/link-dry-run Plans` — dry-run on Plans folder

## Next Step After Reviewing
Run `/link-review` to analyze the report, or proceed to write with:
```bash
python3 "$SCRIPT" --vault "$VAULT" --entity-map "$ENTITY_MAP" --first-only --write --folder "$FOLDER" --report "$VAULT/scripts/write-report.md"
git -C "$VAULT" add . && git -C "$VAULT" commit -m "Apply autolinks to $FOLDER"
```
