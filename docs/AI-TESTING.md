# Writing Playwright tests with AI

Canonical AI path for this repo. Latest Playwright ships **MCP** and **CLI** on the main binary (`npx playwright mcp`, `npx playwright cli`) plus `init-agents` / `init-skills`. Do not install a separate `@playwright/mcp` package just to follow these lessons.

**Learning in an agent (local clone):** take the [course home](/course) from Cursor, Claude Code, Codex, or similar. Use the **learn-lab-coach** and **movies-playwright** skills. Do not use Codegen or an IDE Testing UI as the course path.

Learn house style ([TESTING.md](/docs/TESTING), `manage-lists-*`, [07 Fixtures](/07-fixtures-helpers)), then deepen with [09 AI path](/09-ai-writing-path). Generated coverage is not the style guide.

## Choose the right surface

| Surface | Use when | Avoid when |
|---------|----------|------------|
| **playwright-cli + movies-playwright skill** | Day-to-day explore, draft, or fix with small context | You need a long autonomous MCP loop |
| **playwright-trace skill** | Debugging any failure with evidence | Guessing from the last error line alone |
| **Playwright MCP** | Persistent snapshot-heavy explore; official planner/generator tools | Token budget is tight and CLI skills would do |
| **Test agents** (planner, generator, healer) | Structured coverage: markdown plan, tests, heal | You only need one small test: use CLI draft instead |

**Default:** CLI + project skills, with traces when something fails.

```mermaid
flowchart TB
  start[Need a test] --> style{Know house style?}
  style -->|No| readDocs[movies-playwright skill + manage-lists]
  style -->|Yes| tool{Task type}
  readDocs --> tool
  tool -->|Explore or fix| cli[playwright-cli + movies-playwright]
  tool -->|Long autonomous explore| mcp[Playwright MCP]
  tool -->|Feature coverage pipeline| agents[planner then generator then healer]
  cli --> traces[playwright-trace]
  mcp --> agents
  agents --> review[Review rubric]
  traces --> review
  review --> done[Land idiomatic test]
```

## 1. Skills (durable how-to)

| Skill | Role |
|-------|------|
| [`movies-playwright` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.agents/skills/movies-playwright/SKILL.md) | House style, fixtures, explore, draft, rewrite, heal policy |
| [`learn-lab-coach` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.agents/skills/learn-lab-coach/SKILL.md) | Walk labs one step at a time in a local clone |
| [`playwright-cli` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.agents/skills/playwright-cli/SKILL.md) | Official CLI explore and attach (from `init-skills`) |
| [`playwright-trace` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.agents/skills/playwright-trace/SKILL.md) | Official trace CLI (from `init-skills`) |

```bash
npx playwright cli --help
npx playwright init-skills --loop=agents   # official skills → .agents/skills
```

Typical flow against this app (dev servers via `npm run dev` or Playwright `webServer`):

```bash
npx playwright cli open http://127.0.0.1:3000/ --headed
npx playwright cli snapshot
npx playwright cli click "role=button[name=User Profile]"
# …explore, then draft a test that matches manage-lists-* style
```

## 2. Traces (required habit)

Do not heal by blind retry. Use **playwright-trace** or UI Mode, then edit per **movies-playwright**.

```bash
npx playwright test path/to/spec.ts --trace on
npx playwright show-trace test-results/.../trace.zip
npx playwright trace open path/to/trace.zip
npx playwright trace actions
npx playwright trace action <id>
```

Config already enables `trace: 'on-first-retry'`, screenshots and video on failure. Prefer trace evidence in healer runs before changing locators, and before `test.fixme()`.

## 3. Playwright MCP

```bash
npx playwright mcp --help
```

Wire MCP into your client if it does not already use Playwright’s bundled server. MCP fits long explore loops and the official test-agent tool sets (`planner_*`, `generator_*`, `test_run` / `test_debug`).

Tradeoff: richer iterative page structure in context, higher token cost than CLI skills. For “write one test while editing this repo,” prefer CLI.

## 4. Test agents: planner → generator → healer

Definitions live in `.github/agents/`. They work with Cursor, Copilot Chat, and similar UIs that load `.github/agents`. `--loop=vscode` is the **agent definition format**, not a requirement to use VS Code.

```bash
npx playwright init-agents --loop=vscode --prompts   # also: claude, copilot, codex, opencode
npx playwright init-skills --loop=agents
npx playwright init-skills --loop=claude             # → .claude/skills
```

**Prompts** under `.github/prompts/` are thin launchers (not teaching essays):

| Prompt | Role |
|--------|------|
| [`playwright-test-plan.prompt.md` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.github/prompts/playwright-test-plan.prompt.md) | Plan to `specs/` |
| [`playwright-test-generate.prompt.md` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.github/prompts/playwright-test-generate.prompt.md) | One scenario from a plan |
| [`playwright-test-heal.prompt.md` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.github/prompts/playwright-test-heal.prompt.md) | Run and fix failures |
| [`playwright-test-coverage.prompt.md` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.github/prompts/playwright-test-coverage.prompt.md) | Full plan, generate, heal |
| [`lab-coach.prompt.md` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/.github/prompts/lab-coach.prompt.md) | “I'm on 01” invokes **learn-lab-coach** |

Seed for list flows: [`seed.spec.ts` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/tests/logged-in/seed.spec.ts) (uses `list-fixtures`). Example plan: [`movies-list-plan.md` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/specs/movies-list-plan.md).

### Consolidation note

Generator prompts often ask for **one file per scenario**. This repo then consolidates `@agent` tests under `tests/logged-in/lists/` by feature. After generation, merge duplicates, prefer fixtures from `list-fixtures.ts`, and keep standalone files only when they teach a distinct pattern (guest context, multi-list delete, …).

### Healer rules

1. Open a trace or live debug snapshot before editing.
2. Fix the test (or product) with web-first locators and fixtures.
3. Use `test.fixme()` only when you are confident the product is wrong; comment the observed vs expected behavior.
4. State whether the issue is **product bug**, **test bug**, or **skip**.

## Review rubric (every AI-written test)

- Role/label locators (`getByRole`, `getByLabel`, `getByText`), not CSS/XPath as primary
- Web-first assertions (`toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`, `toMatchAriaSnapshot`)
- No `waitForTimeout`, `force: true`, or `waitForLoadState('networkidle')`
- Lightest fixture from `list-fixtures` (or clear reason for raw `page`)
- Reuses `list-utilities` instead of re-walking create/add flows
- Meaningful assertions (visibility, values, ARIA snapshot, counts), not click-only
- Independent of other tests; works with mock-api reset
- `test.step` for multi-step flows
- Seed/setup language matches this repo (`login.setup`, helpers)
- Healer used a **trace** or live snapshot before changing locators
- `test.fixme()` only with a comment of observed vs expected when the product is wrong
- Tagged `@agent` if generated; style still matches `manage-lists-*` after rewrite
- No Codegen or recorder output as the primary authoring path

Side-by-side example: [`ai-raw-vs-idiomatic.spec.ts` on GitHub](https://github.com/debs-obrien/playwright-movies-app/blob/main/tests/logged-in/lessons/ai-raw-vs-idiomatic.spec.ts).

## When to hand-write instead

- Teaching a new pattern (fixtures, guest context, soft asserts)
- Small change next to an existing idiomatic test
- AI output fails the rubric twice: stop regenerating and write it yourself
