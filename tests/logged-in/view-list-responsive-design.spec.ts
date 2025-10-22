// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Viewing Movie Lists', { tag: '@agent' }, () => {
  test('View List on Different Screen Sizes (Responsive Design)', async ({ listPage, context }) => {
    const page = listPage;

    // 1. Load the list view page (fixture already navigates here)

    // 2. Resize browser to mobile width (375px)
    await page.setViewportSize({ width: 375, height: 667 });

    // 3. Observe layout and scroll behavior
    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();

    // 4. Resize browser to tablet width (768px)
    await page.setViewportSize({ width: 768, height: 1024 });

    // 5. Observe layout adjustment
    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();

    // 6. Resize to desktop width (1440px)
    await page.setViewportSize({ width: 1440, height: 900 });

    // 7. Observe final layout
    await expect(page.getByRole('img', { name: 'poster of Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
  });
});
