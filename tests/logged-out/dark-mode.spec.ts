import { test, expect } from '@playwright/test';

test.describe('Theme Mode Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should have light mode initially', async ({ page }) => {
    await page.emulateMedia({ contrast: 'more' });
    await expect(page.locator('body')).toHaveClass(/light/);
  });

  test('should switch to dark mode and back to light mode using icons', async ({
    page,
  }) => {
    await page.getByRole('banner').getByRole('button', { name: 'Enable dark mode' }).click();
    await expect(page.locator('body')).toHaveClass(/dark/);

    await page.getByRole('banner').getByRole('button', { name: 'Enable light mode' }).click();
    await expect(page.locator('body')).toHaveClass(/light/);
  });

  test('should toggle between dark mode and light mode using toggle switch', async ({
    page,
  }) => {
    const themeToggle = page.getByRole('banner').getByRole('checkbox', { name: 'Toggle Switch' });

    await themeToggle.check();
    await expect(page.locator('body')).toHaveClass(/dark/);
    await expect(themeToggle).toBeChecked();

    await themeToggle.uncheck();
    await expect(page.locator('body')).toHaveClass(/light/);
    await expect(themeToggle).not.toBeChecked();
  });
});
