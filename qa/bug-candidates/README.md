# Endform demo seed bugs

**Speaker start branch:** `cursor/endform-seed-bugs-e1e9`

This branch intentionally introduces **three photogenic, fixable bugs** for Debbie’s Endform talk (“Bug Report In, Pull Request Out”). Main stays clean for learners.

| Candidate | Symptom | Area |
|-----------|---------|------|
| [`hamburger-missing-accessible-name.md`](./hamburger-missing-accessible-name.md) | Icon-only menu button has no accessible name | a11y / nav |
| [`mobile-poster-full-bleed.md`](./mobile-poster-full-bleed.md) | Movie poster overflows on mobile detail | detail / styles |
| [`drawer-tab-escapes-dialog.md`](./drawer-tab-escapes-dialog.md) | Tab focus escapes open nav drawer | a11y / nav |

## Talk flow

1. Checkout this branch; `npm run dev` → `http://127.0.0.1:3000`
2. Run **site-bug-hunt** (skills on PR / branch `cursor/site-bug-skills-e1e9`) against local; candidates already match what hunters should find
3. Show screenshots / axe / playwright-cli snapshots
4. Open the draft **fix** PR that restores the three behaviors + regression tests

Do not merge this branch into `main` for the course path.
