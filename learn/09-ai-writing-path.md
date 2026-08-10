# 09 — AI writing path

## Goal

Produce one small, idiomatic test (or plan section) using skills and thin agent prompts — with evidence and the review rubric — not a wall of unreviewed generated files.

Labs 01–08 already assume a coding agent. This lab deepens the structured plan → generate → heal loop.

## Read first

- [AI testing guide](../docs/AI-TESTING.md)
- Skills: **movies-playwright**, **playwright-cli**, **playwright-trace**
- Learn style from `manage-lists-*`, not from dense `@agent` coverage alone

## Path A — Explore with CLI (recommended default)

1. [] Start app (`npm run dev`) or let tests start servers later.
2. [] In your agent: use **playwright-cli** + **movies-playwright** to explore a small flow and draft a short idiomatic test.
3. [] Run it. If it fails, heal with **playwright-trace** evidence (movies-playwright heal policy).

## Path B — Planner → generator → rewrite → heal

1. [] Scope tightly (one feature slice, e.g. “share dialog opens and shows URL”).
2. [] Run [`.github/prompts/playwright-test-plan.prompt.md`](../.github/prompts/playwright-test-plan.prompt.md) — save under `specs/` (see existing `movies-list-plan.md`).
3. [] Generate **one** scenario with [`.github/prompts/playwright-test-generate.prompt.md`](../.github/prompts/playwright-test-generate.prompt.md) (or hand-write from the plan).
4. [] Rewrite toward house style using the **movies-playwright** skill (`manage-lists-*`, helpers, `listPage`).
5. [] If it fails, heal with **playwright-test-heal** / **playwright-trace** — not blind retries.
6. [] Pass the [review rubric](../docs/AI-TESTING.md#review-rubric-every-ai-written-test).

Seeds: [`tests/logged-in/seed.spec.ts`](../tests/logged-in/seed.spec.ts). Sample plan section: [`learn/solutions/09-sample-plan-section.md`](./solutions/09-sample-plan-section.md).

## Check-in

- [] You chose CLI explore vs test-agents deliberately
- [] Output uses role locators and existing helpers/fixtures
- [] No `waitForTimeout` / `force: true` / `networkidle` / Codegen
- [] Rubric checklist completed for the artifact you landed

Bonus: [Lab 10 — Sharding](./10-bonus-sharding.md).
