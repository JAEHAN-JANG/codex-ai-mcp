# [Feature] Hide Completed Habits

## Type

- [x] FEAT: new user-facing feature
- [ ] ENHANCEMENT: improve existing behavior
- [ ] DOCS: documentation improvement
- [ ] CHORE: maintenance or tooling improvement
- [ ] REFACTOR: internal structure improvement
- [ ] AUTOMATION: recurring task or workflow improvement

## Goal

Let users temporarily hide completed habits so they can focus on what remains today.

## User Flow

1. User adds several habits.
2. User marks one or more habits as done.
3. User turns on a "Hide done" control.
4. Completed habits disappear from the list, while the completion stats stay unchanged.
5. User turns the control off and sees all habits again.

## Acceptance Criteria

- [x] A visible "Hide done" toggle appears near the habit list controls.
- [x] Completed habits are hidden only while the toggle is on.
- [x] Completion count and completion percentage still use all habits.
- [x] Removing, editing, and toggling visible habits still works.
- [x] Empty state text distinguishes between no habits and all visible habits being hidden.

## Out Of Scope

- Persisting the filter setting across browser sessions.
- Adding multiple filters or search.
- Changing the existing localStorage habit data shape.

## Verification Plan

- [x] Add core test coverage for the filtering helper.
- [x] Run `node tests/core.test.mjs`.
- [x] Run `node tests/smoke.test.mjs`.
- [ ] Manually check the app in Chrome at `http://127.0.0.1:4173`.

## Notes For Codex

- Keep the filter logic in `src/core.js`.
- Keep DOM state for the toggle in `src/app.js`.
- Avoid adding dependencies.
