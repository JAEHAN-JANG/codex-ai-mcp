# Codex Workflow Notes

This project is intentionally small so the full Codex pair-programming loop is visible.

## 1. Harness Engineering

The harness is the set of files and commands that lets Codex work safely.

- `AGENTS.md` gives Codex project-specific rules.
- `README.md` explains how humans and Codex should run the app.
- `tests/core.test.mjs` verifies the pure habit logic.
- `scripts/serve.mjs` gives a stable local server for browser checks.
- `.env.example` documents that no secrets are required.

## 2. Local Verification Loop

Use this loop for normal changes:

1. Inspect the relevant files.
2. Change the smallest useful slice.
3. Run `node tests/core.test.mjs`.
4. Start `node scripts/serve.mjs`.
5. Check `http://127.0.0.1:4173` in a browser.
6. Summarize changed files and verification results.

## 3. MCP Usage Map

Recommended MCP usage for this project:

- Browser: verify UI layout, add/toggle/remove habit flows, and mobile width behavior.
- GitHub: create issues, open PRs, inspect review comments, and check CI results.
- Notion: store the learning notes or turn this workflow into team documentation.
- Docs/Search: look up official documentation if the project later adopts a framework.

See `docs/mcp-connections.md` for concrete connection prompts and the current Browser MCP status.

## 4. Automation Candidates

Useful recurring automations:

- Weekly project health check: run tests, inspect changed files, and report risks.
- PR review monitor: watch for unresolved review comments and failed checks.
- Dependency review: if dependencies are added later, check for update PRs weekly.
- Documentation drift check: compare `README.md`, `AGENTS.md`, and actual commands.

## 5. Example Automation Prompt

Project health check:

```text
Inspect the Habit Check project. Run the core test command if available, review the current Git status, and report any broken harness assumptions, failing tests, or documentation drift. Do not modify files unless explicitly requested.
```

## 6. Next Practice Tasks

Small follow-up tasks that exercise the harness:

- Add an edit-habit-name action.
- Add a reset-all button with a confirmation step.
- Add per-day history in localStorage.
- Add a browser-based smoke test script.
- Add GitHub PR template and issue template files.
