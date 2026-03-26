# /link-scan — Propose New Entity Map Entries

Scan vault folders for frequently repeated concepts, project names, and system names that aren't yet in entity-map.json.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
VAULT="/Users/jaywest/Documents/Obsidian Vault"
ENTITY_MAP="$VAULT/scripts/entity-map.json"
```

## When invoked, do this:

1. **Load current entity map**
```bash
cat "$ENTITY_MAP"
```

2. **Scan for repeated terms** not yet in the map
```bash
# Look for capitalized terms repeated across notes
$OBS search query="[A-Z][a-z]+" 2>/dev/null | head -50

# Check recent daily notes and plans for new terminology
$OBS files folder="daily-notes" 2>/dev/null | sort -r | head -7 | while read f; do
  $OBS read path="$f" 2>/dev/null
done
$OBS files folder="Plans" 2>/dev/null | while read f; do
  $OBS read path="$f" 2>/dev/null | head -30
done
```

3. **Propose additions** in this format:
```json
"NewTerm": {
  "target": "[[NewTerm]]",
  "aliases": ["alias if any"],
  "case_sensitive": false
}
```

## Rules from the guide
- Only add specific terms (project names, system names, repeated domain concepts)
- Never add generic English words
- Short aliases (2-3 chars) must have `"case_sensitive": true`
- Test aliases on dry-run before adding permanently
- Human review required before any write to entity-map.json

## Usage
- `/link-scan` — scan the full vault and propose new entities
- `/link-scan daily-notes` — scan just daily notes for new terminology
- `/link-scan [project name]` — scan a specific project folder
