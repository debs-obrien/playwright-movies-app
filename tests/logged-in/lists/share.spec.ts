// Consolidated @agent coverage. Prefer manage-lists-* for teaching style.
// Share Private List remains in tests/logged-in/share-private-list.spec.ts.

import { expect, test } from '../../helpers/list-fixtures';

test.describe('Sharing Movie Lists', { tag: '@agent' }, () => {
  test('Open Share Dialog', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'Share' }).click();

    await expect(page.getByRole('heading', { name: 'Share my favorite movies' })).toBeVisible();

    const urlTextbox = page.getByRole('textbox', { name: 'URL' });
    await expect(urlTextbox).toBeVisible();
    await expect(urlTextbox).toHaveValue(/^http:\/\/127\.0\.0\.1:3000\/list\?id=.+&page=1$/);
  });

  test('Open List from Share URL', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'Share' }).click();

    const sharedUrl = await page.getByRole('textbox', { name: 'URL' }).inputValue();
    await page.goto(sharedUrl);

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Garfield Movie' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bad Boys: Ride or Die' })).toBeVisible();
  });

  test('Close Share Dialog by Clicking Outside', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('Share URL Still Works After Leaving the Page', async ({ listPage }) => {
    const page = listPage;

    await page.getByRole('button', { name: 'Share' }).click();
    const shareUrl = await page.getByRole('textbox', { name: 'URL' }).inputValue();

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Popular' })).toBeVisible();

    await page.goto(shareUrl);

    await expect(page.getByRole('heading', { name: 'my favorite movies', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Twisters' })).toBeVisible();
    await expect(page.url()).toMatch(/\/list\?id=.+&page=1$/);
  });
});
