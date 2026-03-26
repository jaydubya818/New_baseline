# Scheduled Tasks — Recurring AI Automation

> Use Claude Code's `scheduled-tasks` MCP to run AI tasks on a schedule or on-demand.
> Daily standups, weekly reports, codebase audits — all automated.

---

## What Are Scheduled Tasks?

Scheduled tasks let you define recurring AI-powered jobs that Claude executes automatically.
Think cron jobs, but instead of shell scripts, they run Claude prompts with full tool access.

**Use cases:**

- Daily standup summaries from git log + Linear/Jira
- Weekly dependency audit (`npm audit` + PR creation)
- Nightly test suite runs with failure triage
- Monday morning sprint status reports
- Bi-weekly codebase health checks (dead code, TODO count, coverage drift)

---

## Quick Start

### 1. Create a Task

```bash
# In Claude Code, use the MCP tool:
create_scheduled_task({
  name: "daily-standup",
  prompt: "Generate a standup update: summarize yesterday's git commits, list open PRs, and flag any failing CI checks.",
  schedule: "0 9 * * 1-5",  # 9 AM weekdays (cron syntax)
  enabled: true
})
```

### 2. List Tasks

```bash
list_scheduled_tasks()
# Returns all tasks with status, last run, next run
```

### 3. Update a Task

```bash
update_scheduled_task({
  id: "task_abc123",
  enabled: false  # pause it
})
```

---

## Example Tasks for This Repo

### Daily Standup Generator

```json
{
  "name": "daily-standup",
  "prompt": "Read the last 24h of git log. Summarize: what was done, what's in progress (open branches), and any blockers (failing tests, unresolved review comments). Format as yesterday/today/blockers.",
  "schedule": "0 9 * * 1-5"
}
```

### Weekly Dependency Audit

```json
{
  "name": "weekly-dep-audit",
  "prompt": "Run npm audit and npm outdated. If there are critical vulnerabilities, create a fix branch and PR. For outdated packages, list them with current vs latest version and whether the update is breaking.",
  "schedule": "0 10 * * 1"
}
```

### Nightly Test Triage

```json
{
  "name": "nightly-test-triage",
  "prompt": "Run npm run test:unit and npm run test:e2e. If any tests fail, categorize failures as: flaky (passed on retry), regression (new failure), or environment (missing env/service). Write results to progress.txt.",
  "schedule": "0 2 * * *"
}
```

### Bi-Weekly Codebase Health

```json
{
  "name": "codebase-health",
  "prompt": "Audit the codebase: count TODO/FIXME/HACK comments, check test coverage drift vs thresholds in vitest.config.ts, find unused exports, and list files over 300 lines. Summarize findings and suggest top 3 actions.",
  "schedule": "0 10 * * 1,15"
}
```

### Monday Sprint Status

```json
{
  "name": "sprint-status",
  "prompt": "Generate a sprint status report: PRs merged this week, open PRs needing review, test coverage delta, and any security advisories from npm audit. Format as a markdown report suitable for Slack.",
  "schedule": "0 8 * * 1"
}
```

---

## Cron Syntax Reference

| Expression      | Meaning                  |
| --------------- | ------------------------ |
| `0 9 * * 1-5`   | 9:00 AM, Monday–Friday   |
| `0 2 * * *`     | 2:00 AM daily            |
| `0 10 * * 1`    | 10:00 AM every Monday    |
| `0 10 1,15 * *` | 10:00 AM on 1st and 15th |
| `*/30 * * * *`  | Every 30 minutes         |
| `0 0 * * 0`     | Midnight every Sunday    |

Format: `minute hour day-of-month month day-of-week`

---

## Best Practices

1. **Start simple** — Begin with a daily standup task. Add complexity once you trust the output.
2. **Pin the prompt** — Be specific. "Summarize git log" is vague. "Summarize commits from the last 24h on the `main` branch, grouped by author" is actionable.
3. **Write to files** — Have tasks write results to `progress.txt` or a `reports/` directory so you have an audit trail.
4. **Gate destructive actions** — Tasks that create PRs or push code should require manual approval. Use the prompt to _generate_ the branch/PR description, then review before merging.
5. **Use with Obsidian** — Pair with the Second Brain pattern: have tasks write daily logs to your vault's `daily/` folder for AI-searchable history.
6. **Monitor failures** — Check `list_scheduled_tasks()` regularly. A silently failing task is worse than no task.

---

## Integration with This Repo

| Repo Feature        | How Scheduled Tasks Use It                  |
| ------------------- | ------------------------------------------- |
| `progress.txt`      | Tasks append session summaries here         |
| `.claude/memory/`   | Tasks can read/write project memory         |
| `vitest.config.ts`  | Nightly tests reference coverage thresholds |
| `npm run test:unit` | Direct test execution in task prompts       |
| `npm audit`         | Dependency scanning in weekly audit         |
| Obsidian vault      | Daily logs written to `daily/YYYY-MM-DD.md` |
| `/gsd:progress`     | Sprint status tasks can invoke GSD commands |

---

## See Also

- [SECOND_BRAIN_OBSIDIAN.md](./SECOND_BRAIN_OBSIDIAN.md) — Pair scheduled tasks with vault logging
- [CLAUDE_AGENT_SDK.md](./CLAUDE_AGENT_SDK.md) — Build custom agents that run on schedules
- [AGENT_TEAMS.md](./AGENT_TEAMS.md) — Coordinate scheduled tasks across multiple agents
