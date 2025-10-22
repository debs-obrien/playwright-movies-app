// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  test('Access List Without Authentication', async ({ listPage }) => {
    const page = listPage;

    // Store list URL from authenticated session
    const listUrl = page.url();

    // 1. Logout using the Logout button in User Profile menu
    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();

    // 2. Attempt to navigate to the list URL directly while logged out
    await page.goto(listUrl);

    // 3. Observe the behavior - Access is denied with a message requiring authentication
    await expect(page.getByRole('heading', { name: "You don't have permission to access this page!" })).toBeVisible();
    await expect(page.getByRole('heading', { name: "You've tried to request a page that requires you to be logged in. Log in to your account." })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });
});
