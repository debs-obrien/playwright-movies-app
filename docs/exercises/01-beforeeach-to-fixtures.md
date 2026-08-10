# Exercise 01 — Convert beforeEach setup to fixtures

## Goal

Take a test that creates a list in `beforeEach` (or inline) and rewrite it to use the lightest fixture from `tests/helpers/list-fixtures.ts`.

## Steps

1. Read `tests/logged-in/manage-lists-before-each.spec.ts` and `manage-lists-fixtures.spec.ts`.
2. Copy one create/edit assertion into a new scratch file under `tests/logged-in/` (or edit locally without committing).
3. Replace manual `createList` / navigation with `emptyListPage`, `listWithMoviesPage`, or `listPage`.
4. Keep web-first assertions; drop any redundant setup.

## Done when

- The test imports `test` from `list-fixtures`.
- Setup is only the fixture you need.
- `npx playwright test <your-file>` passes.
