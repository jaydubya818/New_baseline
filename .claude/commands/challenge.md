# /challenge — Pressure Test a Belief or Plan

Steelman the opposition, find the holes, make the idea stronger.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
```

## When invoked, do this:

1. **Load relevant context**
```bash
$OBS files folder="beliefs" 2>/dev/null | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null
done
TOPIC="$1"
$OBS search:context query="$TOPIC" 2>/dev/null | head -60
```

2. **Run the challenge framework**:

   **Round 1 — Steel Man the Opposition**
   Build the strongest possible case AGAINST the idea. Not strawmen — the best counterargument.

   **Round 2 — Find the Hidden Assumptions**
   What does this plan/belief require to be true? List them explicitly. Which are weakest?

   **Round 3 — Premortem**
   It's 12 months from now and this failed. What killed it? Be specific.

   **Round 4 — Surviving the Challenge**
   What survives scrutiny? What needs to change? What's the hardened version?

3. **Save the sharpened version** if requested:
```bash
$OBS write path="Specs/[topic]-hardened.md" content="[output]" 2>/dev/null
```

## Usage
- `/challenge My thesis that [X]`
- `/challenge This plan: [paste plan]`
- `/challenge The belief that AI will replace [X] in 5 years`
- `/challenge My pricing model for SellerFi`

## Rules
- Don't soften the challenge. Jay wants real pressure, not validation.
- If the idea survives, say so clearly. If it doesn't, say that too.
- End with what a stronger version looks like.
