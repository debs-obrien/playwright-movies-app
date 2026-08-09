// spec: specs/movies-list-plan.md
// seed: tests/logged-in/seed.spec.ts

import { expect } from '@playwright/test';
import { listTest as test } from '../../helpers/list-fixtures';

test.describe('Deleting Movie Lists', { tag: '@agent' }, () => {
  test('Delete List with Confirmation', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();

    await expect(
      page.getByText('Click the button below if you are sure you want to delete this list.'),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText("There's no lists yet. Let's change that!")).toBeVisible();
  });

  test('Delete List with Movies', async ({ listPage }) => {
    const page = listPage;

    await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
- listitem "movie":
  - link /poster of Twisters/:
    - img "poster of Twisters"
    - heading "Twisters" [level=2]
- listitem "movie":
  - link /poster of The Garfield Movie/:
    - img "poster of The Garfield Movie"
    - heading "The Garfield Movie" [level=2]
- listitem "movie":
  - link /Bad Boys/:
    - img /Bad Boys/
    - heading /Bad Boys/ [level=2]
`);

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();
    await page.getByRole('button', { name: 'Click the button below if you' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText("There's no lists yet. Let's change that!")).toBeVisible();
  });

  test('Navigate to Delete Page and Cancel', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('link', { name: 'Delete List' }).click();

    await expect(page.getByRole('heading', { name: 'Delete List' })).toBeVisible();

    await page.getByRole('link', { name: 'View List' }).click();

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
  });
});
