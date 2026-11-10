# Honesty taxonomy (site-bug-hunt)

Classify every finding before you write a candidate or file an issue. **Noise is worse than silence.**

## Classifications

| Classification | Meaning | File issue in CI? |
|----------------|---------|-------------------|
| `bug` | Product is genuinely broken for a user | Yes, if confidence=`high` and severity allows |
| `expected-bad-ux` | Works as designed but feels wrong | No (local candidate only if useful) |
| `env` | Environment, CDN allowlist, third-party outage, local-only | No unless it is clearly a misconfiguration *in this repo* you can fix |
| `test-gap` | Missing automated coverage, not a live failure | No |
| `inconclusive` | Suspicious but not confirmed this run | No |

## Confidence

| Level | Meaning |
|-------|---------|
| `high` | Reproduced in this run with clear steps |
| `medium` | Likely, but one uncertainty remains |
| `low` | Suspicious only |

**CI rule:** file GitHub issues only when `classification=bug` **and** `confidence=high`.

## Severity (CI filing)

| Severity | CI files issue? |
|----------|-----------------|
| `blocker` | Yes |
| `major` | Yes |
| `minor` | Only if `SITE_BUG_HUNT_ALLOW_MINOR=1` |
| `nit` | Never in CI (local candidate OK) |

## Caps

- Max **3** new GitHub issues per CI hunt run
- Prefer user-impacting journey breaks over polish

## Fingerprint

Stable dedupe key:

```text
<target>|<path-or-area>|<short-symptom-slug>
```

Examples:

- `prod|/|hamburger-missing-accessible-name`
- `local|/movie|mobile-poster-full-bleed`
- `prod|/my-lists|duplicate-main-landmark`
- `local|nav|drawer-tab-escapes-dialog`

Before filing, search open issues for the same `fingerprint:` string. Skip if found.

## Movies-app notes

- Login via the mock API accepts **any** username/password — auth “failures” with empty fields are product validation, not API outages.
- TMDB image CDN 404s / rate limits → usually `env`, not `bug`, unless the app builds a wrong `src` (e.g. missing `basePath` for local assets).
- Docs/learn site (`/learn/`) is out of scope unless the user asks to hunt the VitePress course.
