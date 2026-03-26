# Claude Agent SDK

Source: [platform.claude.com/docs/en/api/agent-sdk/overview](https://platform.claude.com/docs/en/api/agent-sdk/overview)

The Agent SDK gives you Claude Code's full capabilities — file reading, code editing, command execution, web search, MCP, subagents — as a programmable library in Python and TypeScript. Same tools, same agent loop, but you control it from code.

## When to Use the Agent SDK vs Claude Code

| Use Case | Best Choice |
|----------|-------------|
| Interactive development | Claude Code CLI |
| CI/CD pipelines | Agent SDK |
| Custom applications / SaaS products | Agent SDK |
| One-off tasks | Claude Code CLI |
| Production automation | Agent SDK |
| Multi-agent orchestration in code | Agent SDK |

Many teams use both: CLI for daily dev, SDK for production automation.

## Installation

```bash
# TypeScript
npm install @anthropic-ai/claude-agent-sdk

# Python
pip install claude-agent-sdk
```

```bash
export ANTHROPIC_API_KEY=your-api-key
```

Also supports: Amazon Bedrock (`CLAUDE_CODE_USE_BEDROCK=1`), Google Vertex AI (`CLAUDE_CODE_USE_VERTEX=1`), Microsoft Azure (`CLAUDE_CODE_USE_FOUNDRY=1`).

## Core API

The SDK exposes a single `query()` function that returns an async iterator of messages:

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Find and fix the bug in auth.py",
  options: { allowedTools: ["Read", "Edit", "Bash"] }
})) {
  if ("result" in message) console.log(message.result);
}
```

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Find and fix the bug in auth.py",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**Key difference from the Anthropic Client SDK:** With the Client SDK, you implement the tool loop yourself. With the Agent SDK, Claude handles tool execution autonomously — you just stream messages.

## Built-in Tools

| Tool | What It Does |
|------|-------------|
| **Read** | Read any file in working directory |
| **Write** | Create new files |
| **Edit** | Precise edits to existing files |
| **Bash** | Run terminal commands, scripts, git |
| **Glob** | Find files by pattern (`**/*.ts`) |
| **Grep** | Search file contents with regex |
| **WebSearch** | Search the web |
| **WebFetch** | Fetch and parse web pages |
| **AskUserQuestion** | Ask the user clarifying questions |
| **Agent** | Spawn subagents for focused subtasks |

## Subagents

Define specialized agents that the main agent can delegate to:

```typescript
for await (const message of query({
  prompt: "Use the code-reviewer agent to review this codebase",
  options: {
    allowedTools: ["Read", "Glob", "Grep", "Agent"],
    agents: {
      "code-reviewer": {
        description: "Expert code reviewer for quality and security.",
        prompt: "Analyze code quality and suggest improvements.",
        tools: ["Read", "Glob", "Grep"]
      }
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

Messages from subagents include a `parent_tool_use_id` field for tracking.

## Hooks

Run custom code at key points in the agent lifecycle:

Available: `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`

```typescript
import { query, HookCallback } from "@anthropic-ai/claude-agent-sdk";
import { appendFile } from "fs/promises";

const logFileChange: HookCallback = async (input) => {
  const filePath = (input as any).tool_input?.file_path ?? "unknown";
  await appendFile("./audit.log", `${new Date().toISOString()}: modified ${filePath}\n`);
  return {};
};

for await (const message of query({
  prompt: "Refactor utils.py to improve readability",
  options: {
    permissionMode: "acceptEdits",
    hooks: {
      PostToolUse: [{ matcher: "Edit|Write", hooks: [logFileChange] }]
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

## MCP Integration

Connect to external systems via MCP servers — databases, browsers, APIs:

```typescript
for await (const message of query({
  prompt: "Open example.com and describe what you see",
  options: {
    mcpServers: {
      playwright: { command: "npx", args: ["@playwright/mcp@latest"] }
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

## Sessions

Maintain context across multiple exchanges. Capture session ID, resume later:

```typescript
let sessionId: string | undefined;

// First query
for await (const message of query({
  prompt: "Read the authentication module",
  options: { allowedTools: ["Read", "Glob"] }
})) {
  if (message.type === "system" && message.subtype === "init") {
    sessionId = message.session_id;
  }
}

// Resume with full context
for await (const message of query({
  prompt: "Now find all places that call it",
  options: { resume: sessionId }
})) {
  if ("result" in message) console.log(message.result);
}
```

## Permissions

Control exactly what your agent can do via `allowedTools`. Only listed tools are pre-approved:

```typescript
// Read-only agent — can analyze but not modify
for await (const message of query({
  prompt: "Review this code for best practices",
  options: { allowedTools: ["Read", "Glob", "Grep"] }
})) {
  if ("result" in message) console.log(message.result);
}
```

## Claude Code Features in the SDK

Set `settingSources: ['project']` to use Claude Code's filesystem config:

| Feature | Description | Location |
|---------|-------------|----------|
| Skills | Specialized capabilities in markdown | `.claude/skills/SKILL.md` |
| Slash commands | Custom commands | `.claude/commands/*.md` |
| Memory | Project context and instructions | `CLAUDE.md` |
| Plugins | Extend with custom tools | Programmatic via `plugins` option |

## How This Maps to Our Repo

| Repo Feature | Agent SDK Equivalent |
|-------------|---------------------|
| `.claude/agents/*.md` | `agents` option in `query()` — define subagents programmatically |
| `.claude/hooks/*.sh` | `hooks` option — callbacks instead of shell scripts |
| `.claude/commands/*.md` | `settingSources: ['project']` loads them automatically |
| `.mcp.json.example` | `mcpServers` option — connect MCPs programmatically |
| `.claude/settings.json` | `allowedTools` + `permissionMode` — permissions in code |
| `CLAUDE.md` | `systemPrompt` option or `settingSources: ['project']` |

## Example: Production Bug-Fix Agent

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

// Agent that finds bugs, fixes them, runs tests, and reports
for await (const message of query({
  prompt: `Find the bug causing auth failures in src/auth.ts.
    Fix it, run the tests, and report what you changed.`,
  options: {
    allowedTools: ["Read", "Edit", "Bash", "Glob", "Grep"],
    permissionMode: "acceptEdits",
    agents: {
      "test-runner": {
        description: "Runs tests and reports results",
        prompt: "Run vitest and report pass/fail with details.",
        tools: ["Bash", "Read"]
      }
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

## Resources

- [Quickstart](https://platform.claude.com/docs/en/agent-sdk/quickstart) — Build a bug-fixing agent in minutes
- [Example agents](https://github.com/anthropics/claude-agent-sdk-demos) — Email assistant, research agent, more
- [TypeScript SDK](https://github.com/anthropics/claude-agent-sdk-typescript)
- [Python SDK](https://github.com/anthropics/claude-agent-sdk-python)
- [Migration guide](https://platform.claude.com/docs/en/agent-sdk/migration-guide) (from Claude Code SDK)
