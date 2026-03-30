# AI Development Tools

> Reference guide for AI-powered development tools that complement the New Baseline workflow. These are standalone tools — not MCP servers or skills — that enhance your development process.

---

## Spec Kit (GitHub)

**Source:** [github/spec-kit](https://github.com/github/spec-kit) — 50,000+ stars

### What It Does

Spec-driven development. Write specifications first, AI generates code from them. Forces you to think before you build — which aligns directly with New Baseline's core philosophy: **Interrogation → Documentation → Code**.

### How It Works

1. **Write a spec** — Define what you want in a structured specification format
2. **AI generates code** — The spec is fed to an AI model that generates implementation
3. **Iterate on the spec** — Refine the specification to refine the output
4. **Ship** — The generated code matches your spec exactly

### Setup

```bash
# Install via npm
npm install -g spec-kit

# Or use directly
npx spec-kit init
```

### Integration with New Baseline

Spec Kit reinforces our existing workflow:

| New Baseline Step               | Spec Kit Equivalent           |
| ------------------------------- | ----------------------------- |
| Interrogation phase             | Spec writing                  |
| PRD.md / IMPLEMENTATION_PLAN.md | Spec files                    |
| `/spec-interview` command       | Interactive spec builder      |
| `/autoplan`                     | Spec review + code generation |

**Recommended usage:** Use Spec Kit for isolated modules or utilities where you want deterministic AI output. Continue using the full New Baseline workflow (GSD/gstack) for features that span multiple files and require coordination.

### When to Use

- Building isolated utilities, libraries, or modules
- Generating boilerplate from structured requirements
- When you want deterministic, reproducible AI code generation
- As a complement to (not replacement for) the full New Baseline workflow

---

## Aider — AI Pair Programming

**Source:** [paul-gauthier/aider](https://github.com/paul-gauthier/aider) — 30,000+ stars

### What It Does

AI pair programming in your terminal. Works with any LLM (Claude, GPT-4, Gemini, local models). Especially strong at working with existing codebases — it understands your repo structure, git history, and can make targeted changes.

### Setup

```bash
# Install
pip install aider-chat

# Or via pipx (recommended for isolation)
pipx install aider-chat

# Run with Claude
export ANTHROPIC_API_KEY=your_key
aider --model claude-sonnet-4-20250514
```

### Key Features

| Feature              | Description                                             |
| -------------------- | ------------------------------------------------------- |
| **Repo-aware**       | Understands your entire codebase structure via repo map |
| **Git integration**  | Auto-commits changes with descriptive messages          |
| **Multi-file edits** | Can modify multiple files in a single pass              |
| **Any LLM**          | Works with Claude, GPT-4, Gemini, Ollama, etc.          |
| **Voice**            | Voice-to-code via microphone input                      |
| **Linting**          | Auto-runs linters and fixes issues                      |
| **Testing**          | Can run tests and fix failures                          |

### Aider vs Claude Code

| Dimension       | Aider                         | Claude Code                        |
| --------------- | ----------------------------- | ---------------------------------- |
| LLM flexibility | Any provider                  | Claude only                        |
| Workflow system | None built-in                 | Full (GSD, gstack, BMAD)           |
| Skills/agents   | None                          | 33 agents, 105+ commands           |
| Git integration | Auto-commit                   | Hook-enforced conventional commits |
| Best for        | Quick edits, model comparison | Full project lifecycle             |

### Integration with New Baseline

Use Aider as a **secondary tool** for specific scenarios:

1. **Quick fixes** — When you need a fast edit without spinning up the full workflow
2. **Model comparison** — Test how different LLMs handle the same task
3. **Legacy codebases** — Aider's repo map is excellent for understanding unfamiliar code
4. **Voice coding** — Dictate changes when you're away from keyboard

**Do NOT use Aider for:** Features that require the full interrogation → documentation → code pipeline. Use Claude Code with GSD/gstack for those.

### Configuration

```yaml
# .aider.conf.yml (optional — place in project root)
model: claude-sonnet-4-20250514
auto-commits: true
gitignore: true
lint-cmd: npm run lint
test-cmd: npm run test:unit
```

---

## Task Master AI — AI Project Manager

**Source:** [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) — Growing rapidly

### What It Does

Your AI's project manager. Feed it a PRD and it generates structured tasks with dependencies. Claude executes them one by one. Turns chaotic sessions into organized pipelines.

### Setup

```bash
# Install
npm install -g claude-task-master

# Or use as MCP server
npx claude-task-master --mcp
```

### How It Works

```
PRD document
    ↓
Task Master parses → generates task tree
    ↓
Each task has:
  - ID, title, description
  - Dependencies (which tasks must complete first)
  - Acceptance criteria
  - Estimated complexity
    ↓
Claude executes tasks in dependency order
    ↓
Progress tracked automatically
```

### Task Master vs GSD

New Baseline already has GSD for structured execution. Here's how they compare:

| Dimension     | Task Master AI             | GSD                          |
| ------------- | -------------------------- | ---------------------------- |
| Input         | PRD → auto-generated tasks | Manual phase/task planning   |
| Dependencies  | Automatic dependency graph | Manual ordering              |
| Execution     | Sequential by dependency   | Phase-based atomic commits   |
| Quality gates | Basic completion check     | Full review/QA/CSO pipeline  |
| Memory        | Session-only               | Persistent via progress.txt  |
| Integration   | Standalone or MCP          | Deep Claude Code integration |

### Integration with New Baseline

**Recommended pattern:** Use Task Master for the initial task breakdown, then feed its output into GSD for execution with quality gates:

```
1. Generate canonical docs (PRD.md, IMPLEMENTATION_PLAN.md)
2. Feed PRD to Task Master → get structured task tree
3. Review and adjust task tree
4. Import tasks into GSD phases
5. Execute with /gsd:execute-phase (gets quality gates, atomic commits, etc.)
```

### When to Use

- Bootstrapping a new project from a PRD
- When you want automatic dependency detection between tasks
- For projects where task ordering is complex
- As a complement to GSD's execution engine

---

## Tool Comparison Matrix

| Scenario                 | Recommended Tool         | Why                                  |
| ------------------------ | ------------------------ | ------------------------------------ |
| Full feature development | Claude Code + GSD/gstack | Complete workflow with quality gates |
| Quick targeted edits     | Aider                    | Fast, repo-aware, any LLM            |
| Spec → code generation   | Spec Kit                 | Deterministic output from specs      |
| Task breakdown from PRD  | Task Master AI           | Auto-dependency detection            |
| Model comparison         | Aider                    | Supports any LLM provider            |
| Voice coding             | Aider                    | Built-in voice support               |
| Security-gated changes   | Claude Code + gstack     | `/cso` command for auth changes      |
| Browser QA               | Claude Code + gstack     | `/qa` with real Chromium             |

---

## References

- [github/spec-kit](https://github.com/github/spec-kit) — Spec-driven development
- [paul-gauthier/aider](https://github.com/paul-gauthier/aider) — AI pair programming
- [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) — AI task management
- [Aider documentation](https://aider.chat) — Full Aider docs
