# Lessons from Building Claude Code: Prompt Caching Is Everything

Prompt caching is the foundation that makes long-running agents feasible. It reuses computation from previous roundtrips, dramatically decreasing latency and cost. Anthropic runs alerts on cache hit rate and declares SEVs when it drops.

---

## Prompt Layout for Caching

Prompt caching works by **prefix matching** — the API caches everything from start to each `cache_control` breakpoint. Order matters enormously.

**Optimal ordering (static first, dynamic last):**
1. Static system prompt & tools (globally cached)
2. CLAUDE.md (cached within a project)
3. Session context (cached within a session)
4. Conversation messages

**Cache-breaking mistakes to avoid:**
- Timestamps in the static system prompt
- Non-deterministic tool definition ordering
- Updating tool parameters (e.g., which agents AgentTool can call)

---

## Use Messages for Updates

When information becomes stale (time, file changes), don't update the system prompt — that causes a cache miss.

Instead, pass updated info via messages in the next turn using `<system-reminder>` tags in the user message or tool result.

---

## Never Change Models Mid-Session

Prompt caches are unique per model. If you're 100k tokens into a conversation with Opus and want to ask an easy question, switching to Haiku is actually **more expensive** because you rebuild the entire cache.

**Solution:** Use subagents for model switching. Opus prepares a "handoff" message to another model. Claude Code does this with Explore agents (which use Haiku).

---

## Never Add or Remove Tools Mid-Session

Tools are part of the cached prefix. Adding or removing a tool invalidates the cache for the entire conversation.

---

## Plan Mode: Design Around the Cache

**Intuitive approach (wrong):** Swap to read-only tools when entering plan mode. This breaks the cache.

**Actual approach:** Keep all tools in every request. Use `EnterPlanMode` and `ExitPlanMode` as tools themselves. When toggled, a system message explains plan mode constraints.

**Bonus:** Because `EnterPlanMode` is a tool, Claude can autonomously enter plan mode when it detects a hard problem — no cache break.

---

## Tool Search: Defer Instead of Remove

With dozens of MCP tools, including all in every request is expensive. But removing them breaks the cache.

**Solution: `defer_loading`** — Send lightweight stubs (just the tool name with `defer_loading: true`). The model discovers full schemas via a `ToolSearch` tool when needed. The cached prefix stays stable: same stubs, same order, always present.

---

## Compaction: Cache-Safe Forking

Compaction happens when you run out of context window — summarize and continue.

**Naive approach (expensive):** Separate API call with different system prompt, no tools. Zero cache hit — full price for all input tokens.

**Cache-safe approach:** Use the **exact same** system prompt, user context, session context, and tool definitions as the parent conversation. Prepend parent's messages, then append the compaction prompt as a new user message. The API sees nearly identical prefix → cache reuse. Only new tokens are the compaction prompt itself.

**Important:** Save a "compaction buffer" — enough room in context window for the compact message and summary output tokens.

---

## Summary Rules

1. **Prompt caching is prefix matching.** Any change anywhere invalidates everything after it. Design your entire system around this.
2. **Use messages, not system prompt changes.** Plan mode, date updates, state transitions — all via messages.
3. **Don't change tools or models mid-conversation.** Use tools to model state transitions. Defer tool loading instead of removing.
4. **Monitor cache hit rate like uptime.** A few percentage points of miss dramatically affect cost and latency.
5. **Fork operations share the parent's prefix.** Compaction, summarization, skill execution — use identical cache-safe parameters.
