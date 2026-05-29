# Habit Check

Habit Check is a tiny browser-based habit tracker for practicing Codex pair programming workflows.

## What This Project Demonstrates

- A lightweight project harness for Codex
- Clear agent instructions in `AGENTS.md`
- A dependency-free local web app
- Pure business logic with tests
- Browser verification workflow
- Automation ideas for recurring checks

## Run

```powershell
node scripts/serve.mjs
```

Then open:

```text
http://127.0.0.1:4173
```

If `node` is not available globally, use the bundled Node executable provided by Codex.

## Test

```powershell
node tests/core.test.mjs
```

## Smoke Test

```powershell
node tests/smoke.test.mjs
```

## Structure

```text
index.html
docs/
  codex-workflow.md
  mcp-connections.md
src/
  app.js
  core.js
styles/
  main.css
tests/
  core.test.mjs
  smoke.test.mjs
scripts/
  serve.mjs
```

## Suggested Codex Workflow

1. Ask Codex to inspect the relevant files.
2. Make one focused change.
3. Run the relevant test.
4. Verify UI changes in the browser.
5. Summarize files changed and commands run.
