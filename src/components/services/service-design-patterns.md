# Service Page Design Patterns

Reusable, opt-in layout and CTA patterns for `ServicePageTemplate`. Every pattern is
activated with a data flag in `src/data/servicePages.js` — pages that don't set a flag
keep the original layout, so patterns can be rolled out one page at a time.

First adopted on: `ai-wordpress-debugging`.

> **Section spacing:** vertical rhythm between sections is governed by the shared
> section-spacing system — see [`docs/design-system/section-spacing.md`](../../../docs/design-system/section-spacing.md).
> Opt a page in with `spacingRhythm: true` and set per-section `spacing`
> (`compact` | `standard` | `spacious`) via `sectionSpacing` / `contentSections[].spacing`.

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
| `relatedLinksStyle: 'inline'`           | Restrained related links | Overview related-service links render as lower-emphasis text actions (`.service-related-links--inline`) so they don't compete with a dominant section CTA |
| `examplesStyle: 'trio'`                 | Three-column guides | Examples render as 3 equal columns on desktop → 2 on tablet → 1 on mobile (`.service-example-grid--trio`) for a complete row of three |
| `heroPanel: { title, items[] }`         | Hero summary panel | Detail-page hero becomes two columns ≥860px: eyebrow/headline/intro/CTA row left, a factual capability panel right (`.service-hero-split` / `.service-hero-panel`). Stacks on mobile. Use only factual labels derived from page content. |
| `includedStyle: 'feature'` (string items) | Feature grid | The feature grid now accepts either `{title, description}` objects or plain strings (renders a numbered chip + title only). |
| `includedFeatured: true`                | Featured feature grid | With `includedStyle: 'feature'`, the first included item spans full width as a tonal lead card (`.service-feature-grid--featured` + `.service-feature-card--wide`); remaining items flow in the grid below. |
| `includedStyle: 'grouped'`              | Grouped capabilities | A featured lead capability (`includedFeatured` string) + labelled group panels (`includedGroups: [{ label, items[] }]`) in an auto-fit column grid (`.service-capability-system`). Keep the flat `included` array too (gates the section). Suited to product/dev pages that need scannable capability groups instead of a flat list. |
| `flatSurfaces: true`                    | Flat (no-gradient) page | Adds `.service-page--flat`, which replaces every gradient on the page with solid/tonal colour: the page + hero backgrounds, the primary button (solid brand green), the mid-CTA panel, and the shared 145° card gradient. Opt-in and isolated — other pages keep their gradient primary button. Use for design/brand pages that must be gradient-free. |
| `heroArtwork` / `contentSections[].gallery` | Art-directed portfolio grid | Data-driven image slots: `{ featured: {src,alt,width,height,caption?,eager?}, supporting: [ … ] }` renders a featured image + supporting image row (`.service-artwork-grid`), preserving aspect ratio with lazy-loading and explicit dimensions. `heroArtwork` places it in a split hero; `contentSections[].gallery` (+ optional `galleryCta`) places it inside a content section. Swap the image objects later without touching layout/CSS. Reusable for future Branding and Social Media Design pages. |
| `useCasesStyle: 'featured'`             | Featured use-case grid | First use-case card spans full width as a tonal lead card (`.service-use-case-grid--featured` + `.service-use-case-card--wide`); remaining cards flow in the tonal grid below. |
| `resourcesStyle: 'showcase'`            | Resource showcase | First resource (order it first in data) spans full width as a tonal featured card; supporting resources sit in a 2-col tonal grid (`.service-resource-grid--showcase`). Scoped tonal surfaces, so other pages' resource cards are unchanged. |
| `midPageCta.primaryVariant: 'solid'`    | Solid mid-CTA button | The mid-page CTA strip's button renders solid tonal instead of the gradient primary. |
| `examplesCta`                           | Examples footer CTA | Solid/pill CTA under the examples/showcase (`.service-section-footer-cta`). |
| `finalCtaStyle: 'tonal'`                | Tonal final CTA | Final CTA uses a deep tonal surface instead of the gradient background (`.service-final-cta--tonal`). |

`examplesStyle: 'showcase'` note: when a featured card is followed by exactly one
supporting card, that supporting card spans the full width (avoids a lonely half card);
with two or more supporting cards they sit side by side as before. Cards work with or
without an `image` — omit the image when no real screenshot exists rather than
fabricating one.

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
