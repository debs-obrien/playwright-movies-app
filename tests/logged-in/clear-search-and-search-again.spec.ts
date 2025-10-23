// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Integration with Search Functionality', { tag: '@agent' }, () => {
  test('Clear Search and Search Again', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Search for "Deadpool"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');

    // Verify Deadpool results appear
    await expect(page.getByRole('menuitem', { name: 'Deadpool & Wolverine Deadpool & Wolverine' })).toBeVisible({ timeout: 10000 });

    // 3. Clear the search field
    await page.getByRole('textbox', { name: 'Add Item' }).fill('');

    // Verify search field can be cleared
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('');

    // 4. Search for "Avengers"
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Avengers');

    // 5. Verify new results appear
    await expect(page.getByRole('menuitem', { name: 'Avengers: Infinity War Avengers: Infinity War' })).toBeVisible({ timeout: 10000 });

    // Verify previous results are removed - Deadpool should not appear in Avengers results
    await expect(page.getByRole('menuitem', { name: 'Deadpool & Wolverine Deadpool & Wolverine' })).not.toBeVisible();

    // Verify new search returns fresh results
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Avengers');

    // Verify no interference between searches - search results list should be visible and contain Avengers
    await expect(page.getByRole('menuitem', { name: /Avengers/ })).toBeVisible();
  });
});
