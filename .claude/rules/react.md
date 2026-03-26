<important if="working with React components (.tsx, .jsx)">
- Prefer function components with hooks — no class components
- Memoize expensive computations with useMemo, callbacks with useCallback
- Extract custom hooks when logic is reused across 2+ components
- Co-locate tests with components (Component.test.tsx next to Component.tsx)
- Props interfaces go in the same file, exported if shared
- Never store derived state — compute it inline or memoize it
- Use error boundaries for async/rendering failures
- Prefer controlled inputs over uncontrolled
</important>
