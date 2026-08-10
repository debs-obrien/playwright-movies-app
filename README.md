# Playwright Movies App

Hands-on guide to end-to-end testing with [Playwright](https://playwright.dev/) on a demo Movies app (Next.js). Covers authentication, search, sorting, API and network mocking, ARIA snapshots, fixtures/helpers, and **AI-assisted** workflows — taken from a **coding agent**, not an IDE Testing UI or Codegen.

Movie data and login come from the local **TMDB mock API** in [`mock-api/`](mock-api/) (no cloud account required for login). Images may still load from [TMDB](https://www.themoviedb.org/). Fork of [next-movies](https://github.com/tastejs/next-movies), customized for learning.

![Playwright Movies App](movies-app-ui-mode.jpg)

## Start here — Learn

1. Clone, `npm install`, `npx playwright install chromium`, copy `.env.example` → `.env`.
2. Open this repo in **Cursor, Claude Code, Codex, or similar**.
3. Say **“Use the learn-lab-coach skill — I’m on Lab 00.”** (or `@learn-lab-coach` in Cursor) or open [`learn/00-start-here.md`](learn/00-start-here.md).

| Resource | Path |
|----------|------|
| **Labs** | [`learn/`](learn/index.md) |
| **Browse locally** | `npm run docs:dev` |
| **Published docs** | `/learn` on [GitHub Pages](https://debs-obrien.github.io/playwright-movies-app/learn/) (after deploy) |
| **Skills** | `.agents/skills/movies-playwright`, `learn-lab-coach` (+ official `playwright-cli`, `playwright-trace`) |
| **Reference** | [`docs/TESTING.md`](docs/TESTING.md), [`docs/AI-TESTING.md`](docs/AI-TESTING.md) |
| **House style** | [`AGENTS.md`](AGENTS.md) |

Workshop structure inspired by [Build 2025 Lab 304](https://github.com/microsoft/Build25-LAB304). This fork is agent-first. Wiki deprecated: [`docs/WIKI.md`](docs/WIKI.md).

## Installation

```bash
git clone https://github.com/debs-obrien/playwright-movies-app.git
cd playwright-movies-app
npm install
npx playwright install chromium
```

`npm install` also builds the mock API.

## Environment setup for login tests

```bash
cp .env.example .env
```

The mock accepts any username and password.

## Running the app locally

Make sure ports **3000** (Next.js) and **4000** (mock API) are available.

* `npm run dev` — mock API and Movies app together
* `npm run mock` — mock API only (after `npm run mock:build`)
* `npm run build` / `npm run start` — production Movies app build

The app talks to `NEXT_PUBLIC_TMDB_API_BASE_URL` (default `http://127.0.0.1:4000`).

### Deploying the mock API (Cloudflare Workers)

From `mock-api/`:

```bash
npx wrangler login
npm run deploy
```

See [`mock-api/README.md`](mock-api/README.md) for CI secrets and updating the Pages build URL.

## Running tests

```bash
npx playwright test --ui
```

Playwright starts both the mock API and the app via `webServer`. Prefer CLI / UI Mode from your agent; you do not need an IDE Testing extension for this course.

## License

[MIT](https://choosealicense.com/licenses/mit/)
