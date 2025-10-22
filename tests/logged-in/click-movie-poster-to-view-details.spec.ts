// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('Click Movie Poster to View Details', async ({ listPage }) => {
    const page = listPage;

    // 1. From the list view page with movies (fixture already navigates here)

    // 2. Click on the poster for "Twisters"
    await page.getByRole('link', { name: 'poster of Twisters Twisters' }).click();

    // 3. Verify navigation occurs
    await expect(page).toHaveURL(/\/movie\?id=718821&page=1/);
    await expect(page.getByRole('heading', { name: 'Twisters', level: 1 })).toBeVisible();

    // Verify user can navigate back to the list
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('heading', { name: 'my favorite movies', level: 1 })).toBeVisible();
    await expect(page).toHaveURL(/\/list\?id=/);
  });
});
