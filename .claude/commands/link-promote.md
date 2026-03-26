# /link-promote — Promote Linked Concepts to Canonical Notes

After an autolink run, suggest which newly-linked concepts should become full canonical notes or MOC sections.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
VAULT="/Users/jaywest/Documents/Obsidian Vault"
```

## When invoked, do this:

1. **Find notes that are heavily linked but have thin content**
```bash
# Check which 04-Concepts notes have lots of backlinks but sparse body
$OBS files folder="04 - Concepts" 2>/dev/null | while read f; do
  backlinks=$($OBS backlinks path="$f" 2>/dev/null | wc -l)
  content=$($OBS read path="$f" 2>/dev/null | wc -w)
  echo "$backlinks backlinks | $content words | $f"
done | sort -rn | head -20
```

2. **Find frequently appearing terms not yet in entity-map**
```bash
# Read recent write reports and look for patterns
ls -t "$VAULT/scripts/"*write*.md 2>/dev/null | head -2 | xargs cat 2>/dev/null | grep "replacement" | sort | uniq -c | sort -rn | head -20
```

3. **Produce promotion recommendations**:

   For each candidate, suggest one of:
   - **Expand concept note** — the `04 - Concepts/` note exists but needs more substance
   - **Create MOC section** — add this concept as a section to the relevant `01 - MOCs/` note
   - **Add to entity-map** — the term is appearing frequently but isn't being auto-linked yet
   - **Create new canonical note** — a new `04 - Concepts/` note is warranted

4. **Create notes if approved**:
```bash
# Example: create a new concept note via REST API
curl -s -X POST "http://localhost:27124/vault/04 - Concepts/[NewConcept].md" \
  -H "Authorization: Bearer 69838b03445fe49a02ed01677d4270c2f547b90021a3766c75f195dc4b082a62" \
  -H "Content-Type: text/markdown" \
  -d "---
type: concept
status: active
related:
tags:
created: $(date +%Y-%m-%d)
updated: $(date +%Y-%m-%d)
---

# [NewConcept]

## Summary

## Key Ideas

## Related Notes
"
```

## Usage
- `/link-promote` — review current graph and suggest what to promote
- `/link-promote [concept name]` — promote a specific concept to a full canonical note
