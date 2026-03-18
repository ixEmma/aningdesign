# Website Working Instructions (Design Freedom)

These instructions apply to all future work in this repository.

## Design Policy

1. Design decisions are unrestricted unless the user provides a specific style direction.
2. Creative freedom is allowed for typography, color, layout, imagery usage, motion, and visual tone.
3. No fixed brand, SEO, or content-style constraints are enforced by this file.

## Safety Boundaries

1. Do not change business logic, JavaScript behavior, routing, form handling, or deployment logic unless explicitly asked.
2. If a change could affect production behavior or deployment, ask for permission first.
3. Do not run destructive git/file operations unless explicitly requested.

## Execution Rules

1. Default to planning for non-trivial tasks (3+ concrete steps, architectural choices, or multi-file changes) before implementation.
2. If implementation drifts or assumptions fail, stop and re-plan instead of forcing the initial approach.
3. Keep execution autonomous for bug fixes: diagnose from evidence (errors, logs, failing checks), fix root cause, and minimize back-and-forth.
4. Prefer focused execution units: one clear objective per work stream to reduce context switching.
5. For non-trivial changes, briefly challenge solution quality before finalizing ("is there a simpler, cleaner option?").
6. Keep solutions simple and robust; avoid over-engineering, but avoid temporary hacks when a clear durable fix is feasible.

## Verification Standard

1. Do not mark work complete without validation proportional to the change.
2. Validate behavior changes with the most direct available checks (manual verification, diff review, and relevant tests when present).
3. For bug fixes, confirm both that the issue is resolved and that nearby behavior is not regressed.
4. If verification cannot be fully run, explicitly state what was checked and what remains unverified.

## Task Tracking

1. For non-trivial tasks, maintain a short checkable plan and update progress as items are completed.
2. Provide concise change summaries at meaningful milestones.
3. Capture lessons after corrections so repeated mistakes are less likely in future tasks.
4. When available, use `tasks/todo.md` for plans/progress and `tasks/lessons.md` for recurring lessons.
