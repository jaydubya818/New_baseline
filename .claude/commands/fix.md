# /fix — Build & Error Resolution

Diagnose and fix the error or build failure described in $ARGUMENTS.

## Procedure

### Step 1: Capture the Full Error
If $ARGUMENTS contains an error message, parse it. Otherwise:
```bash
# Get full error output with context
[build command] 2>&1 | head -100
```

### Step 2: Identify Root Cause
Parse the error for:
- **File and line number** — go there first
- **Error type** — type error, syntax error, runtime error, missing dependency
- **Stack trace** — find the original throw point, not just the propagation

### Step 3: Diagnose Before Fixing
Before changing anything:
1. Read the failing file at the error location
2. Understand WHY it's failing, not just WHAT is failing
3. Check if related files also have the issue
4. Verify your understanding by predicting what the fix should be

### Step 4: Fix with Minimal Blast Radius
- Make the smallest change that resolves the error
- Don't refactor while fixing — separate concerns
- If the fix requires multiple files, list them all before starting

### Step 5: Verify the Fix
```bash
# Confirm the original error is gone
[build command]

# Run affected tests
[test command] --testPathPattern=[affected-file]

# Quick sanity check — no new errors introduced
[lint command]
```

### Step 6: Report
```
## Fix Applied

**Error**: [original error message]
**Root Cause**: [why it was happening]
**Fix**: [what was changed and why]
**Files Modified**: [list]
**Verification**: [build/test output confirming fix]
```

## Common Error Patterns

### TypeScript
- `Property X does not exist on type Y` → Add type assertion or fix the type definition
- `Cannot find module` → Check import path, tsconfig paths, or install missing package
- `Type X is not assignable to type Y` → Fix the type mismatch; avoid `as any`

### JavaScript/Node
- `Cannot read property X of undefined` → Add null check or optional chaining
- `ENOENT: no such file or directory` → Check path construction
- `EADDRINUSE` → Kill existing process: `lsof -ti:PORT | xargs kill`

### Build/Bundle
- Missing peer dependency → `npm install [package]`
- Circular dependency → Restructure imports
- Out of memory → Increase Node heap: `NODE_OPTIONS="--max-old-space-size=4096"`

## Usage
```
/fix  (fix current build errors)
/fix TypeError: Cannot read properties of null (reading 'id') at line 42
/fix tests are failing after the refactor
```
