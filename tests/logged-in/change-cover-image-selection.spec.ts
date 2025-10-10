// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Change Cover Image Selection', async ({ listPage }) => {
    const page = listPage;

    // Navigate to Add/Remove Movies to access Choose Image
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 1. Navigate to "Choose Image" page
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // Select Garfield Movie first to establish a selection
    const garfieldMovie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Garfield/ })
      .getByRole('button');
    await garfieldMovie.hover();
    // Playwright will auto-wait for the SELECT button to be visible and enabled
    await garfieldMovie.getByRole('heading', { name: 'SELECT' }).click();

    // 2. Verify one movie is already selected (marked "SELECTING" or "SELECTED")
    await expect(page.getByRole('heading', { name: 'SELECTED' })).toBeVisible();

    // 3. Hover over a different movie
    await page.getByRole('button', { name: 'Scenery image' }).nth(2).hover();

    // 4. Click "SELECT" for the new movie
    await page.getByRole('button', { name: 'Scenery image SELECT', exact: true }).click();

    // 5. Navigate to "My Lists" via User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Verify updated cover displays in "My Lists"
    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });
});
