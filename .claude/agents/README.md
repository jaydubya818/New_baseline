# Agents

Specialized subagents for the core planning pipeline and specialist tasks.

## Core Planning Pipeline (run in order)

```
01-architecture-agent.md    → System architecture decisions
02-plan-review-agent.md     → Review and pressure-test the plan
03-planning-agent.md        → Detailed task planning
04-task-breakdown-agent.md  → Break tasks into atomic units
05-context-manager-agent.md → Manage context across sessions
06-code-generation-agent.md → Write the code
07-task-validation-agent.md → Validate task completion
08-runtime-preparation-agent.md → Prepare for runtime/deployment
```

## GSD Agents (spawned by GSD commands)

```
gsd-executor.md        → Executes phases with atomic commits
gsd-planner.md         → Plans phases and milestones
gsd-debugger.md        → Structured debugging sessions
gsd-verifier.md        → Verifies task completion
gsd-ui-auditor.md      → Audits UI quality and consistency
gsd-codebase-mapper.md → Maps codebase structure
gsd-integration-checker.md → Checks integration points
gsd-nyquist-auditor.md → Checks for context/quality issues
gsd-roadmapper.md      → Roadmap planning and updates
gsd-user-profiler.md   → User profiling for research
gsd-research-synthesizer.md → Synthesizes research findings
```

## Specialist Agents

```
architect.md              → Architecture decisions and ADRs
code-reviewer.md          → Code review with security focus
db-reviewer.md            → Database schema and query review
security-reviewer.md      → Security audit and CSO review
perf-analyzer.md          → Performance analysis
superpowers-code-reviewer.md → Enhanced code review with superpowers
```

## Usage

Agents are invoked automatically by their parent commands (e.g., `/gsd:execute-phase` spawns `gsd-executor`).
You can also invoke them directly: "Use the architect agent to review this design decision."
