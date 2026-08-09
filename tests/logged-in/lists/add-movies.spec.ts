// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';
import { addMovie } from '../../helpers/list-utilities';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Single Movie by Search', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await expect(movies).toHaveCount(3);

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: 'Inside Out 2' }).click();

    const addedMovie = movies.filter({ hasText: 'Inside Out 2' });
    await expect(addedMovie).toBeVisible();
    await expect(addedMovie.getByText('Inside Out 2')).toBeVisible();
    await expect(addedMovie.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(movies).toHaveCount(4);
  });

  test('Add Multiple Movies Sequentially', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });

    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
    await expect(movies).toHaveCount(3);

    await addMovie(page, 'Deadpool & Wolverine');
    await addMovie(page, 'Inside Out 2');
    await addMovie(page, 'Despicable Me 4');

    await expect(movies.filter({ hasText: 'Deadpool & Wolverine' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Inside Out 2' })).toBeVisible();
    await expect(movies.filter({ hasText: 'Despicable Me 4' })).toBeVisible();

    await expect(
      movies.filter({ hasText: 'Deadpool & Wolverine' }).getByRole('button', { name: 'Remove' }),
    ).toBeVisible();
    await expect(
      movies.filter({ hasText: 'Inside Out 2' }).getByRole('button', { name: 'Remove' }),
    ).toBeVisible();
    await expect(
      movies.filter({ hasText: 'Despicable Me 4' }).getByRole('button', { name: 'Remove' }),
    ).toBeVisible();

    await expect(movies).toHaveCount(6);
  });

  test('Add Movie That Already Exists (Duplicate Prevention)', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const movies = page.getByRole('listitem', { name: 'movie' });
    const twisters = movies.filter({ hasText: 'Twisters' });

    await expect(twisters).toBeVisible();
    await expect(movies).toHaveCount(3);
    await expect(twisters).toHaveCount(1);

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Twisters');
    await page.getByRole('button', { name: 'Twisters' }).click();
    await expect(page.getByText('Adding an item to the list...')).toBeHidden();

    await expect(twisters).toHaveCount(1);
    await expect(movies).toHaveCount(3);
  });

  test('Add Movie and Verify on View List Page', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await addMovie(page, 'The Union');
    await page.getByRole('link', { name: 'View List' }).click();

    const movieItem = page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'The Union' });

    await expect(movieItem).toBeVisible();
    await expect(movieItem.getByRole('img', { name: /poster of The Union/ })).toBeVisible();
    await expect(movieItem.getByRole('heading', { name: 'The Union' })).toBeVisible();
    await expect(movieItem.getByLabel('rating')).toBeVisible();

    const movieLink = movieItem.getByRole('link').first();
    await expect(movieLink).toBeVisible();
    const href = await movieLink.getAttribute('href');
    expect(href).toContain('/movie?id=');
  });

  test('Add Movie with Very Long Title', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;
    const longTitle = 'The Ministry of Ungentlemanly Warfare';

    await page.getByRole('textbox', { name: 'Add Item' }).fill(longTitle);
    await page.getByRole('button', { name: new RegExp(longTitle) }).first().click();
    await expect(
      page.getByRole('listitem', { name: 'movie' }).filter({ hasText: longTitle }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByRole('heading', { name: longTitle })).toBeVisible();
  });
});
