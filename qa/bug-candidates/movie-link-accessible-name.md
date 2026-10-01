---
fingerprint: prod|/|movie-link-accessible-name
url: https://debs-obrien.github.io/playwright-movies-app/?category=Popular&page=1
target: production
severity: major
confidence: high
classification: bug
area: a11y
fix_surface: app
---

# Movie card links have polluted accessible names (not just the title)

## Repro

1. Open https://debs-obrien.github.io/playwright-movies-app/?category=Popular&page=1
2. In Playwright: `getByRole('link', { name: 'Superman', exact: true })`
3. Count is **0**. Accessible name is polluted (e.g. `poster of Superman Superman rating`); half-star cards can leak ReactStars `<style>` CSS into the link name.

## Expected

Movie card link accessible name is the movie title only (e.g. `Superman`).

## Actual

Each card is one `<a>` wrapping poster image (`alt="poster of …"`), title `<h2>`, and rating — computed name concatenates them. `ReactStars` injects a half-star `<style>` inside the link, which can appear in the accessible name.

## Evidence

- Viewport: desktop / any
- Live check: exact title link → 0; some names include `.react-stars-…:before { … }`
- Issue: https://github.com/debs-obrien/playwright-movies-app/issues/92

## Suggested next step

- [x] Fix via site-bugfix
- [ ] Needs human
- [ ] Defer
