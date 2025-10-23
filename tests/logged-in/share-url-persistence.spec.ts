// spec: specs/movies-list-plan.md#7.5
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Sharing Movie Lists', { tag: '@agent' }, () => {
  test('Verify Share URL Persistence', async ({ listPage }) => {
    const page = listPage;

    // 1. Click "Share" button and get the URL
    await page.getByRole('button', { name: 'Share' }).click();
    
    const urlTextbox = page.getByRole('textbox', { name: 'URL' });
    const shareUrl = await urlTextbox.inputValue();

    // 2. Navigate away from the list (go to home page)
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();

    // 3. Navigate to the copied URL
    await page.goto(shareUrl);

    // 4. Verify URL remains valid and list loads correctly
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();

    // Verify all list content is preserved
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    // Verify URL parameters are correctly maintained
    expect(page.url()).toMatch(/^http:\/\/localhost:3000\/list\?id=.+&page=1$/);
  });
});
