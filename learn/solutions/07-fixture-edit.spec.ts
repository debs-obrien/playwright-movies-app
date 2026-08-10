import { expect, test } from '../../tests/helpers/list-fixtures';

test('scratch: edit list name via listPage fixture', async ({ listPage }) => {
  const page = listPage;

  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('my action movies');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue(
    'my action movies',
  );
});
