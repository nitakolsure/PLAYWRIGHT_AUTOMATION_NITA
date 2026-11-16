# Playwright TypeScript + Cucumber BDD

This repo is **TypeScript only**. Java and Maven were removed.

Two runners share the same page objects, API clients, data, and config:

| Runner | Command | What it is |
|---|---|---|
| Playwright Test | `npx playwright test` | Specs in `tests/**/*.spec.ts` |
| Cucumber (TypeScript) | `npm run bdd` | Gherkin in `features/` + steps in `cucumber/` |

## Folders

| Path | Role |
|---|---|
| `tests/` | Playwright Test specs |
| `features/` | Cucumber `.feature` files |
| `cucumber/support/` | World + hooks (Playwright browser/API) |
| `cucumber/steps/` | Step definitions that call existing `.ts` pages/API |
| `pages/`, `api/`, `data/`, `config/`, `utils/`, `core/` | Shared automation layer |
| `cucumber.ts` | Cucumber runner config (loaded via `cucumber.cjs`) |

## Commands

```powershell
npm install
npx playwright install
npm run bdd:smoke
npm run bdd
npx playwright test
```

| Script | Runs |
|---|---|
| `npm run bdd` | All Cucumber features |
| `npm run bdd:smoke` | `@smoke` |
| `npm run bdd:api` | `@api` |
| `npm run bdd:ui` | `@ui` |
| `npm test` | Playwright Test (all projects) |

Cucumber HTML report: `reports/cucumber-report.html`.
