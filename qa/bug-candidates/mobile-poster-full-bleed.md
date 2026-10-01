---
fingerprint: local|/movie|mobile-poster-full-bleed
url: http://127.0.0.1:3000/movie?id=278
target: local
severity: major
confidence: high
classification: bug
area: detail
fix_surface: styles
---

# Movie detail poster floods mobile viewport

## Repro

1. `npm run dev` → open a movie detail page, e.g. `http://127.0.0.1:3000/movie?id=278`
2. Set viewport to ~375×812
3. Observe the poster artwork above the title/summary

## Expected

Poster stays a readable card size (capped width, normal padding) and does not overlap the title.

## Actual

Poster goes full-bleed / oversized; on smaller breakpoints it pulls up with a negative top margin and collides with chrome/title content — hard to screenshot a clean detail page on mobile.

## Evidence

- Viewport: 375×812
- File: `movies-app/parts/Artwork/index.js` (medium/small/smaller media queries)
- Notes: intentional Endform demo seed on `cursor/endform-seed-bugs-e1e9`

## Suggested next step

- [x] Fix via site-bugfix
- [ ] Needs human
- [ ] Defer
