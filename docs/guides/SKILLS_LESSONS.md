# Lessons from Building Claude Code: Skills

Key patterns from Anthropic's internal use of hundreds of skills across their engineering org.

---

## Skill Categories

### 1. Library & API Reference
Skills explaining how to correctly use a library, CLI, or SDK. Include reference code snippets and gotchas lists.

**Examples:** billing-lib (edge cases, footguns), internal-platform-cli (subcommands with examples), frontend-design (design system patterns)

### 2. Product Verification
Skills describing how to test/verify code output. Pair with tools like Playwright, tmux, etc. Worth spending a full week making these excellent.

**Techniques:** Record video of output, enforce programmatic assertions at each step, include verification scripts in the skill folder.

### 3. Data Fetching & Analysis
Skills connecting to data and monitoring stacks. Include credentials setup, dashboard IDs, and common query workflows.

### 4. Business Process & Team Automation
Skills automating repetitive workflows into one command. Save previous results in log files for consistency across runs.

### 5. Code Scaffolding & Templates
Skills generating framework boilerplate. Useful when scaffolding has natural language requirements beyond pure code.

### 6. Code Quality & Review
Skills enforcing code quality. Can include deterministic scripts. Run automatically via hooks or GitHub Actions.

**Examples:** adversarial-review (fresh-eyes subagent iterates until findings degrade to nitpicks), code-style, testing-practices

### 7. CI/CD & Deployment
Skills for fetching, pushing, and deploying code. May reference other skills for data collection.

**Examples:** babysit-pr (retries flaky CI, resolves conflicts, auto-merge), deploy-service (build → smoke → gradual rollout → auto-rollback)

### 8. Runbooks
Skills taking a symptom (alert, error, Slack thread) through multi-tool investigation to a structured report.

### 9. Infrastructure Operations
Skills for routine maintenance with guardrails around destructive actions.

**Examples:** orphan cleanup (find → notify → soak → confirm → cascade), dependency-management, cost-investigation

---

## Tips for Writing Great Skills

### Don't State the Obvious
Claude already knows a lot about coding. Focus on information that pushes Claude out of its default behavior — your org's specific patterns, unusual conventions, non-obvious gotchas.

### Build a Gotchas Section
The highest-signal content in any skill. Build it up iteratively from actual failure points Claude hits. Update the skill over time to capture new gotchas.

### Use the File System & Progressive Disclosure
A skill is a **folder**, not just a markdown file. Use the entire file system as context engineering:
- Point to other markdown files for detailed references (`references/api.md`)
- Include template files in `assets/` for Claude to copy
- Add folders of scripts, examples, and data
- Tell Claude what files exist — it will read them at the right time

### Avoid Railroading Claude
Be careful of being too specific. Give Claude the information it needs but flexibility to adapt. Skills are reusable — overly rigid instructions break in edge cases.

### Think Through Setup
Some skills need user context (e.g., which Slack channel). Pattern:
- Store setup info in a `config.json` inside the skill directory
- If config doesn't exist, have Claude ask the user
- Use `AskUserQuestion` tool for structured multiple-choice questions

### The Description Field Is for the Model
The description field isn't a summary — it's a **trigger specification**. Claude scans descriptions to decide which skill matches a request. Write it as "when to use this skill" not "what this skill does."

### Memory & Storing Data
Skills can maintain state by storing data within them:
- Append-only text logs, JSON files, or even SQLite databases
- Example: `standup-post` keeps a `standups.log` so Claude knows what changed since yesterday
- Store in `${CLAUDE_PLUGIN_DATA}` for persistence across skill upgrades

### Store Scripts & Generate Code
Give Claude scripts and libraries so it spends turns on **composition** not reconstruction. Example: data science skill with helper functions for fetching events — Claude generates scripts on the fly to compose them for complex analysis.

### On-Demand Hooks
Skills can register hooks that activate only when the skill is called:
- `/careful` — blocks `rm -rf`, `DROP TABLE`, force-push via PreToolUse matcher. Only when touching prod.
- `/freeze` — blocks Edit/Write outside a specific directory. Great for debugging without accidental changes.

---

## Distribution

### In-Repo (Small Teams)
Check skills into `.claude/skills/` in your repo. Simple, but each skill adds to model context.

### Plugin Marketplace (Scale)
For larger orgs, use an internal plugin marketplace. Let teams decide which skills to install.

### Curation Process
1. Author uploads skill to a sandbox folder in GitHub
2. Share in Slack/forums for organic traction
3. Once proven, PR to move into the marketplace
4. Warning: easy to create bad/redundant skills — curate before release

### Composing Skills
Reference other skills by name in your instructions. The model will invoke them if installed. Native dependency management isn't built in yet, but name-based references work well.

### Measuring Skills
Use a `PreToolUse` hook to log skill usage. Track which skills are popular or under-triggering compared to expectations.
