# Fred Dashboard V2 — Rebuild Handoff

## Goal

Rebuild the Fred personal dashboard from scratch using React + Vite + shadcn/ui. Deploy to GitHub Pages as static files. The current v1 (`fred-dashboard`) stays untouched.

---

## Repo

**New repo:** `fred-dashboard-v2`  
**Deploy target:** GitHub Pages (via `dist/` folder, same as today)  
**Stack:** React 18 + Vite + shadcn/ui + Tailwind CSS

---

## Core Problems to Fix (from v1 audit)

1. Build Log is 30+ entries with no collapse — buries everything below it. **Fix:** Collapsed by default, "Show all" expand.
2. No visual hierarchy — Roadmap, Friday Fix Log, Build Log are identical grey panels. **Fix:** Proper component structure with shadcn Cards, distinct visual weight per section.
3. Tab filtering only affects Kanban. **Fix:** Tab selection filters ALL sections (Kanban, Build Log, Social Queue, Roadmap, Personal) simultaneously.
4. Calendar column too narrow (320px), feels orphaned. **Fix:** Give it proper responsive column width.
5. No sticky nav — persona tabs disappear on scroll. **Fix:** Sticky top nav with persona tab bar.
6. Sections touching with no spacing. **Fix:** Consistent gap/padding via Tailwind.
7. Social queue drafts show full text. **Fix:** Truncate to 2 lines, expand on click.
8. Build Log is prominent — it's an archive, not a daily tool. **Fix:** KPIs and Kanban at top, Build Log at bottom collapsed.

---

## Layout Structure

```
[Sticky Top Nav]
  Logo | Persona Tabs: All / FluentRx / BCC / Personal / Trader

[Row 1 — Priority]
  KPI Cards (3-4 across) | Daily Focus (single card: "The ONE thing today")

[Row 2 — Operations]
  MoSCoW Kanban (tab-filtered) | Google Calendar (full width, not cramped)

[Row 3 — Personal]
  Personal Section (see below)

[Row 4 — Pipeline]
  Social Queue (tab-filtered) | Active Agents

[Row 5 — Archive / Reference]
  Roadmap | Friday Fix Log | Build Log (collapsed)
```

---

## Personal Section Spec

The personal section should look like a professional health + lifestyle dashboard. Research best practices for personal dashboard design — draw inspiration from GitHub contribution graphs, Notion health widgets, and linear.app data displays.

### Tracking fields:

| Field | Display | Notes |
|---|---|---|
| Sleep | Hours + quality score | Apple Watch data, manual entry for now |
| Alcohol-free days | GitHub-style contribution grid | Shade = drinks that day (0 = green, more = red) |
| Hydration | Daily water intake in litres | Manual entry |
| Fitness | Workout grid (same style) | Days active vs rest |
| Food | Optional free-text or emoji mood for meals | Keep simple |
| Weight | Optional trend line | |

### Visual style for grids:
- Use GitHub contribution calendar style: 52 columns × 7 rows = full year view
- Color scheme: monochrome (grey shades) except alcohol tracker (green = sober, amber = moderate, red = heavy)
- Show current streak for alcohol-free days prominently
- Sleep: show last 7 days as a bar chart using shadcn charts

---

## Data Architecture

All data lives in `/public/data.json` — single source of truth. Fred reads and writes this file only.

```json
{
  "kpis": [...],
  "kanban": { "todo": [], "doing": [], "done": [], "wont": [] },
  "buildLog": [...],
  "roadmap": [...],
  "socialQueue": [...],
  "personal": {
    "sleep": [{ "date": "2026-04-21", "hours": 7.5, "quality": 82 }],
    "alcohol": [{ "date": "2026-04-21", "drinks": 0 }],
    "hydration": [{ "date": "2026-04-21", "litres": 2.5 }],
    "fitness": [{ "date": "2026-04-21", "active": true, "type": "walk" }],
    "dailyFocus": "Ship the dashboard v2 handoff"
  },
  "activeAgents": [...],
  "quickLinks": [
    { "label": "Heroku", "url": "https://heroku.com" },
    { "label": "Stripe", "url": "https://stripe.com" },
    { "label": "GitHub", "url": "https://github.com" },
    { "label": "Cal.com", "url": "https://cal.com" }
  ]
}
```

---

## shadcn Components to Use

- `Card`, `CardHeader`, `CardContent` — every panel
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — persona switching
- `Badge` — status labels, tags
- `Collapsible` — Build Log, long lists
- `Progress` — KPI progress bars
- `Table` — Build Log entries
- `Separator` — section dividers
- `ScrollArea` — contained scroll zones (not full-page scroll hell)
- `Tooltip` — contribution grid hover states

---

## Theme

- **Color palette:** Black / white / grey only. No brand colors in the UI chrome.
- **Accent:** Single accent color allowed for status indicators only (green = active/healthy, amber = warning, red = issue). Used sparingly.
- **Typography:** Clean sans-serif, clear hierarchy (large KPI numbers, medium section headers, small metadata)
- **Dark mode:** Build dark-first. Light mode toggle optional.

---

## Apple Watch / Sleep Data (Phase 1)

For now: Fred manually adds sleep entries to `data.json` after checking the Health app each morning.

**Phase 2 (future):** Apple Shortcuts → JSON export → auto-update `data.json`. Do not build this in v2 — note it as a TODO comment in the sleep component.

---

## Deployment

```bash
npm run build        # outputs to dist/
# deploy dist/ to GitHub Pages
```

Use GitHub Actions for auto-deploy on push to main. Create `.github/workflows/deploy.yml`.

---

## What NOT to Build

- No backend, no server, no database
- No authentication
- No real-time data fetching (everything is static JSON for now)
- No mobile app
- Keep it deployable by a non-engineer (Clint edits JSON, pushes, done)

---

## Definition of Done

- [ ] Sticky persona tab nav
- [ ] KPIs at top, Build Log collapsed at bottom
- [ ] Tab switching filters ALL sections
- [ ] Personal section with contribution grids (sleep, alcohol, fitness)
- [ ] Quick links panel
- [ ] Daily focus card
- [ ] shadcn dark theme throughout
- [ ] Deploys to GitHub Pages via GitHub Actions
- [ ] `data.json` is the only file Fred needs to edit
