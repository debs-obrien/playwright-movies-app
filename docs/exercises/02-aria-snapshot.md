# Exercise 02 — Add an ARIA snapshot

## Goal

Strengthen a click-through test with `toMatchAriaSnapshot` on a stable region (`main` or `list` named `movies`).

## Steps

1. Open `tests/logged-in/manage-lists-fixtures.spec.ts` and study an existing snapshot.
2. Pick a list view or share dialog assertion in `tests/logged-in/lists/` that only checks a single heading.
3. Add an ARIA snapshot for the meaningful structure (heading + key controls or movie list items).
4. Run the test; if the snapshot mismatches, update it deliberately—do not weaken to a vague text check.

## Done when

- Snapshot uses role-based structure.
- Test fails if a key control disappears.
- Locators remain `getByRole` / label-based.
