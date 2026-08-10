# 06 — Auth setup and storageState

## Goal

Understand how logged-in tests reuse a saved session from a setup project instead of logging in every file.

## Read first

- [Authentication](https://playwright.dev/docs/auth)
- Ask your agent to walk through [`tests/logged-in/login.setup.ts`](../tests/logged-in/login.setup.ts) and projects in [`playwright.config.ts`](../playwright.config.ts) (`setup` → `logged-in chrome`)

## Walk the flow

1. [] Confirm the flow: login UI → assert **Create New List** → `storageState({ path: STORAGE_STATE })`.
2. [] Note `STORAGE_STATE` path (`playwright/.auth/user.json`) and that `logged-in chrome` sets `storageState: STORAGE_STATE` and `dependencies: ['setup']`.
3. [] Run a single logged-in test:

```bash
npx playwright test tests/logged-in/manage-lists-before-each.spec.ts --project="logged-in chrome"
```

4. [] Confirm setup ran first (list reporter / UI Mode). Optionally peek at `playwright/.auth/user.json` after a run (gitignored).

## Guest vs logged-in

Some list URLs are reachable without the saved session (see `access-list-without-authentication.spec.ts`). Logged-in project tests assume the setup user. Lab 02 taught a one-off login test for learning; day-to-day logged-in work uses `storageState`.

## Check-in

- [] You can explain why setup is a separate project
- [] You know where storage state is written and consumed
- [] A logged-in test passes using the saved session

Next: [Lab 07 — Fixtures and helpers](./07-fixtures-helpers.md).
