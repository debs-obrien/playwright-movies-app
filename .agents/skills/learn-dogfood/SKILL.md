---
name: learn-dogfood
description: >-
  Dogfood the learn/ course like a new user: docs site walk, fresh clone
  setup, then Practice and shell steps from each module. Use when the user
  says dogfood learn, validate the course, learner journey, or re-check
  learn/ after curriculum changes. Maintainer QA — not learn-lab-coach.
---

# Learn dogfood

Maintainer QA for the VitePress course under `learn/`. Simulate a new learner
and report blockers. Do **not** coach a human one step at a time — that is
`learn-lab-coach`.

## Sources of truth

- Module pages: `learn/*.md` and `learn/index.md`
- Setup copy: `learn/00-start-here.md`, root `README.md`
- House style: `AGENTS.md`, `docs/TESTING.md`, `docs/AI-TESTING.md`
- Skills for labs: `movies-playwright`, `playwright-cli`, `playwright-trace`

Do not invent commands, files, or APIs missing from those sources.

## Scope

Ask once if unclear. Defaults:

| Scope | Modules |
|-------|---------|
| **beginner** (default) | 00 → 04, then foundations smoke, then 05 → 11 if time |
| **ai-first** | 00 setup, `AGENTS.md`, 07, 09 |
| **module N** | 00 setup (if needed) + that module only |
| **docs-only** | Layer A only |

Continue on failure unless the user says stop-on-fail. Fix nothing unless asked — report only.

## Procedure

### Layer A — Docs site

From the repo under test (workspace or temp clone):

```bash
npm run docs:dev
```

Open `http://127.0.0.1:5173/course` (VitePress default). Prefer
`npx playwright cli`; browser MCP is fine for click-through.

Check:

1. Course home loads; beginner / intermediate / AI-first links work.
2. `00` → each in-scope module via in-page **Next** / agenda links.
3. CTAs: live Movies demo, clone/GitHub, `/docs/TESTING`, `/docs/AI-TESTING`, `/AGENTS`.
4. Note 404s, broken anchors, and copy that contradicts `learn/00-start-here.md`.

### Layer B — Fresh learner setup

Prefer a **clean temp clone** so dirty WIP does not hide broken instructions:

```bash
git clone https://github.com/debs-obrien/playwright-movies-app.git /tmp/movies-learn-dogfood
cd /tmp/movies-learn-dogfood
npm install
npx playwright install chromium
cp .env.example .env
```

Run the block from `learn/00-start-here.md` verbatim when it differs. Record any
step that fails on a clean tree.

If the user asks to dogfood **uncommitted** learn/ edits, use the workspace (or
a worktree of the current branch) for Layers A–C instead of `main` on GitHub.

### Layer C — Module practice

For each in-scope module, read `learn/<module>.md` and execute only:

1. Shell/code blocks a learner is told to run (Start the app, run test, CLI explore, …).
2. Sections titled **Practice on a clone**, **Practice:**, or **Done when**.
3. Linked [exercises](docs/exercises/) when the module points to them (03, 07, 09).
4. After 01–04 (beginner path): foundations smoke from `learn/index.md`:

```bash
npx playwright test tests/logged-out/movie-list.spec.ts --project=chromium
npx playwright test tests/logged-out/auth.spec.ts --project=chromium
npx playwright test tests/logged-out/search.spec.ts --project=chromium
```

Rules:

- Ports **3000** / **4000** for the app; docs on **5173**. Use `npm run dev` when the module says so; otherwise let Playwright `webServer` start the app during tests.
- Writing or healing tests → `movies-playwright`. Explore → `playwright-cli`. Failures → evidence via UI Mode Errors or `playwright-trace` before locator changes.
- Module 09: Path A (`playwright cli`) by default; Path B only if scoped. Thin prompts live under `.github/prompts/`.
- Never treat Codegen or an IDE Testing UI as the course path.
- Skim-only “Read first” external links (playwright.dev) unless the user wants link checks.

## Report format

End with a compact table (and open with a one-line verdict):

| Module | Step | Result | Bucket |
|--------|------|--------|--------|
| 00 | `npm install` | pass / fail + short reason | docs / setup / lab |

Buckets:

- **docs** — site nav, broken links, misleading copy
- **setup** — clone, install, browsers, `.env`
- **lab** — practice commands, tests, CLI explore, prompts

Do not commit fixes unless the user asks.
