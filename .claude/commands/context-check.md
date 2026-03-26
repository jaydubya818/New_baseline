---
name: context-check
description: Check context window usage and suggest compaction strategies
allowed-tools: Bash, Read
---

Analyze the current session's context usage:

1. Report approximate token usage if available via `/cost` or `/stats`
2. Identify large files that have been read but may no longer be relevant
3. Suggest files to compact or summarize
4. Recommend whether to `/compact` or `/fork` to free context

If context is under 50%, say "Context is healthy, no action needed."
If context is 50-80%, suggest proactive compaction of non-essential context.
If context is over 80%, recommend immediate `/compact` with specific focus areas to preserve.
