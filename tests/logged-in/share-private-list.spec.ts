// spec: specs/movies-list-plan.md#7.4
// seed: tests/logged-in/seed.spec.ts

import { test, expect } from '../helpers/base-test';

test.describe('Sharing Movie Lists', { tag: '@agent' }, () => {
  test('Share Private List (Edge Case)', async ({ page, browser }) => {
    // Use baseURL (127.0.0.1) so auth cookies from storageState apply.
    await page.goto('/');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('My Private List');
    await page.getByRole('textbox', { name: 'Description' }).fill('This is a private list for testing');
    await page.getByRole('combobox', { name: 'Public List?' }).click();
    await page.getByRole('option', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: 'Inside Out 2 Inside Out' }).click();

    await page.getByRole('link', { name: 'View List' }).click();

    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page.getByRole('heading', { name: 'Share My Private List' })).toBeVisible();

    const urlTextbox = page.getByRole('textbox', { name: 'URL' });
    await expect(urlTextbox).toHaveValue(/^http:\/\/127\.0\.0\.1:3000\/list\?id=.+&page=1$/);
    const shareUrl = await urlTextbox.inputValue();

    // Open the share URL in a logged-out browser context.
    // The mock currently serves list details without enforcing private visibility;
    // managing the list still requires authentication.
    const guestContext = await browser.newContext();
    const guest = await guestContext.newPage();
    await guest.goto(shareUrl);
    await expect(guest.getByRole('heading', { name: 'My Private List', exact: true })).toBeVisible();

    const listId = new URL(shareUrl).searchParams.get('id');
    await guest.goto(`/list/add-or-remove-items?listId=${listId}&page=1`);
    await expect(
      guest.getByRole('heading', { name: "You don't have permission to access this page!" }),
    ).toBeVisible();

    await guestContext.close();
  });
});
