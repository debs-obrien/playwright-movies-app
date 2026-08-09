// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { openLists } from '../../helpers/list-utilities';
import { listTest as test } from '../../helpers/list-fixtures';

test.describe('Editing List Details', { tag: '@agent' }, () => {
  test('Edit List Name', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('My Updated Action Movies');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByRole('heading', { name: 'My Updated Action Movies' })).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'My Updated Action Movies' })).toBeVisible();
  });

  test('Edit List Description', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill('An updated collection of thrilling action films');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue(
      'An updated collection of thrilling action films',
    );

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });

  test('Edit List Name and Description Together', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Top Sci-Fi Films');
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill('Best science fiction movies of all time');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByRole('heading', { name: 'Top Sci-Fi Films' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue(
      'Best science fiction movies of all time',
    );

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'Top Sci-Fi Films', exact: true })).toBeVisible();
  });

  test('Edit List with Empty Name - Negative Test', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('');
  });

  test('Cancel Edit Without Saving', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Test Name Change');
    await page.getByRole('textbox', { name: 'Description' }).fill('Test Description Change');
    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'list of my favorite movies' })).toBeVisible();

    await page.getByRole('link', { name: 'Edit' }).click();

    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('my favorite movies');
    await expect(page.getByRole('textbox', { name: 'Description' })).toHaveValue(
      'list of my favorite movies',
    );
  });

  test('Change List Privacy Setting', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('combobox', { name: 'Public List?' }).click();
    await page.getByRole('option', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await openLists(page);

    await expect(page.getByText('(PRIVATE)')).toBeVisible();
  });
});
