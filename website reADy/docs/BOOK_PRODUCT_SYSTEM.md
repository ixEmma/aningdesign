AningDesign Book Product System

Permanent implementation guide for AningDesign book catalog pages and dedicated book product pages.

1. Purpose

This document defines the reusable architecture, design rules, routing behavior, content structure, SEO expectations, accessibility requirements, and agent operating rules for all current and future AningDesign book products.

Future coding agents must read this file before editing:

/books

any /books/:slug route

book catalog cards

book hero sections

book preview/gallery sections

pricing and offer sections

book FAQs

book CTAs

book product data

book-specific SEO metadata

The goal is consistency without forcing every book into the exact same page structure.

2. Source-of-truth hierarchy

When working on book pages, use this order:

Current local repository and checked-out branch — source of truth for code, routes, components, CSS, assets, and current implementation.

AGENTS.md — source of truth for repository-level agent rules.

This file: docs/BOOK_PRODUCT_SYSTEM.md — source of truth for the AningDesign book system.

Existing AningDesign design system and shared components — source of truth for typography, buttons, spacing, containers, and interaction patterns.

Notion AningDesign Book Product System — business/design reference and strategic backup.

Do not overwrite current implementation based only on old documentation. Inspect the live code first.

3. Core funnel

The standard funnel is:

/books→ dedicated internal book page→ external purchase destination

Example:

/books→ /books/wordpress-speed-with-ai-agent→ Payhip

The catalog page is for discovery.

The dedicated book page is for product education, proof, preview, pricing, and conversion.

The external checkout is the final purchase step.

Important rule

If a dedicated internal book page exists, the /books catalog card should not send users directly to Payhip.

PART A — ALL BOOKS PAGE

4. /books page purpose

The /books page is the AningDesign catalog and discovery page.

Its job is to:

introduce the Books & Resources area

display available books consistently

help users understand the difference between products

route users into dedicated internal book pages

expose free supporting resources where appropriate

It is not the full sales page for each book.

5. Catalog card standard

Each book listing should follow one consistent product-card system.

A card may include:

approved book image or mockup

category / eyebrow

title

concise description

format

current or starting price where useful

edition or audience where useful

internal CTA

Typical CTA labels:

View Book

Choose an Edition

Catalog CTA rule

Use an internal route such as:

/books/client-ready-wordpress-website-blueprint

/books/wordpress-speed-with-ai-agent

Do not use a direct Payhip link from the catalog when a dedicated internal page exists.

6. Catalog visual consistency

All book cards must belong to the same AningDesign visual system.

Keep consistent:

card proportions

spacing

typography hierarchy

CTA treatment

image alignment

border treatment

responsive behavior

Allowed product-specific variation:

book artwork

subtle accent details

approved product imagery

Not allowed:

completely different card systems per book

separate button styles per book

microsite-style color takeover

duplicate cards for the same product

PART B — DEDICATED BOOK PAGES

7. Dedicated page purpose

Each dedicated book page should explain the product clearly enough for a qualified visitor to decide whether to buy.

It may include:

hero

problem / outcome

workflow

previews

proof

audience

what's included

editions / pricing

FAQ

final CTA

Not every book needs the same sections.

Consistency comes from shared layout grammar and reusable components, not identical content.

8. Reusable component strategy

Do not force the entire book page into one giant BookProductPage component if that makes product-specific pages rigid.

Instead, reuse the parts that genuinely repeat.

Recommended reusable components:

BookHero

BookSectionHeading

BookPreviewGallery

BookPricing

BookFAQ

BookFinalCTA

Useful optional reusable components:

BookStats

BookAudience

BookFeatureGrid

BookWorkflow

BookProofSection

BookAuthor

BookEditionSelector

BookTeaserCard

Each dedicated page may compose these differently.

9. Example page compositions

Client-Ready WordPress Blueprint

Possible structure:

Hero

Stats

Problem

Workflow

Inside the Book

Package

Pricing

Preview

Audience

Author

FAQ

Final CTA

WordPress Speed with AI Agent

Possible structure:

Hero

Problem

Workflow

Inside the Guide

NovaMira Workflow

Evidence

Audience

Included

Pricing

FAQ

Final CTA

Different section order is allowed.

Different design language is not.

PART C — SHARED BOOK COMPONENT RULES

10. Reusable BookHero

The shared hero pattern should support:

eyebrow / category

H1

short description

optional current price

optional regular price

optional edition label

primary CTA

optional secondary CTA

approved hero image or mockup

image alt text

Hero design rules

use the established AningDesign container width

use the existing heading scale

use the shared AningDesign button system

maintain strong negative space

do not overfill the hero

keep product artwork visually strong without letting it redefine the site identity

verify desktop, tablet, and mobile balance

11. Reusable preview/gallery system

The preview system should support:

one main preview composition

optional interior page thumbnails

optional keyboard-accessible lightbox

optional teaser PDF action

Preview rules

Use approved real assets only.

Do not:

generate fake interior pages

invent screenshots

distort aspect ratios

overload the page with too many thumbnails

Do:

preserve readability

use consistent spacing

lazy-load below-the-fold preview images

add meaningful alt text

keep interactions keyboard accessible

12. Reusable pricing / offer system

The pricing system should support:

single edition

multiple editions

regular price

current / launch price

edition label

included items

external purchase URL

Price presentation

Show one visible price for a standard offer. Add a regular price and restrained
strikethrough only for a verified active discount.

Do not use:

fake urgency

countdown timers

flashing badges

aggressive sale styling

CTA rule

The main purchase CTA must use the existing AningDesign green-to-cyan primary button style.

Do not create a new checkout button style for a specific book.

13. Reusable teaser / preview card

Where a free teaser is offered, use one shared layout pattern.

It may include:

teaser title

short explanation

what is included

direct preview/download action

Spacing rule

The CTA must have enough breathing room from:

feature lists

paragraphs

card content above it

If the teaser and pricing cards share a layout, fix spacing at the shared source rather than page-specific hacks.

14. Reusable FAQ

Use one shared FAQ/accordion presentation across book pages.

FAQ content may differ by product.

Interaction and styling should remain consistent.

Requirements:

keyboard accessible

visible focus state

predictable open/close behavior

consistent spacing

consistent borders

semantic heading order

Do not invent a different accordion UI for every product.

15. Reusable final CTA

The shared final CTA should support:

eyebrow

headline

short supporting text

primary CTA

optional secondary CTA

optional current price

Use the established AningDesign design language.

Do not create a different final-conversion panel for every book.

PART D — BOOK DATA MODEL

16. Centralize common product information

Common book data should be structured when practical.

Possible fields:

{
  slug,
  path,
  title,
  shortTitle,
  eyebrow,
  author,
  description,
  seoTitle,
  seoDescription,
  heroImage,
  heroAlt,
  format,
  edition,
  price,
  regularPrice,
  purchaseUrl,
  previewUrl,
  audience,
  included,
  gallery,
  workflow,
  faqs
}

Do not force every complex content section into a data object if that makes the implementation harder to maintain.

Use data for repeatable information.

Use page-specific composition for product-specific storytelling.

PART E — BRAND AND DESIGN RULES

17. AningDesign remains the parent brand

Book pages must remain visually part of AningDesign.

Use:

dark visual foundation

green as the main brand accent

restrained cyan

established typography

established container widths

generous spacing

existing animated/network background where already part of the system

shared CTA implementation

restrained borders

premium card surfaces

Product artwork rule

A book may contain its own strong colors.

Example:

The WordPress Speed book uses blue/cyan artwork.

That does not mean the entire page becomes a cyan microsite.

Book colors belong primarily in:

cover

screenshots

mockups

small supporting accents

The surrounding site UI should remain AningDesign.

18. Button system

Primary CTAs must reuse the existing AningDesign button implementation.

Typical primary actions:

Get the Guide

Buy the Book

Choose an Edition

Secondary actions may include:

Preview the Guide

View Sample Pages

Do not:

create a new gradient per book

invent a new radius

invent new shadows

use text-arrow characters when the shared icon system already exists

create page-specific primary-button classes without a real need

19. Spacing and rhythm

Book pages should feel premium and relaxed.

Check:

vertical space between sections

card padding

CTA breathing room

spacing after lists

bottom padding inside cards

image-to-copy balance

Avoid:

CTAs glued to feature lists

crowded card footers

oversized dead space

inconsistent section rhythm

Shared spacing defects should be fixed at the shared component or shared CSS level.

PART F — IMAGE RULES

20. Approved imagery only

Use approved product images and mockups.

Prefer:

local optimized assets

WebP / AVIF where practical

transparent PNG only where transparency is required

Do not:

regenerate approved book covers

invent dashboards

invent Lighthouse results

generate fake interior pages

use unrelated stock images as product proof

21. Product mockup rules

Mockups should:

preserve the real cover

avoid unnecessary white/beige baked backgrounds on dark pages

maintain breathing room

avoid accidental cropping

use restrained shadows

preserve readable artwork

If a supplied mockup contains an unwanted background, isolate the book cleanly into a transparent asset rather than redesigning the cover.

PART G — ROUTING AND CHECKOUT

22. Routing model

Each book should have:

one catalog entry

one dedicated internal route

one real external purchase destination where applicable

Example:

/books
/books/wordpress-speed-with-ai-agent
https://payhip.com/b/UMfoY

Avoid:

duplicate routes

duplicate cards

orphaned product pages

direct catalog-to-Payhip routing when a dedicated page exists

23. Checkout behavior

Purchase CTAs on dedicated book pages may open the real external checkout.

Use safe external-link handling where appropriate.

Do not invent:

product URLs

prices

editions

checkout destinations

Use confirmed project values only.

PART H — SEO

24. Dedicated book page SEO

Each dedicated book page should have:

unique SEO title

unique meta description

canonical URL

one H1

descriptive headings

descriptive image alt text

internal links

sitemap inclusion where appropriate

Where supported by the current project, consider appropriate structured data such as:

Product

Offer

Book

BreadcrumbList

Do not add schema that does not match visible page content.

25. Keyword intent

Book pages should target product-relevant search intent.

Do not automatically target service keywords on book pages.

Example:

A service term such as:

wordpress speed optimization service

may belong on a service page.

A book page may better target:

wordpress speed optimization guide

Supporting blogs can capture informational and commercial-investigation queries and route users into the book page.

Avoid keyword stuffing.

PART I — ACCESSIBILITY

26. Accessibility requirements

All book pages must maintain:

one logical H1

semantic heading order

meaningful alt text

visible focus states

keyboard-accessible interactions

adequate contrast

approximately 44px minimum interactive targets where practical

reduced-motion support

no horizontal overflow

Lightboxes and accordions must be keyboard usable.

PART J — RESPONSIVE QA

27. Test widths

At minimum verify:

1440px

1280px

1024px

768px

390px

360px

Check:

hero balance

text wrapping

image scaling

pricing hierarchy

CTA spacing

card padding

preview galleries

FAQ behavior

footer transition

no overflow

PART K — ADDING A NEW BOOK

28. Standard workflow

When adding a new book:

Prepare approved product assets.

Confirm product title, edition, price, and purchase URL.

Add product data.

Add exactly one catalog listing to /books.

Create the dedicated /books/:slug route.

Compose the page using shared book components.

Add product-specific sections only where needed.

Add preview/mockup assets.

Add real checkout destination.

Add SEO metadata and canonical URL.

Add sitemap entry if appropriate.

Verify catalog → detail → checkout.

Test desktop, tablet, and mobile.

Run build and relevant accessibility checks.

Report exactly what changed.

PART L — FORBIDDEN PATTERNS

29. Future agents must NOT

link catalog cards directly to Payhip when a dedicated page exists

create duplicate product cards

create duplicate routes

invent a new visual system for every book

create a new primary CTA style for every book

force every book into one giant monolithic component

duplicate hero/pricing/FAQ implementations when a shared component already exists

regenerate approved artwork

invent prices

invent URLs

invent Lighthouse data

overload pages with decorative cards

let product colors replace the AningDesign parent brand

alter unrelated book pages without a clear implementation reason

create orphaned product pages

bypass existing shared site components without first inspecting them

PART M — CURRENT BOOKS

30. Client-Ready WordPress Blueprint

This page is the stronger established visual reference for the AningDesign book system.

Preserve its approved visual grammar.

Do not degrade it while extracting shared components.

31. WordPress Speed with AI Agent

Route:

/books/wordpress-speed-with-ai-agent

Current purchase URL:

https://payhip.com/b/UMfoY

Current price:

$19 USD

Current edition:

Digital Guide

Use the same AningDesign system as the Blueprint page while allowing product-specific content such as:

NovaMira workflow

performance evidence

AI-agent workflow

guide preview assets

Do not turn the page into a separate cyan/blue microsite.

PART N — AGENT VERIFICATION CHECKLIST

32. Before editing

Future agents should:

Read AGENTS.md.

Read this file.

Run git status --short --branch.

Inspect /books.

Inspect the relevant dedicated book route.

Inspect shared book components.

Inspect shared button implementation.

Inspect book/product data.

Inspect relevant CSS.

Confirm the current route and asset state.

33. Before finishing

Verify:

/books renders correctly

no duplicate catalog cards exist

each catalog card reaches the correct internal route

each dedicated book page renders correctly

real purchase links work

preview links work

shared components did not break other books

CTA spacing is comfortable

responsive behavior works

metadata is unique

build passes

Report:

files changed

reusable components created or reused

data files changed

routes changed

CSS changed

documentation changed

anything intentionally left product-specific

34. AGENTS.md pointer

The repository AGENTS.md should include a short instruction similar to:

For any work involving /books, book catalog cards, dedicated book pages, book pricing, preview galleries, FAQs, or book CTAs, read docs/BOOK_PRODUCT_SYSTEM.md before editing.

Keep that pointer short.

Do not duplicate this full document inside AGENTS.md.

35. Guiding principle

Consistency should come from shared patterns, not forced identical pages.

Every book can tell a different product story.

Every book must still look and behave like part of AningDesign.
