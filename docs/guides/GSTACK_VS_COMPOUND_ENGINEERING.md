# gstack vs Compound Engineering — Two Claude Code Plugins That Matter

> Most Claude Code plugins are noise. These two change how you work.
> gstack optimizes for speed and shipping. Compound Engineering optimizes for quality and compounding over time.

---

## Why These Two

A new Claude Code plugin drops every day. Most aren't worth installing. These two are exceptions — both turn Claude Code into a structured engineering environment, both are free and MIT-licensed, and they solve different parts of the same problem.

- **gstack** by Garry Tan (Y Combinator CEO) — your virtual startup team
- **Compound Engineering** by Every.to — a methodology that gets smarter over time

---

## gstack: Garry Tan's Actual Setup

**GitHub:** [github.com/garrytan/gstack](https://github.com/garrytan/gstack) (40k+ stars in 12 days)

Garry Tan was an early engineer at Palantir, cofounded Posterous (sold to Twitter), and built Bookface (YC's internal social network). He shipped 600k+ lines of production code in 60 days while running YC full-time, then published his entire Claude Code setup.

gstack gives you a virtual team covering every function from business idea to production deploy:

| Role                | What It Does                                            |
| ------------------- | ------------------------------------------------------- |
| CEO                 | Stress-tests product decisions, kills bad ideas fast    |
| Engineering Manager | Owns architecture and implementation approach           |
| Designer            | Catches AI slop in UI/UX                                |
| QA Lead             | Opens a real browser on your staging URL via Playwright |
| Security Officer    | Runs security audits                                    |
| Release Engineer    | Ships the PR to production                              |

### Core Commands

| Command            | Purpose                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| `/office-hours`    | Describe what you're building, get structured feedback before writing code |
| `/plan-ceo-review` | Business and product lens on any feature idea                              |
| `/plan-eng-review` | Lock architecture and implementation approach                              |
| `/review`          | Comprehensive code review: bugs, security, performance, style              |
| `/qa`              | Real browser via Playwright, diff-aware QA on staging URL                  |
| `/retro`           | Weekly stats: lines added, commits, net LOC, running track record          |
| `/ship`            | Deploy to production                                                       |

### Philosophy: "Boil the Lake"

The philosophical core lives in `ETHOS.md`. The premise: with AI, the marginal cost of completeness is near-zero and takes minutes. So you always do the complete thing — no tradeoffs, no skipping steps. This inverts the typical startup approach of cutting corners due to time constraints.

### Who It's For

Early-stage startup founders, especially solo builders, who want the closest thing to a complete team. If you're a one or two-person team trying to move like a company of twenty, this is going to be very helpful.

### Install

```bash
# Already included in this repo as a skill (skills/gstack/)
# For standalone install:
claude plugin marketplace add garrytan/gstack
claude plugin install gstack
```

> **Note:** This repo already ships gstack as `skills/gstack/`. You don't need to install it separately.

---

## Compound Engineering: Every.to's Engineering Operating System

**GitHub:** [github.com/EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) (10k+ stars)

Every.to is an AI startup and media company that builds products with single-person teams. Compound Engineering is what they use to do it.

Where gstack is a "copy my setup" approach, Compound Engineering is an "adopt a methodology" approach. It's a full engineering operating system built on the idea that 80% of effort goes to planning and review, 20% to execution.

The plugin ships with 26 specialized agents, 23 workflow commands, and 13 skills.

### Core Loop

```
Brainstorm → Plan → Work → Review → Compound → Repeat
```

| Command          | Purpose                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `/ce:ideate`     | Surface high-impact project improvements                                                                 |
| `/ce:brainstorm` | Explore requirements and approaches before planning (auto-shortcircuits when unnecessary)                |
| `/ce:plan`       | Convert feature ideas into detailed implementation plans                                                 |
| `/ce:work`       | Execute plans with git worktrees and task tracking                                                       |
| `/ce:review`     | 14 specialized code reviewers running in parallel (security, performance, over-engineering, style, etc.) |
| `/ce:compound`   | **The differentiator** — capture what was solved, what patterns emerged, what was learned                |

### The Compound Step

This is the unique idea. After every task, `/ce:compound` captures learnings specific to your codebase and your way of working. Over time it builds a library of experiences that makes each unit of work slightly cheaper than the last — compounding productivity the same way compounding interest compounds money.

### Who It's For

Established engineering teams who want systematic review and QA on every PR. The "compound" part pays off over time, so it's best suited for teams running production apps rather than hobbyists doing experiments.

### Install

```bash
# Claude Code
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering

# Cursor
/add-plugin compound-engineering

# Other platforms (Codex, Windsurf, Gemini, etc.)
bunx @every-env/compound-plugin install compound-engineering --to [target]
```

---

## Head-to-Head Comparison

| Dimension         | gstack                                         | Compound Engineering                                               |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| **Philosophy**    | "Boil the Lake" — do the complete thing        | Each unit of work makes the next one easier                        |
| **Optimizes for** | Speed and shipping                             | Quality and compounding                                            |
| **Team model**    | Virtual roles (CEO, EM, QA, Security, Release) | Specialized review agents (14 parallel reviewers)                  |
| **Planning**      | `/office-hours` + CEO/Eng review gates         | `/ce:brainstorm` + `/ce:plan` structured planning                  |
| **Code review**   | Single comprehensive `/review`                 | 14-agent parallel review (security, perf, style, over-engineering) |
| **QA**            | Real browser via Playwright (`/qa`)            | Review-focused (no browser QA)                                     |
| **Learning**      | No built-in learning loop                      | `/ce:compound` captures learnings after every task                 |
| **Effort split**  | Ship fast, fix forward                         | 80% planning/review, 20% execution                                 |
| **Best for**      | Solo founders, small teams, speed              | Established teams, production apps, long-term quality              |
| **Stars**         | 40k+ (12 days)                                 | 10k+ (more established)                                            |
| **License**       | MIT                                            | MIT                                                                |

---

## The Power User Stack: Use Both

gstack and Compound Engineering are not mutually exclusive. Use gstack for the fast loop and CE for the quality compounding layer.

### Combined Workflow

```
1. /office-hours          (gstack)    — validate the idea
2. /plan-ceo-review       (gstack)    — product lens
3. /plan-eng-review       (gstack)    — lock architecture
4. /ce:work               (CE)        — systematic execution with tracking
5. /review or /ce:review  (either)    — CE's 14-agent review for complex PRs
6. /qa                    (gstack)    — real browser, staging URL, diff-aware
7. /ce:compound           (CE)        — capture learnings for next time
8. /ship                  (gstack)    — deploy
```

You get gstack's speed and opinionated defaults plus Compound Engineering's compounding quality curve.

---

## Integration with This Repo

This repo ships both plugins as skills:

Both are already installed:

- **gstack** — `skills/gstack/`
- **Compound Engineering** — `skills/compound-engineering/`

The two plugins use different command prefixes (`/` vs `/ce:`) so there are no conflicts. Use whichever commands fit the situation — or combine them as shown above.

---

## See Also

- [skills/gstack/](../../skills/gstack/) — gstack skill (already installed in this repo)
- [AGENT_SKILLS.md](./AGENT_SKILLS.md) — More Claude Code skills worth installing
- [CLAUDE_CODE_BEST_PRACTICES.md](./CLAUDE_CODE_BEST_PRACTICES.md) — Settings, permissions, orchestration patterns
- [AWESOME_CLAUDE_CODE.md](./AWESOME_CLAUDE_CODE.md) — Full ecosystem catalog
