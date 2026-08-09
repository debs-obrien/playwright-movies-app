// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../helpers/list-test';

test.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  test('Manage List Pages Require Authentication', async ({ listPage, browser }) => {
    const page = listPage;
    const listId = new URL(page.url()).searchParams.get('id');
    expect(listId).toBeTruthy();

    // Public list view is available without auth; management routes are gated.
    const guestContext = await browser.newContext();
    const guest = await guestContext.newPage();

    await guest.goto(`/list/add-or-remove-items?listId=${listId}&page=1`);
    await expect(
      guest.getByRole('heading', { name: "You don't have permission to access this page!" }),
    ).toBeVisible();
    await expect(
      guest.getByText(/requires you to be logged in/i),
    ).toBeVisible();

    await guest.goto('/my-lists?page=1');
    await expect(
      guest.getByRole('heading', { name: "You don't have permission to access this page!" }),
    ).toBeVisible();

    await guest.goto(`/list?id=${listId}&page=1`);
    await expect(guest.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();

    await guestContext.close();
  });
});
