import { test, expect } from '@playwright/test';

test('user can log out', async ({ page }) => {
  await page.goto('');
  await page.locator('header').getByLabel('Log In').click();

  // Fill in the username and password fields and submit the form
  await page.getByRole('textbox', { name: 'Email address' })
    .fill(process.env.MOVIES_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.MOVIES_PASSWORD!);
  await page.getByRole('button', { name: 'login' }).click();

  // Click on the user profile or settings menu
  await page.getByRole('button', { name: 'User Profile' }).click();

  // Click on the logout button
  await page.getByRole('button', { name: 'Logout' }).click();

  // Verify that the login button is visible
   await expect(page.locator('header').getByLabel('Log In')).toBeVisible();
});
