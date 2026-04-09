**Project: Student Project Preference Form — Lesto × ППМГ Враца 2026**

**What this is:**
A multi-step interactive HTML/JS preference form (no framework, no backend) in Bulgarian, intended to be shown to ~30 students (11th and 12th grade, math/science profile) from ППМГ "Академик Иван Ценов" — Враца. The form is part of a 4-month project initiative organized by Lesto (lestoproduct.com / lestosoft.com). There will be 6 teams of ~5 students each.

**Purpose:**
Collect individual student preferences *before* project assignments are finalized, so organizers can make informed decisions. Responses are collected manually — no backend, no database. The form ends with a copy-to-clipboard summary of all answers.

**Form structure (5 steps + summary):**

- **Step 1 — Identity:** Name, class/grade, team (optional), plans after high school
- **Step 2 — Skills:** Star ratings (1–5) for 6 skills: Програмиране, Дизайн/UI, Математика/анализ, Проучване/писане, 3D/CAD (SolidWorks), Excel/таблици — plus a free-text field for other skills
- **Step 3 — Project categories:** Choose up to 2 of 3 categories (checkbox cards):
  - *Жизнени умения* — life skills interactive web apps
  - *Инженерно/Софтуерно* — technical/engineering project
  - *Фирмено ориентиран* — company-oriented (SolidWorks designs, Infor ERP integrations, Excel digitalization)
- **Step 4 — Specific projects:** 12 project ideas grouped by category, all selectable via checkbox cards:
  - Life skills (6): Финансов наръчник, Хранене и спорт, Наръчник за отношения, Кариерен компас, Наръчник за психично здраве, Правен наръчник за млади
  - Tech (3): Уеб приложение по твой избор, Инструмент с AI интеграция, Мобилна/прогресивна уеб апликация
  - Company (3): SolidWorks дизайн, Infor ERP интеграция, Дигитализация на Excel процес
- **Step 5 — Open questions:** Own project idea (textarea), team work style (4 radio options), personal priority (4 radio options), free extra field
- **Step 6 — Summary:** Visual summary of all answers + copy-to-clipboard plain text export

**Tech stack:**
Single self-contained HTML file. Fonts loaded from Google Fonts (Syne + DM Sans). No external JS libraries. Pure vanilla JS. Styling via CSS custom properties (designed to work inside the claude.ai widget iframe, using `--color-*` and `--border-radius-*` CSS variables from the host).

**Design notes:**
- Color accent: `#1D9E75` (teal/green) for primary actions, selected states, progress bar
- Selected cards highlight with `background: #E1F5EE; border-color: #1D9E75`
- Three tag color schemes: `.tag-life` (green), `.tag-tech` (blue), `.tag-company` (amber)
- Progress bar at top, step counter label below it
- Animations: `fadeUp` on step transition
- Fully responsive with 2-col → 1-col breakpoint at 480px

**Known completed fixes:**
- Year corrected to 2026 throughout (header + clipboard export)
- Grammar fix: "по-голямо техническо предизвикателство" in the tech category description

**What the organizers see:**
No live dashboard. Each student copies their plain-text summary and sends it (email/message). The exported text format is:
```
=== АНКЕТА: LESTO × ППМГ ВРАЦА 2026 ===
Дата: [bg-BG formatted date]
ИМЕ / КЛАС / ОТБОР / ПЛАНОВЕ / УМЕНИЯ / КАТЕГОРИИ / ПРОЕКТИ / СТИЛ / ПРИОРИТЕТ / ИДЕЯ / ДОПЪЛНИТЕЛНО
```

---

That should give Claude Code everything it needs to pick up where we left off. Do you want me to also export the current form as a standalone `.html` file you can hand off directly?