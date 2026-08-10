# Learn Playwright with the Movies app

Hands-on course on a real Next.js movies app with a local mock API. Official concepts live on [playwright.dev](https://playwright.dev/docs/intro). This site is where you practice.

Try the [live Movies app](https://debs-obrien.github.io/playwright-movies-app/) in the browser. [Clone the repository](https://github.com/debs-obrien/playwright-movies-app) when you want to run Playwright locally.

## Pick your path

| Path | Start at | Skim or skip |
|------|----------|--------------|
| **Beginner** | [01 Overview](/01-overview) | none |
| **Intermediate** | [05 Tags](/05-tags-annotations) or [06 Auth](/06-auth-setup) | 01 to 04 if you already know ARIA, UI Mode, and env credentials |
| **AI-first** | [Agent house style](/AGENTS) and [07 Fixtures](/07-fixtures-helpers), then [09 AI path](/09-ai-writing-path) | Still read fixtures before generating tests |

Start with [00 Start here](/00-start-here) once.

## Agenda

1. [Overview, structure, config, first test](/01-overview)
2. [First test and credentials](/02-first-test)
3. [ARIA snapshots](/03-aria-snapshots)
4. [Debugging: UI Mode and traces](/04-debugging)
5. [Tags and annotations](/05-tags-annotations)
6. [Auth setup and storageState](/06-auth-setup)
7. [beforeEach, fixtures, helpers](/07-fixtures-helpers)
8. [Network mocking and API testing](/08-network-and-api)
9. [AI writing path](/09-ai-writing-path)
10. [Bonus: sharding](/10-bonus-sharding)

## Course outcomes

By the end you should be able to:

- Run tests with the CLI and UI Mode on a local clone
- Write a small test with `.env` credentials (no Codegen)
- Assert with role locators and `toMatchAriaSnapshot`
- Debug with UI Mode and Trace Viewer before changing locators
- Organize runs with tags and annotations
- Use auth `setup` and `storageState` for logged-in projects
- Prefer helpers and list fixtures over copy-pasted setup
- Mock network responses and call the mock API with `request`
- Drive plan, generate, and heal with house style, then pass the [review rubric](/docs/AI-TESTING#review-rubric-every-ai-written-test)

## Foundations smoke check

After modules 01 to 04, these should pass on a local clone:

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --project=chromium
npx playwright test tests/logged-out/auth.spec.ts --project=chromium
npx playwright test tests/logged-out/search.spec.ts --project=chromium
```

## Extra practice

After the matching modules (especially 03, 07, and 09), try the [exercises](/docs/exercises/) on a clone. Solutions live next to each exercise—attempt the task first.

## Reference on this site

- [Testing guide](/docs/TESTING)
- [AI testing](/docs/AI-TESTING)
- [Agent house style](/AGENTS)
- [Exercises](/docs/exercises/)
