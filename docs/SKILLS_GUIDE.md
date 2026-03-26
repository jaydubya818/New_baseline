# Skills 2.0 — How to Build Claude Skills

> Teach Claude your business processes and specialized knowledge.
> Build once, benefit every session.

## What Are Skills?

Skills are reusable knowledge and procedures that Claude Code loads on demand. Each skill is a Markdown file (`SKILL.md`) with optional scripts and resources. Claude automatically discovers and loads the relevant skill when your request matches its description.

## Three-Layer Loading (Progressive Disclosure)

| Layer | When Loaded | Token Cost |
|-------|------------|------------|
| **Metadata** (YAML frontmatter) | Session start — always | ~20 tokens per skill |
| **Content** (SKILL.md body) | On demand — when request matches | Variable |
| **References** (external files) | On demand — when skill needs them | Variable |

This means you can have hundreds of skills installed with near-zero cost until they're actually triggered.

## File Structure

```
.claude/skills/
  my-skill/
    SKILL.md          ← Main instructions (keep under 500 lines)
    templates/        ← Template files
    reference.md      ← Detailed reference material
    scripts/          ← Helper scripts
```

## SKILL.md Format

```markdown
---
name: Your Skill Name
description: >
  Brief description of what this Skill does and when to use it.
  This description is what Claude matches against your requests.
---

# Your Skill Name

## Instructions
Clear, step-by-step guidance for Claude.
Imperative style. No fluff.

## Examples
Concrete examples of input → output.

## References
Point to additional files to load when needed:
- Read `templates/report.md` for the report format
- Read `reference.md` for detailed API documentation
```

## Writing High-Quality Skills

### Metadata is Everything
Claude reads metadata at startup and decides which skill to load based on the `description`. Write it like a search query — what would someone say when they need this skill?

**Good:** `"Generate weekly team status reports using the company's 3-part format (achievements, blockers, next steps)"`
**Bad:** `"A skill for reports"`

### Content Rules
1. **Only write what Claude doesn't know** — Skip general programming knowledge, library docs, language basics
2. **Imperative style** — "Do X" not "You should consider doing X"
3. **Keep under 500 lines** — Split reference material into separate files
4. **Match instruction granularity to the task:**
   - **High freedom** (writing, creative) → text instructions
   - **Medium freedom** (patterns) → pseudocode with parameters
   - **Low freedom** (critical procedures) → exact scripts, few parameters
5. **Skip what's in CLAUDE.md** — Don't duplicate system-level instructions

### Progressive Disclosure in Practice
```markdown
## Instructions
1. Read the user's requirements
2. Load `templates/base.md` for the document structure
3. If the user needs charts, also load `reference/chart-patterns.md`
4. Generate the output following the template
```

Claude only loads what's needed for the current step, not everything at once.

## When to Create a Skill

**Create a skill when:**
- You repeat the same instructions across multiple sessions
- You have templates, formats, or assets used repeatedly
- A workflow has 3+ steps that should always happen the same way
- Multiple team members need the same process

**Don't create a skill when:**
- It's a one-off request
- The task changes significantly each time
- A simple prompt works fine

## Examples of Good Skills

| Skill | Trigger | What It Does |
|-------|---------|-------------|
| Weekly Report Generator | "write the weekly report" | Fills company template with structured content |
| PR Review Responder | "respond to PR comments" | Fetches unaddressed comments, suggests fixes |
| Brand Presentation | "create a deck in our style" | Applies brand guidelines, logos, colors |
| App Launch Planner | "plan app launch" | 30-day phased plan with checklists |
| Market Analysis | "competitor analysis" | Fixed analytical framework + data structure |

## Skills vs MCP

| | MCP | Skills |
|---|-----|--------|
| **Analogy** | Professional kitchen (tools) | Recipes (workflows) |
| **Provides** | Access to tools, APIs, data | Step-by-step instructions |
| **Defines** | What can be done | How to do it |
| **Example** | GitHub API access | PR review workflow using GitHub API |

Best results come from combining both: MCP provides the tools, Skills teach the workflow.

## Using the Skill Creator

The `skill-creator` meta-skill automates skill creation:

1. Describe what kind of skill you want
2. It generates a SKILL.md draft
3. Tests it with a sample prompt
4. Evaluates results and proposes improvements
5. Iterates until quality is high

Trigger: "Create a skill that..." or use `/skill-creator`

## Skill Sources

| Source | URL |
|--------|-----|
| Official (Anthropic) | `https://github.com/anthropics/skills` |
| Community | `https://skillsmp.com/` |
| Community | `https://www.aitmpl.com/skills` |

Install via: `/plugin install document-skills@anthropic-agent-skills`

## Skills Already in This Repo

See `skills/README.md` for the full catalog. Key skills:
- `skills/gstack/` — Browser QA + workflow OS
- `skills/bmad/` — Product shaping
- `skills/gsd/` — Structured execution
- `skills/superpowers/` — Parallel agents, TDD, worktrees
- Plus 10+ engineering skills for React, Vitest, E2E, etc.
