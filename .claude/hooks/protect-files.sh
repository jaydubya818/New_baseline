#!/usr/bin/env bash
# protect-files.sh — PreToolUse hook to block edits to critical files
#
# Exit code 0 = allow, exit code 2 = block
# Reads tool input from stdin as JSON
#
# Usage in settings.json:
# {
#   "hooks": {
#     "PreToolUse": [{
#       "matcher": "Edit|Write",
#       "hooks": [{"type": "command", "command": ".claude/hooks/protect-files.sh"}]
#     }]
#   }
# }

set -euo pipefail

# Read the file path from stdin JSON
FILE_PATH=$(jq -r '.tool_input.file_path // .tool_input.path // ""' 2>/dev/null || echo "")

# Protected file patterns (add your own)
PROTECTED_PATTERNS=(
  "prisma/migrations/*"
  ".env"
  ".env.local"
  ".env.production"
  "*.pem"
  "*.key"
)

if [ -z "$FILE_PATH" ]; then
  exit 0  # No file path found, allow
fi

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  # shellcheck disable=SC2254
  case "$FILE_PATH" in
    $pattern)
      echo "BLOCKED: Cannot modify protected file: $FILE_PATH"
      echo "This file is protected by protect-files.sh hook."
      echo "Remove the pattern from the hook if this edit is intentional."
      exit 2
      ;;
  esac
done

# File not protected, allow
exit 0
