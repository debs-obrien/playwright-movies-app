# Writing Playwright tests with AI

Canonical AI path for this repo. Latest Playwright ships **MCP** and **CLI** on the main binary (`npx playwright mcp`, `npx playwright cli`) plus `init-agents` / `init-skills`. Do not install a separate `@playwright/mcp` package just to follow these lessons.

**Learning in an agent:** take [`learn/`](../learn/index.md) from Cursor, Claude Code, Codex, or similar. Use the **learn-lab-coach** and **movies-playwright** skills. Do not use Codegen or an IDE Testing UI as the course path.

Learn house style ([TESTING.md](./TESTING.md), `manage-lists-*`, [Lab 07](../learn/07-fixtures-helpers.md)), then deepen with [Lab 09](../learn/09-ai-writing-path.md). Generated coverage is not the style guide.

## Choose the right surface

| Surface | Use when | Avoid when |
|---------|----------|------------|
| **playwright-cli + movies-playwright skill** | Day-to-day explore, draft, or fix with small context | You need a long autonomous MCP loop |
| **playwright-trace skill** | Debugging any failure with evidence | Guessing from the last error line alone |
| **Playwright MCP** | Persistent snapshot-heavy explore; official planner/generator tools | Token budget is tight and CLI skills would do |
| **Test agents** (planner → generator → healer) | Structured coverage: markdown plan → tests → heal | You only need one small test — CLI draft instead |

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
| [`.agents/skills/movies-playwright`](../.agents/skills/movies-playwright/SKILL.md) | House style, fixtures, explore→draft, rewrite, heal policy |
| [`.agents/skills/learn-lab-coach`](../.agents/skills/learn-lab-coach/SKILL.md) | Walk `learn/` labs one checklist step at a time |
| [`.agents/skills/playwright-cli`](../.agents/skills/playwright-cli/SKILL.md) | Official CLI explore / attach (from `init-skills`) |
| [`.agents/skills/playwright-trace`](../.agents/skills/playwright-trace/SKILL.md) | Official trace CLI (from `init-skills`) |

```bash
npx playwright cli --help
npx playwright init-skills --loop=agents   # official skills → .agents/skills
```

## 2. Traces (required habit)

Do not heal by blind retry. Use **playwright-trace** or UI Mode, then edit per **movies-playwright**.

```bash
npx playwright test path/to/spec.ts --trace on
npx playwright show-trace test-results/.../trace.zip
npx playwright trace open path/to/trace.zip
npx playwright trace actions
```

## 3. Playwright MCP

```bash
npx playwright mcp --help
```

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
| [`playwright-test-plan.prompt.md`](../.github/prompts/playwright-test-plan.prompt.md) | Plan → `specs/` |
| [`playwright-test-generate.prompt.md`](../.github/prompts/playwright-test-generate.prompt.md) | One scenario from a plan |
| [`playwright-test-heal.prompt.md`](../.github/prompts/playwright-test-heal.prompt.md) | Run and fix failures |
| [`playwright-test-coverage.prompt.md`](../.github/prompts/playwright-test-coverage.prompt.md) | Full plan → generate → heal |
| [`lab-coach.prompt.md`](../.github/prompts/lab-coach.prompt.md) | “I’m on Lab N” → **learn-lab-coach** skill |

## Review rubric (every AI-written test)

- [ ] Role/label locators (`getByRole`, `getByLabel`, `getByText`) — not CSS/XPath as primary
- [ ] Web-first assertions (`toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`, `toMatchAriaSnapshot`)
- [ ] No `waitForTimeout`, `force: true`, or `waitForLoadState('networkidle')`
- [ ] Logged-in list flows use `list-utilities` / `listPage` from `list-test` when appropriate
- [ ] `test.step` for multi-step flows
- [ ] Seed/setup language matches this repo (`login.setup`, helpers)
- [ ] Healer used a **trace** or live snapshot before changing locators
- [ ] `test.fixme()` only with a comment of observed vs expected when the product is wrong
- [ ] No Codegen / recorder output as the primary authoring path
