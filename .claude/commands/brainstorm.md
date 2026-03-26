# /brainstorm — Collaborative Brainstorm Session

Diverge-then-converge brainstorm grounded in the vault.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
```

## When invoked, do this:

1. **Load relevant vault context**
```bash
TOPIC="$1"
$OBS search:context query="$TOPIC" 2>/dev/null | head -80
$OBS files folder="beliefs" 2>/dev/null | while read f; do $OBS read path="$f" 2>/dev/null; done
$OBS files folder="ideas" 2>/dev/null | head -10 | while read f; do $OBS read path="$f" 2>/dev/null; done
$OBS search query="$TOPIC" 2>/dev/null | head -5 | while read f; do
  echo "=== $f ==="; $OBS read path="$f" 2>/dev/null | head -30
done
```

2. **Run the brainstorm framework**:

   **Phase 1 — Diverge (10 ideas minimum)**
   Generate broadly without filtering. Obvious ideas, wild ideas, combinations, reversals.

   **Phase 2 — Cross-pollinate**
   Look at Jay's existing projects and beliefs. What patterns apply? What's already built that could extend?

   **Phase 3 — Converge**
   Cluster ideas. Identify the 3 most generative directions.

   **Phase 4 — First Steps**
   For the top idea: smallest possible test? What to do in next 48 hours?

3. **Save session to vault**:
```bash
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TOPIC" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
$OBS write path="Brainstorming/${DATE}-${SLUG}.md" content="[output]" 2>/dev/null
echo "✅ Saved to Brainstorming/${DATE}-${SLUG}.md"
```

## Usage
- `/brainstorm [topic or question]`
- `/brainstorm How could I monetize the agent management system?`
- `/brainstorm What should MissionControl v2 focus on?`
- `/brainstorm New product ideas for SellerFi`

## Rules
- Push past obvious answers — use vault context for specificity
- End with one thing Jay could do *today* to test the best idea
