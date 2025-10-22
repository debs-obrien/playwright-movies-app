// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  test('Access Non-Existent List', async ({ listPage }) => {
    const page = listPage;

    // 1. Manually navigate to URL with invalid list ID
     await page.goto('/list?id=invalid-id&page=1');

    // 2. Observe the response - verify appropriate error handling
    await expect(page.getByText('No name')).toBeVisible();
    await expect(page.getByText('No description')).toBeVisible();
    await expect(page.getByText('This list is empty.')).toBeVisible();
  });
});
