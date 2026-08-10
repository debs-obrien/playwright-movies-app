import { test, expect } from '@playwright/test';

// Minimal pattern for Lab 05 — prefer editing movie-list.spec.ts in a branch.

test('example tagged test', {
  tag: '@movies',
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  await page.goto('/?category=Top+Rated&page=1');
  await expect(page.getByRole('listitem', { name: 'movie' }).first()).toBeVisible();
});

test.skip('example skipped test', { tag: '@movies' }, async ({ page }) => {
  await page.goto('');
});
