# GSD vs Superpowers — Cheat Sheet

> GSD owns the **what** and **when**. Superpowers owns the **how** and **how well**.
> Use GSD when scope is big or ambiguous. Use Superpowers when execution quality matters.

---

## When To Pick Which

### Start with GSD when:

- Net-new major feature with multiple systems involved
- Cross-cutting changes (UI + API + auth + payments)
- Multi-phase work with dependencies between phases
- Architectural decisions need to be made before coding
- Scope is unclear and needs structured breakdown

### Start with Superpowers when:

- Focused bug fix with a known reproduction
- Small/medium feature tweak or enhancement
- "Implement this task now" — scope is already clear
- Code review, testing, or shipping steps
- Quick brainstorm before a small build

---

## The Two Systems at a Glance

### GSD (Get-Shit-Done)

Structured execution system for large work. Organizes projects into **milestones → phases → tasks** with dedicated agents for each stage.

| What It Provides       | How                                                                   |
| ---------------------- | --------------------------------------------------------------------- |
| Project initialization | `/gsd:new-project` → creates PROJECT.md, REQUIREMENTS.md, ROADMAP.md  |
| Milestone planning     | `/gsd:new-milestone` → defines scope and success criteria             |
| Phase planning         | `/gsd:plan-phase` → breaks milestones into executable phases          |
| Parallel execution     | `/gsd:execute-phase` → wave-based parallel subagents per plan         |
| Validation             | `/gsd:validate-phase` → verifies completed work against spec          |
| Shipping               | `/gsd:ship` → deploys a milestone                                     |
| Research               | `/gsd:research-phase` → deep research before starting a phase         |
| Architecture           | GSD Architecture Agent (01) → system design, ADRs, boundaries         |
| Task breakdown         | GSD Task Breakdown Agent (04) → atomic tasks with acceptance criteria |
| Quality auditing       | GSD Nyquist Auditor → completeness and quality checks                 |

**Key GSD agents:** `gsd-planner`, `gsd-executor`, `gsd-verifier`, `gsd-debugger`, `gsd-roadmapper`, `gsd-codebase-mapper`, `gsd-assumptions-analyzer`, `gsd-ui-auditor`

**57 GSD commands** covering the full lifecycle from `/gsd:new-project` to `/gsd:ship`.

### Superpowers

Advanced AI execution patterns for quality implementation. Each skill enforces a specific discipline with hard gates that prevent shortcuts.

| What It Provides      | Skill                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------- |
| Brainstorming         | `brainstorming` → explore intent, propose 2-3 approaches, get approval before code      |
| TDD                   | `test-driven-development` → write test, watch it fail, write minimal code to pass       |
| Debugging             | `systematic-debugging` → reproduce → isolate → hypothesize → verify → fix (no guessing) |
| Verification          | `verification-before-completion` → evidence before claims, always run the proof command |
| Code review (request) | `requesting-code-review` → structure a review request for maximum signal                |
| Code review (receive) | `receiving-code-review` → process feedback, address comments systematically             |
| Parallel agents       | `dispatching-parallel-agents` → one agent per independent problem, concurrent execution |
| Subagent dev          | `subagent-driven-development` → full feature built by coordinated subagents             |
| Git worktrees         | `using-git-worktrees` → parallel work in isolated branches                              |
| Plan writing          | `writing-plans` → structured plan authoring                                             |
| Plan execution        | `executing-plans` → plan execution with tracking                                        |
| Branch completion     | `finishing-a-development-branch` → checklist before merge                               |
| Writing skills        | `writing-skills` → Anthropic best practices for skill authoring                         |

**Iron Laws** (hard gates enforced by each skill):

- TDD: "If you didn't watch the test fail, you don't know if it tests the right thing"
- Debugging: "No fixes without root cause investigation first"
- Verification: "No completion claims without fresh verification evidence"
- Brainstorming: "No implementation until design is presented and approved"

---

## Recommended Flows

### Large Work (preferred path)

```
GSD Architecture/Planning/Task Breakdown
         ↓
Implement tasks with Superpowers TDD
         ↓
Superpowers verification-before-completion
         ↓
GSD validate-phase → ship
```

1. `/gsd:new-project` → define scope, requirements, roadmap
2. `/gsd:plan-phase 1` → break phase into plans with dependencies
3. `/gsd:execute-phase 1` → wave-based parallel execution (each subagent uses TDD)
4. `verification-before-completion` → run full test suite, typecheck, lint
5. `/gsd:validate-phase 1` → verify against spec
6. `/gsd:ship` → deploy

### Small Work (fast path)

```
Superpowers brainstorming (quick)
         ↓
Implement with TDD mindset
         ↓
verification-before-completion
```

1. `brainstorming` → quick design (can be a few sentences for simple work)
2. `test-driven-development` → write test, implement, pass
3. `verification-before-completion` → prove it works before committing

### Bug Fixes

```
Superpowers systematic-debugging
         ↓
TDD: write regression test that reproduces the bug
         ↓
Fix → test passes
         ↓
verification-before-completion
```

1. `systematic-debugging` → find root cause (not symptoms)
2. `test-driven-development` → write a test that fails with the bug
3. Fix the code → test passes
4. `verification-before-completion` → full suite green

---

## Practical Decision Map

| I need to...                    | Use         | Command / Skill                                   |
| ------------------------------- | ----------- | ------------------------------------------------- |
| Make design decisions           | GSD         | Architecture Agent (01), `/gsd:new-project`       |
| Break work into phases          | GSD         | `/gsd:plan-phase`, Planning Agent (03)            |
| Create atomic coding tasks      | GSD         | Task Breakdown Agent (04)                         |
| Research before building        | GSD         | `/gsd:research-phase`, `gsd-phase-researcher`     |
| Execute a plan with parallelism | GSD         | `/gsd:execute-phase` (wave-based subagents)       |
| Validate completed work         | GSD         | `/gsd:validate-phase`, `gsd-verifier`             |
| Brainstorm an idea              | Superpowers | `brainstorming` → design doc → approval gate      |
| Write code safely               | Superpowers | `test-driven-development` → red/green/refactor    |
| Fix a bug                       | Superpowers | `systematic-debugging` → root cause first         |
| Prove work is done              | Superpowers | `verification-before-completion` → evidence first |
| Request a code review           | Superpowers | `requesting-code-review`                          |
| Handle review feedback          | Superpowers | `receiving-code-review`                           |
| Run multiple tasks at once      | Superpowers | `dispatching-parallel-agents`                     |
| Finish a branch                 | Superpowers | `finishing-a-development-branch`                  |
| Audit UI quality                | GSD         | `gsd-ui-auditor`, `gsd-ui-checker`                |
| Check project health            | GSD         | `/gsd:health`, `/gsd:stats`                       |
| Ship a milestone                | GSD         | `/gsd:ship`                                       |

---

## How They Compose with Other Repo Tools

| Stage            | GSD / Superpowers                    | Also Use                                       |
| ---------------- | ------------------------------------ | ---------------------------------------------- |
| Idea validation  | —                                    | gstack `/office-hours`, CE `/ce:brainstorm`    |
| Planning         | GSD `/gsd:plan-phase`                | gstack `/plan-ceo-review` + `/plan-eng-review` |
| Implementation   | Superpowers TDD                      | CE `/ce:work` for tracking                     |
| Code review      | Superpowers `requesting-code-review` | CE `/ce:review` (14 parallel reviewers)        |
| QA               | —                                    | gstack `/qa` (real browser)                    |
| Learning capture | —                                    | CE `/ce:compound`                              |
| Shipping         | GSD `/gsd:ship`                      | gstack `/ship`                                 |

---

## Rule of Thumb

- If it takes **more than one milestone**, start with GSD.
- If it fits in **one implementation session**, use Superpowers directly.
- **End both paths** with `verification-before-completion`.
- When in doubt, spend 5 minutes on GSD planning. If the plan is trivial, switch to Superpowers.

---

## See Also

- [skills/gsd/](../../skills/gsd/) — GSD structured execution system
- [skills/superpowers/](../../skills/superpowers/) — 14 advanced AI patterns
- [GSTACK_VS_COMPOUND_ENGINEERING.md](./GSTACK_VS_COMPOUND_ENGINEERING.md) — gstack and CE comparison
- [SPEC_DRIVEN_DEVELOPMENT.md](./SPEC_DRIVEN_DEVELOPMENT.md) — Interview-driven spec building
- [AI_AGENT_BUILD_PIPELINE.md](./AI_AGENT_BUILD_PIPELINE.md) — Actor-first build pipeline
