# Solution 02 — ARIA snapshot

Example for the movies list after seeding:

```typescript
await expect(page.getByRole('list', { name: 'movies' })).toMatchAriaSnapshot(`
  - listitem: "Twisters"
  - listitem: "The Garfield Movie"
  - listitem: "Bad Boys: Ride or Die"
`);
```

Share dialog example:

```typescript
await page.getByRole('button', { name: 'Share' }).click();
await expect(page.getByRole('dialog')).toMatchAriaSnapshot(`
  - heading "Share my favorite movies" [level=2]
  - textbox "URL": /list/
`);
```

See `tests/logged-in/manage-lists-fixtures.spec.ts`.
