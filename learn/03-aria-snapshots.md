# 03 ARIA snapshots

## Goal

Strengthen a search flow with `toMatchAriaSnapshot` and know when a snapshot beats a single text assert.

## Read first

- [ARIA snapshots](https://playwright.dev/docs/aria-snapshots)
- [Locators](https://playwright.dev/docs/locators)

## Snapshot vs text

**`toHaveText` / `toContainText`** check one node's text. **`toMatchAriaSnapshot`** checks the accessible **structure** of a region (roles, names, hierarchy). Use snapshots when structure matters; use text asserts when a single string is enough.

## Example: search results and empty state

From `search.spec.ts`:

```typescript
test('search for "Twisters" movie', async ({ page }) => {
  await page.goto('');
  await searchForMovie(page, 'twisters');

  await expect(page).toHaveURL(/searchTerm=twisters/);

  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Twisters" [level=1]
  `);
});

test('search for non-existent-movie', async ({ page }) => {
  await page.goto('');
  await searchForMovie(page, 'non-existent-movie');

  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Sorry!"
    - heading /There were no results for/
    - link "Home":
      - button "Home"
  `);
});
```

Run the file on a clone:

```bash
npx playwright test tests/logged-out/search.spec.ts --project=chromium
```

## When not to snapshot

- Huge volatile trees (ads, clocks, recommendations): narrow the locator first.
- Values that change every run without a regex: prefer `/pattern/` in the YAML snapshot.
- Pure navigation checks: `toHaveURL` is enough.

## Key takeaways

- You can explain snapshot vs text assert in one sentence.
- `search.spec.ts` passes on your clone.
- You know how to update a snapshot deliberately after a real UI change.

Next: [04 Debugging](/04-debugging).
