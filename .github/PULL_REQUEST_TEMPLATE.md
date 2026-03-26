## What does this PR do?

<!-- 1-2 sentences. Link the issue/ticket if applicable. -->

Closes #

---

## Pre-merge checklist

### Workflow gates
- [ ] `/autoplan --adversarial` was run before coding started
- [ ] `/review --dual-model` completed (Claude + Codex adversarial pass)
- [ ] `/qa` run — real Chromium browser, real auth, screenshots captured
- [ ] `/cso` completed (required for auth, permissions, or agent changes)

### Canonical docs updated
- [ ] `docs/PRD.md` — if features/goals changed
- [ ] `docs/APP_FLOW.md` — if user flows or screens changed
- [ ] `docs/TECH_STACK.md` — if deps, env vars, or infra changed
- [ ] `docs/IMPLEMENTATION_PLAN.md` — task marked complete, milestones updated
- [ ] `progress.txt` — session log updated

### Code quality
- [ ] TypeScript strict — no `any` types
- [ ] No hardcoded secrets or API keys
- [ ] No `console.log` left in production code
- [ ] All new code has tests (unit + e2e as applicable)
- [ ] `npm run typecheck` passes locally
- [ ] `npm run lint` passes locally
- [ ] `npm run test:unit` passes with no regressions
- [ ] Coverage thresholds maintained (90%+ statements)

### Security
- [ ] No new secrets committed
- [ ] Auth/permissions verified (not just assumed)
- [ ] User input validated at the boundary (zod)
- [ ] `npm run secrets:scan` passed

### Database (if applicable)
- [ ] Migration is reversible (up + down)
- [ ] Indexes added for new WHERE/JOIN columns
- [ ] Multi-table writes use transactions

---

## Screenshots / recordings

<!-- Required for any UI change. Paste before/after screenshots. -->

---

## Notes for reviewer

<!-- Anything tricky, context needed, or known trade-offs. -->
