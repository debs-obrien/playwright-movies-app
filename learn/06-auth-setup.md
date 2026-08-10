# 06 Auth setup and storageState

## Goal

Understand how logged-in tests reuse a saved session from a setup project instead of logging in in every file.

## Read first

- [Authentication](https://playwright.dev/docs/auth)

## Setup project

`login.setup.ts` logs in once and writes storage state to disk:

```typescript
setup('log user in and verify profile access', async ({ page }) => {
  await page.goto('');
  await page.getByRole('banner').getByLabel('Log In').click();

  await page.getByRole('textbox', { name: 'Email address' })
    .fill(process.env.MOVIES_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.MOVIES_PASSWORD!);
  await page.getByRole('button', { name: 'login' }).click();

  await page.getByRole('button', { name: 'User Profile' }).click();
  await expect(page.getByRole('link', { name: 'Create New List' })).toBeVisible();

  await page.context().storageState({ path: STORAGE_STATE });
});
```

The `logged-in chrome` project depends on `setup` and loads `playwright/.auth/user.json`.

Run a logged-in test:

```bash
npx playwright test tests/logged-in/manage-lists-before-each.spec.ts --project="logged-in chrome"
```

Confirm setup ran first in the list reporter or UI Mode.

## Guest vs logged-in

Some list URLs work without the saved session. Logged-in project tests assume the setup user. Module 02 taught a one-off login test; day-to-day logged-in work uses `storageState`.

## Done when

```bash
npx playwright test tests/logged-in/manage-lists-before-each.spec.ts --project="logged-in chrome"
```

passes, and the reporter shows the `setup` project running before `logged-in chrome`.

## Key takeaways

- You can explain why setup is a separate project.
- You know where storage state is written and consumed.
- A logged-in test passes using the saved session.

Next: [07 Fixtures and helpers](/07-fixtures-helpers).
