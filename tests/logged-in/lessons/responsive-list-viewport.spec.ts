/**
 * Lesson: test.use({ viewport }) for responsive list view checks.
 */
import { expect, test } from '../../helpers/list-fixtures';

test.describe('Lesson: list viewports', () => {
  test.describe('narrow phone viewport', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('view list remains usable on a narrow screen', async ({ listPage }) => {
      const page = listPage;

      await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
      await expect(page.getByRole('list', { name: 'movies' })).toBeVisible();
      await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(3);
    });
  });

  test.describe('wide desktop viewport', () => {
    test.use({ viewport: { width: 1600, height: 1200 } });

    test('view list shows movies and share on a wide screen', async ({ listPage }) => {
      const page = listPage;

      await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Share' })).toBeVisible();
      await expect(page.getByRole('listitem', { name: 'movie' })).toHaveCount(3);
    });
  });
});
