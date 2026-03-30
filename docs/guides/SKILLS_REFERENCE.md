# Skills Reference — Extended Ecosystem

> Guide to additional Claude Code skills beyond what ships with New Baseline. Covers official Anthropic skills, community skills, and installation patterns.

---

## Frontend Design (Official Anthropic)

**Source:** [anthropics/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — 277,000+ installs

### What It Does

Build real design systems with bold typography and production-grade UI. Specifically designed to escape the "AI slop" aesthetic — generic, flat, indistinguishable UIs that AI tools tend to produce.

### What It Provides

- **Design system generation** — Color palettes, typography scales, spacing systems
- **Component patterns** — Production-ready component architectures
- **Bold typography** — Opinionated type choices that look professional
- **Layout systems** — Grid and flex patterns that work at scale
- **Dark mode** — Proper dark mode implementation, not just color inversion

### Installation

```bash
# Via Claude Code skills
cd your-project
# Copy the skill into your .claude/skills/ or skills/ directory
git clone https://github.com/anthropics/skills.git /tmp/anthropic-skills
cp -r /tmp/anthropic-skills/skills/frontend-design skills/frontend-design
rm -rf /tmp/anthropic-skills
```

Or reference directly in CLAUDE.md:

```markdown
## Skills

- Frontend Design: https://github.com/anthropics/skills/tree/main/skills/frontend-design
```

### Integration with New Baseline

Complements our existing UI skills:

| Existing Skill           | Frontend Design Addition |
| ------------------------ | ------------------------ | ----------------------------------- |
| `web-design-guidelines/` | General UI/UX standards  | Production design system generation |
| `react-best-practices/`  | React patterns           | Component architecture + styling    |
| `frontend-code-review/`  | Code quality             | Design quality + visual consistency |

**Recommended:** Install alongside existing skills. Use Frontend Design for new component creation, existing skills for review and patterns.

---

## Skill Creator (Official Anthropic)

**Source:** [anthropics/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)

### What It Does

The meta-skill. Describe a workflow in plain English and get a complete `SKILL.md` back in five minutes. Build new skills without writing any configuration.

### Already Documented

See [docs/guides/SKILL_CREATOR.md](./SKILL_CREATOR.md) for the full pipeline:

- Capture intent → write SKILL.md → test cases → eval with subagents → benchmark → iterate → optimize description triggering

### Quick Reminder

```
Prompt: "Create a skill that [describes workflow]"
→ Skill Creator interviews you about the workflow
→ Generates SKILL.md with triggers, instructions, examples
→ Tests the skill against edge cases
→ Outputs ready-to-install skill
```

---

## Obsidian Skills

**Source:** [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — Built by Obsidian's CEO

### What It Does

Auto-tagging, auto-linking, vault-native operations. If you use Obsidian, this is essential.

### Already Documented

See [docs/guides/ECOSYSTEM_TOOLS.md](./ECOSYSTEM_TOOLS.md) and [docs/guides/SECOND_BRAIN_OBSIDIAN.md](./SECOND_BRAIN_OBSIDIAN.md) for full details.

### Skills Provided

| Skill               | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `obsidian-markdown` | Obsidian Flavored Markdown (wikilinks, embeds, callouts, properties) |
| `obsidian-bases`    | Build `.base` files with views, filters, formulas                    |
| `json-canvas`       | JSON Canvas files with nodes, edges, groups                          |
| `obsidian-cli`      | Vault interactions for plugin/theme development                      |
| `defuddle`          | Web content → clean markdown (token-saving)                          |

### Installation

```bash
# Via Claude Code plugin marketplace
/plugin marketplace add kepano/obsidian-skills
/plugin install obsidian@obsidian-skills

# Or manually
git clone https://github.com/kepano/obsidian-skills.git /tmp/obsidian-skills
cp -r /tmp/obsidian-skills/.claude skills/obsidian-skills
```

---

## Context Optimization

**Source:** [muratcankoylan/agent-skills-for-context-engineering](https://github.com/muratcankoylan/agent-skills-for-context-engineering) — 13,900+ stars

### What It Does

Reduce token costs and improve KV-cache efficiency. Makes expensive API workflows significantly cheaper.

### Already Installed

Located at `skills/context-optimization/` in this repo. Also complemented by the `context-mode` MCP server in `.mcp.json.example`.

### Key Techniques

- **Context compaction** — Reduce token usage by up to 98%
- **KV-cache optimization** — Maximize cache hits for repeated patterns
- **Session continuity** — Maintain context across long sessions efficiently
- **Sandboxed execution** — Run operations in isolated contexts

### Usage

```
# Check context usage
/context-check

# Compact context when running low
/context
```

---

## Deep Research Skill

**Source:** [199-biotechnologies/claude-deep-research-skill](https://github.com/199-biotechnologies/claude-deep-research-skill)

### What It Does

8-phase research with auto-continuation. For when you need Claude to go deep on a topic, not just skim the surface.

### The 8 Phases

1. **Scope definition** — Define research question and boundaries
2. **Source identification** — Find relevant sources across web, docs, papers
3. **Deep reading** — Thorough analysis of each source
4. **Cross-referencing** — Validate claims across multiple sources
5. **Synthesis** — Combine findings into coherent narrative
6. **Gap analysis** — Identify what's missing or uncertain
7. **Conclusions** — Draw evidence-based conclusions
8. **Report generation** — Produce structured research document

### Installation

```bash
git clone https://github.com/199-biotechnologies/claude-deep-research-skill.git /tmp/deep-research
cp -r /tmp/deep-research/skills/deep-research skills/deep-research
rm -rf /tmp/deep-research
```

### When to Use

- Technical research before major architecture decisions
- Competitive analysis for PRDs
- Evaluating new libraries or frameworks
- Deep dives into unfamiliar domains before building

### Integration with New Baseline

Pairs with our research workflow:

```
Deep Research Skill → thorough investigation
    ↓
GSD research agents → synthesize into project context
    ↓
Canonical docs → capture decisions (TECH_STACK.md, ARCHITECTURE.md)
    ↓
Implementation → build with confidence
```

---

## Skill Installation Patterns

### Method 1: Direct Copy (Recommended)

```bash
# Clone the skill repo
git clone https://github.com/AUTHOR/SKILL_REPO.git /tmp/skill

# Copy into your skills directory
cp -r /tmp/skill/skills/SKILL_NAME skills/SKILL_NAME

# Clean up
rm -rf /tmp/skill
```

### Method 2: Git Submodule

```bash
# Add as submodule (tracks upstream changes)
git submodule add https://github.com/AUTHOR/SKILL_REPO.git skills/external/SKILL_NAME
```

### Method 3: Claude Code Plugin Marketplace

```bash
# Search for skills
/plugin marketplace search "skill name"

# Install
/plugin install author@skill-name
```

### Method 4: Reference in CLAUDE.md

```markdown
## External Skills

- Skill Name: https://github.com/author/repo
  Use for: [description]
```

---

## Skill Discovery Resources

| Resource              | URL                                                                                 | Description                               |
| --------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| Awesome Claude Skills | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | 22,000+ stars, best curated list          |
| Anthropic Skills Repo | [anthropics/skills](https://github.com/anthropics/skills)                           | Official reference implementations        |
| SkillsMP              | [skillsmp.com](https://skillsmp.com)                                                | Marketplace with 80,000+ community skills |

---

## References

- [anthropics/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
- [anthropics/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
- [muratcankoylan/agent-skills-for-context-engineering](https://github.com/muratcankoylan/agent-skills-for-context-engineering)
- [199-biotechnologies/claude-deep-research-skill](https://github.com/199-biotechnologies/claude-deep-research-skill)
