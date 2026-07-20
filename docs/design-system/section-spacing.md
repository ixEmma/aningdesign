# Section Spacing System

A reusable, semantic system for vertical rhythm between page sections across the
Aning Design website. It replaces arbitrary one-off `margin-bottom` values with three
purposeful spacing levels — **compact**, **standard**, **spacious** — so pages read as
calm, premium, and intentional, with consistent behaviour on desktop, tablet, and mobile.

This is a spacing/rhythm system, not a layout or content system. It never changes what a
section contains, only the breathing room around it.

---

## Tokens

Defined once in `src/styles/globals.css` (available site-wide):

| Token | Value | Desktop | Tablet | Mobile |
|-------|-------|--------:|-------:|-------:|
| `--section-space-compact`  | `clamp(52px, 40px + 3.5vw, 88px)` | 72–88 | 64–72 | 52–60 |
| `--section-space-standard` | `clamp(64px, 48px + 5vw, 120px)`  | 104–120 | 80–96 | 64–72 |
| `--section-space-spacious` | `clamp(72px, 52px + 6.4vw, 144px)`| 128–144 | 104–120 | 72–88 |
| `--section-lead-top`       | `clamp(44px, 26px + 4.5vw, 72px)` | hero → first-section lead-in |
| `--section-intro-gap`      | `clamp(32px, 24px + 2vw, 56px)`   | intro copy → main content |
| `--section-content-gap`    | `clamp(20px, 16px + 1vw, 32px)`   | grouped content blocks |
| `--section-cta-gap`        | `clamp(28px, 20px + 2vw, 40px)`   | content → its section CTA |

`clamp()` scales the values fluidly between mobile and desktop, so no per-breakpoint
overrides are needed for the section gaps themselves. Mobile never exceeds ~88px between
normal sections and never drops below ~52px.

---

## The three variants

Applied as `section-space--compact | --standard | --spacious` on a **section wrapper**.
Each variant sets the `margin-top` — i.e. the gap **above** the section. One gap, one owner.

```css
.service-page--rhythm .service-page-content > *              { margin-top: var(--section-space-standard); }
.service-page--rhythm .service-page-content > .section-space--compact  { margin-top: var(--section-space-compact); }
.service-page--rhythm .service-page-content > .section-space--spacious { margin-top: var(--section-space-spacious); }
.service-page--rhythm .service-page-content > *:first-child  { margin-top: 0; }
```

Standard needs no dedicated rule — it is the default. The first section never adds a top
gap; the hero → first-section lead-in is owned by the content wrapper's `padding-top`
(`--section-lead-top`).

### Decision guide

```
Use compact when:
- content belongs to the same chapter
- a CTA is attached to the preceding section
- proof and metrics are directly connected

Use standard when:
- the next section is independent but related
- the page continues the same narrative

Use spacious when:
- the subject changes significantly
- a major proof, FAQ, or conversion chapter begins
- the user needs a stronger visual pause
```

Do not mark every section spacious. A page that is spacious everywhere has no rhythm.

---

## Spacing ownership rules

1. The **section wrapper** owns the gap between major sections (`margin-top` variant).
2. The section's **internal layout** owns spacing between its heading, copy, grid, media,
   and CTA (use `--section-intro-gap`, `--section-content-gap`, `--section-cta-gap`).
3. **Cards** own only their internal padding.
4. No empty spacer elements.
5. Never combine a large section bottom margin with large section padding.
6. Remove obsolete one-off margins when the shared system replaces them.
7. Never let two adjacent wrappers both create the gap (no double spacing).
8. Never use negative margins to compensate for structural spacing mistakes.

Prefer padding/`margin-top` on the section wrapper for section separation. Margins are
fine for small internal relationships (eyebrow → heading, heading → paragraph,
paragraph → CTA).

---

## Internal section rhythm

Target relationships within a section:

- eyebrow → heading: 12–16px
- heading → supporting paragraph: 16–24px
- introductory copy → main content: 32–56px (`--section-intro-gap`)
- content → section CTA: 28–40px (`--section-cta-gap`)
- grid/card gaps: 20–24px desktop, 16–20px mobile (`--section-content-gap`)

Premium feel should come from section separation, heading hierarchy, and content
grouping — **not** from enlarging every card's padding.

---

## Full-width and tonal sections

- Apply vertical spacing to the **outer** section wrapper.
- Keep horizontal width constraints on the **inner** container (the existing site
  container width).
- Do not apply the same large padding to both wrapper and inner container.
- A CTA panel keeps its own internal padding; the **section** controls its distance from
  neighbours. Never use the panel's own margin as the primary section separator.

---

## Mobile rules

- Section gaps scale down automatically via `clamp()`; do not hand-tune per section.
- Never drop meaningful section separation below ~52px.
- Never use 100px+ gaps between normal sections on mobile.
- Keep cards/buttons visually attached to their section heading.
- Full-width CTA buttons stay clearly separated from preceding content.
- The final CTA must not sit too close to the FAQ or too far from the footer.
- Always verify stacked proof images, timelines, accordions, and grids visually.

---

## Correct implementation

Opt a page into the system with `spacingRhythm: true` in its data, then assign variants
per section (defaults are sensible; override only what differs):

```js
// src/data/servicePages.js
{
  spacingRhythm: true,
  sectionSpacing: { audience: 'spacious' }, // per-section overrides
  contentSections: [
    { id: 'service-safety', spacing: 'spacious', /* ... */ },
  ],
}
```

```jsx
// section wrapper owns the gap above it
<ServiceSection spacing="spacious">…</ServiceSection>
```

```css
/* the wrapper owns the gap; the panel owns its own padding */
.service-page--rhythm .service-page-content > .section-space--compact { margin-top: var(--section-space-compact); }
```

## Incorrect implementation

```css
/* ❌ broad selector — never do this */
section { padding-block: 6rem; }

/* ❌ double spacing: gap on the container AND margins on children */
.page-content { gap: 84px; }
.page-content > section { margin-top: 84px; }

/* ❌ negative margin to "fix" an oversized gap */
.next-section { margin-top: -40px; }
```

```jsx
{/* ❌ empty spacer element */}
<div style={{ height: 80 }} />
```

---

## Applying to a new page/template

1. Add a wrapper with a rhythm modifier class (e.g. the service template uses
   `.service-page--rhythm .service-page-content`). Set `gap: 0`, `padding-top:
   var(--section-lead-top)`, `padding-bottom: var(--section-space-standard)`.
2. Give every direct-child section the default `margin-top: var(--section-space-standard)`,
   zero the first child, and add `.section-space--compact` / `.section-space--spacious`
   overrides.
3. Reuse the existing section wrapper's `spacing` prop rather than inventing new markup.
   Do not create a new React component if a suitable wrapper already exists.

The tokens are global, but a page only picks up the rhythm once it explicitly opts in —
so pages that have not opted in are never affected.

---

## Visual verification (required before completion)

Do not rely on CSS math alone. Render and inspect both portrait mobile and tablet
stacking at: **1440, 1280, 1024, 768, 390, 375, 320px**.

At each width check: section-to-section distance, internal heading rhythm, CTA
attachment, grid gaps, stacked layouts, no horizontal overflow, no empty bands, no
excessive page length from duplicated spacing, and that no heading appears visually
attached to the previous section.
