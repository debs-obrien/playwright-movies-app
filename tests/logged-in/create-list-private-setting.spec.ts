// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Creating New Lists', { tag: '@agent' }, () => {
  test('Create Private List', async ({ page }) => {
    await page.goto('');

    // 1. Click the "User Profile" button in the header
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 2. Click the "Create New List" link
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 3. Fill in the "Name" field with "My Private Collection"
    await page.getByRole('textbox', { name: 'Name' }).fill('My Private Collection');

    // 4. Fill in the "Description" field with "Personal favorite movies"
    await page.getByRole('textbox', { name: 'Description' }).fill('Personal favorite movies');

    // 5. Click the "Public List?" field and change to "No"
    await page.getByRole('combobox', { name: 'Public List?' }).click();
    await page.getByRole('option', { name: 'No' }).click();

    // 6. Click the "Continue" button
    await page.getByRole('button', { name: 'Continue' }).click();

    // 7. Navigate to "My Lists" via User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Verify list appears in "My Lists" with "(PRIVATE)" label
    await expect(page.getByRole('heading', { name: /My Private Collection/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\(PRIVATE\)/ })).toBeVisible();
  });
});
