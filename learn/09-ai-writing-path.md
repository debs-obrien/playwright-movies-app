# 09 AI writing path

## Goal

Produce one small, idiomatic test (or plan section) using skills and thin agent prompts, with evidence and the review rubric.

Modules 01 to 08 already assume you may use a coding agent. This module deepens the structured plan, generate, and heal loop.

## Read first

- [AI testing guide](/docs/AI-TESTING)
- [Agent house style](/AGENTS)

## Path A: Explore with CLI (default)

```bash
npm run dev
npx playwright cli open http://127.0.0.1:3000/ --headed
npx playwright cli snapshot
```

Draft a short test that matches `manage-lists-*` style. Run it. If it fails, open a trace before editing.

## Path B: Planner, generator, heal

Keep scope to one feature slice. Example plan section:

```markdown
## Scenarios

### Open share dialog

**Steps**
1. Open a seeded list on View List.
2. Click Share.
3. Expect a dialog with a share URL or copy control.

**Expected**
- Share UI is visible with a role-based locator
```

Use the planner and generator prompts from `.github/prompts/` on a clone, rewrite toward house style, then heal with trace evidence. Pass the [review rubric](/docs/AI-TESTING#review-rubric-every-ai-written-test).

## Key takeaways

- You chose CLI explore vs test agents deliberately.
- Output uses role locators and existing helpers or fixtures.
- No `waitForTimeout`, `force: true`, `networkidle`, or Codegen.
- The review rubric passes for what you landed.

Bonus: [10 Sharding](/10-bonus-sharding).
