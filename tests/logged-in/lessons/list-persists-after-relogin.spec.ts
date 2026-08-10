/**
 * Lesson: list data survives logout/login (mock API persistence + storageState round-trip).
 */
import { expect, test } from '../../helpers/list-fixtures';
import { addMovie, openLists } from '../../helpers/list-utilities';

test.describe('Lesson: persistence after logout/login', () => {
  test('list and movies remain after logout and login', async ({ emptyListPage }) => {
    const page = emptyListPage;

    await addMovie(page, 'Twisters');
    await openLists(page);
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();

    await test.step('logout', async () => {
      await page.getByRole('button', { name: 'User Profile' }).click();
      await page.getByRole('button', { name: 'Logout' }).click();
      await expect(page.getByRole('banner').getByLabel('Log In')).toBeVisible();
    });

    await test.step('login again', async () => {
      await page.getByRole('banner').getByLabel('Log In').click();
      await page
        .getByRole('textbox', { name: 'Email address' })
        .fill(process.env.MOVIES_USERNAME!);
      await page.getByRole('textbox', { name: 'Password' }).fill(process.env.MOVIES_PASSWORD!);
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByRole('button', { name: 'User Profile' })).toBeVisible();
    });

    await openLists(page);
    const listItem = page
      .getByRole('listitem', { name: 'movie list' })
      .filter({ hasText: 'my favorite movies' });
    await expect(listItem).toBeVisible();
    await listItem.getByRole('link', { name: /my favorite movies/i }).click();
    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByText(/Twisters/i)).toBeVisible();
  });
});
