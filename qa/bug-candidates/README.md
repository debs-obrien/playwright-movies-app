# Endform demo seed bugs

**Speaker start branch for the talk:** `cursor/endform-seed-bugs-e1e9` (bugs present).

**Fix / “PR out” branch:** `cursor/fix-endform-seed-bugs-e1e9` (this tree when on the fix PR).

| Candidate | Symptom | Area |
|-----------|---------|------|
| [`hamburger-missing-accessible-name.md`](./hamburger-missing-accessible-name.md) | Icon-only menu button has no accessible name | a11y / nav |
| [`mobile-poster-full-bleed.md`](./mobile-poster-full-bleed.md) | Movie poster overflows on mobile detail | detail / styles |
| [`drawer-tab-escapes-dialog.md`](./drawer-tab-escapes-dialog.md) | Tab focus escapes open nav drawer | a11y / nav |

## Talk flow

1. Checkout `cursor/endform-seed-bugs-e1e9`; `npm run dev` → `http://127.0.0.1:3000`
2. Run **site-bug-hunt** (skills on PR #89) against local; compare with these candidates
3. Show screenshots / axe / playwright-cli snapshots
4. Open the draft **fix** PR (`cursor/fix-endform-seed-bugs-e1e9` → base `cursor/endform-seed-bugs-e1e9`) and run `npx playwright test tests/logged-out/endform-demo-regressions.spec.ts`

Do not merge the seed branch into `main`.
