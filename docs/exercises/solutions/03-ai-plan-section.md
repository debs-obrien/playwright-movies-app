# Solution 03 — AI plan section

A minimal section looks like:

```markdown
### 7. Sharing Movie Lists

**Seed:** Use fixtures from `tests/helpers/list-fixtures.ts` (via `tests/logged-in/seed.spec.ts`)

#### 7.1 Open Share Dialog
**Steps:**
1. On View List (`listPage`), click Share
2. Observe the dialog

**Expected Results:**
- Dialog heading includes the list name
- URL textbox contains `/list?id=`
```

Then generate one test with `.github/prompts/playwright-test-generate.prompt.md`, rewrite onto `listPage` with the **movies-playwright** skill, and check the rubric in `docs/AI-TESTING.md`. Full example plan: `specs/movies-list-plan.md`. Planner prompt: `.github/prompts/playwright-test-plan.prompt.md`.
