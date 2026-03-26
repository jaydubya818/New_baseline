# /graduate — Promote Raw Notes to Polished Assets

Take rough captures and turn them into something shareable, publishable, or buildable.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
MONTH=$(date +%Y-%m)
```

## When invoked, do this:

1. **Find graduating candidates**
```bash
$OBS files folder="inbox" 2>/dev/null | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null
done
$OBS files folder="ideas" 2>/dev/null | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null
done
$OBS search query="status: draft OR #draft OR #wip" 2>/dev/null | head -10
```

2. **Determine graduation type**:
   - Raw idea → `ideas/[slug].md` with full context and connections
   - Blog draft → `Content/[slug].md` in publishable format
   - Product insight → `Specs/[slug].md` as a mini-spec
   - Belief/mental model → `beliefs/[slug].md` with supporting evidence
   - Meeting notes → `meetings/[date]-[who].md` with action items extracted
   - Project update → append to relevant project context file

3. **The graduation process**:
   - **Expand**: Add context, background, connections to other ideas
   - **Structure**: Give it a title, frontmatter, headers
   - **Link**: Add wikilinks to related notes (`[[note name]]`)
   - **Tag**: Add meaningful tags
   - **Next action**: Every graduated note gets a clear next step

4. **Write graduated version**:
```bash
$OBS write path="ideas/[slug].md" content="---
created: $(date +%Y-%m-%d)
type: idea
status: active
related: [[related-1]], [[related-2]]
---

# [Title]

## Core Insight
[sharpened version]

## Why This Matters
[context and significance]

## Connections
- Related to [[]]
- Builds on [[]]

## Next Step
- [ ] [concrete action]
" 2>/dev/null
```

5. **Archive the raw original**:
```bash
$OBS move path="inbox/[original].md" newPath="Archive/${MONTH}/[original].md" 2>/dev/null
```

## Usage
- `/graduate` — process all inbox and ideas
- `/graduate [note path]` — graduate a specific note
- `/graduate this: [paste raw text]` — graduate pasted text
- `/graduate inbox` — process all inbox items only
