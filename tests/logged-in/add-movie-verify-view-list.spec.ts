// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { addMovie } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('Adding Movies to Lists', { tag: '@agent' }, () => {
  test('Add Movie and Verify on View List Page', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Add "The Union" using the `addMovie` utility
    await addMovie(page, 'The Union');

    // 3. Click "View List" link from navigation
    await page.getByRole('link', { name: 'View List' }).click();

    // 4. Scroll through the movie posters (verify visibility)
    const movieItem = page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'The Union' });

    // Verify "The Union" appears in the View List page
    await expect(movieItem).toBeVisible();

    // Verify movie displays with poster image
    await expect(movieItem.getByRole('img', { name: /poster of The Union/ })).toBeVisible();

    // Verify movie displays with title
    await expect(movieItem.getByRole('heading', { name: 'The Union' })).toBeVisible();

    // Verify movie displays with rating stars
    await expect(movieItem.getByLabel('rating')).toBeVisible();

    // Verify movie poster is clickable and links to movie details
    const movieLink = movieItem.getByRole('link').first();
    await expect(movieLink).toBeVisible();
    const href = await movieLink.getAttribute('href');
    expect(href).toContain('/movie?id=');
  });
});
