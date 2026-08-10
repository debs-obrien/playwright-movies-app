import { test, expect } from '@playwright/test';

test('user can log out', async ({ page }) => {
  await page.goto('');
  await page.getByRole('banner').getByLabel('Log In').click();

  await page.getByRole('textbox', { name: 'Email address' })
    .fill(process.env.MOVIES_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.MOVIES_PASSWORD!);
  await page.getByRole('button', { name: 'login' }).click();

  await expect(page.getByRole('button', { name: 'User Profile' })).toBeVisible();

  await page.getByRole('button', { name: 'User Profile' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page.getByRole('banner').getByLabel('Log In')).toBeVisible();
});

test('logged-out user cannot open My Lists', async ({ page }) => {
  await page.goto('/my-lists?page=1');

  await expect(
    page.getByRole('heading', { name: "You don't have permission to access this page!" }),
  ).toBeVisible();
  await expect(
    page.getByText(/requires you to be logged in/i),
  ).toBeVisible();
});
