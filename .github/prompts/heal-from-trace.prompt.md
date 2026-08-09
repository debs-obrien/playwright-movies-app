---
description: heal a failing test from trace evidence
---

A Playwright test is failing. Heal it from **trace evidence**, not guesswork.

1. Open the failure trace (`npx playwright trace open …` or Trace Viewer / CLI session trace).
2. Summarize what the snapshot shows vs what the test expected.
3. Fix the test following `AGENTS.md` (role locators, fixtures, utilities).
4. Re-run the test.
5. Only if the product is wrong after evidence review, use `test.fixme()` with an observed-vs-expected comment.
6. Report: product bug, test bug, or skip.
