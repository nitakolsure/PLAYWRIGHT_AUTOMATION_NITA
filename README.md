# Playwright automation

TypeScript Playwright framework for the Playwright docs site, Demoblaze store, and JSONPlaceholder API.

This repo follows a layered layout (page objects, API clients, fixtures, config, utilities). Java, Cucumber/BDD, and cloud browser grids are out of scope.

## Folders

| Folder | Role |
|---|---|
| `tests/` | Specs only. Tags: `@smoke`, `@regression`, `@e2e`. |
| `pages/` | Page objects. They extend `core/BasePage`. |
| `api/` | HTTP clients (`PostsApi`, `UsersApi`). |
| `fixtures/` | Builds page and API objects for each test. |
| `data/` | Users, catalog names, order form values. |
| `config/` | Environment URLs and auth file paths. |
| `utils/` | Shared helpers (dialogs, Demoblaze API waits). |
| `core/` | `BasePage` shared by UI pages. |
| `.github/workflows/` | GitHub Actions (the pipeline that actually runs). |

`Jenkinsfile` is optional. There is no company Jenkins in this project; use GitHub Actions.

## Setup

```powershell
npm install
npx playwright install
copy .env.example .env
```

`TEST_ENV` must be `qa` or `stage`. Hosts named `prod` or `production` fail the run. Do not commit `.env`.

## Commands

| Command | What it runs |
|---|---|
| `npm run test:smoke` | Chromium + API tests tagged `@smoke` |
| `npm run test:ui` | Chromium UI tests |
| `npm run test:api` | API project |
| `npm run test:store` | Signed-in Demoblaze order tests |
| `npm test` | All projects |
| `npm run typecheck` | TypeScript |
| `npm run lint` | ESLint |
| `npm run report` | HTML report |

## Projects

- **chromium / firefox / webkit** — UI except checkout.
- **api** — JSONPlaceholder; no browser.
- **setup** — signs up a Demoblaze user and saves `storageState`.
- **store** — order tests using that session.

## Reporting

Failed tests keep a screenshot and a video. A retry keeps a trace. Each run writes:

- `playwright-report/` — HTML
- `test-results/junit.xml` — JUnit for CI dashboards

## CI

On a **pull request**: typecheck, lint, then `@smoke` (Chromium + API).

On a **push to `main`**: typecheck, lint, then Chromium, Firefox, WebKit, API, and store.

See `CHECKLIST.md` for how this maps to the framework document.
