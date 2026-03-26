# /trace [keyword]

Trace how an idea has evolved across the vault over time.

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
TERM="[keyword from user]"

# Find all files mentioning the term
$OBS search:context query="$TERM" format=json limit=50

# Also search file names
$OBS files | grep -i "$TERM"
```

Sort results by file date. Read each. Build a timeline of how the idea evolved — first appearance, turning points, current state.

Output: timeline + unconscious patterns + recommended next step.
Write the trace to: `Brainstorming/trace-[keyword]-$(date +%Y-%m-%d).md`
