# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Student Project Preference Form for the **Lesto × ППМГ Враца 2026** initiative. A multi-step interactive survey in Bulgarian that collects student skills and project interests for ~30 high school students being assigned to 6 teams of ~5.

**No build step, no backend, no dependencies.** Single self-contained `index.html` file with inline CSS and vanilla JS. Responses are currently exported via copy-to-clipboard plain text (email submission via Vercel serverless function is planned).

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

Everything lives in `index.html` (proper HTML5 document with `lang="bg"`):

- **CSS** (inline `<style>`): Lesto Product brand colors, Mulish font, responsive breakpoint at 480px, `fadeUp` step transitions
- **HTML**: 6 steps — Identity → Skills → Categories → Projects → Open Questions → Summary. Header row with brand text + back/forward navigation buttons.
- **JS** (inline `<script>`): All state in module-level variables (`currentStep`, `skillRatings`, `selectedCats`, `selectedProjects`). DOM rebuilt on each navigation via `buildCatCards()`, `buildSpecificCards()`, etc. `beforeunload` guard prevents accidental progress loss.

### Form flow

1. **Step 1 (Identity):** Name, grade, team, future plans — text inputs
2. **Step 2 (Skills):** 6 skills rated 1–5 stars + free-text other skill
3. **Step 3 (Categories):** Max 2 of 3 category cards (life/tech/company) — checkbox cards
4. **Step 4 (Projects):** 18 specific projects grouped by category (6 life, 3 tech, 9 company) — unlimited checkbox selection
5. **Step 5 (Open):** Own idea textarea, team work style radio, priority radio, extra textarea
6. **Step 6 (Summary):** HTML summary cards + `copyResults()` exports plain text to clipboard

### Key data structures

- `skills[]` — 6 skill definitions with `id` and Bulgarian `label`
- `categories[]` — 3 category objects with tag styling info
- `specificProjects[]` — 18 projects, each linked to a category via `cat` field (company section expanded with ideas from real Lesto Soft production tools)
- `selectedCats` / `selectedProjects` — `Set` objects tracking selections by ID/key

### Clipboard export format

```
=== АНКЕТА: LESTO × ППМГ ВРАЦА 2026 ===
Дата: [bg-BG formatted date]
ИМЕ / КЛАС / ОТБОР / ПЛАНОВЕ / УМЕНИЯ / КАТЕГОРИИ / ПРОЕКТИ / СТИЛ / ПРИОРИТЕТ / ИДЕЯ / ДОПЪЛНИТЕЛНО
```

## Design System (Lesto Product brand)

- **Font:** Mulish (weights 400–900) via Google Fonts
- **Primary red:** `#EC1C24` (buttons, progress bar, selected states, accents, stars)
- **Dark blue:** `#2B3045` (headings, brand text, copy button)
- **Page background:** `#EDEEF1` with white `#fff` form card and side shadows
- **Selected state:** `background: #FEF2F2; border-color: #EC1C24`
- **Card signature:** 4px red left-border accent, subtle box-shadow, hover elevation
- **Tag colors:** `.tag-life` green, `.tag-tech` blue, `.tag-company` red
- **Layout:** Max-width 760px, 2-col grid collapses to 1-col at 480px
- **Favicon:** Inline SVG — red rounded square with white "LP" text
