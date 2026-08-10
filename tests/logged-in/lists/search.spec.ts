// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';

test.describe('Movie search in Add Item', { tag: '@agent' }, () => {
  test('Search for Movie in Add Item Field', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    const searchBox = page.getByRole('textbox', { name: 'Add Item' });
    await searchBox.fill('test');
    await expect(searchBox).toHaveValue('test');

    await expect(page.getByRole('status')).toContainText('Searching for movies...');

    const searchResults = page.getByLabel('Movie search results').getByRole('button');
    await expect(searchResults.first()).toBeVisible();
    await expect(searchResults.first()).toContainText(/\S/);
  });

  test('Search for Non-Existent Movie', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('textbox', { name: 'Add Item' }).fill('zxqwertyjklmnop12345');
    await expect(page.getByRole('status')).toContainText(/No movies found/i);

    await page.getByRole('textbox', { name: 'Add Item' }).clear();
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out');
    await expect(page.getByRole('button', { name: /Inside Out/ }).first()).toBeVisible();
  });

  test('Search with Partial Movie Name', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twi');
    await expect(page.getByRole('button', { name: /Twisters/ }).first()).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twist');
    await expect(page.getByRole('button', { name: /Twisters/ }).first()).toBeVisible();
  });

  test('Clear Search and Search Again', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    await expect(page.getByRole('button', { name: /Deadpool.*Wolverine/ }).first()).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('');
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('');

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Avengers');
    await expect(page.getByRole('button', { name: /Avengers/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Deadpool.*Wolverine/ })).not.toBeVisible();
  });
});
