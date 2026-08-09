// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { selectCoverImage } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Select Cover Image from Movie', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();

    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    // Fixture may already have Twisters selected; choose a different movie
    await selectCoverImage(page, 'The Garfield Movie');
    await expect(
      page.getByRole('button', { name: 'SELECTED for The Garfield Movie' }),
    ).toBeDisabled();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });
});
