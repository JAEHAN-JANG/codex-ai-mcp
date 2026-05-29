# Codex Project Guide

## Project
This is a small dependency-free web app for practicing AI pair programming with Codex.
The app is a daily habit tracker built with plain HTML, CSS, and JavaScript.

## Commands
- Run tests: `node tests/core.test.mjs`
- Start local server: `node scripts/serve.mjs`
- Open app: `http://127.0.0.1:4173`

If the system `node` command is unavailable, use the Codex bundled Node.js path shown by the workspace dependency helper.

## Code Style
- Keep changes small and focused.
- Prefer plain JavaScript modules over adding build tools.
- Keep pure logic in `src/core.js`.
- Keep DOM wiring in `src/app.js`.
- Do not introduce external dependencies unless the user asks.

## Verification
- Run `node tests/core.test.mjs` after changing core logic.
- Run `node tests/smoke.test.mjs` after changing the local server, HTML, CSS, or app boot code.
- For UI changes, start the local server and verify the app in the browser.
- Check both a desktop-sized viewport and a narrow mobile viewport for layout issues.
- For CI/CD, Docker, automation, or agent harness changes, update the README progress checklist before finishing.
- Follow `docs/completion-protocol.md` when a connected work item is complete.

## Safety
- Do not run destructive Git commands without explicit approval.
- Do not commit secrets.
- Do not change unrelated files.

## Agent Collaboration
- Use `docs/agent-collaboration.md` for multi-agent planning, implementation, review, QA, release, and automation workflows.
- Use `docs/templates/agent-handoff.md` when handing work between agent roles.
- Do not mark work complete until the README `진행 항목` section reflects the final state.
