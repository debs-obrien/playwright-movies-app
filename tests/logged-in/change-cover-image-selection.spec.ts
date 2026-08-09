// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { selectCoverImage } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Change Cover Image Selection', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // Fixture already selected Twisters as the cover
    await expect(
      page.getByRole('button', { name: 'SELECTED for Twisters' }),
    ).toBeDisabled();

    await selectCoverImage(page, 'Bad Boys: Ride or Die');
    await expect(
      page.getByRole('button', { name: 'SELECT for Twisters' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();
  });
});
