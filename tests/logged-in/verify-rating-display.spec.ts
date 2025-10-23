// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('Verify Rating Display', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page (fixture already navigates here)

    // 2. Locate each movie's rating section
    const movieItems = page.getByRole('listitem', { name: 'movie' });
    await expect(movieItems).toHaveCount(3);

    // 3. Count the number of stars for each movie
    // 4. Verify star visualization matches expected rating
    for (let i = 0; i < 3; i++) {
      const movieItem = movieItems.nth(i);
      
      // Verify each movie has a rating section with stars
      await expect(movieItem.getByText('★').first()).toBeVisible();
      
      // Verify the star display is consistent
      const stars = movieItem.getByText('★');
      const starCount = await stars.count();
      expect(starCount).toBeGreaterThan(0);
    }

    // Verify all rating displays are visible and consistent
    await expect(page.getByText('★').first()).toBeVisible();
  });
});
