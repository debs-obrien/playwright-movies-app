// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Navigation and User Experience', { tag: '@agent' }, () => {
  test('Use Browser Back Button', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page, click "Add/Remove Movies"
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    // 2. Add a movie
    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.waitForSelector('button:has-text("Inside Out 2")');
    await page.getByRole('button', { name: 'Inside Out 2' }).click();
    
    // Wait for movie to be added to the list
    await expect(page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' })).toBeVisible();

    // 3. Click browser back button
    await page.goBack();

    // 4. Verify previous page loads
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();

    // 5. Click browser forward button
    await page.goForward();

    // 6. Verify forward navigation works and added movie persists
    await expect(page.getByText('Inside Out 2')).toBeVisible();
  });
});
