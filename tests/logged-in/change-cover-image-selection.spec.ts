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

    // 2. Select Twisters movie
    const twistersMovie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Twisters/ })
      .getByRole('button');
    await twistersMovie.hover();
    await expect(twistersMovie).toContainText('SELECT');
    await twistersMovie.click({ force: true });

    // Verify it's selected and wait for the state to settle
    await expect(twistersMovie).toContainText('SELECTED');
    await expect(twistersMovie).toBeDisabled();

    // 3. Hover over a different movie and click SELECT for it (Bad Boys: Ride or Die)
    const newMovie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: 'Bad Boys: Ride or Die' })
      .getByRole('button');
    await newMovie.hover();

    // 4. Click SELECT within the hovered movie container
    await expect(newMovie).toContainText('SELECT');
    await newMovie.click();

    // 5. Navigate to "My Lists" via User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Verify updated cover displays in "My Lists"
    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });
});
