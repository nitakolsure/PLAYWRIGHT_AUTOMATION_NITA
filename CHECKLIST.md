# Framework document checklist

Mapped to the 19-section table of contents. Java, BDD, and cloud grids are **out of scope**.

| # | Topic | Status | Notes |
|---|---|---|---|
| 1 | Playwright foundations | Done | Projects, fixtures, `request` vs `page`. |
| 2 | Architecture, components, fixtures | Done | POM, `core/BasePage`, `fixtures/test.ts`, `utils/`. |
| 3 | Locators, ARIA, assertions | Partial | Role locators used widely; no axe suite. |
| 4 | Waits, retries, flaky tests | Done | Store API waits, CI retries, cart row **counts**. |
| 5 | Parallelism, isolation, browsers | Done | Unique users, cart `clear()`, Chromium/Firefox/WebKit. |
| 6 | Test data and dependencies | Done | `data/`, setup → `storageState` for store. |
| 7 | Network mocks / stubs | Out of scope (core) | Real APIs only. |
| 8 | API testing | Done | Posts and users GET/POST; no UI+API chain in core. |
| 9 | Auth and session | Done | `tests/auth.setup.ts`. Multi-origin SSO not in this app. |
| 10 | Screenshot, video, trace, reporting | Done | HTML + JUnit; artifacts in GitHub Actions. |
| 11 | BDD / Cucumber / Gherkin | Out of scope | Playwright specs only. |
| 12 | CI/CD, Docker, cloud grids | Partial | GitHub Actions is the runner. `Jenkinsfile` unused. No BrowserStack. |
| 13 | TypeScript | Done | `tsconfig`, ESLint, typed page objects. |
| 14 | Java | Out of scope | This repo is TypeScript. |
| 15 | Advanced / debug drills | Partial | Order flow and dialogs; use `--debug` / `--ui` locally. |
| 16 | Security, performance, a11y | Partial | Prod URL guard, `.env` ignored. No Lighthouse/axe. |
| 17 | AI agents / MCP | Out of scope | Not in this repo. |
| 18 | Architecture / stakeholders | Done | README coverage of layers and gates. |
| 19 | Anti-patterns / checklist | Done | This file. Avoid sleeps; wait on APIs; no prod URLs. |
