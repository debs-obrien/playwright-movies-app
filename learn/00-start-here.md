# 00 Start here

## Goal

Understand how this course works, what we skip, and how to practice with the Movies app and Playwright.

## Before you run tests

Browse the [live demo app](https://debs-obrien.github.io/playwright-movies-app/) anytime. To run Playwright yourself, [clone the repository](https://github.com/debs-obrien/playwright-movies-app) and run:

```bash
git clone https://github.com/debs-obrien/playwright-movies-app.git
cd playwright-movies-app
npm install
npx playwright install chromium
cp .env.example .env
```

The mock API accepts any username and password in `.env`.

## Read first

- [Playwright intro](https://playwright.dev/docs/intro)
- [Course home](/course) for the full agenda

## How we teach

1. **Official docs** own concepts (locators, assertions, config theory).
2. **Modules here** apply those ideas to the Movies app and mock API.
3. Each module has a goal, short examples on the page, and key takeaways.
4. Concepts stay on [playwright.dev](https://playwright.dev). This site is the practice guide.

We do not rewrite playwright.dev. We do not teach Codegen or an IDE Testing sidebar as the course path.

## Working with a coding agent (optional)

If you use Cursor, Claude Code, or similar on a local clone, invoke the **learn-lab-coach** skill and name the module (for example, "I'm on 01"). The agent can run commands and open source files for you. That workflow is optional; you can follow these pages on your own too.

When writing or fixing tests in an agent, use the **movies-playwright** skill plus official **playwright-cli** and **playwright-trace** skills from the repo.

## Tooling reference

| Task | Command |
|------|---------|
| App + mock (local) | `npm run dev` |
| Run tests | `npx playwright test` |
| Interactive debug | `npx playwright test --ui` |
| Explore the app | `npx playwright cli` |
| Live demo (no install) | [Movies app on GitHub Pages](https://debs-obrien.github.io/playwright-movies-app/) |

Ports **3000** (app) and **4000** (mock API) must be free locally, or let Playwright `webServer` start them during test runs. Keep `npm run dev` running while you explore with `npx playwright cli`; test runs do not require a separate `npm run dev` when `webServer` is configured.

## Done when

- You have a local clone with `npm install`, Chromium installed, and `.env` from `.env.example`.
- You opened the [course home](/course) and picked a path.

## Key takeaways

- Pick a path on the [course home](/course) (beginner, intermediate, or AI-first).
- Clone the repo when you want to run tests or edit specs.
- Full source for tests and the app is on [GitHub](https://github.com/debs-obrien/playwright-movies-app).

Next: [01 Overview](/01-overview).
