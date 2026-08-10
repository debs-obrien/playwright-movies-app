# Testing guide

This repo is a teaching project for Playwright. Work through the [course home](/course) for the hands-on path. House style for humans and agents: [AGENTS.md](/AGENTS). AI tools: [AI-TESTING.md](/docs/AI-TESTING).

Clone the [repository on GitHub](https://github.com/debs-obrien/playwright-movies-app) to run tests. Try the [live demo app](https://debs-obrien.github.io/playwright-movies-app/) in the browser.

## Learning path (mapped to labs)

| Step | Concept | Module |
|------|---------|--------|
| 0 | Course loop | [00 Start here](/00-start-here), **learn-lab-coach** skill (local clone) |
| 1 | Config, projects, `webServer`, workers | [01 Overview](/01-overview) |
| 2 | First test and `.env` | [02 First test](/02-first-test) |
| 3 | Locators, web-first, ARIA | [03 ARIA snapshots](/03-aria-snapshots) |
| 4 | UI Mode, traces | [04 Debugging](/04-debugging) |
| 5 | Auth setup and `storageState` | [06 Auth setup](/06-auth-setup) |
| 6 | `beforeEach`, fixtures, helpers | [07 Fixtures](/07-fixtures-helpers) |
| 7 | Network mocking and API `request` | [08 Network and API](/08-network-and-api) |
| 8 | Isolation (`workers: 1`, mock reset) | Config and `base-test.ts` on GitHub |
| 9 | AI writing path | [09 AI path](/09-ai-writing-path), [AI testing](/docs/AI-TESTING) |
| 10 | Exercises | [Exercises](/docs/exercises/) ([GitHub](https://github.com/debs-obrien/playwright-movies-app/tree/main/docs/exercises)) |

Learn **style** from `manage-lists-*`. Treat `lists/*` as broader product coverage, not the primary style guide.

## Suite map

### Canonical teaching files

| File | What it teaches |
|------|-----------------|
| `tests/logged-in/manage-lists-before-each.spec.ts` | Shared `beforeEach` with multiple tests in one file |
| `tests/logged-in/manage-lists-fixtures.spec.ts` | Custom fixtures, `test.step`, ARIA snapshots |
| `tests/helpers/list-fixtures.ts` | Optional list fixtures on one `test` export (pick the lightest seed) |
| `tests/helpers/list-utilities.ts` | Reusable flow helpers (`createList`, `addMovie`, …) |
| `tests/logged-in/lessons/*.spec.ts` | Focused lessons (network abort, multi-tab, viewport, AI rewrite) |
| `tests/helpers/base-test.ts` | Auto mock-API reset for logged-in tests |

### Logged-out examples (`tests/logged-out/`)

| File | Concepts |
|------|----------|
| `auth.spec.ts` | Login/logout UI, permission gate |
| `search.spec.ts` | Search + ARIA snapshots |
| `sort-by.spec.ts` | Sorting UI + `page.route` JSON fixtures |
| `movie.spec.ts` / `movie-list.spec.ts` | Detail pages, links, mocking external sites |
| `navigation.spec.ts` | Menus, genres, `test.use({ viewport })` |
| `pagination.spec.ts` | Pagination |
| `api.spec.ts` | `request` against the mock TMDB API |
| `dark-mode.spec.ts` | Theme switching |
| `person.spec.ts` / `not-found.spec.ts` | Person page, 404 |

### Logged-in coverage

| Path | Role |
|------|------|
| `tests/logged-in/login.setup.ts` | Auth project dependency → `storageState` |
| `manage-lists-*.spec.ts` | **Style guide** for list tests |
| `tests/logged-in/lists/*.spec.ts` | `@agent` feature coverage (create, edit, delete, …) |
| Standalone `@agent` files | Distinct patterns: multi-list delete, private share + guest, auth gate |
| `tests/logged-in/seed.spec.ts` | Agent seed (skipped in normal runs) |

## Fixture tiers

List tests share mock-api state, so `playwright.config.ts` sets `workers: 1`. Each logged-in test resets the mock API via the `_resetMockApi` auto-fixture in `tests/helpers/base-test.ts`. Designing fixtures that own their data is how you unlock parallel workers later.

Import one `test` and request only the fixtures you need:

```typescript
import { expect, test } from '../../helpers/list-fixtures';

test('empty state', async ({ emptyListPage }) => { /* ... */ });
test('add a movie', async ({ listWithMoviesPage }) => { /* ... */ });
test('share a list', async ({ listPage }) => { /* ... */ });
```

| Fixture | Page state | Use when |
|---------|------------|----------|
| `emptyListPage` | New list, no movies, on Add/Remove | Empty-state UI, choose-image-without-movies |
| `listWithMoviesPage` | List + 3 movies, no cover, on Add/Remove | Add/remove/search/cover flows |
| `listPage` | Full seed: 3 movies, cover image, on View List | Edit, share, my-lists, navigation, view flows |

Helpers such as `createList`, `addMovie`, and `selectCoverImage` live in `tests/helpers/list-utilities.ts`.

## Web-first assertions

Prefer role- and label-based locators over CSS classes or DOM structure:

```typescript
await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`...`);
```

Avoid `waitForTimeout`, `force: true`, and synchronous `.count()` checks. Use `expect(locator).toHaveCount(n)` instead.

The movie add-item search UI exposes `role="status"`, `aria-busy`, and `aria-label="Movie search results"` so tests can wait on accessible signals instead of timers. Poster images in the dropdown use empty `alt` so button names stay as movie titles.

Use `test.step` to keep traces and reports readable. Prefer `expect.soft` only when you intentionally want multiple assertions before failing the test (see lessons).

## Guest / logged-out contexts

Auth tokens live in **localStorage**, not only cookies. For guest scenarios while logged-in setup exists, open a fresh context:

```typescript
const guestContext = await browser.newContext({
  storageState: { cookies: [], origins: [] },
});
const guestPage = await guestContext.newPage();
```

See `tests/logged-in/access-list-without-authentication.spec.ts` and `tests/logged-in/share-private-list.spec.ts`.

## Helpers vs Page Objects

This suite uses **flow helpers** (`list-utilities.ts`) and **fixtures** instead of classic Page Object classes. Helpers stay thin, compose with fixtures, and match how Playwright Test Agents generate steps. Reach for a Page Object only if a surface grows large enough that shared locators become noisy. Default here is helpers.

## Config notes worth learning

- **Projects**: `setup` → `logged-in chrome` (depends on setup + `storageState`); `chromium` for logged-out.
- **`webServer`**: starts mock API (`:4000`) and Next app (`:3000`).
- **`baseURL`**: `http://127.0.0.1:3000/` (avoid `localhost` / IPv6 mismatch with cookies).
- **Artifacts**: trace on first retry; screenshot/video on failure. Use Trace Viewer and UI Mode while learning.
- **Mobile projects** are commented in config; viewport lessons use `test.use({ viewport })` instead.

## `@agent` specs

Specs tagged `@agent` were generated by Playwright’s test planner/generator and consolidated under `tests/logged-in/lists/` by feature (create, edit, delete, add-movies, and so on).

A few flows stay as standalone files when they teach a distinct pattern: multi-list delete, private share + guest context, and the auth gate.

Generator runs may emit one file per scenario; this repo consolidates by feature afterward. Review and rewrite generated tests against the fixture/ARIA style in `manage-lists-*`. See [AI testing](/docs/AI-TESTING).

## Running tests

```bash
npx playwright test --ui          # interactive
npx playwright test tests/logged-in/lists   # list feature specs only
npx playwright test --grep @agent   # agent-generated coverage only
npx playwright test tests/logged-in/lessons # teaching lessons only
```

CI shards the suite across four machines. Each shard still uses one Playwright worker because the mock list store is process-global.
