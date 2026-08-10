// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';
import { openLists, selectCoverImage } from '../../helpers/list-utilities';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Change Cover Image Selection', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('button', { name: 'SELECTED for Twisters' })).toBeDisabled();

    await selectCoverImage(page, 'Bad Boys: Ride or Die');
    await expect(page.getByRole('button', { name: 'SELECT for Twisters' })).toBeVisible();

    await openLists(page);

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
  });

  test('Select Cover Image from Movie', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    await selectCoverImage(page, 'The Garfield Movie');
    await expect(
      page.getByRole('button', { name: 'SELECTED for The Garfield Movie' }),
    ).toBeDisabled();

    await openLists(page);

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });

  test('Select Cover Image and See It on My Lists', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('link', { name: 'Choose Image' }).click();
    await selectCoverImage(page, 'Bad Boys: Ride or Die');

    await openLists(page);

    const listCard = page.getByRole('listitem', { name: 'movie list' }).filter({
      hasText: 'my favorite movies',
    });
    await expect(listCard.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
    await expect(listCard.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
  });

  test('Select Image for List Without Movies', async ({ emptyListPage }) => {
    const page = emptyListPage;

    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('heading', { name: 'Sorry!' })).toBeVisible();
    await expect(
      page.getByText('This list is empty. Add some movies to select a cover image.'),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
  });
});
