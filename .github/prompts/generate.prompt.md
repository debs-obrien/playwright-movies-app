---
description: creates the tests
agent: 🎭 generator
---

Create a test for each scenario in section 6 of `specs/movies-list-plan.md`.

- Save each scenario in its own file under `tests/logged-in/` (one describe + one test per file is fine; we may consolidate by feature later).
- Tag each describe with `@agent`.
- Prefer fixtures from `tests/helpers/list-fixtures.ts` (`emptyListPage`, `listWithMoviesPage`, `listPage`) and helpers from `list-utilities.ts`.
- Use `getByRole` / `getByLabel` and web-first assertions only — no CSS `page.click`, `waitForTimeout`, or `force: true`.
- Add step comments matching the plan; assert expected results.
- Self-check against `AGENTS.md` and the review rubric in `docs/AI-TESTING.md` before finishing.
