# Exercise 03 — Plan one section with the planner agent

## Goal

Produce a small markdown plan for **one** list-feature category (for example share dialog or delete confirmation), then optionally generate a single test.

## Steps

1. Read `docs/AI-TESTING.md` (CLI vs MCP vs agents) and `AGENTS.md`.
2. Use the planner prompt (`.github/prompts/playwright-test-plan.prompt.md`) but **limit scope** to one section—or write the plan by hand in `specs/` following `movies-list-plan.md` structure.
3. Seeds must reference `tests/logged-in/seed.spec.ts` and `list-fixtures`, not deprecated `list-test.ts`.
4. Optional: generate one scenario with `.github/prompts/playwright-test-generate.prompt.md`, then rewrite onto fixtures using the **movies-playwright** skill (house style). Heal failures with `.github/prompts/playwright-test-heal.prompt.md` and a trace.
5. Open a PR (or local branch) with the plan diff and any idiomatic test.

## Done when

- Plan has numbered steps and expected results.
- Fixture/seed language matches house style.
- Any generated test passes the review rubric in `docs/AI-TESTING.md`.
