# /security — Security Audit

Run a comprehensive security audit on $ARGUMENTS (file, directory, or entire project).

## Audit Checklist

### 🔑 Secrets & Credentials
```bash
# Run these scans automatically:
grep -rn "api_key\|apikey\|API_KEY\|secret\|password\|token\|private_key" \
  --include="*.ts" --include="*.js" --include="*.py" --include="*.env" \
  --exclude-dir=node_modules --exclude-dir=.git .

# Check for .env committed to git
git log --all --full-history -- "**/.env" "*.env"
```

### 💉 Injection Vulnerabilities
- SQL: Look for string concatenation in queries → flag for parameterization
- Command injection: `exec()`, `spawn()` with user input
- LDAP/XPath injection in directory queries
- Template injection in server-side rendering

### 🌐 Web Security
- Missing CSP headers
- Missing CORS configuration (or wildcard `*`)
- Open redirects from user-controlled URLs
- CSRF protection on POST/PUT/DELETE endpoints
- Cookie security flags: `httpOnly`, `secure`, `sameSite`

### 🔐 Authentication & Authorization
- JWT verification (algorithm, expiry, signature)
- Missing auth middleware on protected routes
- Insecure direct object references (IDOR)
- Privilege escalation paths
- Session fixation vulnerabilities

### 📤 Data Exposure
- PII in logs or error messages
- Sensitive data in URL parameters
- Over-exposed API responses (returning more than needed)
- Verbose error messages showing stack traces to users

### 📦 Dependencies
```bash
npm audit --audit-level=moderate
# or
pnpm audit
# or
pip-audit  # Python projects
```

### 🔒 File System
- Path traversal vulnerabilities in file operations
- Insecure file permissions
- Temporary files with sensitive data not cleaned up

## Output Format

```
## Security Audit: [scope]
Date: [date]

### 🔴 Critical Vulnerabilities
[List with line numbers and remediation steps]

### 🟡 Medium Risk Issues
[List with remediation suggestions]

### 🟢 Low Risk / Best Practice Suggestions
[List]

### ✅ Verified Controls
[List of security controls confirmed working]

### Dependency Vulnerabilities
[npm/pip audit output summary]

### Recommended Actions (Priority Order)
1. [Most critical fix]
2. ...

Overall Risk: [Critical / High / Medium / Low]
```

## Usage
```
/security src/auth/
/security  (full project scan)
/security src/api/payments.ts
```
