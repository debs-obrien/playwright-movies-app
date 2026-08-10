# 05 Tags and annotations

## Goal

Tag tests for selective runs and add annotations (skip, issue links) visible in the HTML report.

## Read first

- [Annotations](https://playwright.dev/docs/test-annotations)
- [Command line grep](https://playwright.dev/docs/test-cli)

## Tags

Add a tag on a test in `movie-list.spec.ts` or a scratch file:

```typescript
test('Avengers: Infinity is the first top rated movie', {
  tag: '@movies',
}, async ({ page }) => {
  await page.goto('/?category=Top+Rated&page=1');
  // ...
});
```

Run only tagged tests:

```bash
npx playwright test --grep "@movies" --project=chromium
npx playwright test --grep-invert "@movies" --project=chromium
```

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
  // ...
});
```

Run tests and open `npx playwright show-report` to see the annotation on the test details.

## Key takeaways

- You can grep by tag and invert the filter.
- You know `test.skip` vs deleting a test.
- Annotations show up in the HTML report.

Next: [06 Auth setup](/06-auth-setup).
