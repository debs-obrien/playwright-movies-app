// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';

test.describe('List edge cases', { tag: '@agent' }, () => {
  test('Access Non-Existent List', async ({ listPage }) => {
    const page = listPage;

    await page.goto('/list?id=invalid-id&page=1');

    await expect(page.getByText('No name')).toBeVisible();
    await expect(page.getByText('No description')).toBeVisible();
    await expect(page.getByText('This list is empty.')).toBeVisible();
  });

  test('Navigate Quickly Across List Tabs', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();
    await page.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });

  test('Browser Back After Opening Edit', async ({ listPage }) => {
    const page = listPage;
    const viewUrl = page.url();

    await page.getByRole('link', { name: 'Edit' }).click();
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(viewUrl);
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
  });
});

