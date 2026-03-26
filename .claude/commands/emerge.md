# /emerge

Surface ideas the vault implies but never states. Full vault scan for latent patterns.

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"

# Read all project context files
for proj in SellerFi MissionControl Twinz AssuranceAgents clawd conductor AMS Claude_sub_agents Agent_Management_System; do
  $OBS read path="projects/$proj/${proj}-context.md" 2>/dev/null
done

# Read all daily notes
$OBS files folder="daily-notes" | while read f; do $OBS read path="$f"; done

# Read beliefs, ideas, brainstorming
$OBS files folder="beliefs" | while read f; do $OBS read path="$f"; done
$OBS files folder="ideas" | while read f; do $OBS read path="$f"; done
$OBS files folder="Brainstorming" | while read f; do $OBS read path="$f"; done

# Search for recurring themes
for term in "agent" "orchestration" "marketplace" "platform" "API" "DeFi" "crypto" "SBA" "financing"; do
  echo "=== $term ==="; $OBS search query="$term" total
done
```

Find: scattered premises, unnamed patterns, implied next steps, latent products, unarticulated beliefs.
Name each one. Quote the vault notes behind it.
Write output to: `Brainstorming/emerge-$(date +%Y-%m-%d).md`
