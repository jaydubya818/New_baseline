# SETUP — New Baseline Quick Start

---

## One-Time Machine Setup (do once, not per project)

```bash
# 1. Setup gstack browser (builds persistent Chromium)
cd skills/gstack && ./setup && cd ../..

# 2. Verify gstack works
B=skills/gstack/browse/dist/browse
$B goto https://example.com
$B screenshot /tmp/test.png
```

---

## Per-Project Setup (every new project)

```bash
# Clone and re-init
git clone https://github.com/jaydubya818/New_baseline.git my-project
cd my-project
rm -rf .git && git init
git remote add origin https://github.com/jaydubya818/YOUR_NEW_REPO.git

# Copy doc templates
cp docs/templates/PRD.md docs/PRD.md
cp docs/templates/APP_FLOW.md docs/APP_FLOW.md
cp docs/templates/TECH_STACK.md docs/TECH_STACK.md
cp docs/templates/IMPLEMENTATION_PLAN.md docs/IMPLEMENTATION_PLAN.md
cp docs/templates/ARCHITECTURE.md docs/ARCHITECTURE.md

# Update CLAUDE.md — change the "Project Overview" section
# Update .gstackrc — set profile= for your project type:
#   product-ui | platform | agent-platform | api | monorepo-root

# Install dependencies for your project (not the baseline's deps)
# npm install / bun install / pnpm install

# Create your first commit
git add .
git commit -m "chore: initialize from New_baseline"
git push -u origin main
```

---

## gstack Profiles (set in .gstackrc)

```
profile=product-ui      # Next.js/React apps with UI
profile=platform        # Backend/API/data platforms
profile=agent-platform  # AI agent orchestration systems
profile=api             # Pure API / microservice
```

---

## Key Files to Update After Cloning

| File | What to change |
|------|---------------|
| `CLAUDE.md` | Project name, stack, specific rules |
| `.gstackrc` | Set correct profile |
| `docs/PRD.md` | Fill in actual product requirements |
| `docs/TECH_STACK.md` | Fill in your actual stack |
| `progress.txt` | Clear and start fresh |

---

## First Session Checklist

- [ ] CLAUDE.md updated with project identity
- [ ] .gstackrc profile set
- [ ] Doc templates copied and filled in
- [ ] progress.txt initialized
- [ ] gstack browser set up (one-time)
- [ ] Run `/session-start` to verify context loads
- [ ] Run `/autoplan` for first feature

---

## Skill Activation Reference

To use a skill in your project, reference it from CLAUDE.md or run directly:

```
# gstack
skills/gstack/review/SKILL.md
skills/gstack/qa/SKILL.md

# BMAD
skills/bmad/core/bmad-init
skills/bmad/analysis/bmad-product-brief

# GSD
skills/gsd/workflows/new-project.md
skills/gsd/workflows/execute-phase.md

# Superpowers
skills/superpowers/subagent-driven-development/
skills/superpowers/test-driven-development/
```
