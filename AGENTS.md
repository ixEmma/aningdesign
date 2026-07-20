# AGENTS.md — AningDesign Website

**Project:** AningDesign Website
**Stack:** React + Vite + CSS

`AningDesign` is the website and business name. Use `Aning Design Lab` only for the YouTube channel and its educational content.

The website must remain premium, dark, modern, sharp, technical, clean, responsive, design-led, and conversion-focused.

## Core Rules

* Make focused, minimal, safe edits.
* Review relevant files before editing.
* Follow existing patterns in `src/components`, `src/pages`, and `src/data`.
* Preserve working UX, content, routes, and design unless changes are requested.
* Do not modify unrelated files or run destructive Git/file commands.
* Stop before overwriting unrelated changes.
* Execute clear tasks directly and keep non-trivial plans short.
* Summarize changed files and completed validation.

## React and CSS

* Use `.jsx` components and `.css` files.
* Use inline styles only when requested or needed for small dynamic values.
* Reuse existing components, design tokens, spacing, buttons, cards, and breakpoints.
* Keep CSS aligned with the current component structure.
* Avoid excessive `!important`, broad selectors, duplicate styles, fixed heights, and unnecessary absolute positioning.
* Do not add UI, animation, icon, or styling libraries unless requested.
* Do not change routing, deployment, environment configuration, backend logic, or hosting settings unless required.
* Maintain semantic HTML, keyboard access, focus states, labels, reduced-motion support, and responsive desktop/tablet/mobile behavior.

## Section spacing

All new or modified pages must use the shared compact, standard, and spacious
section-spacing system documented in `docs/design-system/section-spacing.md`.

Do not add arbitrary section margins, empty spacer elements, or broad `section` selectors.
Section wrappers own page-level vertical spacing; components own only their internal
spacing. The system is opt-in per page (`spacingRhythm`), so never affect a page that has
not opted in. Verify desktop, tablet, and mobile spacing before completion.

## UI and Copy

Maintain:

* strong hierarchy
* readable typography
* clean spacing
* consistent colors and gradients
* accessible contrast
* polished components
* clear CTAs

Avoid clutter, generic layouts, random colors, weak contrast, excessive decoration, oversized text blocks, clipping, overlap, overflow, and horizontal scrolling.

Copy must be clear, direct, specific, short, and scannable.

Do not use fluffy “happy text,” generic AI marketing copy, vague claims, long introductions, unsupported statistics, or phrases such as:

* “unlock your full potential”
* “take your business to the next level”
* “transform your vision”
* “world-class solutions”
* “limitless possibilities”
* “elevate your brand”

Do not invent testimonials, results, awards, certifications, partnerships, or guarantees.

Service pages are not blog posts. Visitors should understand them in under one minute.

## Service Pages

Service pages should normally include:

1. Hero
2. Service summary
3. Target client
4. Problems solved
5. Deliverables
6. Process
7. Relevant proof
8. Related services
9. Final CTA

Each page must explain what the service is, who it is for, what it solves, what is included, why AningDesign is relevant, and the next action.

Use service-specific copy. Do not repeat generic text across pages.

## CTAs

* Every important page needs a clear CTA.
* Prefer direct labels such as `Start a Project`, `Request a Quote`, `Book a Consultation`, `View Pricing`, `Explore Projects`, or `Contact AningDesign`.
* Use one primary CTA per section.
* Keep button styles consistent.
* Avoid vague labels such as `Click Here`.
* Do not add placeholder or non-functional buttons.
* Verify every CTA destination.

## Navigation

Main navigation should prioritize:

* Home
* Services
* Projects
* Pricing
* Blog
* Contact

Skills must not be a main navigation item. Keep skills as proof within homepage, About, service, or project content.

Service labels should include:

* Website Design
* WordPress Websites
* React Web Apps
* Startup MVPs
* Graphic Design
* Branding
* Social Media Design
* UI/UX Design

Menus and mega menus must be short, practical, clearly grouped, and easy to scan. Do not place long descriptions inside menus.

Preserve keyboard support, focus states, active links, mobile behavior, and reliable menu opening and closing.

## Blog and Keywords

Blog work must reference:

**Blog Skill — Editorial SEO Article Layout & Interlinking System**

SEO and service-page work must reference:

**Keyword Bank — AningDesign Website Services**

Blog content should use clear titles, short introductions, logical headings, short paragraphs, useful examples, internal links, related content, and appropriate CTAs.

Use keywords naturally in titles, headings, copy, metadata, links, and alt text.

Do not keyword stuff, hide keywords, force keywords into every paragraph, or create duplicate pages for small keyword variations.

## Service Direction

### Graphic Design

Focus on marketing graphics, campaigns, social media visuals, print, advertisements, presentations, promotional materials, and supporting visual systems.

Lead with client needs, deliverables, consistency, process, proof, and CTA. Software tools are supporting proof, not the main offer.

Keep Graphic Design, Branding, Social Media Design, and UI/UX Design distinct.

### Website Design

Focus on strategy, structure, responsive design, hierarchy, user experience, content presentation, conversion, performance awareness, and launch support.

Keep these services distinct:

* **Website Design:** planning, structure, interface, and overall experience
* **WordPress Websites:** WordPress implementation and content management
* **React Web Apps:** custom interactive applications
* **Startup MVPs:** focused initial products for validation and launch
* **UI/UX Design:** user flows, wireframes, prototypes, and usability

Do not promise unverified features or outcomes.

## Routes, SEO, and Internal Links

Do not create orphan pages.

Important pages should connect through relevant navigation, homepage sections, service sections, projects, blogs, footer links, and CTAs.

When adding or renaming an important page, check:

* router configuration
* static route lists
* sitemap
* redirects
* navigation data
* service data
* homepage links
* footer links
* related-page links

Every important page should have one clear purpose, one primary route, one H1, descriptive metadata, useful copy, internal links, and a working CTA.

Use clean routes such as:

`/services/website-design`

Pricing must live at:

`/pricing`

Use logical heading order: `H1 → H2 → H3`.

Do not create duplicate routes without redirects or canonical handling.

## Pricing

The Pricing page must clearly explain available options, inclusions, pricing basis, exclusions, and next action.

Pricing cards must be concise, comparable, responsive, and linked to the correct CTA.

Do not invent prices, discounts, scarcity, inclusions, or popularity labels.

State clearly when pricing is custom.

## Background Animation

* Keep the restored background animation.
* Do not remove, freeze, or disable it solely for Lighthouse.
* Keep it behind content and preserve readability and interaction.
* Avoid unnecessary re-renders and excessive resource use.
* Support reduced motion where practical.
* Optimize the implementation instead of removing it.
* Do not add heavy animations without a clear purpose.

## Images and Performance

* Use optimized, appropriately sized assets.
* Prefer WebP or AVIF for photos and SVG for vectors.
* Use PNG only when necessary.
* Lazy-load suitable below-the-fold images.
* Use useful alt text for meaningful images and empty alt text for decorative images.
* Avoid oversized, duplicated, stretched, unused, or unnecessary base64 assets.

Use production-style checks when relevant:

```bash
npm run build
npm run preview
```

Prioritize efficient rendering, minimal dependencies, reduced layout shifts, limited JavaScript, optimized animation, and avoiding unnecessary re-renders or duplicate listeners.

Do not remove approved visual features only to improve a performance score.

## Final Check

Before completing work, verify:

* clarity
* scannability
* conversion
* brand consistency
* responsive behavior
* accessibility
* performance
* SEO relevance
* code consistency
* minimal safe edits

Do not leave placeholders, broken routes, dead CTAs, orphan pages, duplicate components, accidental style overrides, unfinished responsive states, debug code, console logs, commented experiments, unnecessary dependencies, or formatting artifacts such as literal `` `r`n `` text.

Use targeted checks such as `rg`, `Get-Content`, focused diffs, and relevant build commands. Never claim validation that was not performed.
