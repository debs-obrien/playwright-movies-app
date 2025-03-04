import { test, expect } from '@playwright/test';

test.describe('Theme Mode Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should have light mode initially', async ({ page }) => {
    // Assert that the body has the 'light' class initially
    await page.emulateMedia({contrast: 'more'});
    await expect(page.locator('body')).toHaveClass(/light/);
  });

  test('should switch to dark mode and back to light mode using icons', async ({
    page,
  }) => {
    // Click the moon icon to switch to dark mode and assert it has the 'dark' class
    await page.getByRole('banner').getByRole('button', { name: '☾' }).click();
    await expect(page.locator('body')).toHaveClass(/dark/);

    // Click the sun icon to switch back to light mode and assert it has the 'light' class
    await page.getByRole('banner').getByRole('button', { name: '☀' }).click();
    await expect(page.locator('body')).toHaveClass(/light/);
  });

  test('should toggle between dark mode and light mode using toggle switch', async ({
    page,
  }) => {
    // Click the toggle switch to switch to dark mode and assert it has the 'dark' class
    await page.getByRole('banner').getByText('Toggle Switch').click();
    await expect(page.locator('body')).toHaveClass(/dark/);

    // Click the toggle switch to switch to light mode and assert it has the 'light' class
    await page.getByRole('banner').getByText('Toggle Switch').click();
    await expect(page.locator('body')).toHaveClass(/light/);
  });
});
