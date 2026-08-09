// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-fixtures.ts

import { expect } from '@playwright/test';
import { listWithMoviesTest as test } from '../../helpers/list-fixtures';

test.describe('Integration with Search Functionality', { tag: '@agent' }, () => {
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

  test('Search for Non-existent Movie Shows No Results Message', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('textbox', { name: 'Add Item' }).fill('nonexistentmovie12345');
    await expect(page.getByRole('status')).toContainText(/No movies found/i);
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
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Twi');

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twist');
    await expect(page.getByRole('button', { name: /Twisters/ }).first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Twist');
    await expect(page.getByRole('button', { name: /Twisters/ })).toBeVisible();
  });

  test('Clear Search and Search Again', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    await expect(page.getByRole('button', { name: /Deadpool.*Wolverine/ }).first()).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('');
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('');

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Avengers');
    await expect(page.getByRole('button', { name: /Avengers/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Avengers.*Infinity War/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Deadpool.*Wolverine/ })).not.toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toHaveValue('Avengers');
    await expect(page.getByRole('button', { name: /Avengers/ }).first()).toBeVisible();
  });
});
