# 00 — Start here

## Goal

Know how this course works, what we will not re-teach, and how to take labs from a coding agent.

## Read first

- [Playwright intro](https://playwright.dev/docs/intro) — install and first ideas
- This repo’s [README](../README.md) — install, `.env`, `npm run dev`

## How we teach

1. **Official docs** own the concepts (locators, assertions, config theory).
2. **Labs here** are applied tasks on the Movies app + mock API.
3. Each lab: **Goal** → checklist steps → **Check-in** (something you can verify).
4. You work primarily in a **coding agent** (Cursor, Claude Code, Codex, Copilot agent, …). Open files only if you want to read code yourself.

We do **not** rewrite playwright.dev. We do **not** teach Codegen or an IDE Testing sidebar as the course path.

## How you take this course

1. [] Clone the repo, run `npm install`, then install browsers:

```bash
npx playwright install chromium
```

2. [] Copy `.env.example` → `.env`.
3. [] Open this repo in your coding agent of choice (Cursor, Claude Code, Codex, Copilot agent, …).
4. [] Start the coach — **explicitly invoke the skill**, don’t assume auto-load:
   - Say: **“Use the learn-lab-coach skill — I’m on Lab 00.”**
   - Or in Cursor: `@learn-lab-coach` (if your client lists project skills)
   - Or use [`.github/prompts/lab-coach.prompt.md`](../.github/prompts/lab-coach.prompt.md) and set the lab number
5. [] Follow one checklist step at a time. Let the agent run Playwright commands.

When writing or fixing tests, tell the agent to use the **movies-playwright** skill plus official **playwright-cli** / **playwright-trace** skills.

## Tooling cheat sheet

| Task | Command / surface |
|------|-------------------|
| App + mock | `npm run dev` (or let Playwright `webServer` start them) |
| Run tests | `npx playwright test` |
| Interactive debug | `npx playwright test --ui` |
| Explore the app | `npx playwright cli` (via **playwright-cli** skill) |
| Browse labs in a browser | `npm run docs:dev` |
| Stuck on a lab | “Use learn-lab-coach — I’m on Lab N” / lab-coach prompt |

Ports **3000** (app) and **4000** (mock API) must be free, or let `webServer` own them. The mock accepts **any** username/password from `.env`.

## Attribution

Lab flow and checklist UX are adapted from Microsoft’s [Build25-LAB304](https://github.com/microsoft/Build25-LAB304). This fork is **agent-first** (skills + CLI / UI Mode / traces) — not a workshop IDE or Codegen track.

## Check-in

- [] You know which path you are on (beginner / intermediate / AI-first) from the [learn home](./index.md).
- [] `.env` exists and `npm install` succeeded.
- [] You will work labs from your agent chat, not an IDE Testing UI.

Next: [Lab 01 — Overview](./01-overview.md) (or tell the coach “I’m on Lab 01”).
