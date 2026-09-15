# Portfolio Design Plan — "modern, minimal, but interesting & colorful"

Goal: evolve the current dark, minimal, single-accent portfolio into something that reads as a
**confident 5-YOE engineer** — restrained and crafted, but with a distinct point of view and
tasteful color. The dark canvas stays; color arrives as **intentional accents**, not wallpaper.

Grounded in Emil Kowalski's design-engineering principles (motion, restraint, "unseen details
compound") and the `better-*` disciplines (color, typography, layout, UI polish, a11y).

> Guiding tension: you deliberately removed animations. This plan treats motion as **opt-in and
> purposeful** — every motion idea below is gated behind `prefers-reduced-motion` and justified by
> a purpose (feedback, spatial continuity, first-view delight), never "because it looks cool."

---

## Implementation status

All four tiers were implemented on the `design-overhaul` branch (build verified each phase):

- ✅ **P1** — color tokens + per-section accent hues, easing tokens, `:active`/focus/selection
  polish, gradient hero name, status pill, type scale (`text-balance`, `tabular-nums`).
- ✅ **P2** — aurora glow, film-grain overlay, cursor-follow card spotlight (per-section tint),
  featured project card.
- ✅ **P3** — first-view staggered reveal (reduced-motion gated, never hides content), 404
  personality. **Deferred:** View Transitions (script re-init risk for a 2-page site).
- ✅ **P4** — a "Toolkit" section derived from real CMS tech data (frequency-ranked, capped at 18).
  **Deferred (CMS/content, not code):** impact-oriented experience bullets, case studies,
  positioning line, testimonials — these live in DatoCMS.

---

## 1. Color system — the "colorful but minimal" core

Today: near-black `#131313` + one cyan accent (`scooter`). `mantis` green is defined but unused.
That's minimal but monochrome — no personality.

**Strategy: one dark canvas, a curated 4–5 hue accent spectrum, used sparingly and semantically.**

### Tokens (proposed)

| Role | Value | Notes |
| --- | --- | --- |
| `bg` base | `#0A0A0C` | slightly cooler/deeper than `#131313` for more depth |
| `surface` | `#131316` / `#1A1A1F` | elevated cards, hover backgrounds |
| `text` primary | `#EDEDED` | |
| `text` secondary | `#A3A3A3` (neutral-400) | verify AA (~5.9:1 on base — OK) |
| accent · cyan | `#41C0CF` (scooter-400) | existing |
| accent · violet | `#A78BFA` | new |
| accent · pink | `#F472B6` | new |
| accent · amber | `#FBBF24` | new |
| accent · green | `#5CCC68` (mantis-400) | already defined — finally use it |
| **signature gradient** | `cyan → blue → violet` | you already use this on the skip-link; promote it to the brand mark |

### Usage rules (this is what keeps it minimal)

Color appears **only** on: the name/hero (gradient text), the nav active-indicator, tech pills,
link hover underlines, focus rings, and the "available" status dot. **Backgrounds stay neutral.**

- **Per-section accent hue** — About = cyan, Experience = violet, Projects = amber, Writing = pink.
  Show it *only* in small cues: the nav dash for that section, the section's tech-pill tint, the
  hover underline. A reader feels a colorful rhythm scrolling down without a single colored panel.
- **Signature gradient** on the `h1` name (`background-clip: text`) — one bold, memorable moment.
- A very-low-opacity **aurora/mesh glow** behind the hero (static; ~4% opacity) for depth.

> `better-colors` / `better-accessibility`: run every text/accent pair through a contrast check
> (target AA 4.5:1 body, 3:1 large). `scooter-300` links on the dark base pass; violet/pink/amber
> pills must be tested at their chosen opacity. Never encode meaning in hue alone — the active nav
> item must also change weight/length, not just color.

---

## 2. Typography — earn the "premium" read

Söhne is already a premium choice; it's under-leveraged.

- **Scale & hierarchy.** Adopt a clear modular scale. Make the name (`h1`) the unmistakable hero:
  larger, **tighter tracking** on big type (`-0.02em`), gradient fill. Big type wants negative
  tracking; body wants relaxed leading (`1.6`).
- **Wrapping.** `text-wrap: balance` on headings, `text-pretty` on paragraphs — kills orphans and
  ragged lines for free.
- **Tabular numbers** (`font-variant-numeric: tabular-nums`) on the footer clock and the
  experience year ranges so digits don't jitter.
- **Optical polish.** Slightly reduce the description max-width for a comfortable ~60–70ch measure.

> `better-typography`: one scale, few sizes, consistent rhythm. Resist adding weights — Söhne at
> 400/600 with good tracking beats five weights.

---

## 3. Layout — a "hero" that signals seniority

The two-column sticky layout is the right bones for a senior portfolio. Additions:

- **Status block in the sticky header**: an `Available for work` pill with a live colored dot, your
  current role/company, location, and the **live local clock moved up from the footer** (it's a
  great detail currently buried). Freshness signals "active, senior, reachable."
- **Featured project.** Promote your strongest project to a larger card above the list — a visual
  anchor. Keep the rest as the dense list.
- **Vertical rhythm.** Normalize section spacing (`mb-16 / md:mb-24 / lg:mb-36` is inconsistent
  across sections) into one scale.
- **A "stack" / tools row.** A compact grid or row of the tech you work in — quick credibility.

> `better-layout`: group by meaning, keep one reading order, don't let the easter-egg game compete
> with the primary path. Keep progressive disclosure (game stays hidden behind the clock).

---

## 4. Motion & interaction — restrained, all reduced-motion-gated

This is the biggest "cool" lever and the easiest to overdo. Emil's frequency rule governs:
**never animate high-frequency actions; save delight for rare/first-view moments.**

### Foundation: custom easing tokens (the built-in CSS easings are too weak)

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* enter/exit, feels responsive */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
}
```

### Specific interaction fixes (Emil Before/After)

| Before | After | Why |
| --- | --- | --- |
| Social icons / links have no `:active` | `transform: scale(0.97)` on `:active`, `transition: transform 140ms var(--ease-out)` | Pressable things must feel like they heard the click |
| Hover transitions use Tailwind default easing | Use `--ease-out` tokens | Default curves lack punch; intentional easing reads as craft |
| `transition` on several elements is broad | Name exact properties (`transform`, `opacity`, `color`) | Never animate `all`; keep it on GPU-friendly props |
| Nav indicator only changes on hover | Keep, but ensure active state also animates width (already close) | Spatial feedback for "where am I" |
| First paint is instant (fine) or was a body fade | Optional **staggered fade-up** of sections on first view: 8px→0, opacity 0→1, `~260ms var(--ease-out)`, 40–60ms stagger | First-view delight only; `once`; disabled under reduced-motion |

### Signature interactions (pick 1–2, don't stack them)

- **Cursor-follow spotlight on project/job cards.** You already render a `group-hover` background
  panel; upgrade it to a soft radial glow that tracks the pointer (Emil's spring-smoothed mouse
  value so it has momentum, not a rigid 1:1). Decorative → off under reduced-motion and on touch.
- **Keep the title scramble** (already reimplemented dependency-free + reduced-motion aware) — it's
  a genuinely "engineer" signature. Don't add a second text effect.
- **Subtle tilt on the featured project thumbnail** (≤4°, spring, `@media (hover: hover)`).

### Rules baked in

- Everything above sits behind `@media (prefers-reduced-motion: reduce)` (movement removed, opacity
  kept) and `@media (hover: hover) and (pointer: fine)` for hover-only effects.
- Only animate `transform` / `opacity`. Durations ≤ 300ms for UI; exits faster than enters.

---

## 5. Signature "unseen details" (beauty as leverage)

Small things that compound into "this person has taste":

- **Brand-tinted selection & focus rings.** Selection is `white/10` today — tint it with the cyan
  accent. Give `:focus-visible` a visible 2px ring in the section accent (a11y + polish in one).
- **`Available` status dot** with a slow, low-amplitude pulse (reduced-motion: static dot).
- **Grain/noise overlay** at ~2–3% opacity over the dark base — a very current, cheap depth trick.
- **A crafted OG image** (currently a generic `og.png`) — the first impression when shared.
- **View Transitions** (`astro:transitions`) for a smooth home ↔ 404 feel — optional, cheap.
- **404 page**: lean into the tic-tac-toe easter egg with a hint of color/personality.

---

## 6. Content & credibility (the 5-YOE substance)

Design frames content; these make the seniority real (managed in DatoCMS, no code needed):

- **Impact-oriented experience bullets** — outcomes/metrics, not responsibilities.
- **1–2 real case studies** (problem → approach → result) linked from top projects. Depth > a flat
  list of 8 repos.
- A one-line **positioning statement** under the name ("I build fast, accessible web apps in
  TypeScript & Go").
- Optional: **RSS/writing** if you post; **testimonials**; a "currently building" line.

---

## Prioritized roadmap

| Tier | Effort | Items |
| --- | --- | --- |
| **P1 — foundations (highest ROI)** | ~half day | Color tokens + per-section accent hues; easing tokens; `:active` scale + focus/selection tint; typography scale + `text-balance`/`tabular-nums`; move clock + add status pill |
| **P2 — signature moments** | ~half day | Gradient name + aurora glow; cursor-follow card spotlight; featured-project card; grain overlay |
| **P3 — delight & polish** | ~few hrs | First-view staggered reveal (opt-in); View Transitions; crafted OG image; 404 personality |
| **P4 — content** | ongoing | Impact bullets, case studies, positioning line, tools grid |

**Recommended first PR:** all of **P1** — it establishes the color system, motion vocabulary, and
type scale that everything else builds on, with zero risk to content or the build.

---

## Guardrails (so "colorful" never becomes "noisy")

- One dark canvas. Color only on accents listed in §1. If a change adds a colored *background*,
  it's probably too much.
- One signature text effect (the scramble), one signature hover effect (the spotlight). Not both
  everywhere.
- Every motion: a purpose + a reduced-motion fallback + `transform`/`opacity` only + ≤300ms.
- Re-check contrast after any color change. Never meaning-by-hue-alone.
