# 01 — Overview, project structure, and first test

## Goal

Orient to the repo, start the Movies app, and run an existing Playwright test from the CLI or UI Mode.

## Read first

- [Test configuration](https://playwright.dev/docs/test-configuration)
- Ask your agent to summarize [`playwright.config.ts`](../playwright.config.ts) (or peek at the file)

## Project structure

1. [] Ask your agent (or skim yourself) where these live:

- **`movies-app/`** — Next.js app under test
- **`mock-api/`** — local TMDB-compatible API (port 4000)
- **`tests/logged-out/`** — guest tests (no saved auth)
- **`tests/logged-in/`** — tests that depend on the `setup` project + `storageState`
- **`tests/helpers/`** — shared helpers and fixtures (`list-utilities`, `list-test`, `base-test`)
- **`playwright.config.ts`** — projects, `webServer`, `baseURL`, traces

## Start the app

1. [] Have the agent run `npm run dev`, or run it in a terminal.
2. [] Open [http://127.0.0.1:3000](http://127.0.0.1:3000) and confirm the Movies UI loads.

You can skip this when running tests: Playwright starts mock + app via `webServer` in config.

## Run your first test

1. [] Run (agent or terminal):

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --project=chromium
```

   Or UI Mode: `npx playwright test tests/logged-out/movie-list.spec.ts --ui`.

2. [] Note what the test asserts (ARIA snapshot, rating, navigation). Ask the agent to explain the file if useful.

## What’s happening

Playwright launches a browser, drives the UI like a user, and uses **web-first assertions** that retry until timeout. Config sets `baseURL` to `http://127.0.0.1:3000/` so tests can `page.goto('')` or paths like `'/?category=Top+Rated&page=1'`.

## Check-in

You should be able to:

- [] Explain where app code, mock API, and tests live
- [] Run the app locally
- [] Run `movie-list.spec.ts` successfully
- [] Point to `webServer`, `projects`, and `workers: 1` in config (see [Testing guide](../docs/TESTING.md))

Next: [Lab 02 — First test](./02-first-test.md).
