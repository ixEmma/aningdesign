# AningDesign Button System

The shared source of truth is `src/styles/globals.css`. Use the global `aning-button` utility classes with the project’s existing React Router links, external-link helpers, or native buttons. Do not recreate primary-button styling in page CSS.

## Tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--aning-green` | `#00fb64` | Primary gradient start |
| `--aning-cyan` | `#00c9ff` | Primary gradient end |
| `--aning-button-ink` | `#05120a` | Primary text and icon |
| `--aning-button-radius` | `15px` | Default button radius |
| `--aning-button-radius-large` | `18px` | Large button radius |
| `--aning-button-focus` | `#90f8ff` | Focus-visible outline |

## Variants

### Primary

Use `aning-button aning-button--primary` for the one main conversion action in a cluster: `Start a Project`, `Contact Us`, `Choose an Edition`, `Get the Ebook`, or `Get the Complete Package`.

It uses the locked green-to-cyan gradient, dark ink, a restrained glow, and clear hover, active, and focus-visible states. Default height is 48px.

```jsx
<Link to="/contact" className="aning-button aning-button--primary">
  Contact AningDesign
  <ArrowRight size={17} aria-hidden="true" />
</Link>
```

### Secondary

Use `aning-button aning-button--secondary` for a genuinely different, lower-priority next step. It has a dark transparent surface, restrained pale-green border, and no competing filled treatment.

### Text link

Use `aning-button aning-button--text` for low-priority actions. It has no filled background. Pair it with Lucide `ArrowRight` when an arrow improves the action.

## Sizes and behavior

`aning-button` is the default size: 48px minimum height, 12px by 22px padding, and a 15px radius. Add `aning-button--large` for hero actions: 56px minimum height, 16px by 28px padding, and an 18px radius.

All shared buttons keep a visible focus outline and support `disabled` or `aria-disabled="true"`. Their minimum height is above the 44px mobile target.

## Icon and link rules

Use a real Lucide `ArrowRight` icon for directional button actions. Never use a text arrow character when Lucide is available. Keep visible labels descriptive and let existing link helpers handle external `target` and `rel` attributes.

## Do not

- Use `#9af7a3` as a filled primary CTA background.
- Add a page-specific primary-button class, gradient, radius, or shadow.
- Make secondary actions look as prominent as the primary CTA.
- Use a full pill for normal CTA buttons.
- Replace the shared focus-visible state with an invisible focus treatment.

New visual variants require Emmanuel’s explicit approval.
