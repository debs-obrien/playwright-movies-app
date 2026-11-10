---
name: site-bug-hunt
description: >-
  Exploratory QA for the Playwright Movies App (Next.js + mock API). Use when
  the user asks to bug-hunt, explore the site for bugs, do exploratory testing,
  smoke the app, or find broken journeys. Local default: write qa/bug-candidates
  only. CI mode (SITE_BUG_HUNT_MODE=ci) or explicit "file issues": create
  high-confidence GitHub issues. Does not fix code (hand off to site-bugfix).
---

# Site bug hunt (Playwright Movies App)

Exploratory QA for this **Next.js** Movies demo (`movies-app/` + `mock-api/`). **Find and document** user-impacting bugs. Do **not** change product code (use `site-bugfix` for that).

Not Nuxt / not debbie.codes — journeys and URLs below are for this repo only.

## Quick start (local)

Copy one of these prompts:

```text
Run the site-bug-hunt skill against https://debs-obrien.github.io/playwright-movies-app/ (production).
Write candidates under qa/bug-candidates/. Do not file GitHub issues.
```

```text
Run the site-bug-hunt skill against http://127.0.0.1:3000 (start npm run dev if needed).
Write candidates under qa/bug-candidates/. Do not file GitHub issues.
```

```text
Run site-bug-hunt on production and file GitHub issues for high-confidence major/blocker bugs only.
```

## Modes

| Mode | When | Output |
|------|------|--------|
| **interactive** (default) | Local Cursor / no `SITE_BUG_HUNT_MODE` | `qa/bug-candidates/*.md` + chat summary. **No** GitHub issues unless the user explicitly asks to file them. |
| **ci** | `SITE_BUG_HUNT_MODE=ci` | Same exploration + honesty gates → `gh issue create` for eligible bugs only |

Also treat an explicit user request to “file issues” like CI filing rules (even in interactive mode).

## Tooling

Prefer **`playwright-cli`** (see the `playwright-cli` skill in this repo). Use accessibility snapshots as primary evidence.

Optional: Playwright MCP or Chrome DevTools MCP if already configured — keep reports consistent.

## Targets

| Mode | Base URL | When |
|------|----------|------|
| Local | `http://127.0.0.1:3000` | Default locally. Start `npm run dev` if needed (app :3000 + mock API :4000). |
| Production | `https://debs-obrien.github.io/playwright-movies-app/` | User says live/prod, or CI default. |
| Preview | Deploy preview URL | User pastes a preview URL. |

Confirm the target at the start of the report. Respect `basePath` on GitHub Pages (`/playwright-movies-app`).

Env overrides:

- `SITE_BUG_HUNT_BASE_URL` — force base URL
- `SITE_BUG_HUNT_MODE=ci` — enable issue filing
- `SITE_BUG_HUNT_ALLOW_MINOR=1` — allow filing `minor` in CI (default: major/blocker only)
- `SITE_BUG_HUNT_MAX_ISSUES` — max issues to file (default `3`)

## Honesty gates (mandatory)

Read [references/honesty.md](references/honesty.md) before filing anything.

CI / “file issues” may create a GitHub issue only when **all** are true:

1. `classification=bug`
2. `confidence=high`
3. Severity is `blocker` or `major` (or `minor` if `SITE_BUG_HUNT_ALLOW_MINOR=1`)
4. Reproduced in **this** run
5. No open issue already contains the same `fingerprint:`
6. Under the max-issues cap for this run

Otherwise: write a local candidate and/or mark inconclusive — **do not** file.

## Priority journeys

Read [references/journeys.md](references/journeys.md). Cover at least (unless the user scopes a subset):

1. Logged-out home / popular / category browse  
2. Search  
3. Movie detail  
4. Login (mock accepts any credentials)  
5. My Lists / create list / add movie (logged-in)  
6. Mobile viewport (nav drawer, detail poster, lists)  
7. Obvious a11y (landmarks, headings, unnamed controls, duplicate `main`)

## Gentle crawl (be a good neighbor)

- Prefer the journey list over exhaustive crawling  
- Max ~25 page navigations per run unless the user asks for deeper coverage  
- Short pause between heavy navigations when hitting production  
- Do not spam login or create dozens of lists — one smoke path is enough  
- Images may load from TMDB; treat third-party CDN flakes as `env` unless the app path is wrong  

## Workflow

1. Pick target and mode; state them in the summary.  
2. Open the site with playwright-cli.  
3. Explore priority journeys.  
4. For each suspected bug, classify per honesty.md and fill the [candidate template](references/candidate-template.md).  
5. Write `qa/bug-candidates/<slug>.md` (always, for traceability).  
6. If CI / file-issues mode and the finding is eligible:
   - Dedupe: `gh issue list --state open --search "fingerprint: <value>"` (or search body)
   - Labels: use existing `bug` and `accessibility` when relevant. Prefer also `agent-hunt` and `severity:major` / `severity:blocker`. Create missing labels only if `gh label create` works (do not fail the hunt if label create is denied).
   - Create: `gh issue create --title "…" --label "bug,agent-hunt,severity:<level>" --body-file …` (add `accessibility` when it is an a11y bug)
   - Include structured frontmatter in the issue body  
7. Summarize in chat / job summary: candidates, filed issues, skipped (with reasons).

## Rules

- Do **not** invent bugs. Prefer inconclusive over a guess.  
- Do **not** mutate product code or content during a hunt.  
- Do **not** flood issues: respect caps and severity filters.  
- Existing specs under `tests/` are hints for what already matters — look for gaps.  
- Follow house style awareness from `AGENTS.md` (role locators, web-first asserts) when describing repros.  

## Done means

- Priority journeys touched (or user-scoped subset)  
- Zero or more files in `qa/bug-candidates/`  
- In CI: zero or more high-signal issues filed (or a clear “nothing to file” summary)
