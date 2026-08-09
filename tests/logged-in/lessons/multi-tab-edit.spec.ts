/**
 * Lesson: concurrent edit across two tabs/pages in one browser context.
 * Last save wins; both pages agree after reload.
 */
import { expect, test } from '../../helpers/list-fixtures';

test.describe('Lesson: multi-tab list edit', () => {
  test('last saved name wins across two tabs', async ({ listPage, context }) => {
    const pageA = listPage;
    const listUrl = pageA.url();

    await pageA.getByRole('link', { name: 'Edit' }).click();
    await expect(pageA.getByRole('textbox', { name: 'Name' })).toBeVisible();

    const pageB = await context.newPage();
    await pageB.goto(listUrl);
    await pageB.getByRole('link', { name: 'Edit' }).click();
    await expect(pageB.getByRole('textbox', { name: 'Name' })).toBeVisible();

    await test.step('save Version A in tab 1', async () => {
      await pageA.getByRole('textbox', { name: 'Name' }).fill('Version A');
      await pageA.getByRole('button', { name: 'Save' }).click();
      await expect(pageA.getByRole('textbox', { name: 'Name' })).toHaveValue('Version A');
    });

    await test.step('save Version B in tab 2', async () => {
      await pageB.getByRole('textbox', { name: 'Name' }).fill('Version B');
      await pageB.getByRole('button', { name: 'Save' }).click();
      await expect(pageB.getByRole('textbox', { name: 'Name' })).toHaveValue('Version B');
    });

    await pageA.reload();
    await pageB.reload();

    await expect(pageA.getByRole('heading', { name: 'Version B', exact: true })).toBeVisible();
    await expect(pageB.getByRole('heading', { name: 'Version B', exact: true })).toBeVisible();

    await pageB.close();
  });
});
