// spec: specs/movies-list-plan.md#7.2
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Sharing Movie Lists', { tag: '@agent' }, () => {
  test('Copy Share URL', async ({ listPage }) => {
    const page = listPage;

    // 1. Click the "Share" button to open dialog
    await page.getByRole('button', { name: 'Share' }).click();

    // 2. Click in the URL textbox and get the URL value
    const urlTextbox = page.getByRole('textbox', { name: 'URL' });
    await urlTextbox.click();
    
    // 3. Get the URL value from the textbox (simulating copy)
    const sharedUrl = await urlTextbox.inputValue();

    // 5. Navigate to the copied URL to verify it works
    await page.goto(sharedUrl);

    // 6. Verify list displays correctly with the list name
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();

    // Verify all movies and details are visible
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
