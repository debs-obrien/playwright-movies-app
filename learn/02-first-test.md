# 02 First test and credentials

## Goal

Explore login and logout, then write a small logged-out auth test using `.env` credentials without Codegen.

## Read first

- [Authentication](https://playwright.dev/docs/auth) (module 06 covers saved sessions with `storageState`)
- [Agent house style](/AGENTS)

## Example: login and logout

The canonical `auth.spec.ts` uses role locators and env credentials:

```typescript
test('user can log out', async ({ page }) => {
  await page.goto('');
  await page.getByRole('banner').getByLabel('Log In').click();

  await page.getByRole('textbox', { name: 'Email address' })
    .fill(process.env.MOVIES_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.MOVIES_PASSWORD!);
  await page.getByRole('button', { name: 'login' }).click();

  await expect(page.getByRole('button', { name: 'User Profile' })).toBeVisible();

  await page.getByRole('button', { name: 'User Profile' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page.getByRole('banner').getByLabel('Log In')).toBeVisible();
});
```

## Practice on a clone

Set `MOVIES_USERNAME` and `MOVIES_PASSWORD` in `.env`. Write a scratch spec under `tests/logged-out/` that follows the same pattern, then run:

```bash
npx playwright test tests/logged-out/my-auth.spec.ts --project=chromium
```

Explore the flow first with `npm run dev` and `npx playwright cli`, or use UI Mode if you prefer a visual pass.

## Key takeaways

- The test logs in and out successfully.
- Credentials come from `process.env`, not string literals.
- Locators are role or label based.
- You did not use Codegen or a test recorder.

Next: [03 ARIA snapshots](/03-aria-snapshots).
