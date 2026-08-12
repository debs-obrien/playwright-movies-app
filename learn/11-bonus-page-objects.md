# 11 Bonus: Page Object Model

## Goal

See classic Page Object Model next to this repo's default helpers, without rewriting the suite.

## Read first

- [Page object models](https://playwright.dev/docs/pom)
- [Helpers vs Page Objects](/docs/TESTING#helpers-vs-page-objects)

This page is **optional**. New tests in this repo still use helpers and list fixtures ([07 Fixtures](/07-fixtures-helpers)). Playwright's own docs also lean on locators and fixtures. We keep one POM example because many QA teams (and video/AI demos) live in that pattern.

## Same search, two styles

Logged-out search is the comparison surface: no auth, no list fixtures, two clear paths (Twisters and empty state).

| Style | Where |
|-------|--------|
| Local helper (default for this flow) | `tests/logged-out/search.spec.ts` |
| Classic page object | `tests/pages/search-page.ts` + `tests/logged-out/lessons/pom-search.spec.ts` |

Open both specs. The checks match: URL, scoped result under `main`, ARIA snapshot on the movie page or empty state, then Home from empty results.

The page object is **one class on purpose**. Opening a movie leaves the results list; a fuller POM would split `SearchPage` and a movie-detail page. This example stays small so it is easy to film.

Assertions stay in the spec. The page object holds locators and actions (`gotoHome`, `searchForMovie`, `movieResult`, `openMovie`, `goHomeFromEmptyState`).

Do **not** POM list flows. Lists stay on `list-utilities.ts` and `list-fixtures.ts`.

## Practice on a clone

```bash
npx playwright test tests/logged-out/search.spec.ts --project=chromium
npx playwright test tests/logged-out/lessons/pom-search.spec.ts --project=chromium
```

## Done when

Both commands pass, and you can explain: helpers/fixtures are house style here; the POM files are the comparison example for teams that already use page objects.

## Key takeaways

- Classic POM: `new SearchPage(page)`, locators on the class, actions as methods.
- This repo's default is still helpers + fixtures.
- One logged-out search example is enough; do not convert the suite.

Back to the [course home](/course).
