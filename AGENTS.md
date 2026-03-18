# Repository Agent Rules (React + CSS)

These rules apply to all future work in this repository.

## Tech Stack

1. Frontend stack: React components (`.jsx`) with CSS files (`.css`) and inline scoped `<style>` blocks when requested.
2. Keep implementation aligned with existing project patterns in `src/components`.
3. No external UI libraries unless explicitly requested.

## Scope and Safety

1. Do not change routing, deployment, environment config, or backend logic unless asked.
2. Do not run destructive git/file commands unless explicitly requested.
3. Preserve existing UX/content unless the user requests changes.

## Execution Style

1. Execute directly for clear tasks; avoid unnecessary planning overhead.
2. For non-trivial tasks, keep plans short and actionable.
3. Make focused, minimal edits that solve the request without collateral changes.
4. If accidental unrelated changes are detected, stop and ask before proceeding.

## Verification Rules

1. Always validate nearby UI/CSS impact after edits in components/styles.
2. Use fast, targeted checks (`rg`, selective `Get-Content`, focused diffs).
3. Summarize what was validated and what was changed.

## Command Autonomy

1. For routine read/write and verification commands in this repo, run them automatically without asking the user in chat first.
2. Batch related checks when possible.
3. Prefer parallel read/check commands when safe.
4. When the execution environment requires approval prompts, request them through the tool flow and continue automatically once approved.

## Preferred Command Patterns

Use these patterns frequently for this repository:

- `rg -n "<pattern>" src\\components\\Services.jsx -S`
- `Get-Content -Path src\\components\\Services.jsx -Raw`
- Numbered line spot checks with `$i=0; Get-Content ... | % { $i++; ... }`
- Focused verify checks after edits (title styles, spacing rules, CTA link wiring)

## UI Quality Standard

1. Keep headings readable (no text clipping/cut descenders).
2. Maintain responsive behavior for desktop/tablet/mobile.
3. Keep brand palette and gradients consistent when specified.
4. Avoid introducing formatting artifacts in source (e.g., literal `` `r`n `` text).
