#!/bin/bash
# PostToolUse hook: Auto-format files after Edit/Write operations
# Runs prettier/eslint --fix on modified files if available in the project
# Based on Boris Cherny's recommendation for consistent code output

# Hook receives JSON via stdin with tool_input containing file_path
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('file_path', ''))
except:
    print('')
" 2>/dev/null)

# Skip if no file path or file doesn't exist
if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Skip non-code files
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.scss|*.html)
    ;;
  *)
    exit 0
    ;;
esac

# Find project root (look for package.json)
DIR="$(dirname "$FILE_PATH")"
PROJECT_ROOT=""
while [[ "$DIR" != "/" ]]; do
  if [[ -f "$DIR/package.json" ]]; then
    PROJECT_ROOT="$DIR"
    break
  fi
  DIR="$(dirname "$DIR")"
done

if [[ -z "$PROJECT_ROOT" ]]; then
  exit 0
fi

# Try prettier first (most common), then eslint --fix
if [[ -f "$PROJECT_ROOT/node_modules/.bin/prettier" ]]; then
  "$PROJECT_ROOT/node_modules/.bin/prettier" --write "$FILE_PATH" 2>/dev/null
elif [[ -f "$PROJECT_ROOT/node_modules/.bin/eslint" ]]; then
  "$PROJECT_ROOT/node_modules/.bin/eslint" --fix "$FILE_PATH" 2>/dev/null
fi

exit 0
