# Learn Playwright with the Movies app

Hands-on workshop. Official concepts live on [playwright.dev](https://playwright.dev/docs/intro). This repo is where you **practice** on a real Next.js movies app with a local mock API — from a **coding agent**, with Playwright CLI / UI Mode / traces.

Workshop structure inspired by [Build 2025 Lab 304](https://github.com/microsoft/Build25-LAB304). This fork is agent-first (no Codegen / IDE Testing track).

## Pick your path

| Path | Start at | Skim / skip |
|------|----------|-------------|
| **Beginner** | [Lab 01 — Overview](./01-overview.md) | — |
| **Intermediate** | [Lab 05 — Tags](./05-tags-annotations.md) or [Lab 06 — Auth](./06-auth-setup.md) | Labs 01–04 if you already know ARIA + UI Mode + env credentials |
| **AI-first** | Skim [AGENTS.md](../AGENTS.md) + [Lab 07](./07-fixtures-helpers.md), then [Lab 09](./09-ai-writing-path.md) | Still peek at fixtures before generating tests |

Then open [00 — Start here](./00-start-here.md) once. In your agent, say **“Use the learn-lab-coach skill — I’m on Lab 00.”** (or use the lab-coach prompt).

## Agenda

1. [Overview, structure, config, first green test](./01-overview.md)
2. [First test with your agent + credentials](./02-first-test.md)
3. [ARIA snapshots](./03-aria-snapshots.md)
4. [Debugging: UI Mode, AI, traces](./04-debugging.md)
5. [Tags and annotations](./05-tags-annotations.md)
6. [Auth setup and `storageState`](./06-auth-setup.md)
7. [`beforeEach`, fixtures, helpers](./07-fixtures-helpers.md)
8. [Network mocking and API testing](./08-network-and-api.md)
9. [AI writing path](./09-ai-writing-path.md)
10. [Bonus: sharding](./10-bonus-sharding.md)

## Check-in (course outcomes)

By the end you should be able to:

- Work labs from a coding agent using **learn-lab-coach** / **movies-playwright** skills
- Run tests with CLI and UI Mode
- Write a small test with `.env` credentials (no Codegen)
- Assert with role locators and `toMatchAriaSnapshot`
- Debug with UI Mode and Trace Viewer (evidence before locator changes)
- Organize runs with tags and annotations
- Use auth `setup` + `storageState` for logged-in projects
- Prefer helpers and the `listPage` fixture over copy-pasted setup
- Mock network responses and hit the mock API with `request`
- Drive plan → generate → heal with thin prompts + house style — then pass the [review rubric](../docs/AI-TESTING.md#review-rubric-every-ai-written-test)

## Foundations smoke check

You are through Foundations when these succeed:

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --project=chromium
npx playwright test tests/logged-out/auth.spec.ts --project=chromium
npx playwright test tests/logged-out/search.spec.ts --project=chromium
```

## Browse this site

```bash
npm run docs:dev
```

Primary path: agent chat on this repo. Optional: browse labs here or peek at files when you want to read code.
