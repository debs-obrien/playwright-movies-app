// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { selectCoverImage } from '../../helpers/list-utilities';
import { emptyListTest, listTest, listWithMoviesTest } from '../../helpers/list-fixtures';

listTest.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  listTest('Change Cover Image Selection', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('button', { name: 'SELECTED for Twisters' })).toBeDisabled();

    await selectCoverImage(page, 'Bad Boys: Ride or Die');
    await expect(page.getByRole('button', { name: 'SELECT for Twisters' })).toBeVisible();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
  });
});

listWithMoviesTest.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  listWithMoviesTest('Select Cover Image from Movie', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    await selectCoverImage(page, 'The Garfield Movie');
    await expect(
      page.getByRole('button', { name: 'SELECTED for The Garfield Movie' }),
    ).toBeDisabled();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });

  listWithMoviesTest('Select Image and Verify on View List', async ({ listWithMoviesPage }) => {
    const page = listWithMoviesPage;

    await page.getByRole('link', { name: 'Choose Image' }).click();

    const badBoysMovie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: 'Bad Boys: Ride or Die' });
    const sceneryButton = badBoysMovie.getByRole('button');

    await expect(sceneryButton).toBeVisible({ timeout: 10000 });
    await expect(sceneryButton).toBeEnabled({ timeout: 10000 });
    await sceneryButton.click({ timeout: 10000 });

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(3);
  });
});

emptyListTest.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  emptyListTest('Select Image for List Without Movies', async ({ emptyListPage }) => {
    const page = emptyListPage;

    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('heading', { name: 'Sorry!' })).toBeVisible();
    await expect(
      page.getByText('This list is empty. Add some movies to select a cover image.'),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
  });
});
