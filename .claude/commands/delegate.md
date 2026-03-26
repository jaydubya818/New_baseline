---
name: delegate
description: Decompose a task into parallel subtasks and run them as subagents (Karpathy insight #1 — think in macro actions)
allowed-tools: Agent, Read, Glob, Grep
---

You've been given a feature or task to implement. Instead of working through it sequentially, decompose it into parallel, non-conflicting subtasks and delegate each to a subagent.

**Process:**

1. **Analyze the task** — Read relevant files to understand scope
2. **Decompose** — Break it into 2-5 independent subtasks that don't touch the same files
3. **Delegate** — Launch each as a subagent using the Agent tool with:
   - Clear, self-contained instructions (the subagent has NO context from this session)
   - Specific file paths to read and modify
   - Acceptance criteria (what "done" looks like)
   - Use `isolation: "worktree"` for tasks that modify code
4. **Integrate** — Review subagent outputs, resolve any conflicts, run tests

**Rules:**
- Each subagent gets ONE focused task (not a grab bag)
- Never give two subagents the same file to edit
- Include "run tests before finishing" in every subagent prompt
- If a subtask depends on another's output, sequence them — don't parallelize

The user's task: $ARGUMENTS
