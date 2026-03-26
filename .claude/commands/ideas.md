# /ideas [optional focus area]

Generate startup/product/content ideas grounded in vault patterns.

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"

# Read project context files
for proj in SellerFi MissionControl Twinz AssuranceAgents clawd conductor AMS Claude_sub_agents; do
  $OBS read path="projects/$proj/${proj}-context.md" 2>/dev/null
done

# Inbox and ideas
$OBS files folder="inbox" | while read f; do $OBS read path="$f"; done
$OBS files folder="ideas" | while read f; do $OBS read path="$f"; done

# Search for recurring problems/wishes
$OBS search:context query="wish I had OR need a tool OR missing OR gap OR nobody has built" limit=20
$OBS search:context query="opportunity OR potential OR could build OR what if" limit=20
```

Generate 10 ideas, each grounded in actual vault quotes. Rate: Feasibility (1-5), Vault signal (1-5), Market (S/M/L).
Write to: `ideas/claude-ideas-$(date +%Y-%m-%d).md`
