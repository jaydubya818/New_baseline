# /closeday — End of Day Processing

Capture what happened, process loose threads, seed tomorrow.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
TODAY=$(date +%Y-%m-%d)
MONTH=$(date +%Y-%m)
```

## When invoked, do this:

1. **Read today's note and inbox**
```bash
$OBS read path="daily-notes/${TODAY}.md" 2>/dev/null
$OBS files folder="inbox" 2>/dev/null | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null
done
```

2. **Ask Jay for his captures** (if running interactively):
   - What did you actually work on today?
   - Any decisions made?
   - Ideas worth keeping?
   - What's unfinished that matters?
   - Energy/mood today (1-10)?

3. **Write the EOD entry**:
```bash
EOD="## EOD — $(date '+%H:%M')

### What Actually Happened
[synthesized summary]

### Decisions Made
-

### Open Loops
-

### Tomorrow's Seed
[one concrete thing to start with tomorrow]

### Energy: /10"

$OBS daily:append content="$EOD" 2>/dev/null
echo "✅ EOD written to daily-notes/${TODAY}.md"
```

4. **Archive processed inbox items**:
```bash
$OBS files folder="inbox" 2>/dev/null | while read f; do
  filename=$(basename "$f")
  $OBS move path="$f" newPath="Archive/${MONTH}/${filename}" 2>/dev/null
done
```

## Usage
- `/closeday` — full EOD workflow
- `/closeday quick` — brief EOD summary only
- `/closeday [paste of what you did today]` — process your text into structured EOD note
