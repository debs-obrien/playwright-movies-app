# 07 — beforeEach, fixtures, and helpers

## Goal

Compare shared `beforeEach` setup with the `listPage` fixture, and reuse helpers instead of pasting UI flows.

## Read first

- [Fixtures](https://playwright.dev/docs/test-fixtures)
- **movies-playwright** skill
- Canonical files (ask your agent to compare them):
  - [`manage-lists-before-each.spec.ts`](../tests/logged-in/manage-lists-before-each.spec.ts)
  - [`manage-lists-fixtures.spec.ts`](../tests/logged-in/manage-lists-fixtures.spec.ts)
  - [`list-test.ts`](../tests/helpers/list-test.ts)
  - [`list-utilities.ts`](../tests/helpers/list-utilities.ts)

## Study both styles

1. [] beforeEach file: setup creates a list and opens My Lists for every test.
2. [] Fixtures file: tests import `listTest as test` and take `{ listPage }` — seeded list with movies + cover on View List.
3. [] Helpers wrap `test.step` for readable traces.

This repo prefers **helpers + fixtures** over a heavy Page Object layer.

## Practice

1. [] Ask your agent (with **movies-playwright**) to create a scratch spec under `tests/logged-in/` that:
   - Imports `listTest as test` from `../helpers/list-test`
   - Uses `{ listPage }`
   - Edits the list name (short version of the fixtures edit test)
2. [] Run it with `--project="logged-in chrome"`.
3. [] Compare with [`learn/solutions/07-fixture-edit.spec.ts`](./solutions/07-fixture-edit.spec.ts); delete or keep the scratch file.

**Honest note:** today there is a single `listPage` seed in `list-test.ts`. Prefer that fixture when you need a seeded list; use `beforeEach` + helpers when each test needs different setup.

## Check-in

- [] You know when to reach for `listPage` vs beforeEach
- [] New test imports from helpers / `list-test`, not duplicated login or list-create clicks
- [] Assertions stay web-first

Next: [Lab 08 — Network and API](./08-network-and-api.md).
