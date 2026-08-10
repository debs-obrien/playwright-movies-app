# 05 — Tags and annotations

## Goal

Tag tests for selective runs and add annotations (skip, issue links) visible in the HTML report.

## Read first

- [Annotations](https://playwright.dev/docs/test-annotations)
- [Command line — grep](https://playwright.dev/docs/test-cli)

## Add a tag

1. [] Ask your agent to open [`tests/logged-out/movie-list.spec.ts`](../tests/logged-out/movie-list.spec.ts) and temporarily add a tag on one or both tests:

```ts
test('Avengers: Infinity is the first top rated movie', {
  tag: '@movies',
}, async ({ page }) => {
  // ...
});
```

2. [] Run only tagged tests:

```bash
npx playwright test --grep "@movies" --project=chromium
```

3. [] Try `--grep-invert "@movies"`.

In this suite, dense generated coverage often uses `@agent` on describe blocks. Teaching style still lives in `manage-lists-*` — tags organize **runs**, they do not replace good structure.

## Skip and issue annotation

1. [] Practice `test.skip(...)` on a throwaway test or temporarily on one case; confirm it shows as skipped in the report.
2. [] Add an issue annotation:

```ts
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

3. [] Run and open `npx playwright show-report` — find the annotation on the test details.
4. [] Revert temporary edits unless you intend to keep the `@movies` tags.

See [`learn/solutions/05-tags-snippet.ts`](./solutions/05-tags-snippet.ts) for a minimal example.

## Check-in

- [] You can grep by tag and invert
- [] You know `test.skip` vs deleting a test
- [] Annotations show up in the HTML report

Next: [Lab 06 — Auth setup](./06-auth-setup.md).
