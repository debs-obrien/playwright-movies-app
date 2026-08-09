import { Page, expect } from '@playwright/test';
import { test as baseTest } from './base-test';
import { createList, addMovie, selectCoverImage } from './list-utilities';

const LIST_NAME = 'my favorite movies';
const LIST_DESCRIPTION = 'list of my favorite movies';
const SEED_MOVIES = ['Twisters', 'The Garfield Movie', 'Bad Boys: Ride or Die'] as const;

async function seedMovies(page: Page) {
  for (const movie of SEED_MOVIES) {
    await addMovie(page, movie);
  }
}

/**
 * One `test` with three optional list fixtures. Request only the lightest
 * fixture the case needs — unused fixtures are not set up.
 *
 * | Fixture | Page state | Use when |
 * |---------|------------|----------|
 * | `emptyListPage` | New list, no movies, on Add/Remove | Empty-state UI |
 * | `listWithMoviesPage` | List + 3 movies, no cover, on Add/Remove | Add/remove/search/cover |
 * | `listPage` | Full seed on View List | Edit, share, my-lists, navigation |
 */
export const test = baseTest.extend<{
  emptyListPage: Page;
  listWithMoviesPage: Page;
  listPage: Page;
}>({
  emptyListPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, LIST_NAME, LIST_DESCRIPTION);
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
    await use(page);
  },

  listWithMoviesPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, LIST_NAME, LIST_DESCRIPTION);
    await test.step('add movies to list', async () => seedMovies(page));
    await use(page);
  },

  listPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, LIST_NAME, LIST_DESCRIPTION);

    await test.step('add movies to list', async () => seedMovies(page));

    await test.step('add image to list', async () => {
      await page.getByRole('link', { name: 'Choose Image' }).click();
      await expect(page.getByRole('listitem', { name: 'movie' }).first()).toBeVisible();
      await selectCoverImage(page, 'Twisters');
    });

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page).toHaveURL(/\/list\?id=/);
    await expect(page.getByRole('heading', { name: LIST_NAME, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();

    await use(page);
  },
});

export { expect } from '@playwright/test';

/** @deprecated Use `test` from this module. */
export const listTest = test;
/** @deprecated Use `test` from this module. */
export const emptyListTest = test;
/** @deprecated Use `test` from this module. */
export const listWithMoviesTest = test;
