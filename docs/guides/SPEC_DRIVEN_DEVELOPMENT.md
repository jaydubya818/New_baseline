# Spec-Driven Development with Claude Code

The most effective way to build large features with Claude Code is spec-based development. Start with a minimal spec, let Claude interview you exhaustively, then execute the refined spec in a fresh session.

---

## The Workflow

### Phase 1: Spec Interview (Session 1)

1. Write a minimal spec or prompt describing what you want
2. Ask Claude to interview you using the `AskUserQuestion` tool
3. Claude asks 40+ deep questions about: technical implementation, UI & UX, concerns, tradeoffs, edge cases, dependencies, non-obvious requirements
4. You answer each question, building a highly detailed spec collaboratively
5. Claude writes the finalized spec to a file

### Phase 2: Execution (Session 2)

1. Start a new session with a clean context
2. Point Claude at the spec file
3. Claude executes methodically against the detailed spec
4. The spec serves as both the plan and the acceptance criteria

---

## The Interview Prompt

```markdown
read this @SPEC.md and interview me in detail using the
AskUserQuestion tool about literally anything: technical
implementation, UI & UX, concerns, tradeoffs, etc. but make
sure the questions are not obvious

be very in-depth and continue interviewing me continually until
it's complete, then write the spec to the file
```

---

## Why This Works

- **Context transfer**: You have domain knowledge Claude doesn't. The interview extracts it systematically.
- **Control**: You shape every decision through your answers. The spec reflects YOUR choices, not Claude's defaults.
- **Separation of concerns**: Interview session = thinking. Execution session = building. Clean context for each.
- **Detailed specs prevent drift**: Claude has a clear, comprehensive target to build toward.
- **Non-obvious questions surface edge cases**: Claude asks about things you wouldn't have thought to specify — auth edge cases, error states, mobile breakpoints, accessibility, performance constraints.

---

## Tips

- Start with even a one-paragraph description — Claude will fill in the gaps via questions
- Don't rush the interview. 40+ questions for a big feature is normal and valuable.
- Let Claude write the final spec to a file so you can review it before starting execution
- Use separate sessions for interview vs execution to maximize clean context
- For very large projects, split the spec into phases and execute each in its own session
- The spec file becomes living documentation — update it as requirements evolve
