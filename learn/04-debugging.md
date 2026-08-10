# 04 — Debugging with UI Mode, AI, and traces

## Goal

Debug interactively in UI Mode, use Copy Prompt with your coding agent, and open a trace for post-mortem analysis.

## Read first

- [UI Mode](https://playwright.dev/docs/test-ui-mode)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- Heal policy: **movies-playwright** skill + official **playwright-trace** skill

## UI Mode

1. [] Run `npx playwright test --ui`.
2. [] In the sidebar filter, ensure the projects you care about are selected (`chromium`, `logged-in chrome`, etc.).
3. [] Run a single logged-out test. Click actions in the timeline; use time-travel on the page snapshot.

## Break something on purpose

1. [] Ask your agent to temporarily break an assertion in a scratch copy of a test (or do it yourself).
2. [] Re-run in UI Mode → open the **Errors** tab.
3. [] Use **Copy Prompt** and paste into the **same coding agent**. Apply a fix; re-run.
4. [] Revert intentional breakage when done.

Prefer fixing from error + snapshot evidence over guessing.

## Traces

Config already sets `trace: 'on-first-retry'` (retries are enabled on CI). Locally:

1. [] Force a trace:

```bash
npx playwright test tests/logged-out/search.spec.ts --project=chromium --trace on
```

2. [] Open with Trace Viewer or the **playwright-trace** skill:

```bash
npx playwright show-report
# or
npx playwright show-trace test-results/.../trace.zip
npx playwright trace open path/to/trace.zip
npx playwright trace actions
```

3. [] Have the agent heal using evidence (**movies-playwright** heal section), not blind locator retries.

## Check-in

- [] You can step through a test in UI Mode
- [] You have used Copy Prompt or a trace at least once with your agent
- [] You will not change locators without looking at a snapshot/trace first

Next: [Lab 05 — Tags](./05-tags-annotations.md) (suite craft) or jump per your [path](./index.md).
