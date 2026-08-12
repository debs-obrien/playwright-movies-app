# 01 Overview, project structure, and first test

## Goal

Orient to the repository layout, start the Movies app, and run an existing Playwright test from the CLI or UI Mode.

## Read first

- [Test configuration](https://playwright.dev/docs/test-configuration)

## Project structure

| Path | Role |
|------|------|
| `movies-app/` | Next.js app under test |
| `mock-api/` | Local TMDB-compatible API (port 4000) |
| `tests/logged-out/` | Guest tests (no saved auth) |
| `tests/logged-in/` | Tests that use the `setup` project and `storageState` |
| `tests/helpers/` | Shared helpers and fixtures |
| `tests/pages/` | Optional POM teaching example (logged-out search only) |
| `playwright.config.ts` | Projects, `webServer`, `baseURL`, traces |

## Config highlights

Playwright starts the mock API and app for you, sets a shared `baseURL`, and keeps `workers: 1` because the mock list store is process-global:

```typescript
export default defineConfig({
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:3000/',
    trace: 'on-first-retry',
  },
  webServer: [
    { command: 'npm run mock', url: 'http://127.0.0.1:4000', reuseExistingServer: !process.env.CI },
    { command: 'npm run dev:app', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI },
  ],
  projects: [
    { name: 'setup', testMatch: /login\.setup\.ts/ },
    { name: 'logged-in chrome', dependencies: ['setup'], use: { storageState: STORAGE_STATE } },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

## Start the app (local clone)

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) or use the [hosted demo](https://debs-obrien.github.io/playwright-movies-app/). When running tests, `webServer` in config can start servers for you.

## Example: first green test

`movie-list.spec.ts` opens a category page, asserts an ARIA snapshot on the first movie, and walks into the detail page:

```typescript
test('The Dark Knight is the first top rated movie', async ({ page }) => {
  await page.goto('/?category=Top+Rated&page=1');

  const firstMovie = page.getByRole('listitem', { name: 'movie' }).first();

  await expect(firstMovie).toMatchAriaSnapshot(`
    - 'link /The Dark Knight/':
      - 'img "poster of The Dark Knight"'
  `);

  await firstMovie.click();
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - 'heading "The Dark Knight" [level=1]'
    - heading "The Synopsis" [level=3]
  `);
});
```

Run it:

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --project=chromium
```

Or open UI Mode:

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --ui
```

## What is happening

Playwright launches a browser, drives the UI like a user, and uses **web-first assertions** that retry until timeout. `baseURL` lets tests call `page.goto('')` or short paths like `'/?category=Top+Rated&page=1'`.

## Done when

- `movies-app/`, `mock-api/`, `tests/`, and `playwright.config.ts` are where you expect.
- `npm run dev` serves the app on port 3000 (or you used the hosted demo).
- This passes:

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --project=chromium
```

## Key takeaways

- Know where app code, mock API, and tests live in the repo.
- Run the app locally or use the hosted demo.
- Run `movie-list.spec.ts` successfully on a clone.
- Find `webServer`, projects, and `workers: 1` in config (see [Testing guide](/docs/TESTING)).

Next: [02 First test](/02-first-test).
