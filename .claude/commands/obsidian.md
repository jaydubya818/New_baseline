# /obsidian

Primary interface to Jay's Obsidian vault. Use the CLI for all operations — it's faster and more capable than the REST API.

## CLI Binary
```
/Applications/Obsidian.app/Contents/MacOS/obsidian-cli
```
Alias it in commands as: `OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"`

## REST API (fallback / bulk reads)
- URL: `http://localhost:27124`
- Key: `69838b03445fe49a02ed01677d4270c2f547b90021a3766c75f195dc4b082a62`

## Vault path: `/Users/jaywest/Documents/Obsidian Vault/`

## Correct folder paths (all lowercase)
- Daily notes: `daily-notes/YYYY-MM-DD.md`
- Inbox: `inbox/`
- Projects: `projects/[ProjectName]/`
- Ideas: `ideas/`
- Beliefs: `beliefs/`
- Meetings: `meetings/`
- People: `people/`
- Domains: `domains/`
- Templates: `templates/`
- Brainstorming: `Brainstorming/`

## Key CLI commands

```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"

# Read / Search
$OBS read path="daily-notes/2026-03-24.md"
$OBS daily:read
$OBS search query="term" limit=20 format=json
$OBS search:context query="term" limit=10

# Write
$OBS daily:append content="## New Section\n- item"
$OBS append path="inbox/note.md" content="more content"
$OBS create path="ideas/my-idea.md" content="# Idea..."

# Vault intelligence
$OBS tasks todo format=json
$OBS tasks todo format=tsv | grep -v "projects/Agent_Management_System\|projects/Claude_sub_agents\|projects/conductor\|projects/AMS"
$OBS orphans
$OBS tags counts sort=count
$OBS backlinks path="note.md"

# Project files
$OBS files folder="projects/SellerFi" total
$OBS read path="projects/SellerFi/SellerFi-context.md"
```

## When asked to work with vault:
1. Always check CLAUDE.md first: `$OBS read path="CLAUDE.md"`
2. Use CLI search before reading files
3. Filter out template/agent-doc tasks when looking at Jay's real todos
4. Jay's real personal notes are sparse — vault is early-stage. Project docs are rich.
5. Write results back to vault when the user asks for a summary or note

## ⚠️ CLI Write Command Note
The CLI does NOT have a `write` command. Use these alternatives:

### Create a new note (REST API)
```bash
curl -s -X POST "http://localhost:27124/vault/<path/to/note.md>" \
  -H "Authorization: Bearer 69838b03445fe49a02ed01677d4270c2f547b90021a3766c75f195dc4b082a62" \
  -H "Content-Type: text/markdown" \
  -d "<markdown content>"
```

### Append to existing note (CLI — works fine)
```bash
$OBS append path="<path>" content="<content>"
# or
$OBS daily:append content="<content>"
```

### Create note via CLI (no body content)
```bash
$OBS create path="<path/to/note.md>"
# then append content separately
$OBS append path="<path/to/note.md>" content="<content>"
```
