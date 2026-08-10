// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';
import { addMovie } from '../../helpers/list-utilities';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove Single Movie', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await expect(movies.filter({ hasText: 'The Garfield Movie' })).toBeVisible();
    await expect(movies).toHaveCount(3);

    await movies.filter({ hasText: 'The Garfield Movie' }).getByRole('button', { name: 'Remove' }).click();

    await expect(movies.filter({ hasText: 'The Garfield Movie' })).toHaveCount(0);
    await expect(movies).toHaveCount(2);
    await expect(movies.filter({ hasText: 'Twisters' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Bad Boys: Ride or Die' })).toBeVisible();
  });

  test('Remove All Movies from List', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await expect(movies).toHaveCount(3);

    for (const title of ['Twisters', 'The Garfield Movie', 'Bad Boys: Ride or Die']) {
      await movies.filter({ hasText: title }).getByRole('button', { name: 'Remove' }).click();
      await expect(movies.filter({ hasText: title })).toHaveCount(0);
    }

    await expect(movies).toHaveCount(0);
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeEnabled();
  });

  test('Remove Movie and Verify on View List Page', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await expect(movies).toHaveCount(3);

    await movies.filter({ hasText: 'Bad Boys: Ride or Die' }).getByRole('button', { name: 'Remove' }).click();
    await expect(movies).toHaveCount(2);
    await expect(movies.filter({ hasText: 'Bad Boys: Ride or Die' })).toHaveCount(0);

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
  });

  test('Remove and Re-add Same Movie', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await movies.filter({ hasText: 'Twisters' }).getByRole('button', { name: 'Remove' }).click();
    await expect(movies.filter({ hasText: 'Twisters' })).toHaveCount(0);
    await expect(movies).toHaveCount(2);

    await addMovie(page, 'Twisters');

    await expect(movies.filter({ hasText: 'Twisters' })).toBeVisible();
    await expect(movies).toHaveCount(3);
    await expect(movies.filter({ hasText: 'Twisters' })).toHaveCount(1);
  });
});
