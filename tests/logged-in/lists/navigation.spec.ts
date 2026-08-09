// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { expect, test } from '../../helpers/list-fixtures';

test.describe('Navigation and User Experience', { tag: '@agent' }, () => {
  test('Navigate Between List Management Tabs', async ({ listPage }) => {
    const page = listPage;

    await expect(page.getByRole('navigation', { name: '' })).toBeVisible();

    await page.getByRole('link', { name: 'Edit' }).click();
    await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();

    await page.getByRole('link', { name: 'Choose Image' }).click();
    await expect(page.getByRole('list', { name: 'movie lists' })).toBeVisible();

    await page.getByRole('link', { name: 'Delete List' }).click();
    await expect(page.getByRole('heading', { name: 'Delete List' })).toBeVisible();
  });

  test('Verify Breadcrumb or Page Title Updates', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Navigation Test');
    await page.getByRole('textbox', { name: 'Description' }).fill('Testing navigation');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();

    await page.getByRole('link', { name: 'Edit List' }).click();
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();

    await page.getByRole('link', { name: 'Choose Image' }).click();
    await expect(page.getByRole('heading', { name: 'Navigation Test' })).toBeVisible();
  });

  test('Use Browser Back Button', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();

    await page.getByRole('textbox', { name: 'Add Item' }).fill('Inside Out 2');
    await page.getByRole('button', { name: 'Inside Out 2' }).click();
    await expect(
      page.getByRole('listitem', { name: 'movie' }).filter({ hasText: 'Inside Out 2' }),
    ).toBeVisible();

    await page.goBack();
    await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();

    await page.goForward();
    await expect(page.getByText('Inside Out 2')).toBeVisible();
  });

  test('Access List via User Profile Menu', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'User Profile' }).click();

    const myListsLink = page.getByRole('link', { name: 'My Lists' });
    await expect(myListsLink).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create New List' }).first()).toBeVisible();

    await myListsLink.click();
    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();

    const listLink = page.getByRole('link', { name: 'poster of my favorite movies' });
    await expect(listLink).toBeVisible();
    await listLink.click();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();
    await expect(page.getByRole('heading', { name: 'Create New List' })).toBeVisible();
  });
});
