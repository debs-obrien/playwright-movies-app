# Writing Playwright tests with AI

Canonical path for this repo. Latest Playwright ships **MCP** and **CLI** on the main binary (`npx playwright mcp`, `npx playwright cli`) plus `init-agents` / `init-skills`. Do not install a separate `@playwright/mcp` package just to follow these lessons.

Learn hand-written style first ([TESTING.md](./TESTING.md), `manage-lists-*`), then use AI. Generated coverage is not the style guide.

## Choose the right surface

| Surface | Use when | Avoid when |
|---------|----------|------------|
| **playwright-cli + skills** | Day-to-day coding agents exploring the app, drafting tests, or fixing failures with small context | You need a long autonomous loop that must keep rich page snapshots in-tool |
| **CLI / agent traces** | Debugging any AI or human failure with evidence (`tracing-start`/`stop`, `npx playwright trace`, Trace Viewer) | You are guessing from the last error line alone |
| **Playwright MCP** | Persistent, snapshot-heavy explore loops; specialized agentic tools (planner/generator MCP tools) | Token budget is tight and a coding agent + CLI would do |
| **Test agents** (planner → generator → healer) | Structured coverage: markdown plan → tests → heal | You only need one small test—hand-write or CLI draft instead |

**Default for coding agents in this repo:** CLI + skills, with traces when something fails. Use MCP when the agent loop is built around Playwright’s planner/generator/healer tools. Always review output against [AGENTS.md](../AGENTS.md).

```mermaid
flowchart TB
  start[Need a test] --> style{Know house style?}
  style -->|No| readDocs[Read TESTING.md + manage-lists-*]
  style -->|Yes| tool{Task type}
  readDocs --> tool
  tool -->|Explore or fix in coding agent| cli[playwright-cli + skills]
  tool -->|Long autonomous explore| mcp[Playwright MCP]
  tool -->|Feature coverage pipeline| agents[planner then generator then healer]
  cli --> traces[Record or open traces]
  mcp --> agents
  agents --> review[Review against fixtures and ARIA]
  traces --> review
  review --> done[Land idiomatic test]
```

## 1. playwright-cli + skills

Bundled with Playwright. From the repo (after `npm install`):

```bash
npx playwright cli --help
npx playwright init-skills          # or: npx playwright cli install --skills
```

Coding agents (Copilot, Claude Code, Cursor, …) use skills for concise browser commands instead of loading full MCP tool schemas.

Typical flow against this app (dev servers via `npm run dev` or Playwright `webServer`):

```bash
npx playwright cli open http://127.0.0.1:3000/ --headed
npx playwright cli snapshot
npx playwright cli click "role=button[name=User Profile]"
# …explore, then draft a test that matches manage-lists-* style
```

Learner prompt: [`.github/prompts/cli-explore.prompt.md`](../.github/prompts/cli-explore.prompt.md).

## 2. Traces for agents (required habit)

Do not heal by blind retry. Capture or open a trace, then edit.

**Record a CLI session:**

```bash
npx playwright cli tracing-start
# reproduce the flow with cli commands
npx playwright cli tracing-stop
npx playwright show-trace .playwright-cli/trace.zip
```

**Analyze a failed test trace (agent-friendly CLI):**

```bash
npx playwright test path/to/spec.ts --trace on
npx playwright trace open test-results/.../trace.zip
npx playwright trace actions
npx playwright trace action <id>
```

Config already enables `trace: 'on-first-retry'`, screenshots and video on failure. Prefer trace evidence in healer runs before changing locators—and before `test.fixme()`.

Learner prompt: [`.github/prompts/heal-from-trace.prompt.md`](../.github/prompts/heal-from-trace.prompt.md).

## 3. Playwright MCP

```bash
npx playwright mcp --help
```

Wire MCP into your client if it does not already use Playwright’s bundled server. MCP fits long explore loops and the official test-agent tool sets (`planner_*`, `generator_*`, `test_run` / `test_debug`).

Tradeoff: richer iterative page structure in context, higher token cost than CLI skills. For “write one test while editing this repo,” prefer CLI.

## 4. Test agents: planner → generator → healer

Definitions live in [`.github/agents/`](../.github/agents/). Regenerate when you upgrade Playwright:

```bash
npx playwright init-agents --loop=vscode   # or claude, codex, …
```

Also refresh skills after upgrades (`init-skills`).

| Agent | Role | Prompt |
|-------|------|--------|
| 🎭 planner | Explore app → markdown plan in `specs/` | [`plan.prompt.md`](../.github/prompts/plan.prompt.md) |
| 🎭 generator | Execute plan steps live → write tests | [`generate.prompt.md`](../.github/prompts/generate.prompt.md) |
| 🎭 healer | Run failures, fix with evidence, or skip with cause | [`fix.prompt.md`](../.github/prompts/fix.prompt.md) |

Seed for list flows: [`tests/logged-in/seed.spec.ts`](../tests/logged-in/seed.spec.ts) (uses `list-fixtures`). Example plan: [`specs/movies-list-plan.md`](../specs/movies-list-plan.md).

### Consolidation note

Generator prompts often ask for **one file per scenario**. This repo then consolidates `@agent` tests under `tests/logged-in/lists/` by feature. After generation, merge duplicates, prefer fixtures from `list-fixtures.ts`, and keep standalone files only when they teach a distinct pattern (guest context, multi-list delete, …).

### Healer rules

1. Open a trace or live debug snapshot before editing.
2. Fix the test (or product) with web-first locators and fixtures.
3. Use `test.fixme()` only when you are confident the product is wrong; comment the observed vs expected behavior.
4. State whether the issue is **product bug**, **test bug**, or **skip**.

## Review rubric (every AI-written test)

- [ ] Role/label locators (`getByRole` / `getByLabel`); no CSS-only primary locators
- [ ] Web-first assertions; no `waitForTimeout`, `force: true`, `networkidle`
- [ ] Lightest fixture from `list-fixtures` (or clear reason for raw `page`)
- [ ] Reuses `list-utilities` instead of re-walking create/add flows
- [ ] Meaningful assertions (visibility, values, ARIA snapshot, counts)—not click-only
- [ ] Independent of other tests; works with mock-api reset
- [ ] Tagged `@agent` if generated; style still matches `manage-lists-*` after rewrite
- [ ] Failures investigated with a trace before heal/skip

Side-by-side example: [`tests/logged-in/lessons/ai-raw-vs-idiomatic.spec.ts`](../tests/logged-in/lessons/ai-raw-vs-idiomatic.spec.ts).

Learner prompt: [`.github/prompts/rewrite-agent-test.prompt.md`](../.github/prompts/rewrite-agent-test.prompt.md).

## When to hand-write instead

- Teaching a new pattern (fixtures, guest context, soft asserts)
- Small change next to an existing idiomatic test
- AI output fails the rubric twice—stop regenerating and write it yourself
