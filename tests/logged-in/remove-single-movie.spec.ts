// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Removing Movies from Lists', () => {
  test('Remove Single Movie', async ({ listPage }) => {
    const page = listPage;

    // Navigate to Add/Remove Movies page
    await page.getByRole('button', { name: 'Add/Remove Movies' }).click();

    // 2. Observe existing movies in list - Twisters
    await expect(page.getByText('Twisters')).toBeVisible();

    // 2. Observe existing movies in list - The Garfield Movie
    await expect(page.getByText('The Garfield Movie')).toBeVisible();

    // 2. Observe existing movies in list - Bad Boys: Ride or Die
    await expect(page.getByText('Bad Boys: Ride or Die')).toBeVisible();

    // 3. Click "Remove" button next to "Twisters"
    await page.locator('li').filter({ hasText: 'Twisters' }).getByLabel('Remove').click();

    // Verify "Twisters" is immediately removed from the list
    await page.getByText("Twisters").first().waitFor({ state: 'hidden' });

    // Verify "The Garfield Movie" remains in the list
    await expect(page.getByText('The Garfield Movie')).toBeVisible();

    // Verify "Bad Boys: Ride or Die" remains in the list
    await expect(page.getByText('Bad Boys: Ride or Die')).toBeVisible();
  });
});
