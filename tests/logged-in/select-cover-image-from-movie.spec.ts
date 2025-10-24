// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Select Cover Image from Movie', async ({ listPage }) => {
    const page = listPage;

    // Navigate to Add/Remove Movies page to access Choose Image link
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 1. From the list view page, click "Choose Image" link
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 2. Verify all movies in the list are displayed
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    // 3. Hover over the first movie (Twisters)
    const twistersMovie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Twisters/ })
      .getByRole('button');
    await twistersMovie.hover();

    // 4. Click the "SELECT" button when it appears
    // Playwright will auto-wait for the SELECT button to be visible and enabled
    await expect(twistersMovie).toContainText('SELECT');
    await twistersMovie.click();

    // 5. Verify the button text changes to "SELECTED"
    await expect(page.getByText('SELECTED')).toBeVisible();

    // 6. Navigate to "My Lists" via User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Verify cover image displays on "My Lists" overview page
    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });
});
