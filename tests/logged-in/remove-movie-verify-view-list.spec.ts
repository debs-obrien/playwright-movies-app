// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Removing Movies from Lists', { tag: '@agent' }, () => {
  test('Remove Movie and Verify on View List Page', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to Add/Remove Movies page
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Remove "Bad Boys: Ride or Die"
    const initialCount = await page.getByRole('listitem', { name: 'movie' }).count();
    await page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Bad Boys: Ride or Die' }).getByRole('button', { name: 'Remove' }).click();

    // Verify movie is removed from the list
    await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(initialCount - 1);
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Bad Boys: Ride or Die' })).toHaveCount(0);

    // 3. Navigate to "View List" via the navigation tabs
    await page.getByRole('link', { name: 'View List' }).click();

    // 4. Scroll through the displayed movies and verify "Bad Boys: Ride or Die" is not present
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).not.toBeVisible();

    // Verify only remaining movies are displayed with posters
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
  });
});
