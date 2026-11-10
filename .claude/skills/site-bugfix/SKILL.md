---
name: site-bugfix
description: >-
  Reproduce and fix a Playwright Movies App bug with browser proof and a
  Playwright regression when useful. Use for site-bugfix, fixing
  qa/bug-candidates, or repairing agent-hunt GitHub issues. Local: PR only if
  asked. CI: draft PR on agent/fix-issue-<n> with Closes #N. Reproduce before
  any code change.
---

# Site bug fix (Playwright Movies App)

Take a known bug from **repro → fix → verify → regress**. Complements `site-bug-hunt`.

Not Nuxt / not debbie.codes — fixes land in `movies-app/` (or `mock-api/` / styles) for this Next.js demo.

## Quick start (local)

```text
Fix the bug described in qa/bug-candidates/<file>.md using the site-bugfix skill.
Reproduce in the browser first. Do not open a PR unless I ask.
```

```text
Fix GitHub issue #<n> using site-bugfix. Reproduce first, then open a draft PR with Closes #<n>.
```

## Modes

| Mode | Behavior |
|------|----------|
| **interactive** (default) | Fix from candidate path, issue URL/number, or description. Open a PR **only if the user asks**. |
| **ci** (`SITE_BUG_FIX_MODE=ci`) | Select one eligible open issue → branch `agent/fix-issue-<n>` → draft PR with `Closes #N`. Max **1** PR per run. |

## Tooling

- **Browser:** `playwright-cli` (load the `playwright-cli` skill)  
- **Tests:** `npx playwright test` / house style from `AGENTS.md` + `movies-playwright` skill  
- **App:** `npm run dev` → app `http://127.0.0.1:3000` + mock API `:4000`  
- **GitHub:** `gh` for issues (read); use the repo’s PR tooling for draft PRs when asked / in CI  

## Eligible issues (CI)

Pick the oldest open issue that has:

- Labels including `bug` and `agent-hunt` (or body containing agent-hunt fingerprint frontmatter)
- Not assigned to a human who is actively working it (Copilot assignee OK to continue)
- No open PR that already closes it (`Closes #n` / `Fixes #n`)

Prefer higher severity labels when present (`severity:blocker` / `severity:major`).

If none: exit successfully with “no eligible issues.”

## Structured input

Prefer candidates/issues that include YAML frontmatter from the hunt template (`fingerprint`, `url`, `severity`, `confidence`, `classification`, `area`, `fix_surface`). Use `fix_surface`:

- `app` → prefer minimal edits under `movies-app/`
- `styles` → prefer styled-jsx / CSS-only changes
- `mock-api` → prefer `mock-api/`
- `mixed` → smallest change that fixes the user-visible bug

## Workflow

### 1. Reproduce first (mandatory)

1. Confirm the bug still happens (production URL from the issue, or local if local-only / demo seed branch).  
2. Capture evidence with playwright-cli.  
3. If you **cannot** reproduce:
   - **Local:** stop and report  
   - **CI:** `gh issue comment` explaining attempts; add label `needs-human` if possible; **do not** open a PR  

**No product code changes until reproduction succeeds.**

### 2. Fix with minimal scope

1. Branch: `agent/fix-issue-<n>` (CI) or a clear local branch name.  
2. Smallest change; no drive-by refactors.  
3. Prefer a11y-friendly fixes when the bug is interaction/UI.  
4. Do **not** overwrite teaching skills (`movies-playwright`, `learn-lab-coach`, `learn-dogfood`) or rewrite the learn curriculum.

### 3. Verify

Re-run the **exact** original user action. Note before/after briefly.

### 4. Regression test when it pays off

- Stable user journey → add/adjust under `tests/` following `AGENTS.md`  
- List flows: `tests/helpers/list-fixtures.ts` + lightest fixture; reuse `list-utilities.ts`  
- Locators: `getByRole` / `getByLabel` / `getByText`; web-first asserts; no `waitForTimeout`  
- Prefer `test.step` for multi-step flows  
- Run: `npx playwright test tests/<path>.spec.ts`  
- Skip only with an explicit reason (flaky env, third-party-only)

### 5. Close the loop

**If PR requested or CI mode:** open a **draft** PR with a clear title/body and `Closes #<n>` when fixing a GitHub issue.

Always use **draft** for autonomous / CI PRs. Do not merge.

Update or remove the local candidate file notes when appropriate.

## Rules

- Reproduce before fix.  
- One bug per branch/PR.  
- Don’t weaken tests to pass.  
- Don’t commit secrets or unrelated WIP.  
- Loud failure > fake fix.  

## Done means

- Reproduced with evidence **or** loud cannot-repro exit  
- Fix + browser verification when reproduced  
- Regression test added/updated **or** explicit skip reason  
- Draft PR with `Closes #N` in CI / when asked locally
