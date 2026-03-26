# /drift

Compare stated intentions vs actual behavior over last 60 days.

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"

# All daily notes
$OBS files folder="daily-notes" | sort -r | while read f; do
  echo "=== $f ==="; $OBS read path="$f"
done

# Recently modified files (proxy for actual work)
$OBS recents

# Any goals or priorities notes
$OBS search query="priority OR goal OR focus OR intention" limit=20 format=json
```

Compare stated intentions against what files were actually touched. Find avoidance, surprise intensity, consistent execution. Be direct and uncomfortable. Output: drift report + the one question Jay probably doesn't want to answer.
