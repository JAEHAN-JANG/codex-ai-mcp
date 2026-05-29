# GitHub 협업 규칙

이 문서는 Habit Check 프로젝트에서 사람과 Codex agent가 같은 기준으로 Issue, branch, PR, review, release를 진행하기 위한 운영 규칙이다.

## Branch protection 권장 설정

대상 브랜치: `main`

권장 규칙:

- Require a pull request before merging
- Require approvals: 1명 이상
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass before merging
- Required checks:
  - `Core and smoke tests`
  - `Docker build`
- Require branches to be up to date before merging
- Do not allow bypassing the above settings
- Restrict force pushes
- Restrict deletions

저장소 관리자 화면:

```text
Settings -> Branches -> Add branch protection rule
```

## Issue 운영 규칙

Issue는 구현 전에 먼저 만든다.

필수 항목:

- 변경 유형: FEAT, FIX, DOCS, CHORE, HOTFIX
- 문제 또는 목표
- 사용자 흐름 또는 재현 절차
- 수용 기준
- 범위 제외
- 검증 계획
- Agent 라우팅

Issue가 GitHub App 권한 문제로 생성되지 않으면 `docs/issues`에 같은 형식의 로컬 Issue 문서를 먼저 남긴다.

## Branch 운영 규칙

브랜치는 Issue 단위로 만든다.

권장 이름:

- `feat-<short-topic>`
- `fix-<short-topic>`
- `docs-<short-topic>`
- `chore-<short-topic>`
- `hotfix-<short-topic>`

현재 Windows 로컬 Git ref 생성 환경에서는 `feat/topic`처럼 slash가 있는 브랜치가 실패할 수 있으므로, hyphen 기반 이름을 우선 사용한다.

## PR 운영 규칙

PR은 `.github/PULL_REQUEST_TEMPLATE.md`를 기준으로 작성한다.

PR에 포함할 내용:

- 연결 Issue
- 변경 유형
- 변경 요약
- 테스트 결과
- 수동 확인 결과
- Agent handoff
- README 진행 항목 갱신 여부

## Agent 협업 흐름

1. Planner가 Issue 범위와 수용 기준을 정리한다.
2. Implementer가 작은 변경 단위로 구현한다.
3. Reviewer가 회귀 위험, 데이터 호환성, 테스트 누락을 확인한다.
4. QA가 core/smoke/browser 확인을 수행한다.
5. Release가 README 진행 항목, PR 설명, 배포 상태를 정리한다.

작업 종료 조건:

- 테스트 통과
- 수동 확인 또는 대체 검증 기록
- README 진행 항목 갱신
- PR 설명 갱신
- CI 결과 확인

## 1인 실습 저장소에서 주의할 점

이 저장소는 개인 실습용 저장소이므로 `Required approvals: 1`을 켜면 본인이 만든 PR을 본인이 승인하지 못해 merge가 막힐 수 있다.

선택지는 두 가지다.

- 엄격 모드: `Required approvals: 1` 유지, 다른 GitHub 계정 또는 협업자 리뷰를 받는다.
- 실습 모드: `Required approvals`를 끄고 `Core and smoke tests`, `Docker build` 통과만 merge 조건으로 둔다.

이 실습의 목적은 agent 운영 흐름을 익히는 것이므로, 혼자 진행할 때는 실습 모드를 권장한다.

## 현재 알려진 막힘 지점

- Browser MCP가 Windows sandbox 문제로 동작하지 않을 수 있다.
- 이 경우 Chrome 수동 확인과 `tests/smoke.test.mjs`를 대체 검증 루프로 사용한다.
- GitHub App connector에서 Issue/PR 생성이 403으로 실패할 수 있다.
- 이 경우 GitHub CLI `gh`를 인증해 Issue/PR 생성 경로로 사용한다.
- Ruleset required check에는 workflow 이름 `CI`가 아니라 실제 check run 이름인 `Core and smoke tests`, `Docker build`를 등록한다.
