# 07 — beforeEach, fixtures, and helpers

## Goal

Compare shared `beforeEach` setup with list fixtures, and reuse helpers instead of pasting UI flows.

## Read first

- [Fixtures](https://playwright.dev/docs/test-fixtures)
- **movies-playwright** skill
- Canonical files (ask your agent to compare them):
  - [`manage-lists-before-each.spec.ts`](../tests/logged-in/manage-lists-before-each.spec.ts)
  - [`manage-lists-fixtures.spec.ts`](../tests/logged-in/manage-lists-fixtures.spec.ts)
  - [`list-fixtures.ts`](../tests/helpers/list-fixtures.ts)
  - [`list-utilities.ts`](../tests/helpers/list-utilities.ts)

## Study both styles

1. [] beforeEach file: setup creates a list and opens My Lists for every test.
2. [] Fixtures file: tests import `test` from `list-fixtures` and request the lightest fixture (`emptyListPage`, `listWithMoviesPage`, or `listPage`).
3. [] Helpers wrap `test.step` for readable traces.

This repo prefers **helpers + fixtures** over a heavy Page Object layer.

## Practice

1. [] Ask your agent (with **movies-playwright**) to create a scratch spec under `tests/logged-in/` that:
   - Imports `test` from `../helpers/list-fixtures`
   - Uses `{ listPage }`
   - Edits the list name (short version of the fixtures edit test)
2. [] Run it with `--project="logged-in chrome"`.
3. [] Compare with [`learn/solutions/07-fixture-edit.spec.ts`](./solutions/07-fixture-edit.spec.ts); delete or keep the scratch file.

**Honest note:** `list-fixtures.ts` exposes three optional seeds. Request only the lightest fixture the scenario needs.

## Check-in

- [] You know when to reach for `listPage` vs `listWithMoviesPage` vs `beforeEach`
- [] New test imports from helpers / `list-fixtures`, not duplicated login or list-create clicks
- [] Assertions stay web-first

Next: [Lab 08 — Network and API](./08-network-and-api.md).
