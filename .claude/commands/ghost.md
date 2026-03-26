# /ghost — Write in Jay's Voice

Write content that sounds like Jay wrote it, grounded in his actual notes and patterns.

## Setup
```bash
OBS="/Applications/Obsidian.app/Contents/MacOS/obsidian-cli"
VAULT="/Users/jaywest/Documents/Obsidian Vault"
```

## When invoked, do this:

1. **Load voice context**
```bash
$OBS read path="CLAUDE.md" 2>/dev/null | grep -A 20 "Voice\|Writing\|Style"
$OBS files folder="daily-notes" 2>/dev/null | sort -r | head -5 | while read f; do $OBS read path="$f" 2>/dev/null; done
$OBS files folder="beliefs" 2>/dev/null | while read f; do $OBS read path="$f" 2>/dev/null; done
$OBS files folder="ideas" 2>/dev/null | head -10 | while read f; do $OBS read path="$f" 2>/dev/null; done
```

2. **Identify Jay's voice markers** from the notes:
   - Direct, no filler words
   - Builder/operator mindset — focuses on what moves the needle
   - AI-native framing — everything through the lens of agents and automation
   - Confident assertions, not hedged academic prose
   - Short punchy sentences mixed with longer explanatory ones
   - Uses specifics, not generalities ("Claude Code" not "AI tools")

3. **Write the requested content** in that voice

4. **Save if instructed**:
```bash
$OBS write path="Content/[filename].md" content="[content]" 2>/dev/null
```

## Usage
- `/ghost Write a LinkedIn post about [topic]`
- `/ghost Draft a cold email to [target] about [pitch]`
- `/ghost Rewrite this in my voice: [paste text]`
- `/ghost Write a thread about what I've been building`

## Voice Rules
- NO: "In today's fast-paced world..." / "It's worth noting that..." / "Interestingly..."
- YES: Start with the point. Use "I". Use real product names. End with a hook or a truth.
- When in doubt, make it shorter and more direct.
