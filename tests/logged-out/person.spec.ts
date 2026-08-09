import { test, expect } from '@playwright/test';

test.describe('Person page', () => {
  test('shows biography and filmography from a cast link', async ({ page }) => {
    await page.goto('movie?id=718821&page=1');

    await page.getByRole('link', { name: 'Daisy Edgar-Jones' }).click();

    await expect(page).toHaveURL(/person\?id=/);
    await expect(
      page.getByRole('main').getByRole('heading', { level: 1 }).first(),
    ).toHaveText('Daisy Edgar-Jones');

    await expect(page.getByRole('heading', { name: 'The Biography' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Also enters in' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' }).first()).toBeVisible();
  });
});

