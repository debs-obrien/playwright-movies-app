---
description: rewrite an @agent test onto fixtures
---

Pick one test from `tests/logged-in/lists/` tagged `@agent` that re-walks create/open flows on a raw `page`.

Rewrite it to:

- Import `test` / `expect` from `tests/helpers/list-fixtures.ts`
- Use the lightest fixture (`emptyListPage` | `listWithMoviesPage` | `listPage`)
- Reuse `list-utilities` where it removes duplication
- Keep or improve assertions (prefer ARIA snapshot where structure matters)
- Keep the `@agent` tag on the describe (or note it was rewritten for style)

Compare with `tests/logged-in/lessons/ai-raw-vs-idiomatic.spec.ts`. Do not weaken assertions.