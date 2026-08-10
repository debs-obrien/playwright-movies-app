# 04 Debugging with UI Mode and traces

## Goal

Debug interactively in UI Mode, use Copy Prompt with a coding agent, and open a trace for post-mortem analysis.

## Read first

- [UI Mode](https://playwright.dev/docs/test-ui-mode)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [AI testing guide](/docs/AI-TESTING) (heal policy and traces)

## UI Mode

![Playwright UI Mode with the Movies app timeline and page snapshot](images/ui-mode.jpg)

```bash
npx playwright test --ui
```

Filter projects in the sidebar (`chromium`, `logged-in chrome`, etc.). Run one test, click actions in the timeline, and time-travel through page snapshots.

## Practice: intentional failure lab

Use the checked-in lab instead of editing a teaching spec:

1. Open `tests/logged-out/lessons/debug-intentional-fail.spec.ts`.
2. Remove `test.fixme` so the test runs.
3. Run with a forced trace:

```bash
npx playwright test tests/logged-out/lessons/debug-intentional-fail.spec.ts --project=chromium --trace on
```

4. Open the trace (`npx playwright show-trace test-results/.../trace.zip` or `npx playwright trace open` + `trace actions`).
5. In UI Mode, open the **Errors** tab and try **Copy Prompt** with a coding agent if you want.
6. Fix the snapshot heading to `"Twisters"`, re-run green, then restore `test.fixme` (or leave your fixed version local without committing).

## Traces

Config sets `trace: 'on-first-retry'`. You can also force a trace on a passing file:

```bash
npx playwright test tests/logged-out/search.spec.ts --project=chromium --trace on
```

```bash
npx playwright show-trace test-results/.../trace.zip
# or
npx playwright trace open path/to/trace.zip
npx playwright trace actions
```

Heal using trace or snapshot evidence, not blind locator retries.

## Done when

- UI Mode opened at least once (`npx playwright test --ui`).
- You inspected a failure or a trace before changing an assertion.
- The intentional-fail lab was run with `--trace on` (then fixed or re-`fixme`d).

## Key takeaways

- You can step through a test in UI Mode.
- You have used Copy Prompt or a trace at least once.
- You will not change locators without looking at a snapshot or trace first.

Next: [05 Tags](/05-tags-annotations) or jump using the [course home](/course).
