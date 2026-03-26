# Agent Teams: Multi-Session Claude Code Coordination

> Coordinate multiple Claude Code instances working together as a team with shared tasks, inter-agent messaging, and centralized management.

## Overview

Agent Teams let you run multiple Claude Code sessions that coordinate autonomously. One session acts as **team lead**, spawning **teammates** that each get their own context window, can message each other directly, and self-claim work from a shared task list.

**Key difference from subagents**: Subagents report results back to the caller only. Teammates communicate with each other directly and coordinate through a shared task list.

## When to Use Agent Teams

Best use cases:
- **Research & review** — multiple reviewers investigate different aspects simultaneously
- **New modules/features** — teammates each own separate pieces without conflicts
- **Debugging with competing hypotheses** — test different theories in parallel
- **Cross-layer coordination** — frontend, backend, and tests each owned by different teammates

**Don't use when**: tasks are sequential, require same-file edits, or have heavy dependencies. Use subagents or a single session instead.

## Setup

Enable in `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Requires Claude Code v2.1.32+.

## Architecture

| Component     | Role                                                         |
| ------------- | ------------------------------------------------------------ |
| **Team Lead** | Main session — creates team, spawns teammates, coordinates   |
| **Teammates** | Separate Claude Code instances working on assigned tasks     |
| **Task List** | Shared work items teammates claim and complete               |
| **Mailbox**   | Messaging system for inter-agent communication               |

Storage locations:
- Team config: `~/.claude/teams/{team-name}/config.json`
- Task list: `~/.claude/tasks/{team-name}/`

## Display Modes

- **In-process** (default): All teammates in one terminal. `Shift+Down` to cycle, `Ctrl+T` for task list.
- **Split panes**: Each teammate gets own pane (requires tmux or iTerm2).

```json
{ "teammateMode": "in-process" }
```

Or per-session: `claude --teammate-mode in-process`

## Starting a Team

Describe the task and team structure in natural language:

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact  
- One validating test coverage
Have them each review and report findings.
```

You can specify models: `Use Sonnet for each teammate.`

## Task Coordination

Tasks have three states: **pending**, **in progress**, **completed**. Tasks can declare dependencies — blocked tasks auto-unblock when dependencies complete. File locking prevents race conditions on simultaneous claims.

- **Lead assigns**: Tell the lead which task goes to which teammate
- **Self-claim**: Teammates pick up next unassigned, unblocked task automatically

## Plan Approval

Require teammates to plan before implementing:

```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

The lead reviews and approves/rejects plans. Influence judgment with criteria: "only approve plans that include test coverage."

## Quality Gate Hooks

| Hook             | Trigger                          | Exit code 2 behavior         |
| ---------------- | -------------------------------- | ---------------------------- |
| `TeammateIdle`   | Teammate about to go idle        | Send feedback, keep working  |
| `TaskCreated`    | Task being created               | Prevent creation + feedback  |
| `TaskCompleted`  | Task being marked complete       | Prevent completion + feedback|

## Context & Communication

- Teammates load project context (CLAUDE.md, MCP servers, skills) but **not** the lead's conversation history
- Include task-specific details in spawn prompts
- **message**: send to one specific teammate
- **broadcast**: send to all (use sparingly — costs scale with team size)
- Messages delivered automatically; no polling needed

## Best Practices

1. **Right-size teams**: Start with 3-5 teammates. 5-6 tasks per teammate is ideal.
2. **Avoid file conflicts**: Each teammate should own different files.
3. **Size tasks well**: Not too small (overhead > benefit), not too large (risk of wasted effort).
4. **Give enough context**: Teammates don't inherit lead's conversation — be specific in spawn prompts.
5. **Monitor and steer**: Check in, redirect, synthesize. Don't let teams run unattended too long.
6. **Start with research**: Begin with read-only tasks (PR review, investigation) before parallel implementation.
7. **Pre-approve permissions**: Set permission settings before spawning to reduce prompt interruptions.

## vs Subagents Comparison

|                   | Subagents                              | Agent Teams                              |
| ----------------- | -------------------------------------- | ---------------------------------------- |
| **Context**       | Own window; results return to caller   | Own window; fully independent            |
| **Communication** | Report back to main agent only         | Teammates message each other directly    |
| **Coordination**  | Main agent manages all work            | Shared task list, self-coordination      |
| **Best for**      | Focused tasks, only result matters     | Complex work needing discussion          |
| **Token cost**    | Lower (results summarized)             | Higher (each is separate instance)       |

## Use Case: Competing Hypotheses

```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them
talk to each other to try to disprove each other's theories, like a
scientific debate. Update the findings doc with whatever consensus emerges.
```

The adversarial debate structure prevents anchoring bias — the surviving theory is more likely correct.

## Limitations

- No session resumption for in-process teammates (`/resume` and `/rewind` don't restore them)
- Task status can lag — teammates sometimes fail to mark tasks complete
- One team per session; no nested teams
- Lead is fixed for team lifetime (can't transfer leadership)
- All teammates start with lead's permission mode
- Split panes need tmux or iTerm2 (not VS Code terminal, Windows Terminal, or Ghostty)

## References

- [Official docs](https://code.claude.com/docs/en/agent-teams)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [Git worktrees for parallel sessions](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
