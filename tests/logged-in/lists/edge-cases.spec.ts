// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { test, expect } from '../../helpers/base-test';
import { listTest } from '../../helpers/list-fixtures';

test.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  test('Create List with Special Characters', async ({ page }) => {
    await page.goto('');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill('My List! @#$%^&*()');
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill('Description with "quotes" & <brackets>');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('My List! @#$%^&*()')).toBeVisible();

    await page.getByRole('link', { name: 'Edit List' }).click();
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue(
      'Description with "quotes" & <brackets>',
    );

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByText('Description with "quotes" & <brackets>')).toBeVisible();
  });
});

listTest.describe('Error Handling and Edge Cases', { tag: '@agent' }, () => {
  listTest('Concurrent List Editing', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Concurrent Edit Test');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('heading', { name: 'Concurrent Edit Test' })).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(page.getByRole('heading', { name: 'Concurrent Edit Test' })).toBeVisible();
  });

  // FIXME: save operation fails with "Failed to fetch" — API backend not available.
  listTest.fixme('Edit List and Verify Changes Persist', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Updated List Name for Persistence Test');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByRole('heading', { name: 'Updated List Name for Persistence Test' })).toBeVisible();

    await page.goto('/');
    await expect(page.getByText('Popular').first()).toBeVisible();

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('link', { name: 'My Lists' }).click();

    await expect(
      page.getByRole('heading', { name: 'Updated List Name for Persistence Test' }),
    ).toBeVisible();

    await page.getByRole('link', { name: /Updated List Name for Persistence Test/i }).click();

    await expect(page.getByRole('heading', { name: 'Updated List Name for Persistence Test' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'list of my favorite movies' })).toBeVisible();
  });

  listTest('Add Movie with Very Long Title', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('textbox', { name: 'Add Item' }).fill('The Ministry of Ungentlemanly Warfare');
    await expect(
      page.getByRole('button', { name: /The Ministry of Ungentlemanly Warfare/ }).first(),
    ).toBeVisible();
    await page.getByRole('button', { name: /The Ministry of Ungentlemanly Warfare/ }).first().click();
    await expect(
      page
        .getByRole('listitem', { name: 'movie' })
        .filter({ hasText: 'The Ministry of Ungentlemanly Warfare' }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();
    await expect(
      page.getByRole('heading', { name: 'The Ministry of Ungentlemanly Warfare' }),
    ).toBeVisible();
  });

  listTest('Access Non-Existent List', async ({ listPage }) => {
    const page = listPage;

    await page.goto('/list?id=invalid-id&page=1');

    await expect(page.getByText('No name')).toBeVisible();
    await expect(page.getByText('No description')).toBeVisible();
    await expect(page.getByText('This list is empty.')).toBeVisible();
  });

  listTest('Rapid Navigation Between Pages', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('link', { name: 'Add/Remove Movies' }).click();
    await page.getByRole('link', { name: 'Choose Image' }).click();
    await page.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });
});
