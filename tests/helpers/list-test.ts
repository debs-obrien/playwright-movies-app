import { Page, expect } from '@playwright/test';
import { test as baseTest } from './base-test';
import { createList, addMovie, selectCoverImage } from './list-utilities';

/**
 * Extends the base test with a custom fixture `listPage` that gives
 * a Page instance with a prepopulated list of movies.
 *
 * Uses the default `page` fixture (no extra browser page) and seeds:
 * 1. A list named "my favorite movies"
 * 2. Three movies
 * 3. A cover image from the first movie
 * 4. Navigation to the View List page
 */
export const listTest = baseTest.extend<{ listPage: Page }>({
  listPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, 'my favorite movies', 'list of my favorite movies');

    await listTest.step('add movies to list', async () => {
      await addMovie(page, 'Twisters');
      await addMovie(page, 'The Garfield Movie');
      await addMovie(page, 'Bad Boys: Ride or Die');
    });

    await listTest.step('add image to list', async () => {
      await page.getByRole('link', { name: 'Choose Image' }).click();
      await expect(page.getByRole('listitem', { name: 'movie' }).first()).toBeVisible();
      await selectCoverImage(page, 'Twisters');
    });

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();

    await use(page);
  },
});
