// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Creating New Lists', { tag: '@agent' }, () => {
  test('Create List with Valid Details', async ({ page }) => {
    await page.goto('');

    // 1. Click the "User Profile" button in the header
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 2. Click the "Create New List" link from the dropdown menu
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 3. Verify the "Create New List" page loads with the form
    await expect(page.getByRole('heading', { name: 'Create New List' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Description' })).toBeVisible();

    // 4. Fill in the "Name" field with "My Action Movies"
    await page.getByRole('textbox', { name: 'Name' }).fill('My Action Movies');

    // 5. Fill in the "Description" field with "A collection of my favorite action films"
    await page.getByRole('textbox', { name: 'Description' }).fill('A collection of my favorite action films');

    // 6. Verify "Public List?" field is set to "Yes" by default
    await expect(page.getByRole('combobox', { name: 'Public List?' })).toHaveText('Yes');

    // 7. Click the "Continue" button
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify page title shows the new list name "My Action Movies"
    await expect(page.getByRole('heading', { name: 'My Action Movies' })).toBeVisible();

    // Verify the Add Item search field is available and ready for input
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
  });
});
