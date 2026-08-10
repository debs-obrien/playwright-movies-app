# 02 — First test with your agent + credentials

## Goal

Have your coding agent explore login/logout, write a small logged-out auth test using `.env` credentials, and run it successfully — without Codegen.

## Read first

- [Authentication](https://playwright.dev/docs/auth) (overview; Lab 06 covers `storageState`)
- House style: **movies-playwright** skill / [`AGENTS.md`](../AGENTS.md)

## Explore, then write

1. [] Ensure `.env` has `MOVIES_USERNAME` and `MOVIES_PASSWORD` (from `.env.example`). Any values work against the mock.
2. [] In your agent, ask it to use the **playwright-cli** and **movies-playwright** skills to explore login → User Profile → Logout on `http://127.0.0.1:3000` (start the app with `npm run dev` if needed).
3. [] Have the agent write a scratch test, e.g. `tests/logged-out/my-auth.spec.ts`, that:
   - Uses `page.goto('')` (config `baseURL`)
   - Fills credentials from `process.env.MOVIES_USERNAME` / `MOVIES_PASSWORD` (no literals)
   - Uses `getByRole` / label locators
   - Asserts logout (e.g. Log In control visible again)
4. [] Run:

```bash
npx playwright test tests/logged-out/my-auth.spec.ts --project=chromium
```

5. [] Compare with [`tests/logged-out/auth.spec.ts`](../tests/logged-out/auth.spec.ts) or [`learn/solutions/02-auth.spec.ts`](./solutions/02-auth.spec.ts). Keep or delete the scratch file.

## Check-in

- [] Test logs in and out successfully
- [] Credentials come from `process.env`, not literals
- [] Locators are role/label based
- [] You did **not** use Codegen / a test recorder

Next: [Lab 03 — ARIA snapshots](./03-aria-snapshots.md).
