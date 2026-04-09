# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Student Project Preference Form for the **Lesto × ППМГ Враца 2026** initiative. A multi-step interactive survey in Bulgarian that collects student skills and project interests for ~30 high school students being assigned to 6 teams of ~5.

**No build step, no backend, no dependencies.** Single self-contained `index.html` file with inline CSS and vanilla JS. Responses are exported via copy-to-clipboard plain text — no database or server.

## Development

Open `index.html` directly in a browser or use any static file server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

No build, lint, or test commands exist.

## Architecture

Everything lives in `index.html`:

- **CSS** (lines 2–298): Custom properties from host iframe (`--color-*`, `--border-radius-*`), accent color `#1D9E75`, responsive breakpoint at 480px, `fadeUp` step transitions
- **HTML** (lines 300–445): 6 steps — Identity → Skills → Categories → Projects → Open Questions → Summary
- **JS** (lines 447–664): All state in module-level variables (`skillRatings`, `selectedCats`, `selectedProjects`), DOM rebuilt on each navigation via `buildCatCards()`, `buildSpecificCards()`, etc.

### Form flow

1. **Step 1 (Identity):** Name, grade, team, future plans — text inputs
2. **Step 2 (Skills):** 6 skills rated 1–5 stars + free-text other skill
3. **Step 3 (Categories):** Max 2 of 3 category cards (life/tech/company) — checkbox cards
4. **Step 4 (Projects):** 12 specific projects grouped by category — unlimited checkbox selection
5. **Step 5 (Open):** Own idea textarea, team work style radio, priority radio, extra textarea
6. **Step 6 (Summary):** HTML summary cards + `copyResults()` exports plain text to clipboard

### Key data structures

- `skills[]` — 6 skill definitions with `id` and Bulgarian `label`
- `categories[]` — 3 category objects with tag styling info
- `specificProjects[]` — 12 projects, each linked to a category via `cat` field
- `selectedCats` / `selectedProjects` — `Set` objects tracking selections by ID/key

### Clipboard export format

```
=== АНКЕТА: LESTO × ППМГ ВРАЦА 2026 ===
Дата: [bg-BG formatted date]
ИМЕ / КЛАС / ОТБОР / ПЛАНОВЕ / УМЕНИЯ / КАТЕГОРИИ / ПРОЕКТИ / СТИЛ / ПРИОРИТЕТ / ИДЕЯ / ДОПЪЛНИТЕЛНО
```

## Design System

- **Fonts:** Syne (headings, labels) + DM Sans (body) via Google Fonts
- **Accent:** `#1D9E75` (primary buttons, selected states, progress bar)
- **Selected state:** `background: #E1F5EE; border-color: #1D9E75`
- **Tag colors:** `.tag-life` green, `.tag-tech` blue, `.tag-company` amber
- **Layout:** Max-width 680px, 2-col grid collapses to 1-col at 480px

## Context

Designed to run inside the claude.ai artifact iframe — uses CSS custom properties from that host environment. Works standalone too (variables fall back gracefully). Language is Bulgarian throughout.
