---
description: explore a flow with playwright-cli
---

Using **playwright-cli** (bundled: `npx playwright cli`), explore the movies list “add movie by search” flow on http://127.0.0.1:3000/ (assume `npm run dev` or Playwright webServer is up).

1. Open the app headed if useful; take snapshots between steps.
2. Prefer role selectors (`role=button[name=…]`) when clicking.
3. Optionally `tracing-start` before the flow and `tracing-stop` after.
4. Draft one idiomatic Playwright test that matches `manage-lists-fixtures.spec.ts` style: import from `list-fixtures`, use `listWithMoviesPage` or `emptyListPage`, reuse `addMovie` if appropriate, web-first asserts.
5. Do not invent CSS-heavy locators. Read `AGENTS.md` if unsure.
