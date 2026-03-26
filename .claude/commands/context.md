# /context

Load full vault state. Run at start of any session.

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"

# Vault health snapshot
$OBS vault
$OBS files total
$OBS tasks todo total
$OBS orphans total

# Read owner context
$OBS read path="CLAUDE.md"

# Last 3 daily notes
$OBS files folder="daily-notes" | sort -r | head -3 | while read f; do
  $OBS read path="$f"
done

# Inbox
$OBS files folder="inbox" | while read f; do $OBS read path="$f"; done

# All project context files
for proj in SellerFi MissionControl Twinz AssuranceAgents clawd conductor AMS Claude_sub_agents; do
  $OBS read path="projects/$proj/${proj}-context.md" 2>/dev/null | head -25
done
```

Synthesize into a Current State Briefing. Output it, and ask "What do you want to work on?"
