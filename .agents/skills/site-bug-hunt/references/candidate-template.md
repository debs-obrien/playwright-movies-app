# Candidate / issue body template

Use this structure for `qa/bug-candidates/*.md` and for GitHub issue bodies.

```markdown
---
fingerprint: prod|/path|short-slug
url: https://debs-obrien.github.io/playwright-movies-app/path
target: production
severity: major
confidence: high
classification: bug
area: a11y
fix_surface: app
---

# Short title

## Repro

1. …
2. …

## Expected

…

## Actual

…

## Evidence

- Viewport:
- Notes (console/network/snapshot):

## Suggested next step

- [ ] Fix via site-bugfix
- [ ] Needs human
- [ ] Defer
```

### Field notes

- `fix_surface`: `app` (`movies-app/`), `styles` (styled-jsx / CSS-only), `mock-api` (`mock-api/`), or `mixed`
- `area`: `home` | `search` | `detail` | `auth` | `lists` | `nav` | `a11y` | `other`
- `target`: `production` | `local` | `preview`

### Label hints (when filing)

- Always: `bug`
- A11y findings: also `accessibility`
- Agent runs: also `agent-hunt` (create with `gh label create` if missing and permitted)
- Severity: `severity:major` or `severity:blocker` when those labels exist (create only if `gh label create` works)
