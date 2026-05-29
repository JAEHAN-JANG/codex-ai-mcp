# MCP Connections

This project uses MCP as a workflow layer around the local codebase.

## Browser MCP

Purpose:

- Open the local app at `http://127.0.0.1:4173`.
- Verify add, edit, toggle, remove, and reset flows.
- Check desktop and mobile layouts.

Current status:

- The Browser plugin is available in Codex.
- In this Windows session, the in-app browser runtime failed with a sandbox startup error.
- Until that is fixed, use `node tests/smoke.test.mjs` plus manual browser checks.

Suggested prompt:

```text
Open http://127.0.0.1:4173 in the browser. Add a habit, edit its name, mark it done, remove it, then check the reset button. Also verify the layout at a narrow mobile width.
```

## GitHub MCP

Purpose:

- Turn practice tasks into issues.
- Open focused PRs.
- Review CI results and unresolved comments.

Project files:

- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`

Suggested prompt:

```text
Create a PR for the current Habit Check changes. Use the PR template, summarize verification, and leave the PR as draft.
```

## Notion MCP

Purpose:

- Capture this workflow as reusable team documentation.
- Store decisions such as why the app uses dependency-free JavaScript.

Suggested prompt:

```text
Capture the Habit Check workflow notes into Notion as a concise engineering playbook.
```

## Automation MCP Pattern

Useful automations should inspect and report first. They should not modify code unless the prompt explicitly says so.

Recommended recurring automation:

```text
Inspect the Habit Check project. Run the core and smoke tests if available, review Git status, and report broken harness assumptions, failing tests, or documentation drift. Do not modify files unless explicitly requested.
```
