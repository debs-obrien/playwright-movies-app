// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Search for Non-Existent Movie', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Type "zxqwertyjklmnop12345" in the Add Item field
    await page.getByRole('textbox', { name: 'Add Item' }).fill('zxqwertyjklmnop12345');

    // 3. Wait for search results
    await page.waitForTimeout(1000); // Give time for search to process

    // Verify no results found message appears OR search results remain empty
    const searchResults = page.getByRole('button').filter({ hasText: 'zxqwertyjklmnop12345' });
    const hasResults = await searchResults.count();
    
    // Verify no error occurs and search results are empty
    expect(hasResults).toBe(0);

    // Verify user can clear search and try again
    await page.getByRole('textbox', { name: 'Add Item' }).clear();
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out');
    
    // Verify new search works after clearing
    await page.waitForSelector('button:has-text("Inside Out")');
    const newSearchResults = await page.getByRole('button', { name: /Inside Out/ }).count();
    expect(newSearchResults).toBeGreaterThan(0);
  });
});
