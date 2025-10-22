// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  test('Create List with Special Characters', async ({ page }) => {
    await page.goto('');

    // 1. Navigate to "Create New List" page
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 2. Enter name with special characters
    await page.getByRole('textbox', { name: 'Name' }).fill('My List! @#$%^&*()');

    // 3. Enter description with special characters
    await page.getByRole('textbox', { name: 'Description' }).fill('Description with "quotes" & <brackets>');

    // 4. Click "Continue"
    await page.getByRole('button', { name: 'Continue' }).click();

    // 5. Verify list is created - special characters are properly handled
    await expect(page.getByText('My List! @#$%^&*()')).toBeVisible();

    // Verify description with special characters
    await page.getByRole('link', { name: 'Edit List' }).click();
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue('Description with "quotes" & <brackets>');

    // Verify special characters display correctly on View List page (HTML is escaped)
    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByText('Description with "quotes" & <brackets>')).toBeVisible();
  });
});
