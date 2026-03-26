# Claude Code Best Practices

Comprehensive guide to configuring and using Claude Code effectively. Covers settings hierarchy, permission management, subagent orchestration, memory strategy, and the Command → Agent → Skill pattern.

---

## Settings Hierarchy

Claude Code loads settings in this precedence order (highest wins):

1. **Managed policy** — Enterprise/org-level (read-only)
2. **CLI arguments** — `--model`, `--permission-mode`, etc.
3. **`.claude/settings.local.json`** — Personal overrides (gitignored)
4. **`.claude/settings.json`** — Team-shared (checked into repo)
5. **`~/.claude/settings.json`** — User-level defaults

Key rules:
- Always add `$schema` for IDE autocomplete
- Team settings go in `.claude/settings.json` (committed)
- Personal settings go in `.claude/settings.local.json` (gitignored)
- Deny rules always take highest precedence regardless of source
- Use `env` block for environment variables Claude needs

## Permission Patterns

### Deny Rules (Security Boundaries)

Deny rules use glob pattern matching and take absolute precedence:

```json
"deny": [
  "Bash(rm -rf /)",
  "Bash(*DROP TABLE*)",
  "Bash(cat*.env*)",
  "Bash(echo $*SECRET*)",
  "Bash(curl*|*sh)"
]
```

### Allow Rules (Productivity)

Pre-approve safe, frequent operations to reduce permission prompts:

```json
"allow": [
  "Bash(git *)",
  "Bash(npm *)",
  "Bash(npx prisma *)",
  "Edit(*)",
  "Write(*)",
  "Read(*)"
]
```

---

## Subagent Architecture

### Frontmatter Fields for Custom Agents

Agents in `.claude/agents/` support these frontmatter fields:

| Field | Description |
|-------|-------------|
| `name` | Display name |
| `description` | What it does (triggers agent selection) |
| `model` | Model override (e.g., `claude-sonnet-4-5-20250514`) |
| `tools` | Array of allowed tools |
| `maxTurns` | Maximum conversation turns |
| `temperature` | Sampling temperature |
| `systemPrompt` | Additional system instructions |
| `worktree` | Run in isolated git worktree (`true`/`false`) |
| `allowedTools` | Whitelist of tools |
| `disallowedTools` | Blacklist of tools |
| `rolloutPercentage` | Gradual rollout (0-100) |

### Built-in Agent Types

Claude Code includes 6 built-in agent types:
- **general-purpose** — Default, full tool access
- **Explore** — Fast codebase exploration (read-only)
- **Plan** — Architecture planning (no edits)
- **claude-code-guide** — Self-documentation search
- **statusline-setup** — Configure status line
- **test-runner** — Run tests after code changes

---

## Command → Agent → Skill Orchestration

The core execution pattern in Claude Code follows a three-layer architecture:

```
User Input → Command (orchestrates) → Agent (executes) → Skill (provides knowledge)
```

### Commands (`.claude/commands/`)

Commands are user-facing entry points. Frontmatter fields:

| Field | Description |
|-------|-------------|
| `name` | Command name (used as `/command`) |
| `description` | Shown in command picker |
| `allowed-tools` | Tools this command can use |
| `model` | Model override |
| `args` | Named arguments with descriptions |
| `input` | Expected input format |

Commands should orchestrate — they call agents for execution, reference skills for knowledge, and manage the workflow end-to-end.

### Agents (`.claude/agents/`)

Agents are headless workers spawned by commands. They:
- Run in their own context (optionally isolated worktrees)
- Have scoped tool access
- Report back to the orchestrating command

### Skills (`.claude/skills/`)

Skills are knowledge bundles, not executors. They provide:
- Domain expertise and API references
- Gotchas and common failure patterns
- Progressive disclosure via folder structure
- Scripts and templates for agents to use

### Multi-Agent Team Pattern

For complex tasks, use a team coordinator pattern:

```markdown
## Team
- **architect** — Plans approach, reviews design
- **implementer** — Writes code, runs in worktree
- **reviewer** — Reviews changes, runs tests
- **documenter** — Updates docs and changelog

## Workflow
1. Coordinator receives task
2. Spawns architect agent for planning
3. Spawns implementer in worktree for coding
4. Spawns reviewer for verification
5. Coordinator merges results
```

---

## Memory Strategy

### CLAUDE.md Loading (Ancestor/Descendant)

Claude Code loads `CLAUDE.md` files using ancestor/descendant discovery:

1. **Ancestor loading** — Walks UP from cwd to find `CLAUDE.md` files in parent dirs
2. **Descendant loading** — Walks DOWN into immediate child dirs for `CLAUDE.md` files
3. **All found files are merged** into context at session start

### Monorepo Strategy

```
repo/
├── CLAUDE.md              ← Repo-wide: tech stack, conventions, CI
├── packages/
│   ├── api/
│   │   └── CLAUDE.md      ← API-specific: endpoints, auth, DB patterns
│   ├── web/
│   │   └── CLAUDE.md      ← Frontend: components, state, routing
│   └── shared/
│       └── CLAUDE.md      ← Shared types, utilities, contracts
```

### Memory Best Practices

- Keep `CLAUDE.md` concise — it loads every session
- Put detailed reference in `.claude/memory/` files (loaded on demand)
- Use the `/dream` command to consolidate learnings periodically
- Store project decisions in `docs/architecture/` ADRs
- Let agents write to memory files to capture gotchas over time

---

## Tips & Anti-Patterns

### Do

- Use `$schema` in settings for autocomplete
- Commit `.claude/settings.json` to share team conventions
- Use deny rules for destructive operations
- Pre-allow frequent safe commands to reduce friction
- Use worktrees for risky agent operations
- Keep commands thin (orchestrate, don't implement)
- Build gotchas sections in skills iteratively
- Use progressive disclosure — don't dump everything in one file

### Don't

- Don't put secrets in `settings.json` (use `.local` or env)
- Don't give agents more tools than they need
- Don't skip the deny list — it's your safety net
- Don't put implementation logic in commands (use agents)
- Don't make skills too prescriptive — give Claude flexibility
- Don't forget to gitignore `settings.local.json`
- Don't change tools mid-session (breaks prompt cache)
- Don't override model mid-conversation (cache miss)
