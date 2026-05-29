# Habit Check

Habit Check는 Codex를 사용한 AI 페어 프로그래밍, 즉 바이브 코딩 흐름을 작게 실습하기 위해 만든 순수 HTML/CSS/JavaScript 웹앱입니다.

이 프로젝트의 목적은 거창한 기능을 만드는 것이 아니라, AI와 함께 개발할 때 필요한 **하네스 엔지니어링**, **테스트 루프**, **MCP 연결 사고방식**, **GitHub 협업 템플릿**, **자동화 운영 방식**을 한 번에 경험하는 것입니다.

## 프로젝트 목표

이 저장소는 다음 질문에 답하기 위한 실습용 프로젝트입니다.

- Codex가 안전하게 작업하도록 프로젝트 규칙을 어떻게 제공할까?
- 기능 구현 전에 어떤 문서와 테스트 하네스를 준비해야 할까?
- AI가 변경한 코드가 실제로 동작하는지 어떻게 검증할까?
- Browser MCP가 동작하지 않을 때 어떤 대체 검증 루프를 만들 수 있을까?
- GitHub Issue와 PR 템플릿을 어떻게 구성하면 AI와 사람이 같은 기준으로 일할 수 있을까?
- 반복 점검을 Codex 자동화로 어떻게 맡길 수 있을까?

## 앱 기능

Habit Check는 하루 단위 습관 체크 앱입니다.

- 오늘의 습관 추가
- 습관 완료/미완료 토글
- 습관 이름 수정
- 습관 삭제
- 오늘의 습관 전체 초기화
- 날짜별 `localStorage` 저장
- 완료 개수와 완료율 표시

## 기술 스택

의도적으로 프레임워크와 외부 의존성을 사용하지 않았습니다.

- HTML
- CSS
- JavaScript ES Modules
- Node.js 기본 모듈 기반 테스트
- Node.js 기본 HTTP 서버

이렇게 구성한 이유는 Codex 워크플로우 자체에 집중하기 위해서입니다. React, Vite, Playwright 같은 도구를 붙이기 전에, 가장 작은 프로젝트에서도 좋은 하네스와 검증 루프를 만들 수 있는지 확인하는 것이 목표입니다.

## 프로젝트 구조

```text
.
├─ .github/
│  ├─ PULL_REQUEST_TEMPLATE.md
│  └─ ISSUE_TEMPLATE/
│     ├─ bug_report.md
│     ├─ chore.md
│     ├─ feature_request.md
│     ├─ hotfix.md
│     └─ config.yml
├─ docs/
│  ├─ codex-workflow.md
│  ├─ mcp-connections.md
│  └─ issues/
│     └─ 001-hide-completed-habits.md
├─ scripts/
│  └─ serve.mjs
├─ src/
│  ├─ app.js
│  └─ core.js
├─ styles/
│  └─ main.css
├─ tests/
│  ├─ core.test.mjs
│  └─ smoke.test.mjs
├─ AGENTS.md
├─ index.html
├─ package.json
└─ README.md
```

## 실행 방법

프로젝트 루트에서 서버를 실행합니다.

```powershell
node scripts/serve.mjs
```

브라우저에서 아래 주소를 엽니다.

```text
http://127.0.0.1:4173
```

Codex 번들 Node.js를 사용해야 하는 환경이라면 다음처럼 실행할 수 있습니다.

```powershell
C:\Users\jjh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts/serve.mjs
```

## 테스트

핵심 로직 테스트:

```powershell
node tests/core.test.mjs
```

스모크 테스트:

```powershell
node tests/smoke.test.mjs
```

스모크 테스트는 임시 포트에서 로컬 서버를 띄우고, 다음 항목을 확인합니다.

- 루트 HTML 응답
- 앱 JavaScript 응답
- CSS 응답
- 핵심 UI 요소 존재
- 주요 기능 코드 포함 여부

## Codex 하네스 엔지니어링

이 프로젝트에서 하네스는 Codex가 안전하고 일관되게 작업하도록 돕는 장치입니다.

핵심 파일은 다음과 같습니다.

- `AGENTS.md`: Codex가 따라야 할 프로젝트 규칙
- `README.md`: 사람과 AI 모두를 위한 실행/검증 안내
- `docs/codex-workflow.md`: Codex 작업 흐름 설명
- `docs/mcp-connections.md`: MCP 연결 방식과 장애 시 대체 경로
- `tests/core.test.mjs`: 순수 로직 검증
- `tests/smoke.test.mjs`: 앱 부팅과 정적 파일 검증
- `.github/`: Issue와 PR 기반 협업 템플릿

좋은 하네스의 목표는 Codex에게 “알아서 잘 해줘”라고 맡기는 것이 아니라, 다음 레일을 명확히 제공하는 것입니다.

1. 관련 파일을 읽는다.
2. 기존 구조와 스타일을 따른다.
3. 작은 단위로 수정한다.
4. 테스트를 실행한다.
5. 브라우저 또는 스모크 테스트로 동작을 확인한다.
6. 변경사항과 검증 결과를 요약한다.

## AI 워크플로우

이 저장소는 다음 AI 페어 프로그래밍 루프를 실습합니다.

```text
요구사항 정리
→ 이슈 또는 문서 초안 작성
→ 구현 계획 수립
→ 작은 단위 구현
→ 테스트 실행
→ 브라우저/스모크 검증
→ 커밋
→ PR 템플릿 기반 리뷰 준비
→ 자동화로 반복 점검
```

실제 진행한 흐름은 다음과 같습니다.

1. 작은 주제로 Habit Check 앱 선정
2. `AGENTS.md`와 `README.md`로 하네스 작성
3. 순수 로직과 DOM 연결 코드 분리
4. 핵심 로직 테스트 추가
5. 로컬 서버와 스모크 테스트 추가
6. Browser MCP 점검
7. Browser MCP가 실패하자 원인을 `node_repl` 런타임 문제로 분리
8. Chrome 수동 검증과 스모크 테스트를 대체 루프로 사용
9. GitHub Issue/PR 템플릿 구체화
10. Codex 주간 점검 자동화 생성
11. 첫 Git 커밋 생성
12. 다음 기능 이슈 초안 작성

## MCP 연결 전략

이 프로젝트에서 MCP는 “AI가 외부 도구와 연결되는 방식”으로 다룹니다.

### Browser MCP

목표:

- 로컬 앱 열기
- 습관 추가/수정/완료/삭제/초기화 흐름 확인
- 모바일 폭 레이아웃 확인

현재 상태:

- 프로젝트와 Chrome 직접 접속은 정상입니다.
- 이 세션에서는 Codex의 `node_repl` 커널이 `windows sandbox failed: spawn setup refresh` 오류로 실패했습니다.
- 따라서 Browser MCP 자동 검증 대신 스모크 테스트와 Chrome 수동 검증을 사용합니다.

### GitHub MCP

목표:

- 이슈 생성
- PR 작성
- 리뷰 코멘트 확인
- CI 상태 점검

이 저장소는 GitHub 협업을 위해 다음 템플릿을 포함합니다.

- `FEAT`
- `FIX`
- `DOCS`
- `CHORE`
- `HOTFIX`
- `REFACTOR`
- `TEST`

### 자동화

Codex 자동화는 반복 점검을 위해 사용합니다.

현재 만든 자동화:

```text
habit-check-weekly-health-check
```

역할:

- 핵심 테스트 실행
- 스모크 테스트 실행
- Git 상태 확인
- 문서와 실제 명령어의 불일치 점검
- 실패나 위험 요소 보고

## GitHub 협업 방식

이 저장소의 GitHub 템플릿은 AI와 사람이 같은 기준으로 작업을 검토하도록 설계했습니다.

PR 템플릿은 다음을 묻습니다.

- 변경 유형
- 변경 요약
- 영향 범위
- 사용자 영향
- 검증 결과
- 리스크와 롤백 계획
- Codex가 유의해야 할 점

Issue 템플릿은 다음 유형으로 나뉩니다.

- Bug report
- Feature request
- Chore
- Hotfix

이렇게 나누면 Codex에게 작업을 요청할 때도 더 명확하게 지시할 수 있습니다.

예:

```text
docs/issues/001-hide-completed-habits.md의 수용 기준을 기준으로 구현해줘.
먼저 실패하는 테스트를 추가하고, 통과하도록 구현한 뒤 smoke test까지 실행해줘.
```

## 다음 연습 과제

현재 준비된 다음 이슈:

- `docs/issues/001-hide-completed-habits.md`

기능:

- 완료된 습관 숨기기 토글

권장 진행 방식:

1. 이슈 초안을 커밋한다.
2. 기능 브랜치를 만든다.
3. 테스트를 먼저 추가한다.
4. 기능을 구현한다.
5. `core` 테스트와 `smoke` 테스트를 실행한다.
6. Chrome에서 직접 확인한다.
7. PR 템플릿에 맞춰 변경 내용을 정리한다.

## 검증 명령 모음

```powershell
node tests/core.test.mjs
node tests/smoke.test.mjs
node scripts/serve.mjs
```

Codex 번들 Node.js 사용:

```powershell
C:\Users\jjh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tests/core.test.mjs
C:\Users\jjh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tests/smoke.test.mjs
C:\Users\jjh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts/serve.mjs
```

## CI/CD와 Docker

이 저장소는 GitHub Actions와 Docker 기반 운영 실습을 포함합니다.

### GitHub Actions

- `.github/workflows/ci.yml`: push와 pull request에서 core test, smoke test, Docker build를 실행합니다.
- `.github/workflows/pages.yml`: `main` 브랜치가 갱신되면 정적 앱을 GitHub Pages로 배포합니다.
- `.github/workflows/docker-publish.yml`: `main` push 또는 수동 실행 시 GitHub Container Registry로 Docker 이미지를 publish합니다.

GitHub Pages를 사용하려면 repository settings에서 Pages source를 GitHub Actions로 설정해야 합니다.

### Docker

로컬 Docker 실행:

```powershell
docker build -t habit-check .
docker run --rm -p 4173:4173 habit-check
```

Docker Compose 실행:

```powershell
docker compose up --build
```

브라우저에서 확인:

```text
http://127.0.0.1:4173
```

## Agent 하네스

여러 개발 agent가 협의하면서 일하는 흐름은 문서로 고정해두었습니다.

- `docs/agent-collaboration.md`: agent 협업 전체 흐름
- `docs/agents/planner.md`: 요구사항과 수용 기준 정의
- `docs/agents/implementer.md`: 구현 담당
- `docs/agents/reviewer.md`: 리뷰와 리스크 점검
- `docs/agents/qa.md`: 테스트와 검증
- `docs/agents/release.md`: 커밋, PR, 배포 정리
- `docs/agents/automation.md`: 반복 점검과 문서 drift 확인
- `docs/templates/agent-handoff.md`: agent 간 handoff 템플릿
- `docs/completion-protocol.md`: 작업 종료 시 README 진행 항목 갱신 규칙

작업이 끝날 때마다 README의 진행 항목을 갱신하는 것을 완료 기준에 포함합니다.

<details>
<summary>진행 항목</summary>

- [x] Habit Check 기본 앱 구현
- [x] 핵심 로직 테스트 추가
- [x] 스모크 테스트 추가
- [x] GitHub Issue/PR 템플릿 구체화
- [x] 한글 README로 프로젝트 목적과 AI 워크플로우 정리
- [x] GitHub public repository 생성 및 push
- [x] GitHub Actions CI 추가
- [x] GitHub Pages 배포 workflow 추가
- [x] Dockerfile과 Compose 환경 추가
- [x] GHCR Docker publish workflow 추가
- [x] Planner, Implementer, Reviewer, QA, Release, Automation agent 문서 추가
- [x] Agent handoff 템플릿 추가
- [x] 작업 종료 시 README 진행 항목을 갱신하는 completion protocol 추가
- [x] 주간 health check 자동화가 CI/Docker/agent harness/README 진행 항목을 점검하도록 갱신
- [ ] GitHub Pages settings에서 source를 GitHub Actions로 활성화
- [ ] 첫 GitHub Actions 실행 결과 확인
- [ ] GHCR 이미지 publish 결과 확인
- [ ] `docs/issues/001-hide-completed-habits.md` 기준으로 다음 기능 구현
- [ ] 라이선스 추가

</details>

## 라이선스

아직 라이선스를 지정하지 않았습니다. 공개 저장소로 운영하려면 `MIT`, `Apache-2.0` 등 프로젝트 목적에 맞는 라이선스를 추가하는 것을 권장합니다.
