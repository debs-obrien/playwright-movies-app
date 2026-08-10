# Testing guide

This repo is a teaching project for Playwright. Work through [learn/](../learn/index.md) for the hands-on path. House style for humans and agents: [`AGENTS.md`](../AGENTS.md). AI tools: [AI-TESTING.md](./AI-TESTING.md).

## Learning path (mapped to labs)

| Step | Concept | Lab / where to look |
|------|---------|---------------------|
| 0 | Agent-first course loop | [Lab 00](../learn/00-start-here.md), **learn-lab-coach** skill |
| 1 | Config, projects, `webServer`, workers | [Lab 01](../learn/01-overview.md), [`playwright.config.ts`](../playwright.config.ts) |
| 2 | First agent-written test + `.env` | [Lab 02](../learn/02-first-test.md) |
| 3 | Locators + web-first + ARIA | [Lab 03](../learn/03-aria-snapshots.md); “Web-first assertions” below |
| 4 | UI Mode, traces | [Lab 04](../learn/04-debugging.md) |
| 5 | Auth setup + `storageState` | [Lab 06](../learn/06-auth-setup.md), `login.setup.ts` |
| 6 | `beforeEach` / fixtures / helpers | [Lab 07](../learn/07-fixtures-helpers.md), `manage-lists-*` |
| 7 | Network mocking + API `request` | [Lab 08](../learn/08-network-and-api.md) |
| 8 | Isolation (`workers: 1`, mock reset) | Config + `base-test.ts` |
| 9 | AI writing path (plan → heal) | [Lab 09](../learn/09-ai-writing-path.md), [AI-TESTING.md](./AI-TESTING.md) |

## Suite map

### Canonical teaching files

| File | What it teaches |
|------|-----------------|
| `tests/logged-in/manage-lists-before-each.spec.ts` | Shared `beforeEach` with multiple tests in one file |
| `tests/logged-in/manage-lists-fixtures.spec.ts` | `listPage` fixture, `test.step`, ARIA snapshots |
| `tests/helpers/list-test.ts` | `listTest` + `listPage` seeded list |
| `tests/helpers/list-utilities.ts` | Reusable flow helpers (`createList`, `addMovie`, …) |
| `tests/helpers/base-test.ts` | Auto mock-API reset for logged-in tests |

### Logged-out examples (`tests/logged-out/`)

| File | Concepts |
|------|----------|
| `auth.spec.ts` | Login/logout UI |
| `search.spec.ts` | Search + ARIA snapshots |
| `sort-by.spec.ts` | Sorting UI + `page.route` JSON fixtures |
| `movie.spec.ts` / `movie-list.spec.ts` | Detail pages, snapshots |
| `navigation.spec.ts` | Menus, genres, viewport |
| `pagination.spec.ts` | Pagination |
| `api.spec.ts` | `request` against the mock TMDB API |
| `dark-mode.spec.ts` | Theme switching |

### Logged-in coverage

| Path | Role |
|------|------|
| `tests/logged-in/login.setup.ts` | Auth project → `storageState` |
| `manage-lists-*.spec.ts` | **Style guide** for list tests |
| Other `*.spec.ts` | Broader / `@agent` feature coverage — not the primary style guide |

## Fixtures (current API)

Import `listTest` when you need a seeded list:

```typescript
import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test('example', async ({ listPage }) => {
  const page = listPage;
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
```

| Fixture | Page state | Use when |
|---------|------------|----------|
| `listPage` | List + movies + cover, on View List | Edit, share, view, add/remove from a ready list |

Logged-in tests also get `_resetMockApi` from `base-test` (auto). `workers: 1` avoids races on the mock list store.

Helpers: `createList`, `addMovie`, `openLists`, and related functions in `list-utilities.ts`.

## Web-first assertions

```typescript
await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`...`);
```

Avoid `waitForTimeout`, `force: true`, and synchronous `.count()` for waiting. Use `expect(locator).toHaveCount(n)`.

Use `test.step` so traces stay readable. Prefer `expect.soft` only when you intentionally want multiple assertions before failing.
