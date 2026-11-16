---
name: write-test-cases
description: Designs structured test cases from user scenarios for this Playwright TypeScript repo. Use when the user asks to write test cases, Gherkin, Given/When/Then, or a test plan before scripting.
---

# Write test cases

Turn a scenario into cases, then add or update Gherkin under `features/`. Keep Playwright specs in `tests/` in sync when asked.

## Workflow

1. Restate the feature (Demoblaze UI, Playwright docs, JSONPlaceholder API).
2. Split: happy path, negative, boundary.
3. Tag: `@smoke`, `@regression`, `@e2e`, plus `@ui`/`@api`/`@store`/`@docs`.
4. Output a table, then a `.feature` file.

## Rules

- One behavior per scenario.
- IDs: `TC-UI-…` / `TC-API-…`.
- Cart: empty first; assert row counts.
- API: status and JSON shape.
- No Java, Maven, or production URLs.

If the user wants automation, follow `write-playwright-scripts`.
