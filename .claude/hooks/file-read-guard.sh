#!/usr/bin/env bash
# file-read-guard.sh
# PreToolUse hook on Read — warns Claude when a file exceeds 2,000 lines.
# Exit code 2 forces Claude to act on the message (not just log it).
#
# Claude Code silently truncates reads at 2,000 lines and never goes back.
# This hook intercepts the Read call and tells Claude to chunk the read
# before it even starts.

set -euo pipefail

# Read JSON input from stdin
INPUT=$(cat)

# Extract file_path from tool input
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    path = data.get('tool_input', {}).get('file_path', '')
    print(path)
except Exception:
    print('')
" 2>/dev/null || echo "")

# Nothing to check if no path
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check real files that exist
if [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

LINE_COUNT=$(wc -l < "$FILE_PATH" 2>/dev/null || echo "0")

if [ "$LINE_COUNT" -gt 2000 ]; then
  cat <<EOF
⚠️  LARGE FILE DETECTED — READ TRUNCATION RISK

File:       $FILE_PATH
Line count: $LINE_COUNT lines
Limit:      2,000 lines (Claude Code hard cap — silent truncation)

REQUIRED ACTION: Do NOT read this file in one call. Use chunked reads:

  Step 1 (already done): wc -l confirmed $LINE_COUNT lines
  Step 2: Read(file_path="$FILE_PATH", offset=0, limit=2000)
  Step 3: Read(file_path="$FILE_PATH", offset=2000, limit=2000)
  ... repeat, incrementing offset by 2000 each time until offset >= $LINE_COUNT

For targeted reads, grep for line numbers first:
  Bash(grep -n "pattern" $FILE_PATH)
  Then Read with offset near that line.

Do not proceed with a plain Read of this file — you will silently miss lines.
EOF
  exit 2
fi

exit 0
