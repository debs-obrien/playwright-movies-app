---
fingerprint: local|nav|hamburger-missing-accessible-name
url: http://127.0.0.1:3000/
target: local
severity: major
confidence: high
classification: bug
area: a11y
fix_surface: app
---

# Mobile hamburger has no accessible name

## Repro

1. `npm run dev` → open `http://127.0.0.1:3000/`
2. Set viewport to ~375×812 (mobile)
3. Inspect the top-left menu control (three bars) with an accessibility tree / axe / Playwright:
   - `page.getByRole('button', { name: /navigation menu/i })` finds nothing
4. Or run axe: “Buttons must have discernible text”

## Expected

Icon-only hamburger exposes a name such as **Open navigation menu** / **Close navigation menu** (`aria-label`).

## Actual

The control is a nameless `<button>` (only bars / decorative spans). Screen-reader and role-based automation cannot target it by name.

## Evidence

- Viewport: 375×812
- File: `movies-app/components/UI/HamburgerButton/index.js`
- Notes: intentional Endform demo seed on `cursor/endform-seed-bugs-e1e9`

## Suggested next step

- [x] Fixed via site-bugfix (see draft PR from `cursor/fix-endform-seed-bugs-e1e9`)
- [ ] Needs human
- [ ] Defer

## Fix notes

Restored `aria-label` on `HamburgerButton`. Regression: `tests/logged-out/endform-demo-regressions.spec.ts`.
