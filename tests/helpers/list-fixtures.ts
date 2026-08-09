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
 * Empty list on Add/Remove Movies. Use when the test only needs a list shell
 * (empty state, create-then-view, choose-image-without-movies).
 */
export const emptyListTest = baseTest.extend<{ emptyListPage: Page }>({
  emptyListPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, LIST_NAME, LIST_DESCRIPTION);
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
    await use(page);
  },
});

/**
 * List with three movies, no cover image, still on Add/Remove Movies.
 * Cheaper than listPage when the test only mutates or searches the movie list.
 */
export const listWithMoviesTest = baseTest.extend<{ listWithMoviesPage: Page }>({
  listWithMoviesPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, LIST_NAME, LIST_DESCRIPTION);
    await listWithMoviesTest.step('add movies to list', async () => seedMovies(page));
    await use(page);
  },
});

/**
 * Full seed: three movies, cover image, landed on View List with Share visible.
 * Use for edit, share, my-lists, navigation, and view flows that start on View List.
 */
export const listTest = baseTest.extend<{ listPage: Page }>({
  listPage: async ({ page }, use) => {
    await page.goto('');
    await createList(page, LIST_NAME, LIST_DESCRIPTION);

    await listTest.step('add movies to list', async () => seedMovies(page));

    await listTest.step('add image to list', async () => {
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
