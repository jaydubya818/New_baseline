# oh-my-claudecode: Multi-Agent Orchestration Patterns

> Teams-first orchestration plugin for Claude Code — intelligent agent coordination, skill learning, and execution orchestration without needing to learn Claude Code internals.

Source: [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)

## Execution Modes

| Mode         | Function                                | Use Case                                    |
| ------------ | --------------------------------------- | ------------------------------------------- |
| **Team**     | Staged pipeline via native Claude teams | Coordinated multi-agent work                |
| **omc team** | tmux CLI workers (Claude/Codex/Gemini)  | On-demand spawning, automatic cleanup       |
| **Autopilot**| Autonomous end-to-end execution         | Feature dev with minimal oversight          |
| **Ralph**    | Persistence mode with verify/fix loops  | Tasks requiring guaranteed completion       |
| **Ultrawork**| Maximum parallelism                     | Burst fixes/refactors without coordination  |
| **Pipeline** | Sequential staged processing            | Multi-step transformations                  |

### Canonical Team Pipeline

```
team-plan → team-prd → team-exec → team-verify → team-fix (loop)
```

32 specialized agents handle architecture, research, design, testing, and data science with smart model routing (Haiku for simple, Opus for complex reasoning).

## Magic Keywords

Quick shortcuts for common workflows:

| Keyword          | Effect                                    |
| ---------------- | ----------------------------------------- |
| `autopilot:`     | Full autonomous execution                 |
| `ralph:`         | Persistence mode (includes ultrawork)     |
| `ulw`            | Maximum parallelism                       |
| `ralplan`        | Iterative planning consensus              |
| `deep-interview` | Socratic requirements clarification       |
| `deepsearch`     | Codebase-focused search                   |
| `ultrathink`     | Deep reasoning mode                       |
| `/team N:executor "..."` | Explicit team orchestration        |
| `omc team N:codex/gemini/claude "..."` | CLI workers          |

## Custom Skills System

Two scope layers with priority ordering:
1. **Project**: `.omc/skills/` (version-controlled, higher priority)
2. **User**: `~/.omc/skills/` (all projects, fallback)

### Skill Structure (YAML frontmatter + markdown)

```yaml
---
name: Fix Proxy Crash
description: aiohttp ClientDisconnectedError handling
triggers: ["proxy", "aiohttp", "disconnected"]
source: extracted
---
[Solution details in markdown...]
```

### Skill Management

- `/skill list | add | remove | edit | search` — CRUD operations
- `/learner` — Auto-extract reusable patterns with quality gates
- **Auto-injection**: Skills trigger automatically when matching keywords detected

## CLI Tools (`omc` namespace)

```bash
# Team management
omc team N:provider "prompt"    # Spawn N workers
omc team status <name>          # Check task status
omc team shutdown <name>        # Terminate workers

# Provider advisor (runs local CLI providers, saves markdown artifacts)
omc ask claude "review this migration plan"
omc ask codex --prompt "identify architecture risks"
omc ask gemini --prompt "propose UI polish ideas"
omc ask claude --agent-prompt executor --prompt "..."  # Role-based

# Utilities
omc wait                        # Rate-limit auto-resume daemon
omc wait --start                # Enable daemon
omc hud                         # Live HUD rendering
omc doctor                      # Diagnostic/cache clearing
```

## Notification Hooks

6 hook events for integration with external services:

| Event               | Trigger                          |
| ------------------- | -------------------------------- |
| `session-start`     | Session begins                   |
| `stop`              | Claude response completes        |
| `keyword-detector`  | Every prompt submission          |
| `ask-user-question` | Claude requests user input       |
| `pre-tool-use`      | Before tool invocation           |
| `post-tool-use`     | After tool invocation            |

### Stop Callback Services

Notify external services when sessions complete:
- **Telegram**: `@username` tags, bot tokens, chat IDs
- **Discord**: mentions, role IDs, user IDs
- **Slack**: channel refs, user IDs, subteams
- **File**: session summaries written to disk

Configure via: `omc config-stop-callback [service] --enable/--disable`

## OpenClaw Integration

External gateway integration for session lifecycle events:

```json
{
  "enabled": true,
  "gateways": {
    "my-gateway": {
      "url": "https://gateway.example.com/wake",
      "headers": {"Authorization": "Bearer TOKEN"},
      "method": "POST"
    }
  },
  "hooks": {
    "session-start": {"gateway": "my-gateway", "enabled": true},
    "stop": {"gateway": "my-gateway", "enabled": true}
  }
}
```

Config at: `~/.claude/omc_config.openclaw.json`
Env vars: `OMC_OPENCLAW=1`, `OMC_OPENCLAW_DEBUG=1`

## Monitoring & Observability

- **HUD**: `/oh-my-claudecode:hud setup` with presets (e.g., `"omcHud": {"preset": "focused"}`)
- **Session artifacts**: `.omc/sessions/*.json` — session summaries
- **Replay logs**: `.omc/state/agent-replay-*.jsonl`
- **Advisor outputs**: `.omc/artifacts/ask/`

## Key Patterns for Our Repo

Patterns from oh-my-claudecode applicable to this baseline:

1. **Staged pipelines**: plan → PRD → execute → verify → fix loop ensures quality
2. **Smart model routing**: Use Haiku for simple tasks, Opus for complex reasoning (30-50% token savings)
3. **Skill extraction**: Auto-learn from successful sessions via `/learner`
4. **Two-tier skills**: Project-level (`.omc/skills/`) overrides user-level (`~/.omc/skills/`)
5. **Magic keywords**: Single-word triggers for complex workflows reduce cognitive load
6. **Verify/fix loops**: Ralph mode's persistence pattern guarantees task completion
7. **Provider diversity**: Ask multiple AI providers for different perspectives on same problem
8. **Hook-based notifications**: Integrate external services via lifecycle hooks

## References

- [oh-my-claudecode repo](https://github.com/Yeachan-Heo/oh-my-claudecode)
- [Full reference docs](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md)
