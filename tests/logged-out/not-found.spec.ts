import { test, expect } from '@playwright/test';

test('unknown route shows the 404 page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');

  await expect(page.getByRole('heading', { name: 'Oops!' })).toBeVisible();
  await expect(page.getByText("This doesn't exist...")).toBeVisible();
  await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
});
