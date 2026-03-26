# Skill Creator — Official Anthropic Guide

Source: [anthropics/skills/skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)

Skills are `SKILL.md` files that give AI agents specialized playbooks for specific tasks. This guide covers the official Anthropic methodology for creating, testing, and optimizing skills.

## Skill Creation Pipeline

```
Capture Intent → Interview & Research → Write SKILL.md → Create Test Cases → Run & Evaluate → Improve → Optimize Description
```

## 1. Capture Intent

Answer four questions before writing anything:

1. What should this skill enable Claude to do?
2. When should this skill trigger? (user phrases/contexts)
3. What's the expected output format?
4. Should we set up test cases? (if output is objectively verifiable → yes)

## 2. Interview and Research

Ask about edge cases, input/output formats, example files, success criteria. Use MCPs to research if helpful. Don't write test prompts until requirements are clear.

## 3. Write the SKILL.md

### File Structure

```
skill-name/
├── SKILL.md              # Required — instructions
├── evals/
│   └── evals.json        # Test cases
├── scripts/              # Executable code (optional)
├── references/           # Documentation (optional)
└── assets/               # Templates, icons, fonts (optional)
```

### Required Frontmatter

```yaml
---
name: my-skill
description: >
  Create X when Y happens. Use when user mentions Z.
  Be "pushy" about when to trigger — embedding similarity drives matching.
compatibility:
  - tool: Bash
    reason: "Needed for running scripts"
---
```

### Progressive Disclosure (Three Levels)

| Level | Size | When Loaded |
|-------|------|-------------|
| **Metadata** | ~100 words | Always in context (frontmatter) |
| **SKILL.md body** | <500 lines ideal | When skill triggers |
| **Bundled resources** | Unlimited | As needed by instructions |

### Writing Patterns

- **Imperative form** — "Generate a report" not "This skill generates reports"
- **Define output formats explicitly** — Include Input → Output examples
- **Explain the why** — Not rigid rules. LLMs have strong theory of mind; reasoning > constraints
- **Avoid ALL CAPS MUSTs/NEVERs** — They don't help. Clear reasoning does.
- **Draft, then review with fresh eyes** — Read it as if you've never seen it

### Principle of Lack of Surprise

Skills must not contain malware, exploits, or misleading content. Content should match the description.

## 4. Create Test Cases

After drafting the skill, create 2-3 realistic test prompts:

```json
{
  "skill_name": "my-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's task prompt",
      "expected_output": "Description of expected result",
      "files": []
    }
  ]
}
```

## 5. Run and Evaluate

Run with-skill and baseline (without-skill) in parallel using subagents. Results go in a workspace:

```
my-skill-workspace/
├── iteration-1/
│   ├── eval-0/
│   │   ├── with_skill/outputs/
│   │   ├── without_skill/outputs/
│   │   └── eval_metadata.json
│   ├── benchmark.json
│   └── feedback.json
```

### Evaluation Steps

1. **Spawn all runs** — With-skill AND baseline simultaneously
2. **Draft assertions** — While runs execute, write objectively verifiable checks
3. **Capture timing** — Save `total_tokens`, `duration_ms` from task notifications
4. **Grade** — Use grader agent or inline grading with `passed`, `evidence`, `text` fields
5. **Aggregate** — `python -m scripts.aggregate_benchmark <workspace>/iteration-N`
6. **Launch viewer** — HTML review interface with Outputs tab (feedback) and Benchmark tab (stats)

### Good Assertions

- Objectively verifiable (not "looks good")
- Descriptive names that read clearly in benchmark viewer
- For subjective skills (writing, design) → use qualitative evaluation instead

## 6. Improve the Skill

### Improvement Principles

1. **Generalize from feedback** — Build for a million uses, not just test cases
2. **Keep the prompt lean** — Remove anything not pulling weight
3. **Explain the why** — Reasoning > rigid rules
4. **Bundle repeated work** — If all tests generated similar scripts, put them in `scripts/`

### Iteration Loop

```
Apply changes → Rerun all tests (new iteration/) → Launch viewer with --previous-workspace → Read feedback → Repeat
```

Stop when: user says happy, all feedback is empty, or no meaningful progress.

## 7. Optimize Description (Triggering)

The `description` field drives triggering via embedding similarity. After the skill works well, optimize it.

### Generate Trigger Eval Queries

Create 20 queries — mix of should-trigger (8-10) and should-not-trigger (8-10):

```json
[
  {"query": "realistic user prompt with context", "should_trigger": true},
  {"query": "near-miss with shared keywords", "should_trigger": false}
]
```

**Make them realistic** — include file paths, personal context, typos, varied lengths. Not abstract one-liners.

Bad: `"Format this data"`, `"Create a chart"`

Good: `"ok so my boss just sent me this xlsx file (in my downloads, 'Q4 sales final FINAL v2.xlsx') and she wants me to add a column showing profit margin as percentage"`

### Run Optimization

```bash
python -m scripts.run_loop \
  --eval-set <path-to-trigger-eval.json> \
  --skill-path <path-to-skill> \
  --model <model-id> \
  --max-iterations 5 \
  --verbose
```

Apply the optimized description to your SKILL.md frontmatter.

## Quick Reference

| Stage | Key Output |
|-------|-----------|
| Capture Intent | 4 answered questions |
| Interview | Requirements, edge cases, success criteria |
| Write SKILL.md | Frontmatter + instructions (<500 lines) |
| Test Cases | `evals/evals.json` with 2-3 realistic prompts |
| Evaluate | `benchmark.json` + `feedback.json` per iteration |
| Improve | Updated SKILL.md based on feedback patterns |
| Optimize | Trigger-optimized description field |

## How This Maps to Our Repo

Our existing skills in `skills/` follow this structure. Key connections:
- `skills/gsd/` — GSD skill with its own SKILL.md
- `skills/bmad/` — BMAD product shaping skill
- `skills/superpowers/` — Parallel agents, TDD, worktrees
- `.claude/rules/testing.md` — Test patterns that align with eval methodology
- `docs/guides/SKILLS_ULTIMATE_GUIDE.md` — Broader skills ecosystem context
