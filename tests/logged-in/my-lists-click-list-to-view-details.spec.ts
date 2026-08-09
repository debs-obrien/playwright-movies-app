// spec: specs/movies-list-plan.md
// seed: tests/helpers/list-test.ts

import { expect } from '@playwright/test';
import { openLists } from '../helpers/list-utilities';
import { listTest as test } from '../helpers/list-test';

test.describe('My Lists Overview Page', { tag: '@agent' }, () => {
  test('Click List to View Details', async ({ listPage }) => {
    const page = listPage;

    await openLists(page);

    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'my favorite movies' })).toBeVisible();

    const listLink = page.getByRole('link', { name: 'poster of my favorite movies' });
    await expect(listLink).toBeVisible();
    await listLink.click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
  });
});
