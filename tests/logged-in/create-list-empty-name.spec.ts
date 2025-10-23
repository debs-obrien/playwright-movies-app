// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Creating New Lists', { tag: '@agent' }, () => {
  test('Create List with Empty Name - Negative Test', async ({ page }) => {
    await page.goto('');

    // 1. Click the "User Profile" button in the header
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 2. Click the "Create New List" link
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 3. Leave the "Name" field empty (no action needed)

    // 4. Fill in the "Description" field with "Test description"
    await page.getByRole('textbox', { name: 'Description' }).fill('Test description');

    // 5. Attempt to click the "Continue" button
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify user remains on the Create New List page
    await expect(page.getByRole('heading', { name: 'Create New List' })).toBeVisible();
  });
});
