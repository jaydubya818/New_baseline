# /schedule — Smart Scheduling Assistant

Turn intentions into a realistic schedule, grounded in vault state.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
TODAY=$(date +%Y-%m-%d)
DAYOFWEEK=$(date +%A)
```

## When invoked, do this:

1. **Load current state**
```bash
$OBS read path="daily-notes/${TODAY}.md" 2>/dev/null
$OBS files folder="daily-notes" 2>/dev/null | sort -r | head -5 | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null
done
$OBS tasks todo format=tsv 2>/dev/null | grep -E "daily-notes|inbox" | grep -v "_quarantine" | head -20
```

2. **Build schedule** using these principles:
   - Deep work blocks in the morning (before 12pm)
   - Maximum 3 "important" things per day
   - Leave 30% buffer for reactive work
   - Place highest-leverage work at energy peak

3. **Output format**:
```
## Schedule — [DAY], [DATE]
**Theme:** [one-word focus]

| Time | Block | Task |
|------|-------|------|
| 8:00–10:00 | 🔴 Deep Work | [top priority] |
| 10:15–12:00 | 🔴 Deep Work | [continuation] |
| 13:00–15:00 | 🟡 Build | [second project] |
| 15:00–16:30 | 🟡 Build | [continuation] |
| 16:30–17:00 | 🟢 Admin | Email, quick decisions |
| 17:00–17:30 | /closeday | EOD review |

**Must ship today:** [1-3 items]
**Punt to tomorrow:** [overflow]
```

4. **Write to today's note**:
```bash
$OBS daily:append content="$SCHEDULE" 2>/dev/null
```

## Usage
- `/schedule` — today's schedule from vault state
- `/schedule tomorrow` — plan tomorrow
- `/schedule week` — weekly block plan
- `/schedule I have [X] free today, what should I work on?`
