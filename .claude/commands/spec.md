# /spec — Write a Technical Specification

Turn a vague idea into a buildable spec, grounded in existing project architecture.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
```

## When invoked, do this:

1. **Load relevant project context**
```bash
FEATURE="$1"
$OBS search:context query="$FEATURE" 2>/dev/null | head -80
$OBS files folder="Specs" 2>/dev/null | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null
done
$OBS search query="architecture OR schema OR API" 2>/dev/null | grep -i "$FEATURE" | head -5 | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null | head -40
done
```

2. **Write the spec** using this structure:

```markdown
# Spec: [Feature Name]
**Status:** Draft | **Date:** YYYY-MM-DD | **Project:** [project]

## Problem
What doesn't exist? Why does it matter?

## Solution
What we're building and why this approach.

## Scope
In: [list] | Out: [explicit exclusions]

## Technical Design
### Data Model
### API / Interface
### Flow

## Implementation Plan
- [ ] Phase 1: foundation
- [ ] Phase 2: core feature
- [ ] Phase 3: polish + edge cases

## Open Questions
## Success Criteria
```

3. **Save to vault**:
```bash
SLUG=$(echo "$FEATURE" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
$OBS write path="Specs/${SLUG}.md" content="[spec]" 2>/dev/null
echo "✅ Spec saved to Specs/${SLUG}.md"
```

## Usage
- `/spec [feature name]`
- `/spec MissionControl agent memory system`
- `/spec SellerFi deal scoring algorithm`
- `/spec Add webhook support to AMS`
