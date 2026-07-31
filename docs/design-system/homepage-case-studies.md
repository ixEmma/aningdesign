# Homepage Case-Study System

The homepage `Selected digital work` section uses two deliberate presentation levels.

- Lensora Events is the unique featured-product showcase and keeps its interactive layout.
- Every supporting homepage project uses `src/components/SupportingCaseStudy.jsx`.

## Supporting-card rules

Supporting cards share one structure: screenshot, category and status, title, summary,
Challenge, Role, Outcome, up to three technology labels, and one project action. Cards use
the same 16:10 media ratio, content padding, typography tokens, fact treatment, technology
tags, CTA placement, hover behavior, focus behavior, and responsive stacking.

Client-brand colors belong primarily inside real project screenshots. The card surface,
structural borders, labels, technology tags, and actions use AningDesign colors. A future
project may add only a restrained accent modifier, such as a small line or status dot; it
must not replace the shared card background, border, facts, tags, or CTA styling.

New supporting homepage projects must be added through the selected-work data source and
rendered with the shared component. Do not create project-specific supporting-card JSX or
duplicate its CSS.
