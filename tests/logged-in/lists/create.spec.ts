// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.

import { test, expect } from '../../helpers/base-test';
import { openLists } from '../../helpers/list-utilities';

test.describe('Creating New Lists', { tag: '@agent' }, () => {
  test('Create List with Valid Details', async ({ page }) => {
    await page.goto('');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    await expect(page.getByRole('heading', { name: 'Create New List' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Description' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Name' }).fill('My Action Movies');
    await page.getByRole('textbox', { name: 'Description' }).fill('A collection of my favorite action films');

    await expect(page.getByRole('combobox', { name: 'Public List?' })).toHaveText('Yes');

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'My Action Movies' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
  });

  test('Create List with Only Name - Minimum Valid Data', async ({ page }) => {
    await page.goto('');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill('Minimal List');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Minimal List' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
  });

  test('Create List with Empty Name - Negative Test', async ({ page }) => {
    await page.goto('');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    await page.getByRole('textbox', { name: 'Description' }).fill('Test description');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Create New List' })).toBeVisible();
  });

  test('Create Private List', async ({ page }) => {
    await page.goto('');

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill('My Private Collection');
    await page.getByRole('textbox', { name: 'Description' }).fill('Personal favorite movies');

    await page.getByRole('combobox', { name: 'Public List?' }).click();
    await page.getByRole('option', { name: 'No' }).click();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'My Private Collection' })).toBeVisible();

    await openLists(page);

    await expect(page.getByRole('heading', { name: 'My Lists' })).toBeVisible();

    const privateListItem = page
      .getByRole('listitem', { name: 'movie list' })
      .filter({ hasText: 'My Private Collection' });
    await expect(privateListItem).toBeVisible();
    await expect(privateListItem.getByRole('heading', { name: /My Private Collection/ })).toBeVisible();
    await expect(privateListItem.getByRole('heading', { name: /movies \(PRIVATE\)/ })).toBeVisible();
  });

  test('Create List with Very Long Name and Description - Boundary Test', async ({ page }) => {
    await page.goto('');

    const longName =
      'This is a very long name for a movie list that contains exactly two hundred characters to test the boundary conditions of the input field and ensure that the application handles long text appropriately wow';
    const longDescription =
      'This is an extremely long description for a movie list that is designed to test the boundary conditions and limits of the description field input. The purpose of this test is to verify that the application can handle very large amounts of text without breaking the user interface or causing any errors. This description continues for many more characters to reach the target of one thousand characters total. We need to ensure that the system properly validates, stores, and displays this lengthy text content. The description field should be able to accommodate detailed explanations about the movie list, including the theme, criteria for inclusion, personal notes, and any other relevant information that a user might want to share. Testing with boundary values is an important part of ensuring application robustness and reliability. This text will help us verify that the UI layout remains intact and readable even with very long content. We are now approaching the target length and should have approximately one thousand characters in this description field to properly test the system boundaries and behavior.';

    await page.getByRole('button', { name: 'User Profile' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Create New List' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill(longName);
    await page.getByRole('textbox', { name: 'Description' }).fill(longDescription);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: longName })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add Item' })).toBeVisible();
  });

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
