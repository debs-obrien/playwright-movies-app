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
    // The visible control is the label; the checkbox itself is partially covered
    // by the sliding knob, so click the label rather than check()/uncheck().
    const themeToggle = page.getByRole('banner').getByRole('checkbox', { name: 'Toggle Switch' });
    const themeToggleLabel = page.getByRole('banner').getByText('Toggle Switch');

    await themeToggleLabel.click();
    await expect(page.locator('body')).toHaveClass(/dark/);
    await expect(themeToggle).toBeChecked();

    await themeToggleLabel.click();
    await expect(page.locator('body')).toHaveClass(/light/);
    await expect(themeToggle).not.toBeChecked();
  });
});
