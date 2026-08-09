// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Integration with Search Functionality', { tag: '@agent' }, () => {
  test('Search for Movie in Add Item Field', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    const searchBox = page.getByRole('textbox', { name: 'Add Item' });
    await searchBox.fill('test');
    await expect(searchBox).toHaveValue('test');

    await expect(page.getByRole('status')).toContainText('Searching for movies...');

    const searchResults = page.getByLabel('Movie search results').getByRole('button');
    await expect(searchResults.first()).toBeVisible();
    await expect(searchResults.first()).toContainText(/\S/);
  });

  test('Search for Non-existent Movie Shows No Results Message', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('nonexistentmovie12345');

    await expect(page.getByRole('status')).toContainText(/No movies found/i);
  });
});
