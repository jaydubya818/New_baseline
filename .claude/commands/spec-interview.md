---
name: spec-interview
description: Interview the user exhaustively about a feature using AskUserQuestion, then write a detailed spec file
allowed-tools: Read, Write, Edit, AskUserQuestion, Glob, Grep
args:
  specFile: Path to existing spec or feature description (optional)
---

# Spec-Driven Interview

You are conducting an exhaustive interview to produce a detailed feature specification.

## Process

### Phase 1: Context Gathering
1. If `$ARGUMENTS.specFile` is provided, read it thoroughly
2. Otherwise, ask the user to describe what they want to build
3. Identify the domain, scope, and high-level goals

### Phase 2: Deep Interview
Use the `AskUserQuestion` tool to ask structured, non-obvious questions.
Continue interviewing until the spec is comprehensive. Aim for 20-40+ questions for large features.

Question categories (cycle through these, don't ask obvious questions):
- **Architecture**: Data model, state management, API design, service boundaries
- **UX/UI**: User flows, edge states, loading/error/empty states, mobile behavior
- **Tradeoffs**: Performance vs simplicity, build vs buy, scope vs timeline
- **Security**: Auth flows, permissions, data exposure, rate limiting
- **Edge cases**: Concurrent users, offline behavior, data migration, rollback
- **Integration**: Third-party services, existing system contracts, backwards compatibility
- **Testing**: What needs automated tests, acceptance criteria, verification approach
- **Operations**: Monitoring, alerting, deployment strategy, feature flags
- **Accessibility**: Keyboard nav, screen readers, color contrast, ARIA
- **Performance**: Load times, bundle size, caching strategy, pagination

### Phase 3: Spec Writing
After the interview is complete, write a comprehensive spec to `docs/specs/SPEC-{feature-name}.md` including:
- Problem statement and goals
- Non-goals (explicitly out of scope)
- Technical approach
- Data model
- API design
- UI/UX description
- Edge cases and error handling
- Testing plan
- Open questions (if any)
- All decisions made during the interview

## Rules
- Never ask obvious questions Claude could figure out from codebase context
- Ask questions that surface the user's **implicit assumptions**
- Each question should have 2-4 concrete options when possible
- After every 5-8 questions, summarize what you've learned so far
- The final spec should be detailed enough for a fresh session to execute without ambiguity
