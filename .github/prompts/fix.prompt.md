---
description: runs and fixes the tests
agent: '🎭 healer'
---

Run and fix any failing tests.

- Inspect a **trace** or live debug snapshot before changing locators (`npx playwright trace` / Trace Viewer, or CLI `tracing-start`/`tracing-stop`).
- Follow `AGENTS.md`: role locators, fixtures, utilities, no `waitForTimeout` / `networkidle` / `force`.
- Prefer fixing the test or documenting a product bug over skipping.
- Use `test.fixme()` only when confident the product is wrong; comment observed vs expected and that evidence was checked.
- State whether each fix addresses a product bug, test bug, or skip.
