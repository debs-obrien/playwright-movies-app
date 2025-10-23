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

    // 2. Verify all movies in the list are displayed with scenery images
    await expect(page.locator('body')).toMatchAriaSnapshot(`
- list:
  - listitem: "Twisters"
  - listitem: "The Garfield Movie"
  - listitem: "Bad Boys: Ride or Die"
`);

    // 3. Hover over the first movie (Twisters)
    const twistersMovie = page
      .getByRole('listitem', { name: 'movie' })
      .filter({ hasText: /Twisters/ })
      .getByRole('button');
    await twistersMovie.hover();

    // 4. Click the "SELECT" button when it appears
    // Playwright will auto-wait for the SELECT button to be visible and enabled
    await twistersMovie.getByRole('heading', { name: 'SELECT' }).click();

    // 5. Verify the button text changes to "SELECTED"
    await expect(page.getByRole('heading', { name: 'SELECTED' })).toBeVisible();

    // Wait for the backdrop_path update API call to complete
    await page.waitForResponse(response => 
      response.url().includes('/list/') && 
      response.request().method() === 'PUT' &&
      response.status() === 200
    );

    // 6. Navigate to "My Lists" via User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    // Verify cover image displays on "My Lists" overview page
    await expect(page.getByRole('img', { name: 'poster of my favorite movies' })).toBeVisible();
  });
});
