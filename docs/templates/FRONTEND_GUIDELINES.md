# FRONTEND_GUIDELINES — [Project Name]

> Complete design system. AI references this for every component it creates.
> No random colors. No random spacing. No guessing.

---

## Typography

| Role | Font | Weight | Size | Line Height |
|------|------|--------|------|-------------|
| Display | [Font] | 700 | 3rem (48px) | 1.1 |
| H1 | [Font] | 700 | 2.25rem (36px) | 1.2 |
| H2 | [Font] | 600 | 1.875rem (30px) | 1.25 |
| H3 | [Font] | 600 | 1.5rem (24px) | 1.3 |
| Body | [Font] | 400 | 1rem (16px) | 1.6 |
| Small | [Font] | 400 | 0.875rem (14px) | 1.5 |
| Caption | [Font] | 400 | 0.75rem (12px) | 1.4 |

**Font stack:**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

---

## Color Palette

### Brand Colors
```css
--color-primary:     #[HEX];   /* Primary action, CTAs */
--color-primary-hover: #[HEX]; /* Hover state */
--color-secondary:   #[HEX];   /* Secondary elements */
--color-accent:      #[HEX];   /* Highlights, badges */
```

### Semantic Colors
```css
--color-success:     #22c55e;  /* Green — success states */
--color-warning:     #f59e0b;  /* Amber — warnings */
--color-error:       #ef4444;  /* Red — errors */
--color-info:        #3b82f6;  /* Blue — informational */
```

### Neutral Scale
```css
--color-background:  #ffffff;
--color-surface:     #f8fafc;
--color-border:      #e2e8f0;
--color-text:        #0f172a;
--color-text-muted:  #64748b;
--color-text-subtle: #94a3b8;
```

### Dark Mode (if applicable)
```css
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-surface:    #1e293b;
  --color-border:     #334155;
  --color-text:       #f8fafc;
}
```

---

## Spacing Scale

```css
/* Use Tailwind spacing or these custom tokens */
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
```

---

## Border Radius

```css
--radius-sm:   4px;   /* Tags, badges, small inputs */
--radius-md:   6px;   /* Buttons */
--radius-lg:   8px;   /* Cards, modals */
--radius-xl:   12px;  /* Large cards, drawers */
--radius-full: 9999px; /* Pills, avatars */
```

---

## Shadows

```css
--shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1);
```

---

## Layout & Grid

```css
--max-width-content: 1280px;  /* Max page width */
--max-width-prose:   720px;   /* Max text width */
--sidebar-width:     256px;   /* Sidebar */
--header-height:     64px;    /* Fixed header */
```

**Grid system:** 12-column grid, 24px gutters

---

## Breakpoints

```css
/* Tailwind defaults — do not change */
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Wide desktop */
2xl: 1536px  /* Ultra-wide */
```

**Mobile-first.** All components start mobile, scale up.

---

## Component Patterns

### Buttons
```tsx
/* Primary */
<Button variant="default">    className="bg-primary text-white rounded-md px-4 py-2"
/* Secondary */
<Button variant="outline">    className="border border-border rounded-md px-4 py-2"
/* Destructive */
<Button variant="destructive"> className="bg-error text-white rounded-md px-4 py-2"
/* Ghost */
<Button variant="ghost">      className="hover:bg-surface rounded-md px-4 py-2"
```

### Cards
```tsx
className="bg-surface border border-border rounded-lg p-6 shadow-sm"
```

### Form Inputs
```tsx
className="w-full border border-border rounded-md px-3 py-2 text-sm
           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
```

### Badges
```tsx
className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
```

---

## UI Library

**Primary:** shadcn/ui (built on Radix UI primitives)
**Install components:** `npx shadcn@latest add [component]`
**Location:** `components/ui/`

**Rules:**
- Use shadcn components first before building custom
- Never override shadcn internals — extend via className
- Keep component files under `components/ui/` for primitives
- Feature-specific components go in `components/[feature]/`

---

## Animation & Motion

```css
--duration-fast:   150ms;
--duration-normal: 200ms;
--duration-slow:   300ms;
--ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
```

- Use Framer Motion for complex animations
- Prefer CSS transitions for simple hover/focus states
- Respect `prefers-reduced-motion`

---

## Icons

**Library:** Lucide React
```tsx
import { [IconName] } from 'lucide-react'
<IconName className="h-4 w-4" />
```

Icon sizes: `h-3 w-3` (12px) | `h-4 w-4` (16px) | `h-5 w-5` (20px) | `h-6 w-6` (24px)

---

## Accessibility Rules

- All interactive elements must have accessible labels
- Focus indicators must be visible (never `outline: none` without replacement)
- Color alone must never convey information
- Minimum touch target: 44×44px on mobile
- All images must have meaningful alt text

---

## What NOT to Do

- ❌ Hardcoded hex colors in components — use CSS variables or Tailwind tokens
- ❌ Arbitrary Tailwind values like `text-[13px]` or `mt-[17px]`
- ❌ Inline styles (except truly dynamic values)
- ❌ Different border radii on the same component type
- ❌ `!important` anywhere
- ❌ Bootstrap, Material-UI, or Chakra UI
