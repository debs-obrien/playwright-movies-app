import { test, expect } from '@playwright/test';

/**
 * Module 04 debugging lab.
 * Remove `test.fixme` below, run with `--trace on`, inspect the failure, then
 * fix the snapshot heading to "Twisters" (or restore `test.fixme` when done).
 */
test.fixme('intentional wrong snapshot for module 04 debugging', async ({ page }) => {
  // Observed when fixed: main heading is "Twisters".
  // Expected while broken: this assertion fails on purpose for the lab.
  await page.goto('');
  await page.getByRole('banner').getByRole('search').click();
  await page.getByPlaceholder('Search for a movie...').fill('twisters');
  await page.getByPlaceholder('Search for a movie...').press('Enter');
  await expect(page).toHaveURL(/searchTerm=twisters/);

  const twistersResult = page
    .getByRole('main')
    .getByRole('listitem', { name: 'movie' })
    .filter({ hasText: /Twisters/i });
  await twistersResult.getByRole('link', { name: /twisters/i }).click();

  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "NOT_A_REAL_TITLE" [level=1]
  `);
});
