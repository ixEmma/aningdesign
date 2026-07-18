# Service Page Design Patterns

Reusable, opt-in layout and CTA patterns for `ServicePageTemplate`. Every pattern is
activated with a data flag in `src/data/servicePages.js` — pages that don't set a flag
keep the original layout, so patterns can be rolled out one page at a time.

First adopted on: `ai-wordpress-debugging`.

---

## CTA button system

Three variants, all rendered through the `ServiceCta` component
(`{ label, href, variant }` objects in page data):

| Variant   | Class                    | Look                                  | Use for |
|-----------|--------------------------|---------------------------------------|---------|
| `primary` | `.service-primary-action`| Brand gradient, dark text             | Highest-priority actions only (hero, final CTA, mid-page strip) |
| `solid`   | `.service-solid-action`  | Tonal green surface + border          | Default alternative CTA (proof block, process footer, FAQ intro) |
| `pill`    | `.service-pill-action`   | Compact rounded pill, neutral surface | Section-level CTAs beside intros, inside strips |

Rule of thumb: at most one gradient `primary` per viewport; mix `solid` and `pill`
elsewhere so CTAs stay varied without visual overload. No ghost buttons.

## CTA placement hooks

| Data key                      | Where it renders |
|-------------------------------|------------------|
| `overviewCta`                 | Under the Overview heading (left column) |
| `includedCta`                 | Under the Included heading |
| `useCasesCta`                 | Under the Use-cases heading |
| `contentSections[].cta`       | Under that section's heading |
| `contentSections[].proofCta`  | Directly below the proof image |
| `contentSections[].panelCta`  | Trust-panel footer strip (`note` + button) |
| `processCta`                  | After the process steps (`.service-section-footer-cta`) |
| `faqIntro` / `faqCta`         | Intro line + button under the FAQ heading |

## Section layout variants

| Flag (page data)                        | Pattern | Description |
|-----------------------------------------|---------|-------------|
| `includedStyle: 'feature'`              | Feature card grid A | Index-chip cards (`.service-feature-grid`), quiet borders, hover accent |
| `audienceStyle: 'list'`                 | Editorial checklist | Two-column divider rows with check icons (`.service-audience-list`), no card boxes |
| `useCasesStyle: 'tonal'`                | Feature card grid B | Tonal cards with a thin top accent (`.service-use-case-grid--tonal`) |
| `contentSections[].panelStyle: 'trust'` | Trust panel | One framed surface with internal rows + CTA footer strip (`.service-trust-panel`) |
| `contentSections[].proofImage`          | Two-column proof | Copy + metric tiles left, framed evidence image right (`.service-proof`), CTA below image via `proofCta` |
| `contentSections[].metrics`             | Metric tiles | Score/label tiles inside proof copy (`.service-proof-metrics`) |
| `contentSections[].listStyle: 'rows'`   | Row list | Editorial title/description divider rows (`.service-row-list`) instead of check cards |
| `processStyle: 'timeline'`              | Workflow timeline | Connected numbered steps with a vertical rail, no card boxes |
| `faqStyle: 'rows'`                      | FAQ rows | Left heading/intro/CTA, right accordion divider rows with rotating plus icon |
| `audienceCta`                           | Audience footer CTA | Solid/pill CTA under the audience section |

## Listing-page patterns

For index / category pages (first adopted on `/services`, `servicesIndexPage`).

| Flag (page data)          | Pattern | Description |
|---------------------------|---------|-------------|
| `directoryGroups`         | Service matrix | Labelled groups of service cards. Each group: `{ label, columns, slugs, featured?, featuredMeta? }`. `columns: 1` (or a single slug) renders a wide horizontal card; the `featured` slug renders as a wide card spanning all columns with an optional `featuredMeta` tag + note. Cards are whole-card clickable via a stretched link on the visible "View service" link (`.service-matrix`). |
| `directoryCta`            | Inline CTA strip | `{ heading, text, label, href, variant }` strip after the matrix (`.service-inline-cta`). |
| `examplesStyle: 'showcase'` | Mixed showcase | One `featured: true` card (optional `image: { src, alt, width, height }`, horizontal media + body) spanning full width, plus supporting cards below (`.service-showcase`). Reuse real project images; lazy-loaded, aspect-reserved on mobile. |

The listing hero (`.service-page--index`) automatically becomes a two-column
composition (copy left, `introCta` panel right) at ≥760px, and its final CTA uses a
deep tonal surface instead of a gradient.

## Visual rules

- Dark tonal layering only: `rgba(255,255,255,0.03–0.08)` surfaces, subtle borders,
  restrained shadows. No new gradients — gradient stays exclusive to `primary` CTAs
  and existing hero/final-CTA backgrounds.
- Brand accent: `#9af7a3` for icons, index chips, scores, and tonal buttons.
- Radius language: 8px (cards/buttons), 12px (framed panels), 999px (pills).
- Breakpoints follow the template: 900px (single-column sections), 560px (stacked
  grids, full-width CTAs).

## Applying to another service page

Pick 2–4 variants per page and alternate them so adjacent sections never share the
same card treatment. Suggested rhythm: feature grid → editorial list → tonal grid →
framed panel → proof/media → row list → timeline → FAQ rows.
