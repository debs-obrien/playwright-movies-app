// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';
import { addMovie, createList, openLists } from '../../helpers/list-utilities';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('View All Lists', async ({ page }) => {
    await page.goto('');

    for (const list of [
      { name: 'Action Movies Collection', movie: 'Inside Out 2' },
      { name: 'Comedy Favorites', movie: 'Deadpool' },
      { name: 'Sci-Fi Adventures', movie: 'Furiosa' },
    ]) {
      await createList(page, list.name, list.name);
      await addMovie(page, list.movie);
    }

    await openLists(page);

    await expect(page.getByRole('heading', { name: 'Action Movies Collection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Comedy Favorites' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Adventures' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie list' })).toHaveCount(3);
  });

  test('View List with Cover Image', async ({ listPage }) => {
    const page = listPage;

    await openLists(page);

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'movies (PUBLIC)' })).toBeVisible();
  });

  test('List Without Chosen Cover Still Appears in My Lists', async ({ emptyListPage }) => {
    const page = emptyListPage;

    await createList(page, 'List Without Cover', 'A list with no cover image');
    await addMovie(page, 'Deadpool');
    await openLists(page);

    const listCard = page.getByRole('listitem', { name: 'movie list' }).filter({
      hasText: 'List Without Cover',
    });
    await expect(listCard).toBeVisible();
    // App always renders a poster image (placeholder when no backdrop was chosen).
    await expect(listCard.getByRole('img', { name: 'poster of List Without Cover' })).toBeVisible();
  });

  test('Verify Public List Label on My Lists', async ({ listPage }) => {
    const page = listPage;

    await openLists(page);

    const listItem = page.getByRole('listitem', { name: 'movie list' }).filter({
      hasText: 'my favorite movies',
    });
    await expect(listItem.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
    // Accessible name is "movies (PUBLIC)" when number_of_items is empty in the mock payload.
    await expect(listItem.getByRole('heading', { name: /movies \(PUBLIC\)/ })).toBeVisible();
  });

  test('Click List to View Details', async ({ listPage }) => {
    const page = listPage;

    await openLists(page);

    await page.getByRole('link', { name: 'poster of my favorite movies' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
