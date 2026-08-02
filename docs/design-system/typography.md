# AningDesign Typography System

The shared type system uses **Switzer** and the semantic `--type-*` tokens defined in
`src/styles/globals.css`. New work must use these tokens or the matching low-specificity
`.type-*` utilities. The older `--text-*`, `--weight-*`, and `--line-*` variables remain
temporarily available only so unmigrated pages do not change during phased adoption.

## Current audit snapshot

The July 2026 audit covered global styles, the homepage, service template, portfolio and
startup work, blog archive and articles, books and products, contact, site navigation,
footer, and reusable cards.

| Property | Declarations | Unique values | Main finding |
| --- | ---: | ---: | --- |
| `font-family` | 91 | 4 | Switzer is consistent in intent, but direct strings and the shared variable are mixed. |
| `font-size` | 435 | 82 | Fixed pixels, rem values, legacy variables, and many unrelated `clamp()` formulas coexist. |
| `font-weight` | 230 | 15 | Values include 400–900 plus synthetic 550, 650, 680, 750, 800, and 850. |
| `line-height` | 240 | 38 | Heading values range from 0.98–1.3 and paragraph values from 1.35–1.86. |
| `letter-spacing` | 78 | 29 | Values range from `-0.055em` to `0.16em`, plus pixel tracking. |
| `text-transform` | 51 | 1 | Uppercase is used for labels, kickers, tags, and some metadata. |

### Values by surface

| Surface | Current values and responsive overrides found |
| --- | --- |
| Global CSS | Only Switzer Regular was registered. Legacy sizes are 72, 48/36/28, 28, 18, 16, 14, and 12px; global `h1` is 700/-1px and `h2` is 28px/700. |
| Homepage hero | Display: `clamp(3.5rem, 4.6vw, 5.9rem)`, 680, 0.99, -0.025em with separate 1100/900/480px size rules. Supporting copy: 16–20px and 1.5. Context: 13→12px, 650. Reel: four different clamps, 600→680, 1, -0.015em. Proof text remains 11–14px with 550/750. |
| Service template | H1: `clamp(42px, 6vw, 78px)`, 900, 1.12; index H1 uses 40–68px; mobile uses 36/34px. H2 variants span 20–46px, H3/card titles 17–22px, body copy 14–19px with 1.5–1.8, and labels 11–13px with 0–0.14em tracking. |
| Portfolio and projects | Project H2 is 48→36→28px/900; H3 is 28→24→20px/700; copy is 14–18px/1.6–1.7. Startup H1 is 42→34px/900, H2 is 36→30px/900, cards use 20px/900 and 14px/1.75. `Works.css` declares no typography and inherits. |
| Blog archive | H1 is 40–68px/900/1.02 and becomes 36px/1.08 below 520px. H2 is 30–46px/900/1.08; intro copy is 18→16px/1.7; labels are 11px/900 with 0.08–0.1em tracking. |
| Blog article | Header H1 is 36–64px/900/1.06; intro is 19→16px/1.75. Article H2 is 28–38px and H3 is 22–27px, both 900/1.14. Reading copy is 18px/1.86 and becomes 16px/1.78. Supporting cards and CTAs add several 11–34px variants. |
| Books and products | Book H1 is 44–82px/900/0.98/-0.055em; detail H1 is 42–70px. Section headings use 28–48px and tracking down to -0.035em. Pricing/contact-style product headers use 38–64px/900/1.04. Body copy spans 13–22px/1.45–1.8. |
| Contact | Route H1 is 38–64px/900/1.04 and becomes 32px/1.12; intro copy is 18→16px/1.7. Contact panels add 24–40px headings, 11–15px labels/UI, and weights up to 900. |
| Header and mega menu | Header uses 11, 14, and 16px with 600–900. Mega-menu text spans 11–15px with 700/900 and several desktop/mobile overrides; labels use 0.08em uppercase tracking. |
| Footer | Brand is 18px/900; headings 14px/900; links and copy 14–15px/1.35–1.65; copyright is 14→13px. |
| Reusable cards | Blog titles use 20–25px/900, resource titles 22px, featured titles 30–48px/900, descriptions 14–16px/1.68–1.7, and metadata 10–14px/800–900. |
| Inline exceptions | The 404 route still uses inline 72px, 20px, and 16px declarations in `App.jsx`. |

## Semantic tokens

| Token | Size | Weight | Line height | Tracking | Intended usage |
| --- | --- | ---: | ---: | ---: | --- |
| `display` | `clamp(3.5rem, 4.5vw, 5.75rem)`* | 700 | 0.99 | -0.025em | Homepage hero only. |
| `h1` | `clamp(2.5rem, 3.6vw, 4rem)` | 900 | 1.04 | -0.02em | Standard page title; one H1 per page. |
| `h2` | `clamp(2rem, 2.75vw, 3rem)` | 900 | 1.08 | -0.02em | Major page section. |
| `h3` | `clamp(1.25rem, 0.95rem + 1.25vw, 2rem)` | 700 | 1.2 | -0.02em | Subsection, card, or capability title. |
| `h4` | `var(--type-body-large-size)` | 700 | 1.2 | -0.02em | Minor structural heading; use only beneath an H3. |
| `body-large` | `clamp(1rem, 0.95rem + 0.3vw, 1.25rem)` | 400 | 1.55 | 0 | Hero or page-intro supporting copy. |
| `body` | `1rem` | 400 | 1.65 | 0 | Standard paragraph and list copy. |
| `small` | `clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)` | 500 | 1.5 | Supporting metadata and compact contextual copy. |
| `eyebrow` | `clamp(0.6875rem, 0.66rem + 0.1vw, 0.75rem)` | 700 | 1 | 0.1em | Uppercase section label or kicker only. |

`*` The display token keeps the approved hero composition through scoped global
breakpoints: 44–64px below 1100px, 48–64px below 900px, and 33–37px below 480px.
Standard H1s never use these display overrides.

The homepage hero uses one documented narrow-screen correction at 480px and below:
`clamp(2.5rem, 11vw, 3.4rem)`, tightening to a 38px minimum below 380px to prevent
orphaned headline words. This keeps the shorter approved hero headline around the
40–54px display range without changing the shared scale for other components.
Its desktop size remains display-led but is capped with
`min(var(--type-display-size), clamp(3.25rem, 4.4vw, 4.75rem))` so the split-screen
composition remains balanced within the narrower hero frame.

The matching CSS variables use this pattern:

```css
font-size: var(--type-h1-size);
font-weight: var(--type-weight-black);
line-height: var(--type-line-h1);
letter-spacing: var(--type-tracking-heading);
```

The available utilities are `.type-display`, `.type-h1`, `.type-h2`, `.type-h3`, `.type-h4`,
`.type-body-large`, `.type-body`, `.type-small`, and `.type-eyebrow`. They set typography
only; layout, margins, color, and width remain component responsibilities.

`h4` follows the approved Lensora detail treatment: body-large scale with H3 line-height,
bold weight, and heading tracking. Use it only for a structural level below an H3, never as
a card label or an eyebrow substitute.

```jsx
<h1 className="type-h1">Website design built around clear decisions</h1>
<p className="type-body-large">Strategy, interface design, and implementation.</p>
<p className="type-eyebrow">Selected work</p>
```

## Font weights

Approved Switzer files and values are Regular 400, Medium 500, Semibold 600, Bold 700,
and Black 900. These weights are registered globally. Do not use intermediate numeric
values or 800/850; choose the nearest approved role instead.

- 400: paragraphs and long-form reading.
- 500: compact supporting text and navigation where regular is too light.
- 600: UI labels, buttons, and restrained emphasis.
- 700: display text, H3s, eyebrows, and strong emphasis.
- 900: standard H1/H2 hierarchy where the brand needs maximum authority.

## Line-height and tracking rules

- Display and headings use their exact token line heights; do not inherit paragraph rhythm.
- Paragraphs use 1.55 for large introductions and 1.65 for normal reading copy.
- Small text uses 1.5. Eyebrows use 1 because they are single-line labels.
- Display tracking is capped at -0.025em. Other headings use -0.02em.
- Body copy stays at 0 tracking; small copy uses 0.01em.
- Eyebrows use 0.1em and uppercase. Do not uppercase sentences or navigation labels.
- Never tighten tracking beyond -0.025em without explicit visual approval at every target width.

## Prohibited one-off styling

- New raw `font-size`, `font-weight`, `line-height`, or `letter-spacing` values in page CSS.
- Using `display` for service, portfolio, blog, book, product, pricing, or contact H1s.
- Synthetic or unregistered weights such as 550, 650, 680, 750, 800, or 850.
- Page-specific responsive font sizes when the semantic token already scales correctly.
- Pixel-based negative tracking, or tracking tighter than -0.025em without approval.
- Inline typography styles and broad tag overrides for component-specific needs.
- Introducing a second UI font family without updating this system and its documentation.

## Safe migration sequence

1. **Shell and navigation:** Header, MegaMenu, NavLink, SearchOverlay, Footer, and remaining button/link labels.
2. **Homepage remainder:** ProofBar, About, Services, Projects, Skills, Testimonials, Blueprint, YouTube showcase, CTA, and Contact sections.
3. **Service system:** ServicePageTemplate hero, section headings, cards, matrices, proof, FAQ, and CTA variants in one controlled phase.
4. **Portfolio:** Project bento cards and StartupPage founder, heading, metadata, and project-card roles.
5. **Editorial:** Blog archive, BlogPostHeader, BlogPost reading styles, search/filter/newsletter components, and blog/featured/latest cards.
6. **Products and resources:** Books, book detail, pricing, free resources, ResourceCard, PromptBlock, and breadcrumbs.
7. **Remaining routes:** Contact route/panels, Thank You, and the inline 404 presentation.

For each phase, replace declarations by semantic role, remove superseded responsive
overrides, build, and visually verify the affected routes before moving to the next phase.

## Current template mapping

- Service templates: the hero uses `h1`, primary sections use `h2`, and service-card,
  process, proof, and capability titles use `h3`. CTA headings remain semantically `h2`
  where they introduce a section, while using the restrained H3 visual role.
- Blog archive: the page title and archive section heading use `h1` and `h2` respectively.
  Blog-card and featured-card titles remain semantic `h3` card titles rather than styling
  them as a page-section H2.
- Blog articles: the post title uses `h1`; Markdown H2/H3 headings consume the shared
  H2/H3 roles without changing their generated IDs or table-of-contents targets. Related,
  product, and final-CTA headings remain visually subordinate through the H3 role.
