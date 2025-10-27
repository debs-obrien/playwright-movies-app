// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Selecting List Cover Images', { tag: '@agent' }, () => {
  test('Select Image and Verify on View List', async ({ listPage }) => {
    const page = listPage;

    // Navigate to Add/Remove Movies page to access Choose Image
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 1. Navigate to "Choose Image" page
    await page.getByRole('link', { name: 'Choose Image' }).click();

    // 2. Select an image from \"Bad Boys: Ride or Die\"
    const badBoysMovie = page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Bad Boys: Ride or Die' });
    const sceneryButton = badBoysMovie.getByRole('button');
    
    // Wait for the button to be visible and enabled before clicking
    await expect(sceneryButton).toBeVisible({ timeout: 10000 });
    await expect(sceneryButton).toBeEnabled({ timeout: 10000 });
    
    // Click the button - Playwright will automatically hover before clicking
    await sceneryButton.click({ timeout: 10000 });

    // 3. Click "View List" link
    await page.getByRole('link', { name: 'View List' }).click();

    // 4. Observe if selected image affects the view - verify View List page displays correctly
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
    
    // Verify all three movies are in the list
    await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(3);
  });
});
