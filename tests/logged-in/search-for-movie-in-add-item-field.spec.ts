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

    // 3. Type "test" to trigger search (known to return results)
    await page.getByRole('textbox', { name: 'Add Item' }).fill('test');

    // 4. Wait for autocomplete/search results to appear
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('test');

    // 5. Verify loading state appears initially
    await expect(page.locator('.select-search-container.is-loading')).toBeVisible({ timeout: 1000 });

    // 6. Wait for search results to load and verify dropdown appears
    await expect(page.locator('.select-search-option button')).toBeVisible({ timeout: 10000 });
    
    // 7. Verify results display with movie titles and relevant info (images and text)
    const searchResults = page.locator('.select-search-option button').first();
    await expect(searchResults).toBeVisible();
    await expect(searchResults.locator('img')).toBeVisible();
    await expect(searchResults.locator('span')).toBeVisible();
  });

  test('Search for Non-existent Movie Shows No Results Message', async ({ listPage }) => {
    const page = listPage;

    // Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // Click in the search field and type non-existent movie
    await page.getByRole('textbox', { name: 'Add Item' }).click();
    await page.getByRole('textbox', { name: 'Add Item' }).fill('nonexistentmovie12345');

    // Wait for loading state
    await expect(page.locator('.select-search-container.is-loading')).toBeVisible({ timeout: 1000 });

    // Verify "no results" message appears
    await expect(page.locator('.select-search-options').getByText(/No movies found/i)).toBeVisible({ timeout: 10000 });
  });
});
