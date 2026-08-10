# 03 — ARIA snapshots

## Goal

Strengthen a search flow with `toMatchAriaSnapshot` and know when a snapshot beats a single text assert.

## Read first

- [ARIA snapshots](https://playwright.dev/docs/aria-snapshots)
- Locators: prefer `getByRole` / accessible names ([Locators](https://playwright.dev/docs/locators))

## Study an existing example

1. [] Ask your agent to open [`tests/logged-out/search.spec.ts`](../tests/logged-out/search.spec.ts) and explain the helper `searchForMovie`, the URL assert, and the `toMatchAriaSnapshot` calls on `main`.

**`toHaveText` / `toContainText`** check one node’s text. **`toMatchAriaSnapshot`** checks the accessible **structure** of a region (roles, names, hierarchy). Use snapshots when structure matters; use text asserts when a single string is enough.

## Practice

1. [] Run:

```bash
npx playwright test tests/logged-out/search.spec.ts --project=chromium
```

2. [] Optional — have the agent (with **movies-playwright** + **playwright-cli**) explore search for `"twisters"` and draft a scratch test that uses `toMatchAriaSnapshot` on results or detail. No Codegen.
3. [] Bonus: empty search — assert the “Sorry!” / no-results region with a snapshot (already in `search.spec.ts`; try writing it from scratch first).

## When not to snapshot

- Huge volatile trees (ads, clocks, random recommendations) — narrow the locator first
- Values that change every run without a regex — prefer `/pattern/` in the YAML snapshot
- Pure navigation checks — `toHaveURL` is enough

## Check-in

- [] You can explain snapshot vs text assert in one sentence
- [] `search.spec.ts` passes
- [] You know how to update a snapshot deliberately after a real UI change

Next: [Lab 04 — Debugging](./04-debugging.md).
