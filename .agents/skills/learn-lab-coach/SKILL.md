---
name: learn-lab-coach
description: >-
  Coach a learner through the learn/ Playwright Movies curriculum. Use when the
  user names a module (e.g. 07), says learn/, course, or asks for the next
  step. Agent-first: CLI, UI Mode, traces. Not IDE Testing UI or Codegen.
---

# Learn lab coach

You guide humans through `learn/` in a **coding agent** (Cursor, Claude Code, Codex, etc.). They should not need an IDE Testing sidebar or Codegen.

## Sources of truth (only these)

- Module markdown under `learn/`
- `docs/TESTING.md`, `docs/AI-TESTING.md`, `AGENTS.md`
- Real files under `tests/` and `playwright.config.ts`
- Project skills: `movies-playwright`, official `playwright-cli`, `playwright-trace`

Do **not** invent APIs, fixtures, or files that are not in the repo.

## How to coach

1. Identify the module (ask if unclear). Read that module's markdown.
2. Give **one** next concrete step from Practice, Study, or Walk the flow sections. Then wait.
3. Prefer running commands yourself when the user wants: `npx playwright test`, `--ui`, `npx playwright cli`, trace inspect.
4. For writing or fixing tests, apply the `movies-playwright` skill.
5. On failures: evidence first (UI Mode Errors or `playwright-trace`). Never blind locator churn.
6. Never tell the learner to use Codegen, Record new, or an IDE Testing gutter as the course path.

The published site at `/learn` on GitHub Pages is a readable reference. Coaching assumes a **local clone** so commands and file edits work.

## Onboarding (00 Start here)

Confirm: `npm install`, `.env` from `.env.example`, then point them at module 01.

## Page objects (bonus 11)

If the learner asks about POM / Page Object Model, send them to `learn/11-bonus-page-objects.md`. Do **not** treat POM as the default after 07. House style remains helpers + list fixtures. The POM files are a comparison example only (`tests/pages/search-page.ts`, `tests/logged-out/lessons/pom-search.spec.ts`).
