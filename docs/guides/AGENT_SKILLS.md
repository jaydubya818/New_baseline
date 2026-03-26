# Agent Skills for Claude Code (2026)

Agent skills are `SKILL.md` files that extend what Claude Code knows how to do. When installed, they give the agent a specialized playbook — instructions, templates, and context for a specific class of task. Skills can be invoked explicitly with a slash command (e.g., `/frontend-design`) or trigger automatically when the agent recognizes a relevant task.

The same `SKILL.md` format works across Claude Code, Cursor, Gemini CLI, Codex CLI, and Antigravity IDE.

## The 10 Must-Have Skills

| # | Skill | Install Command | What It Does |
|---|-------|----------------|-------------|
| 1 | **Frontend Design** | `npx skills add anthropics/claude-code --skill frontend-design` | Production-grade UI — escapes "AI-generated" look (277k+ installs) |
| 2 | **Browser Use** | `npx skills add https://github.com/browser-use/browser-use --skill browser-use` | Live web interaction — navigate, click, fill forms, screenshot |
| 3 | **Code Reviewer** | `npx skills add anthropics/claude-code --skill simplify` | Auto-review for reuse, quality, efficiency — fixes before presenting |
| 4 | **Remotion** | `npx skills add remotion/agent-skills` | React-based programmatic video creation (demos, releases, explainers) |
| 5 | **Google Workspace** | `npx skills add https://github.com/googleworkspace/cli` | 50+ Google APIs — Gmail, Drive, Calendar, Sheets, Slides, Chat |
| 6 | **Valyu** | `npx skills add https://github.com/valyuai/skills --skill valyu-best-practices` | Web search + 36 specialized data sources (SEC, PubMed, FRED) |
| 7 | **Antigravity Awesome** | `npx antigravity-awesome-skills --claude` | 1,234+ curated skills — one install covers nearly every workflow |
| 8 | **PlanetScale** | `npx skills add planetscale/agent-skill` | Schema branching, index-aware queries, deploy requests |
| 9 | **Shannon** | `npx skills add unicodeveloper/shannon` | Autonomous pen testing — 96% exploit success, 50+ vuln types |
| 10 | **Excalidraw Diagrams** | `npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram` | Architecture diagrams from natural language with self-validation |

## Quick Install

```bash
# Core skills (install individually)
npx skills add anthropics/claude-code --skill frontend-design
npx skills add anthropics/claude-code --skill simplify

# Mega-library (1,234+ skills at once)
npx antigravity-awesome-skills --claude

# List installed skills
npx skills list
```

## Skill Details

### 1. Frontend Design

Breaks the "distributional convergence" problem — without it, Claude defaults to Inter font, purple gradient, minimal animations. With it, you get bold aesthetic choices, distinctive typography, purposeful color palettes, and intentional animations.

Invoke: `/frontend-design` + describe what you want to build.

### 2. Browser Use

Gives Claude actual browser control — navigate URLs, click elements, fill forms, extract from JS-rendered pages, take screenshots. Turns Claude into an E2E QA engineer + research analyst.

### 3. Code Reviewer / Simplify

Runs a structured review pass before presenting code. Checks: functions violating single responsibility, duplicated logic, performance issues (N+1 queries, unnecessary re-renders), dead code, naming. Doesn't just flag — fixes automatically.

Pair with review standards in `CLAUDE.md`:

```markdown
## Code Review Standards
After completing any implementation, review the code for:
- Functions longer than 30 lines (likely doing too much)
- Logic duplicated more than twice (extract to utility)
- Any `any` type usage in TypeScript (replace with real types)
- Components with more than 3 props that could be grouped
- Missing error handling on async operations

Run /simplify before presenting code to the user.
```

### 4. Remotion

React framework for programmatic video. Describe what you want, Claude generates Remotion components with `useCurrentFrame()` animations, you preview in Remotion Studio and render to MP4.

### 5. Google Workspace (GWS)

CLI that dynamically discovers all Google Workspace APIs via Discovery Service and exposes them as a unified MCP server. 4,900 GitHub stars in first 3 days.

```bash
npm install -g @googleworkspace/cli
gws mcp -s drive,gmail,calendar,sheets
```

Pre-built recipes: executive assistant, project manager, IT admin, sales team.

### 6. Valyu

Connects to 36+ specialized data sources via a single API. One search call returns results from SEC 10-K filings, PubMed, ChEMBL, clinical trials, FRED economic indicators, patent databases, and academic publishers.

Benchmarks: FreshQA 79% (vs Google 39%), Finance 73% (vs Google 55%), MedAgent 48%.

### 7. Antigravity Awesome Skills

1,234+ agentic skills, 22k+ GitHub stars. Cross-compatible with Claude Code, Cursor, Gemini CLI, Codex CLI.

Key starter skills:
- `@brainstorming` — structured planning before writing code
- `@architecture` — system design and component structure
- `@debugging-strategies` — systematic troubleshooting
- `@api-design-principles` — API shape, consistency, versioning
- `@security-auditor` — security-focused code review
- `@create-pr` — packages work into clean pull requests

Role-based bundles: Web Wizard, Security Engineer, Essentials.

### 8. PlanetScale Database Skills

Teaches agents PlanetScale's branching model (maps to git), foreign key conventions, index-aware query writing, and `pscale` CLI for branches/deploy requests/migrations.

Agent workflow: creates branch → designs schema → verifies indexes → creates deploy request → reports.

### 9. Shannon (Autonomous Pen Testing)

White-box security testing: analyzes source code, maps attack surfaces, executes real attacks across 50+ vulnerability types in 5 OWASP categories. 96.15% exploit success on XBOW benchmark. No false positives ("no exploit, no report").

5-phase pipeline: Pre-Recon → Recon → Vulnerability Analysis (5 parallel agents) → Exploitation → Reporting.

**Requirements:** Docker + Anthropic API key. ~1-1.5 hours per full pentest, ~$50 cost.
**Warning:** Only run against systems you own or have explicit written authorization to test.

### 10. Excalidraw Diagram Generator

Generates Excalidraw diagrams from natural language. Design philosophy: diagrams that argue (visual structure maps to conceptual structure), evidence artifacts (real code snippets inline), and visual self-validation (Playwright renders, reviews for layout issues, fixes before presenting).

Brand customization via `references/color-palette.md`.

## Context Mode (Bonus)

Not a skill but an MCP server that optimizes context windows. Compresses 315KB → 5.4KB (98% reduction), tracks file edits/git ops/tasks/errors in SQLite with FTS5 search, enables session continuity across conversations.

```bash
# Install as plugin
/plugin marketplace add mksglu/context-mode
/plugin install context-mode@context-mode

# Or via npm
npm install -g context-mode

# Verify
/context-mode:ctx-doctor
```

Key tools: `ctx_batch_execute` (multiple commands in one call), `ctx_execute` (sandboxed code in 11 languages), `ctx_index`/`ctx_search` (FTS5 + BM25 ranking), `ctx_fetch_and_index` (URL fetching + auto-indexing).

## When to Use Each

| Need | Skill |
|------|-------|
| UI that doesn't look AI-generated | Frontend Design |
| Live web interaction / E2E QA | Browser Use |
| Code quality on every change | Code Reviewer (Simplify) |
| Video content without video tools | Remotion |
| Google Workspace automation | GWS |
| Specialized/paywalled data | Valyu |
| Everything else (1,234+ skills) | Antigravity Awesome Skills |
| Database schema + branching | PlanetScale |
| Security validation | Shannon |
| Architecture diagrams | Excalidraw |
| Context window optimization | Context Mode (MCP) |

## Key Principle

The best skills shift what the agent produces without requiring constant prompting. Frontend Design changes what "build me a landing page" returns. Shannon runs an adversarial pass before anything goes to production. The Excalidraw skill generates a diagram you can actually share.

Skills that change default behavior > skills that add commands you have to remember to invoke.

## Resources

- [skills.sh](https://skills.sh) — skill discovery
- [aitmpl.com/skills](https://www.aitmpl.com/skills) — daily skill updates
- [Antigravity Awesome Skills](https://github.com/anthropics/awesome-claude-code) — 1,234+ curated library
