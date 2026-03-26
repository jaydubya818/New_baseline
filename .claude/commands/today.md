# /today

Morning review. Pull everything needed to start the day with full context and a clear plan. Uses the CLI directly.

## Exact steps — run these in order:

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"

# 1. Read last 3 daily notes
$OBS files folder="daily-notes" | sort -r | head -3 | while read f; do
  echo "=== $f ==="; $OBS read path="$f"
done

# 2. Read inbox
$OBS files folder="inbox" | while read f; do
  echo "=== $f ==="; $OBS read path="$f"
done

# 3. Get real open tasks (filter out agent template files)
$OBS tasks todo format=tsv | grep -v "Agent_Management_System\|Claude_sub_agents\|conductor\|AMS/_quarantine\|AssuranceAgents\|SellerFi/app/kb"

# 4. Read context files for recently modified projects
$OBS recents | grep "context.md" | head -5 | while read f; do
  $OBS read path="$f" | head -30
done
```

## Then synthesize into this format and append to today's daily note:

```
$OBS daily:append content="## Claude Morning Briefing\n\n**Active focus:** [based on recent notes]\n\n**Real todos today:**\n- [ ] item\n\n**One sentence north star:** [sharp focus for the day]"
```

Output the briefing to the user AND write it to the daily note.
