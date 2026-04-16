# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Student Project Preference Form for the **Lesto × ППМГ Враца 2026** initiative. A multi-step interactive survey in Bulgarian that collects student skills and project interests for ~30 high school students being assigned to 6 teams of ~5.

Hosted on **Vercel**. Form responses are submitted to a **Google Sheet** via a Google Apps Script web app, proxied through a Vercel serverless function. Copy-to-clipboard is kept as a fallback.

## Development

Open `index.html` directly in a browser or use any static file server:

```bash
python -m http.server 8000
# or
npx serve .
```

For the full submission flow locally, use `vercel dev` (reads `.env` automatically).

No build, lint, or test commands exist.

## Deployment

Hosted on Vercel. Deploy manually via:

```bash
vercel --prod
```

### Environment variables (Vercel)

Only one required — see `.env.example`:

- `GOOGLE_APP_URL` — Google Apps Script web app URL that appends form data to a Google Sheet

### Google Apps Script

The script that receives form submissions is in `google-apps-script.js` (for reference — it lives in Google Apps Script, not deployed from this repo). It receives a JSON POST and appends a row with all form fields to the active sheet.

## Architecture

- **`index.html`** — Single self-contained file with inline CSS and JS. Lesto Product branding (Mulish font, `#EC1C24` red, `#2B3045` dark blue).
- **`api/send.js`** — Vercel serverless function. Receives form data via POST, forwards to Google Apps Script.
- **`Lesto-Product-Logo.svg`** — Full logo (header)
- **`Lesto-Product-Logo-cropped.svg`** — LP icon mark (favicon)

### Form flow

1. **Step 1 (Identity):** Name, grade, team, future plans, hobbies
2. **Step 2 (Skills):** 7 skills rated 1–5 stars (programming, design, math, research, CAD, marketing, leadership) + free-text
3. **Step 3 (Categories):** Multi-select from 3 categories — life apps, Lesto Product projects, own idea
4. **Step 4 (Projects):** Dynamic step — shows project cards for selected categories + own idea form if chosen. Life section has 9 projects, company has 9.
5. **Step 5 (Role):** Preferred role (Marketing / Developer / Product Owner / No preference), AI tools, priority, extra
6. **Step 6 (Summary):** Visual summary + auto-submit to Google Sheets + copy-to-clipboard fallback

Navigation: sticky header with back/forward buttons, progress bar. `beforeunload` guard on steps 2–5. Step 3 selection determines what step 4 shows (branching within a single step).

### Key data structures

- `skills[]` — 7 skill definitions with `id` and Bulgarian `label`
- `categories[]` — 3 categories: life, company, own
- `specificProjects[]` — 18 projects linked to categories via `cat` field
- `selectedCats` / `selectedProjects` — `Set` objects tracking selections
- `ownIdeaState` — preserves own idea form fields across navigation

## Design System (Lesto Product brand)

- **Font:** Mulish (weights 400–900) via Google Fonts
- **Primary red:** `#EC1C24` (buttons, progress bar, selected states, accents, stars)
- **Dark blue:** `#2B3045` (headings, brand text, copy button)
- **Page background:** `#EDEEF1` with white `#fff` form card and side shadows
- **Card signature:** 4px red left-border accent, subtle box-shadow, hover elevation
- **Tag colors:** `.tag-life` green, `.tag-tech` blue, `.tag-company` red, `.tag-own` purple
- **Layout:** Max-width 760px, sticky header, scrollable body, 2-col grid collapses to 1-col at 480px
- **Custom scrollbar:** Muted red thumb `#d4626a` on `#F4F5F7` track
- **Favicon:** Lesto Product LP icon mark SVG
