import { test, expect } from '@playwright/test';

/**
 * Regressions for Endform demo seed bugs (hamburger name, mobile poster,
 * drawer focus trap). Kept focused so the talk can show one green suite.
 */
test.describe('Endform a11y / mobile regressions', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger exposes an accessible name', async ({ page }) => {
    await page.goto('');

    await test.step('open menu by accessible name', async () => {
      const openMenu = page.getByRole('button', { name: 'Open navigation menu' });
      await expect(openMenu).toBeVisible();
      await openMenu.click();
    });

    await test.step('drawer is a labeled dialog', async () => {
      await expect(
        page.getByRole('dialog', { name: 'Navigation menu' }),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Close navigation menu' }),
      ).toBeVisible();
    });
  });

  test('movie detail poster stays within a readable mobile width', async ({
    page,
  }) => {
    await page.goto('movie?id=718821&page=1');

    const artwork = page.locator('.artwork');
    await expect(artwork).toBeVisible();

    const box = await artwork.boundingBox();
    expect(box).toBeTruthy();
    // Seed bug removed max-width (~16–22rem); fixed layout must stay under viewport.
    expect(box!.width).toBeLessThanOrEqual(300);
  });

  test('nav drawer keeps Tab focus inside the dialog', async ({ page }) => {
    await page.goto('');

    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const drawer = page.getByRole('dialog', { name: 'Navigation menu' });
    await expect(drawer).toBeVisible();

    // Focus starts on the close control; Tab should cycle within the dialog.
    await expect(
      page.getByRole('button', { name: 'Close navigation menu' }),
    ).toBeFocused();

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const insideDrawer = await page.evaluate(() => {
        const dialog = document.getElementById('mobile-navigation-drawer');
        return Boolean(dialog && dialog.contains(document.activeElement));
      });
      expect(insideDrawer).toBe(true);
    }
  });
});
