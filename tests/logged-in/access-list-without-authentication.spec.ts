// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect, test } from '../helpers/list-fixtures';

test.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  test('Manage List Pages Require Authentication', async ({ listPage, browser }) => {
    const page = listPage;
    const url = new URL(page.url());
    const listId = url.searchParams.get('id') ?? url.searchParams.get('listId');
    expect(listId, `expected list id in URL: ${page.url()}`).toBeTruthy();

    // Public list view is available without auth; management routes are gated.
    // Auth tokens live in localStorage (via storageState), so create an explicitly empty context.
    const guestContext = await browser.newContext({
      storageState: { cookies: [], origins: [] },
    });
    const guest = await guestContext.newPage();

    await guest.goto(`/list/add-or-remove-items?listId=${listId}&page=1`);
    await expect(guest.getByRole('banner').getByLabel('Log In')).toBeVisible();
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
