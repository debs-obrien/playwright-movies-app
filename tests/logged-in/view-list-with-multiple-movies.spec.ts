// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('View List with Multiple Movies', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to the list view page (fixture provides pre-populated list and navigates here)

    // 2. Observe the list display
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();

    // 3. Verify each movie shows a poster
    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'poster of The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'poster of Bad Boys: Ride or Die' })).toBeVisible();

    // 4. Verify each movie shows a title
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    // 5. Verify each movie shows a rating (stars)
    const movieItems = page.getByRole('listitem', { name: 'movie' });
    await expect(movieItems).toHaveCount(3);
    
    // Verify each movie has star ratings displayed
    for (let i = 0; i < 3; i++) {
      await expect(movieItems.nth(i).getByText('★').first()).toBeVisible();
    }
  });
});
