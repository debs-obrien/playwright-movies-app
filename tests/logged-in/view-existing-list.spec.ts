// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { listTest as test } from '../helpers/list-test';
import { expect } from '@playwright/test';

test.describe('Viewing Movie Lists', () => {
  test('View Existing List', async ({ listPage }) => {
    const page = listPage;

    // Verify list title is displayed as heading
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();

    // Verify list description is displayed as subheading
    await expect(page.getByRole('heading', { name: 'list of my favorite movies', exact: true })).toBeVisible();

    // Verify Edit button is visible
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();

    // Verify Share button is visible
    await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();

    // Verify Add/Remove Movies button is visible
    await expect(page.getByRole('button', { name: 'Add/Remove Movies' })).toBeVisible();

    // Verify Create New List button is visible
    await expect(page.getByRole('button', { name: 'Create New List' })).toBeVisible();

    // Verify Twisters movie title is displayed
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();

    // Verify The Garfield Movie title is displayed
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();

    // Verify Bad Boys: Ride or Die movie title is displayed
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();

    // Verify star rating visualization is displayed
    await expect(page.getByText('★').first()).toBeVisible();
  });
});
