# Agent guide (humans and AI)

House style for Playwright work in this repository. Full learning path: [`docs/TESTING.md`](docs/TESTING.md). AI tool choice (CLI, traces, MCP, test agents): [`docs/AI-TESTING.md`](docs/AI-TESTING.md).

## Preferred tool path

1. **Coding agents writing or fixing tests:** `npx playwright cli` (+ skills) and **traces** when debugging.
2. **Structured coverage:** Playwright test agents — planner → generator → healer (see `.github/agents/` and `.github/prompts/`).
3. **MCP:** use for persistent explore / official agent tool loops; not required for every small edit.
4. Regenerate agent definitions and skills after Playwright upgrades: `npx playwright init-agents`, `npx playwright init-skills`.

## Style contract

- Locators: `getByRole`, `getByLabel`, `getByText` with accessible names. Avoid CSS/XPath as the primary strategy.
- Assertions: web-first (`toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`, `toMatchAriaSnapshot`).
- Forbidden: `waitForTimeout`, `force: true`, `waitForLoadState('networkidle')`, sync `.count()` for waits.
- List tests: import `test` / `expect` from `tests/helpers/list-fixtures.ts` and request the **lightest** fixture (`emptyListPage` → `listWithMoviesPage` → `listPage`).
- Reuse `tests/helpers/list-utilities.ts` (`createList`, `addMovie`, `openLists`, `selectCoverImage`, …).
- Prefer `test.step` for multi-step flows so traces stay readable.
- Generated suites: tag with `@agent`. Learn style from `manage-lists-*`, not from dense `@agent` coverage.
- Seeds and plans must reference `tests/logged-in/seed.spec.ts` and `list-fixtures` — not deprecated `list-test.ts`.

## Healing

- Inspect a **trace** or live snapshot before changing locators.
- Prefer fixing the test or app over skipping.
- `test.fixme()` only with a comment of observed vs expected behavior when the product is wrong.

## Review checklist

See the rubric in [`docs/AI-TESTING.md`](docs/AI-TESTING.md#review-rubric-every-ai-written-test).
