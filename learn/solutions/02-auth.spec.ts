import { test, expect } from '@playwright/test';

test('user can log out', async ({ page }) => {
  await page.goto('');
  await page.locator('header').getByLabel('Log In').click();

  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill(process.env.MOVIES_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.MOVIES_PASSWORD!);
  await page.getByRole('button', { name: 'login' }).click();

  await page.getByRole('button', { name: 'User Profile' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page.locator('header').getByLabel('Log In')).toBeVisible();
});
