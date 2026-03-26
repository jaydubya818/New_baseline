# UI/UX Pro Max: Design Intelligence Skill

> AI-powered design system generation with 67 UI styles, 161 color palettes, 57 font pairings, and 161 industry-specific reasoning rules.

Source: [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (51k+ stars)

## What It Does

Generates complete design systems by analyzing project requirements through multi-domain search, then outputs recommendations for patterns, styles, colors, typography, effects, anti-patterns, and pre-delivery checklists.

## Design Assets

| Asset | Count | Examples |
| ----- | ----- | ------- |
| **UI Styles** | 67 | Glassmorphism, Claymorphism, Minimalism, Brutalism, Neumorphism, Bento Grid, Dark Mode |
| **Color Palettes** | 161 | Aligned with product types and industries |
| **Font Pairings** | 57 | Curated Google Fonts combinations |
| **Chart Types** | 25 | For dashboards and data visualization |
| **Tech Stacks** | 13 | React, Next.js, Vue, Nuxt, SwiftUI, Flutter, etc. |
| **UX Guidelines** | 99 | Best practices and accessibility rules |
| **Industry Rules** | 161 | Domain-specific design recommendations |

## How the Reasoning Engine Works

1. **User Request** — Describe any UI/UX task naturally
2. **Multi-Domain Search** — 5 parallel searches: product matching, styles, colors, patterns, typography
3. **Decision Rules** — 161 industry-specific rules process the search results
4. **Recommendations** — Output: patterns, styles, colors, typography, effects, anti-patterns
5. **Pre-Delivery Checks** — Validate against anti-patterns before shipping

## Setup

```bash
# Via Claude Code plugin
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# Via CLI (recommended for multi-platform support)
npm install -g uipro-cli
cd /path/to/project
uipro init --ai claude    # Also supports: cursor, windsurf, copilot, kiro, roocode
```

Requires Python 3.x for search scripts.

## Usage

### Auto-Activate (Skill Mode)
Just describe UI/UX work naturally — the skill triggers automatically:
- "Build a landing page for my SaaS product"
- "Create a dashboard for healthcare analytics"
- "Design a portfolio website with dark mode"

### Design System Generation

```bash
# Generate for a product type
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa" \
  --design-system -p "Serenity Spa"

# Domain-specific search
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography

# Stack-specific guidelines
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
```

### Persist Design System (Master + Overrides)

```bash
# Create master design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" \
  --design-system --persist -p "MyApp"

# Page-specific override
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" \
  --design-system --persist -p "MyApp" --page "dashboard"
```

Creates hierarchical structure:
```
design-system/
├── MASTER.md              # Global source of truth
└── pages/
    └── dashboard.md       # Page-specific overrides
```

## Supported Tech Stacks

| Category | Stacks |
| -------- | ------ |
| **Web (HTML)** | HTML + Tailwind |
| **React Ecosystem** | React, Next.js, shadcn/ui |
| **Vue Ecosystem** | Vue, Nuxt.js, Nuxt UI |
| **Other Web** | Svelte, Astro |
| **iOS** | SwiftUI |
| **Android** | Jetpack Compose |
| **Cross-Platform** | React Native, Flutter |

## Industry Categories (161 Rules)

Each rule includes recommended patterns, style priorities, color moods, typography guidance, key effects, and anti-patterns:

- **Tech & SaaS**: SaaS, Micro SaaS, B2B, Dev Tools, AI Platforms, Cybersecurity
- **Finance**: Fintech, Banking, Insurance, Personal Finance, Invoice Tools
- **Healthcare**: Clinic, Pharmacy, Dental, Veterinary, Mental Health
- **E-commerce**: General, Luxury, Marketplace, Subscription, Food Delivery
- **Services**: Beauty/Spa, Restaurant, Hotel, Legal, Home Services, Booking
- **Creative**: Portfolio, Agency, Photography, Gaming, Music, Video Editor
- **Lifestyle**: Habit Tracker, Recipe, Meditation, Weather, Diary, Mood Tracker
- **Emerging**: Web3/NFT, Spatial Computing, Quantum, Autonomous Drones

## Relevance to Our Repo

This skill complements our existing setup:
- Works with our **shadcn/ui components** and **Tailwind config**
- The `--stack react` flag generates Next.js + shadcn-specific guidelines
- Industry rules automate what our `web-design-guidelines` skill does manually
- Design system persistence (MASTER.md + page overrides) is a pattern we could adopt

## References

- [ui-ux-pro-max-skill repo](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- [uipro CLI on npm](https://www.npmjs.com/package/uipro-cli)
- [Website](https://uupm.cc)
