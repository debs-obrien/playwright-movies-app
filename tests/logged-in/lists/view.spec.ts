// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { emptyListTest, listTest as test } from '../../helpers/list-fixtures';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('View List with Multiple Movies', async ({ listPage }) => {
    const page = listPage;

    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();

    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'poster of The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'poster of Bad Boys: Ride or Die' })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    const movieItems = page.getByRole('listitem', { name: 'movie' });
    await expect(movieItems).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      await expect(movieItems.nth(i).getByText('★').first()).toBeVisible();
    }
  });

  test('Verify Rating Display', async ({ listPage }) => {
    const page = listPage;
    const movieItems = page.getByRole('listitem', { name: 'movie' });

    await expect(movieItems).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      const movieItem = movieItems.nth(i);
      await expect(movieItem.getByText('★').first()).toBeVisible();
      await expect(movieItem.getByText('★')).not.toHaveCount(0);
    }
  });

  test('View List on Different Screen Sizes (Responsive Design)', async ({ listPage }) => {
    const page = listPage;

    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });

    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();

    await page.setViewportSize({ width: 1440, height: 900 });

    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
  });

  test('Click Movie Poster to View Details', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'poster of Twisters Twisters' }).click();

    await expect(page).toHaveURL(/\/movie\?id=718821&page=1/);
    await expect(page.getByRole('heading', { name: 'Twisters', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('heading', { name: 'my favorite movies', level: 1 })).toBeVisible();
    await expect(page).toHaveURL(/\/list\?id=/);
  });

  test('Verify Movie Order is Maintained', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Deadpool');
    await page.getByRole('button', { name: /Deadpool & Wolverine/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Deadpool & Wolverine/i)).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: /Inside Out 2/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Inside Out 2/i)).toBeVisible();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Despicable Me 4');
    await page.getByRole('button', { name: /Despicable Me 4/i }).first().click();
    await expect(page.getByLabel('movies').getByText(/Despicable Me 4/i)).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();

    const movies = page.getByRole('list', { name: 'movies' }).getByRole('listitem');
    await expect(movies.nth(0)).toContainText('Twisters');
    await expect(movies.nth(1)).toContainText('The Garfield Movie');
    await expect(movies.nth(2)).toContainText('Bad Boys: Ride or Die');
    await expect(movies.nth(3)).toContainText('Deadpool & Wolverine');
    await expect(movies.nth(4)).toContainText('Inside Out 2');
    await expect(movies.nth(5)).toContainText('Despicable Me 4');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();
    await page.getByRole('link', { name: /my favorite movies/i }).click();

    const moviesAfterNavigation = page.getByRole('list', { name: 'movies' }).getByRole('listitem');
    await expect(moviesAfterNavigation.nth(0)).toContainText('Twisters');
    await expect(moviesAfterNavigation.nth(1)).toContainText('The Garfield Movie');
    await expect(moviesAfterNavigation.nth(2)).toContainText('Bad Boys: Ride or Die');
    await expect(moviesAfterNavigation.nth(3)).toContainText('Deadpool & Wolverine');
    await expect(moviesAfterNavigation.nth(4)).toContainText('Inside Out 2');
    await expect(moviesAfterNavigation.nth(5)).toContainText('Despicable Me 4');
  });
});

emptyListTest.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  emptyListTest('View List with No Movies', async ({ emptyListPage }) => {
    const page = emptyListPage;

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByText('This list is empty.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add some movies.' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();

    await expect(page.getByRole('list', { name: 'movies' })).not.toBeVisible();
  });
});
