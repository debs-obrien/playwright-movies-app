# 05 Tags and annotations

## Goal

Tag tests for selective runs and add annotations (skip, issue links) visible in the HTML report.

## Read first

- [Annotations](https://playwright.dev/docs/test-annotations)
- [Command line grep](https://playwright.dev/docs/test-cli)

## Tags

`movie-list.spec.ts` already tags the Dark Knight test with `@movies`. Run it selectively:

```bash
npx playwright test --grep "@movies" --project=chromium
npx playwright test --grep-invert "@movies" --project=chromium
```

Optional: add `@movies` (or your own tag) on another test or a scratch file under `tests/logged-out/`. Grep with no matches exits with “No tests found”.

Generated coverage in this repo often uses `@agent` on describe blocks. Teaching style still lives in `manage-lists-*`. Tags organize **runs**; they do not replace good structure.

## Skip and issue annotation

```typescript
test('dynamic content for first upcoming movie', {
  tag: '@movies',
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  // same body as in movie-list.spec.ts
});
```

Run with the HTML reporter, then open the report to see tags and annotations on the test details:

```bash
npx playwright test --grep "@movies" --project=chromium --reporter=html
npx playwright show-report
```

## Done when

- `--grep "@movies"` runs the Dark Knight test on chromium.
- You have opened the HTML report at least once.

## Key takeaways

- You can grep by tag and invert the filter.
- You know `test.skip` vs deleting a test.
- Annotations show up in the HTML report.

Next: [06 Auth setup](/06-auth-setup).
