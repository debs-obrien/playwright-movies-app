import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../../playwright.config';

setup('log user in and verify profile access', async ({ page }) => {
  await page.goto('');
  await page.getByRole('banner').getByLabel('Log In').click();

  // Fill in the username and password fields and submit the form
  await page
    .getByRole('textbox', { name: 'Email address' })
    .fill(process.env.MOVIES_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.MOVIES_PASSWORD!);
  await page.getByRole('button', { name: 'login' }).click();

  // Click on the 'User Profile' label to ensure the user is logged in
  await page.getByRole('button', { name: 'User Profile' }).click();

  // Verify that the 'Create New List' link is visible
  await expect(
    page.getByRole('link', { name: 'Create New List' }),
  ).toBeVisible();

  // Save the storage state to persist the login session
  await page.context().storageState({ path: STORAGE_STATE });
});
