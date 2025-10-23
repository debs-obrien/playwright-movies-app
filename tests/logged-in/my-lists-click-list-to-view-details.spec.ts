// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { openLists } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('Click List to View Details', async ({ listPage }) => {
    const page = listPage;

    // 1. Navigate to My Lists page
    await openLists(page);

    // Wait for the My Lists page to fully load
    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();
    
    // Ensure the list with cover image is visible before clicking
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();

    // 2. Click on my favorite movies list to view details
    const listLink = page.getByRole('link', { name: 'poster of my favorite movies' });
    await expect(listLink).toBeVisible();
    await listLink.click();

    // 3. Verify the list name is displayed
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();

    // 3. Verify all movies display correctly - Twisters
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
