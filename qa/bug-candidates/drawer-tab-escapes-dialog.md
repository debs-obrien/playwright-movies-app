---
fingerprint: local|nav|drawer-tab-escapes-dialog
url: http://127.0.0.1:3000/
target: local
severity: major
confidence: high
classification: bug
area: a11y
fix_surface: app
---

# Mobile nav drawer does not trap keyboard focus

## Repro

1. `npm run dev` → open `http://127.0.0.1:3000/` at ~375×812
2. Open the navigation drawer (hamburger)
3. Press **Tab** repeatedly

## Expected

Focus cycles within the drawer dialog (`role="dialog"` / `aria-modal="true"`) until Escape or Close.

## Actual

Tab moves focus into page content behind the open drawer (backdrop still visible). Keyboard users lose the modal context.

## Evidence

- Viewport: 375×812
- File: `movies-app/components/UI/SideDrawer/index.js` (Tab handling removed; Escape still works)
- Notes: intentional Endform demo seed on `cursor/endform-seed-bugs-e1e9`

## Suggested next step

- [x] Fixed via site-bugfix (see draft PR from `cursor/fix-endform-seed-bugs-e1e9`)
- [ ] Needs human
- [ ] Defer

## Fix notes

Restored Tab focus trap in `SideDrawer`. Regression: `tests/logged-out/endform-demo-regressions.spec.ts`.
