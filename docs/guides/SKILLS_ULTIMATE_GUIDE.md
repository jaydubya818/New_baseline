# Claude Skills: Ultimate Guide

> Comprehensive guide to building, optimizing, and distributing Claude Code Skills 2.0 — from basic templates to advanced eval-driven optimization.

## What Are Skills?

Skills are reusable instruction sets that Claude Code loads contextually. They live as markdown files in `.claude/skills/` and activate based on trigger descriptions or explicit invocation. Think of them as specialized expertise modules.

## Building a Skill

### Step 1: Enable Skill-Creator

Use the built-in skill-creator or manually create files:

```bash
# Via skill-creator command
/skill-creator

# Or manually
mkdir -p .claude/skills
```

### Step 2: Template Structure

```markdown
---
description: "Short description for trigger matching"
---

# Skill Name

## When to Use
[Trigger conditions]

## Instructions
[Step-by-step guidance]

## Examples
[Input/output pairs]

## Common Gotchas
[Known pitfalls]
```

### Step 3: Place and Use

- **Project skills**: `.claude/skills/` (version-controlled, shared with team)
- **User skills**: `~/.claude/skills/` (personal, all projects)

Invoke with `/skill-name` or let auto-trigger match based on the `description` field.

## Building Great Skills

### 1. Reverse Prompting

Start from a perfect output and work backward:
1. Manually craft the ideal result
2. Ask: "What instructions would produce this exact output?"
3. Encode those instructions as the skill

### 2. Reverse Building

Let Claude build the skill from examples:
1. Show Claude 3-5 examples of ideal output
2. Ask it to extract the pattern and write a skill
3. Iterate on edge cases

### 3. Context Engineering

Skills are context — not just instructions. Include:
- **Domain knowledge**: Technical details Claude wouldn't know
- **Decision frameworks**: How to choose between approaches
- **Anti-patterns**: What NOT to do (often more valuable than what to do)
- **Examples**: Concrete input → output pairs

### 4. Use Chats as Context

Copy successful conversation patterns into skills:
- Extract the back-and-forth that led to great results
- Turn it into a structured template
- Include the decision points and reasoning

### 5. Iterate Aggressively

Skills rarely work perfectly on first attempt:
1. Write v1 → test on 5 cases → identify failures
2. Add edge case handling → test again
3. Add gotchas section → test again
4. Repeat until 90%+ success rate

### 6. Include Real Examples

Abstract instructions fail. Concrete examples succeed:

```markdown
## Examples

### Good: API endpoint with validation
Input: "Create a user registration endpoint"
Output: [complete code with zod validation, error handling, rate limiting]

### Bad: Missing error handling
Input: "Create a user endpoint"  
Output: [code without try/catch — skill should prevent this]
```

### 7. QC Checklist

Before shipping a skill, verify:
- [ ] Works on 5+ diverse inputs
- [ ] Handles edge cases explicitly
- [ ] Gotchas section covers known pitfalls
- [ ] Description field accurately triggers on relevant prompts
- [ ] Doesn't railrod — leaves room for user intent

## Skills 2.0 Features

### Built-in Evals

Test skills systematically:

```bash
# Run evals against a skill
/skill-creator eval my-skill

# Define test cases in the skill itself
## Eval Cases
- input: "Create a REST API for users"
  expect: contains zod validation
  expect: contains error middleware
  expect: contains rate limiting
```

Evals run the skill against defined inputs and check outputs against expectations. Track pass rates over time.

### A/B Testing

Compare skill variants:
1. Create two versions of a skill (A and B)
2. Run both against the same eval suite
3. Compare output quality metrics
4. Ship the winner

### Trigger Optimization

Improve when skills activate:
- Analyze false positives (skill triggered when it shouldn't)
- Analyze false negatives (skill didn't trigger when it should)
- Refine the `description` field based on actual usage patterns
- Use `/skill-creator optimize-trigger my-skill` to auto-refine

## Skill Categories

| Category           | Purpose                                      | Example                              |
| ------------------ | -------------------------------------------- | ------------------------------------ |
| Library/API Ref    | Encode API knowledge Claude doesn't have     | Prisma 6 migration patterns          |
| Product Verify     | Ensure output matches product requirements   | Brand voice checker                  |
| Data Fetching      | Structured data retrieval patterns            | API response normalization           |
| Business Process   | Encode organizational workflows              | PR review checklist                  |
| Code Scaffolding   | Generate boilerplate with best practices     | Next.js API route generator          |
| Code Quality       | Enforce standards and patterns               | Error handling patterns              |
| CI/CD              | Deployment and pipeline patterns             | GitHub Actions workflow builder      |
| Runbooks           | Operational procedures                       | Incident response steps              |
| Infrastructure     | Cloud/infra configuration                    | Terraform module patterns            |

## Real Workflow Examples

### Brand Voice Skill

Ensures all generated content matches company tone:

```markdown
---
description: "Apply brand voice to marketing content, blog posts, emails"
---
# Brand Voice

## Tone: Professional but approachable
- Use active voice
- Avoid jargon unless technical audience
- Lead with benefits, not features
- Max sentence length: 25 words

## Forbidden phrases
- "leverage", "synergy", "paradigm shift"
- "It's important to note that..."
- "In today's fast-paced world..."
```

### Document Summarizer Skill

Consistent summaries across document types:

```markdown
---
description: "Summarize documents, reports, articles into structured briefs"
---
# Document Summarizer

## Output Format
1. **One-liner**: Single sentence summary
2. **Key Points**: 3-5 bullet points
3. **Action Items**: Extracted next steps
4. **Open Questions**: Unresolved issues

## Rules
- Never exceed 200 words total
- Preserve numerical data exactly
- Flag contradictions explicitly
- Note confidence level for inferences
```

## Distribution

### In-Repo (Recommended for Teams)

```
.claude/skills/
├── api-patterns.md
├── testing-guide.md
└── deployment-checklist.md
```

Version-controlled, reviewed via PR, shared across the team automatically.

### Marketplace

Publish skills for broader distribution via the SkillsMSP marketplace. Package skills with metadata, examples, and eval cases for discoverability.

### Curation

Maintain a curated list of team-approved skills. Review new skills quarterly. Retire skills that aren't triggered or have low eval pass rates.

## Tips from the Field

1. **Don't state the obvious** — Claude already knows how to write code. Encode what it doesn't know (your conventions, your APIs, your gotchas).
2. **Gotchas > instructions** — A "Common Mistakes" section prevents more bugs than detailed step-by-step guides.
3. **File system is context** — Use progressive disclosure: skill folder → README → detailed files. Claude reads what it needs.
4. **Don't railroad** — Leave room for Claude to adapt. Over-specified skills break on novel inputs.
5. **Store scripts** — Include actual runnable scripts in skills for setup, verification, and cleanup.
6. **Memory matters** — Skills can store/retrieve data across sessions using the file system.
7. **On-demand hooks** — Use setup patterns that run once, not every invocation.

## References

- [SKILLS_LESSONS.md](./SKILLS_LESSONS.md) — Anthropic's internal lessons on skill design
- [awesome-claude-skills](https://github.com/topics/claude-skills) — Community skill collections
- [Skill-Creator docs](https://code.claude.com/docs/en/skills) — Official Claude Code skill documentation
