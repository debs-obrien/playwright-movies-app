# 07 beforeEach, fixtures, and helpers

## Goal

Compare shared `beforeEach` setup with list fixtures, and reuse helpers instead of pasting UI flows.

## Read first

- [Fixtures](https://playwright.dev/docs/test-fixtures)
- [Agent house style](/AGENTS)

## Fixtures vs beforeEach

**beforeEach style** (`manage-lists-before-each.spec.ts`): one shared setup block creates a list for every test.

**Fixture style** (`manage-lists-fixtures.spec.ts`): request only the seed you need:

```typescript
import { expect, test } from '../helpers/list-fixtures';

test('editing an existing list', async ({ listPage }) => {
  const page = listPage;

  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('my action movies');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('textbox', { name: 'Name' }))
    .toHaveValue('my action movies');
});
```

Three optional fixtures live on one `test` export:

| Fixture | Page state | Use when |
|---------|------------|----------|
| `emptyListPage` | New list, no movies | Empty-state UI |
| `listWithMoviesPage` | List with movies, no cover | Add, remove, search |
| `listPage` | Full seed on View List | Edit, share, navigation |

```typescript
import { expect, test } from '../../helpers/list-fixtures';

test('empty state', async ({ emptyListPage }) => { /* ... */ });
test('add a movie', async ({ listWithMoviesPage }) => { /* ... */ });
test('share a list', async ({ listPage }) => { /* ... */ });
```

Helpers such as `createList`, `addMovie`, and `selectCoverImage` live in `list-utilities.ts`.

## Practice on a clone

Write a short spec that imports `test` from `list-fixtures`, uses `{ listPage }`, and edits the list name. Run with `--project="logged-in chrome"`.

## Key takeaways

- You know when to use `listPage`, `listWithMoviesPage`, or `beforeEach`.
- New tests import from helpers and `list-fixtures`, not duplicated setup clicks.
- Assertions stay web-first.

Next: [08 Network and API](/08-network-and-api).
