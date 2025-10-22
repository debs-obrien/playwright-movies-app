// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Integration with Search Functionality', { tag: '@agent' }, () => {
  test('Search for Movie in Add Item Field', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Click in the "Add Item" search field
    await page.getByRole('textbox', { name: 'Add Item' }).click();

    // Verify search results appear as dropdown or suggestions when field is focused
    await expect(page.getByRole('menuitem').first()).toBeVisible();

    // 3. Type "Spider"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Spider');

    // 4. Wait for autocomplete/search results to appear
    // The search should filter/update results based on the search term
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Spider');

    // 5. Observe the results
    // Verify search is responsive (dropdown remains visible and interactive)
    await expect(page.getByRole('menuitem').first()).toBeVisible();
    
    // Verify results display with movie titles and relevant info (images and text)
    // Search results should contain menuitems with images and text
    const firstItem = page.getByRole('menuitem').first();
    await expect(firstItem.locator('img')).toBeVisible();
    await expect(firstItem.locator('button')).toBeVisible();
  });
});
