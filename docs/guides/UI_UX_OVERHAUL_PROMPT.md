# UI/UX Overhaul Prompt

> A battle-tested prompt for commanding a substantial UI/UX overhaul of any application. Use with the [UI/UX Pro Max skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) for best results.
>
> **Prerequisite:** Install the UI/UX Pro Max skill first (see [SKILLS_REFERENCE.md](./SKILLS_REFERENCE.md) or the skill guide at [UI_UX_PRO_MAX.md](./UI_UX_PRO_MAX.md)).

---

## The Prompt

Copy and paste this directly into Claude Code. It is designed to be a complete, self-contained instruction set that drives a thorough, systematic overhaul — not a light refresh.

```
I want a substantial UI/UX overhaul of this application.

Start by reviewing the codebase deeply so you understand the architecture,
component model, layout structure, styling approach, user flows, and current
weaknesses. Then identify what needs to change to significantly improve the
product experience.

This is not a light refresh. This is a quality upgrade. I want the UI to feel
modern, premium, clean, cohesive, intuitive, and production-ready.

Do not settle for surface-level tweaks. Do not stop after minor styling updates.
Do not preserve weak UX patterns just because they already exist.

You should:
- identify the weakest screens and components
- improve layout composition and spacing system
- strengthen typography and visual hierarchy
- modernize cards, tables, forms, modals, buttons, filters, nav, and dashboards
- improve responsiveness and usability across breakpoints
- refine interaction details including hover, focus, loading, empty, and error states
- remove clutter and improve scanability
- make the overall interface more elegant, structured, and trustworthy

Use modern UI/UX best practices and current high-quality SaaS patterns as the
benchmark. Every change should improve both aesthetics and usability.

Approach:
1. audit the current UI/UX
2. identify major design and usability gaps
3. define the highest-impact improvements
4. implement those improvements across the codebase
5. ensure consistency across screens and shared components
6. leave the codebase cleaner than you found it

Constraints:
- keep the implementation maintainable
- respect the existing stack and architecture unless there is a strong reason to improve it
- do not introduce random visual changes without a system behind them
- favor consistency, usability, and polish over flashy design
- avoid overdesign

Output:
- directly implement the UI improvements
- summarize what you changed
- explain the major problems you found
- explain how the updated design improves the product

Use strong product judgment. Make it look and feel like a serious, well-designed
application.
```

---

## How to Use This

### Option 1: Full Overhaul (recommended)

```bash
# 1. Install UI/UX Pro Max skill if not already present
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git /tmp/uiux
cp -r /tmp/uiux/skills/ui-ux-pro-max skills/ui-ux-pro-max
rm -rf /tmp/uiux

# 2. Open Claude Code in your project
# 3. Paste the prompt above
# 4. Let it work — it will audit, plan, and implement
```

### Option 2: Targeted Overhaul

Prefix the prompt with a scope constraint:

```
Focus only on the dashboard and settings pages.
[paste full prompt here]
```

### Option 3: Audit Only (no implementation)

Replace the "Output" section with:

```
Output:
- produce a detailed audit report
- rank all findings by impact (critical / high / medium / low)
- suggest specific improvements for each finding
- do NOT implement any changes yet
```

---

## What the UI/UX Pro Max Skill Adds

When installed, the skill gives Claude access to:

| Capability                | Count |
| ------------------------- | ----- |
| UI styles                 | 67    |
| Color palettes            | 161   |
| Font combinations         | 57    |
| Industry-specific rules   | Yes   |
| Design system generation  | Yes   |
| Component pattern library | Yes   |

Without the skill, Claude still produces good results from the prompt alone. With the skill, it produces **significantly better** results because it has access to curated design intelligence instead of relying on training data alone.

---

## Tips for Best Results

1. **Run on a real codebase** — The prompt is designed for existing apps, not empty projects
2. **Give it time** — A thorough overhaul takes many tool calls. Don't interrupt early.
3. **Review in browser** — After Claude finishes, run `npm run dev` and check every screen
4. **Iterate** — If specific screens need more work, point Claude at them: "The settings page still looks weak. Apply the same standards."
5. **Combine with `/qa`** — Run gstack's `/qa` command after the overhaul to get screenshot-based QA validation
6. **Version control** — Commit before running the overhaul so you can `git diff` the changes

---

## Pairing with New Baseline Skills

| Skill                         | How It Helps                        |
| ----------------------------- | ----------------------------------- |
| `web-design-guidelines/`      | Standards reference during overhaul |
| `react-best-practices/`       | Component architecture patterns     |
| `frontend-code-review/`       | Post-overhaul code quality check    |
| `frontend-testing/`           | Component tests after UI changes    |
| gstack `/qa`                  | Screenshot-based QA validation      |
| gstack `/review --dual-model` | Adversarial review of UI changes    |

---

## References

- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — The skill
- [docs/guides/UI_UX_PRO_MAX.md](./UI_UX_PRO_MAX.md) — Detailed skill guide (already in repo)
