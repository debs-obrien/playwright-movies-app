// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Creating New Lists', { tag: '@agent' }, () => {
  test('Create List with Only Name - Minimum Valid Data', async ({ page }) => {
    await page.goto('');

    // 1. Click the "User Profile" button in the header
    await page.getByRole('button', { name: 'User Profile' }).click();

    // 2. Click the "Create New List" link
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    // 3. Fill in the "Name" field with "Minimal List"
    await page.getByRole('textbox', { name: 'Name' }).fill('Minimal List');

    // 4. Leave "Description" field empty (no action needed)

    // 5. Click the "Continue" button
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify user is redirected to Add/Remove Movies page
    await expect(page.getByRole('heading', { name: 'Minimal List' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
  });
});
