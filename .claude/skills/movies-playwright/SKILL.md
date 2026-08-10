---
name: movies-playwright
description: >-
  Write, edit, generate, or heal Playwright tests in the playwright-movies-app
  repo. Use for list fixtures, house style, explore-then-test with playwright-cli,
  and evidence-based healing. Do not use Codegen or IDE Testing UI as the path.
---

# Movies app — Playwright house style

Policy for this repository. Depth: `docs/TESTING.md`, `docs/AI-TESTING.md`, `AGENTS.md`.

## Style contract

- Locators: `getByRole`, `getByLabel`, `getByText` with accessible names. Not CSS/XPath as primary.
- Assertions: web-first (`toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`, `toMatchAriaSnapshot`).
- Forbidden: `waitForTimeout`, `force: true`, `waitForLoadState('networkidle')`, sync `.count()` for waits.
- List flows: `tests/helpers/list-utilities.ts` (`createList`, `addMovie`, `openLists`, …).
- Seeded list: `listPage` via `listTest` from `tests/helpers/list-test.ts`.
- Prefer `test.step` for multi-step flows.
- Generated coverage: tag `@agent`. **Learn style from** `manage-lists-before-each.spec.ts` / `manage-lists-fixtures.spec.ts`, not from dense `@agent` files.
- Do **not** use Playwright Codegen / test recorder. Explore with the `playwright-cli` skill, then write idiomatic tests.

## Explore → draft

1. Load the official `playwright-cli` skill.
2. Drive the app (`open` / `snapshot` / click / fill). Prefer role-based targets.
3. Draft or update a test that matches this skill and `AGENTS.md`. **Do not paste CLI-emitted TypeScript verbatim** — rewrite to role locators, helpers, and house style.
4. Run with `npx playwright test` (set `PLAYWRIGHT_HTML_OPEN=never` when appropriate).

## Rewrite (raw agent output → house style)

When cleaning generated tests:

- Match `manage-lists-*` patterns and helpers / `listPage`.
- Keep `@agent` tags if this is generated coverage.
- Remove brittle waits; add `test.step` where it helps traces.

## Heal (evidence first)

1. Prefer the official `playwright-trace` skill (or UI Mode error snapshot) before changing locators.
2. State observed vs expected in one short paragraph.
3. Fix test or app with role/label locators and web-first asserts.
4. Re-run. `test.fixme()` only if the product is wrong, with observed vs expected in a comment.

## Review rubric

Before landing a test, check `docs/AI-TESTING.md#review-rubric-every-ai-written-test` (role locators, web-first asserts, no brittle waits, helpers/fixtures, trace evidence, seed/setup language for this repo).
