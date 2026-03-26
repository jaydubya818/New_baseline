# Making Playgrounds with Claude Code

Playgrounds are standalone HTML files that let you visualize problems, interact with designs, and generate output prompts to paste back into Claude Code. They bridge the gap between text-based agent work and visual/interactive tasks.

---

## Installation

```bash
/plugin marketplace update claude-plugins-official
/plugin install playground@claude-plugins-official
```

---

## When to Use Playgrounds

Playgrounds excel when the interaction isn't well-suited for text:

- **Architecture visualization** — Explore codebase structure, comment on nodes, ask questions about specific components
- **Design iteration** — Adjust component layouts, tweak colors, explore design alternatives interactively
- **Brainstorming** — Layout and design exploration with real-time visual feedback
- **Game balancing** — Tweak parameters, see effects immediately
- **Writing review** — Inline suggestions you can approve, reject, or comment on
- **Video/animation tweaking** — Adjust intro screens, transitions, timing

---

## Example Prompts

```
"Use the playground skill to create a playground that helps me explore
new layout changes to the AskUserQuestion Tool"
```

```
"Use the playground skill to review my SKILL.MD and give me inline
suggestions I can approve, reject or comment"
```

```
"Use the playground skill to show how this email agent codebase works
and let me comment on particular nodes in the architecture"
```

```
"Use the playground skill to help me balance the 'Inferno' hero's deck"
```

---

## Tips

- **Think of a unique way of interacting with the model** — then ask it to express that as a playground
- Playgrounds are standalone HTML — no build step, no dependencies
- The output prompt lets you round-trip back into Claude Code with visual context
- Great for tasks where seeing > reading
