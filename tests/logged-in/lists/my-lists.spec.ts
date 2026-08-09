// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-fixtures.ts

import { expect } from '@playwright/test';
import { createList, addMovie, openLists } from '../../helpers/list-utilities';
import { listTest as test } from '../../helpers/list-fixtures';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('View All Lists', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Action Movies Collection');
    await page.getByRole('textbox', { name: 'Description' }).fill('Best action films');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: /Inside Out 2/i }).first().click();
    await expect(page.getByLabel('movies').getByText('Inside Out 2')).toBeVisible();

    await page.getByRole('link', { name: 'Choose Image' }).click();
    const insideOutButton = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: 'Inside Out 2' })
      .getByRole('button');
    await insideOutButton.click();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Comedy Favorites');
    await page.getByRole('textbox', { name: 'Description' }).fill('Hilarious comedy movies');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    await page.getByRole('button', { name: /Deadpool/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Deadpool/i)).toBeVisible();

    await page.getByRole('link', { name: 'Choose Image' }).click();
    const deadpoolButton = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Deadpool/ })
      .getByRole('button');
    await deadpoolButton.click();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Sci-Fi Adventures');
    await page.getByRole('textbox', { name: 'Description' }).fill('Epic science fiction movies');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Furiosa');
    await page.getByRole('button', { name: /Furiosa/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Furiosa/i)).toBeVisible();

    await page.getByRole('link', { name: 'Choose Image' }).click();
    const furiosaButton = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Furiosa/ })
      .getByRole('button');
    await furiosaButton.click();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Action Movies Collection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Comedy Favorites' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Adventures' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie list' })).toHaveCount(4);
  });

  test('View List with Cover Image', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'movies (PUBLIC)' })).toBeVisible();
  });

  test('View List Without Cover Image', async ({ listPage }) => {
    const page = listPage;

    await createList(page, 'List Without Cover', 'A list with no cover image');
    await addMovie(page, 'Deadpool');
    await openLists(page);

    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'List Without Cover' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'poster of List Without Cover' })).toBeVisible();
  });

  test('Verify List Count Information', async ({ listPage }) => {
    const page = listPage;

    await openLists(page);

    await expect(page.getByRole('heading', { name: 'movies (PUBLIC)' })).toBeVisible();

    const listItem = page.getByRole('listitem', { name: 'movie list' });
    await expect(listItem).toBeVisible();
    await expect(listItem.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
  });

  test('Click List to View Details', async ({ listPage }) => {
    const page = listPage;

    await openLists(page);

    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();

    const listLink = page.getByRole('link', { name: 'poster of my favorite movies' });
    await expect(listLink).toBeVisible();
    await listLink.click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
