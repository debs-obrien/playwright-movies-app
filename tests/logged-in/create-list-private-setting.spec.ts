// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '@playwright/test';
import { openLists } from '../helpers/list-utilities';

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

    // 7. Wait for successful list creation (should redirect to the edit/add movies page)
    await expect(page.getByRole('heading', { name: 'My Private Collection' })).toBeVisible();

    // 8. Navigate to "My Lists" using the helper utility
    await openLists(page);

    // Wait for the page to load and lists to appear
    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();

    // Verify list appears in "My Lists" with "(PRIVATE)" label
    // Look for the specific list item that contains both the title and private indicator
    const privateListItem = page.getByRole('listitem', { name: 'movie list' }).filter({ hasText: 'My Private Collection' });
    await expect(privateListItem).toBeVisible();
    await expect(privateListItem.getByRole('heading', { name: /My Private Collection/ })).toBeVisible();
    await expect(privateListItem.getByRole('heading', { name: /movies \(PRIVATE\)/ })).toBeVisible();
  });
});
