# Sample plan section: Sharing a movie list

> Example for module 09. Keep plans this small when practicing.

## Seed

- Logged-in storage state from `login.setup.ts`
- Prefer `listPage` from `list-fixtures.ts` when the scenario needs a seeded list on View List
- Reuse `list-utilities` where a flow already exists

## Scenarios

### 1. Open share dialog

**Steps**

1. Open a seeded list (View List).
2. Click the **Share** button.
3. Expect a dialog (or complementary region) that exposes a share URL field or copy control.

**Expected**

- Share UI is visible
- URL or copy affordance is present (role or label based locator)

### 2. Close share dialog

**Steps**

1. From an open share dialog, dismiss it (Close button or Escape; use whatever the app exposes accessibly).
2. Expect the dialog to be hidden.

**Expected**

- Share dialog no longer visible
- List view still shown
