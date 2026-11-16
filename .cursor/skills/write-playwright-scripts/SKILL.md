---
name: write-playwright-scripts
description: Implements Playwright TypeScript specs and Cucumber steps from scenarios using this repo's POM, fixtures, data, and cucumber runner. Use when the user asks to write a script, feature, or step definition.
---

# Write Playwright and Cucumber scripts

TypeScript only. Cucumber runner is `cucumber.ts` (loaded by `cucumber.cjs`). Shared code lives in `pages/`, `api/`, `data/`.

## Where code goes

| Need | Put it here |
|---|---|
| Gherkin | `features/**/*.feature` |
| Steps | `cucumber/steps/*.ts` using `CustomWorld` |
| Playwright spec | `tests/**/*.spec.ts` importing `fixtures/test.ts` |
| UI actions | `pages/` extending `core/BasePage` |
| HTTP | `api/` |
| Data | `data/` |

Reuse page objects from steps: `this.storePage()`, `this.postsApi()`. Do not duplicate selectors in step files.

Run `npm run bdd:smoke` or `npx playwright test` for the matching layer.
