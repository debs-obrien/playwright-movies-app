# Solution 01 — beforeEach to fixtures

Prefer importing fixtures and dropping duplicated create/open flows:

```typescript
import { expect, test } from '../../helpers/list-fixtures';

test('editing an existing list', async ({ listPage }) => {
  const page = listPage;
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('my action movies');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('my action movies');
});
```

Reference implementation: `tests/logged-in/manage-lists-fixtures.spec.ts`.
