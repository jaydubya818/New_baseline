# Lessons from Building Claude Code: Seeing Like an Agent

Key patterns for designing tool interfaces and action spaces for AI agents. Based on Anthropic's experience building Claude Code.

---

## Core Principle

Design tools shaped to the model's abilities. Give it resources like you'd give a human — then observe, read outputs, experiment. Learn to see like an agent.

---

## Elicitation: The AskUserQuestion Tool

### Evolution
1. **Attempt 1 — ExitPlanTool parameters**: Added question array alongside plan. Confused Claude — conflicting plan + answers, unclear if tool should be called twice.
2. **Attempt 2 — Modified markdown format**: Structured bullet points with bracketed alternatives. Claude inconsistent — appended extra sentences, omitted options, wrong format.
3. **Attempt 3 — Dedicated AskUserQuestion tool**: Structured output tool, shows modal, blocks agent loop until answered. Claude naturally understood how to call it. Works with Agent SDK and in skills.

### Lesson
Even well-designed tools fail if the model doesn't understand how to call them. The best tool is one Claude **likes** calling and produces good outputs for.

---

## Updating Tools with Model Capabilities: Tasks & Todos

### Evolution
1. **TodoWrite** — Simple todo list, checked off as model worked. Still forgot tasks → added system reminders every 5 turns.
2. **Problem** — As models improved, reminders made Claude think it had to stick to the list. Opus 4.5 got better at subagents, but subagents couldn't coordinate on shared todos.
3. **Task Tool** — Replaced TodoWrite. Tasks include dependencies, share updates across subagents, model can alter and delete them.

### Lesson
As model capabilities increase, tools that once helped may now constrain. **Constantly revisit assumptions.** Stick to a small set of models with similar capability profiles.

---

## Designing Search Interfaces

### Evolution
1. **RAG vector database** — Powerful but fragile, required indexing, context was given to Claude instead of found by it.
2. **Grep tool** — Let Claude search and build its own context. As Claude got smarter, it became increasingly good at self-directed context building.
3. **Agent Skills + Progressive Disclosure** — Formalized incremental context discovery. Claude reads skill files that reference other files, recursively finding exactly the context it needs.

### Lesson
Over a year Claude went from not being able to build its own context, to nested search across several layers of files. **Progressive disclosure is now a core technique for adding functionality without adding tools.**

---

## Progressive Disclosure: The Claude Code Guide Agent

Claude Code has ~20 tools. The bar to add a new tool is high — each one is another option for the model to consider.

**Problem:** Claude didn't know about its own features (MCPs, slash commands). Putting all docs in system prompt would add context rot.

**Solution:** Progressive disclosure via a subagent. The Claude Code Guide subagent has extensive instructions on how to search docs well and what to return. Added to Claude's action space **without adding a tool**.

---

## Key Takeaways

1. **Tool design is an art** — depends on model, goal, and environment
2. **Read outputs obsessively** — the model's behavior tells you what's working
3. **Revisit tools as models improve** — yesterday's crutch is today's constraint
4. **Progressive disclosure > more tools** — let agents discover context incrementally
5. **The best tool is one the model likes calling** — if Claude doesn't understand it, redesign it
6. **Small, composable tools beat large monolithic ones** — let agents combine them creatively
7. **Experiment often** — there are no rigid rules, only patterns that emerge from observation
