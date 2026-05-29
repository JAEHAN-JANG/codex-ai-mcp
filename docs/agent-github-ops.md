# Agent GitHub 운영 절차

이 문서는 Codex agent들이 GitHub Issue와 PR을 사용해 실제 개발 흐름을 진행하는 절차를 정의한다.

## 기본 명령

GitHub connector가 Issue 또는 PR 생성에서 403을 반환하면 GitHub CLI를 사용한다.

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' auth status
& 'C:\Program Files\GitHub CLI\gh.exe' issue list --repo JAEHAN-JANG/codex-ai-mcp
& 'C:\Program Files\GitHub CLI\gh.exe' pr list --repo JAEHAN-JANG/codex-ai-mcp
```

## Agent 라벨

Issue와 PR에는 필요한 agent 라벨을 붙인다.

- `agent:planner`
- `agent:implementer`
- `agent:reviewer`
- `agent:qa`
- `agent:release`
- `agent:automation`

작업 유형 라벨:

- `type:feat`
- `type:fix`
- `type:docs`
- `type:chore`
- `type:hotfix`

상태 라벨:

- `status:ready`
- `status:in-progress`
- `status:blocked`
- `status:needs-review`

## Issue 생성 절차

1. Issue 템플릿을 기준으로 목표와 수용 기준을 작성한다.
2. agent 라우팅을 명시한다.
3. 검증 계획을 포함한다.
4. 관련 라벨을 붙인다.
5. 구현 전 브랜치를 만든다.

예시:

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' issue create `
  --repo JAEHAN-JANG/codex-ai-mcp `
  --title "[Feature] 날짜별 기록 보기" `
  --body-file docs/issues/002-date-history-view.md `
  --label enhancement `
  --label type:feat `
  --label agent:planner `
  --label agent:implementer `
  --label agent:qa `
  --label status:ready
```

## PR 생성 절차

1. Issue 번호를 기준으로 브랜치를 만든다.
2. Planner handoff를 남긴다.
3. Implementer가 구현한다.
4. Reviewer가 위험과 누락을 먼저 점검한다.
5. QA가 테스트와 수동 확인 결과를 남긴다.
6. Release가 README와 PR 설명을 갱신한다.

예시:

```powershell
git switch main
git pull
git switch -c feat-date-history-view
& 'C:\Program Files\GitHub CLI\gh.exe' pr create `
  --repo JAEHAN-JANG/codex-ai-mcp `
  --draft `
  --base main `
  --head feat-date-history-view `
  --title "FEAT: add date history view" `
  --body-file docs/handoffs/<handoff-file>.md
```

## 자동화 가능한 반복 작업

Codex가 매 작업 종료 시 확인해야 하는 항목:

- 열린 Issue와 PR 상태
- PR CI 상태
- README 진행 항목 갱신 여부
- Browser MCP 실패 시 대체 검증 기록 여부
- Issue 수용 기준과 PR 변경 내용의 일치 여부

## 실습 종료 작업

`Issue #1 날짜별 기록 보기` 기능 PR이 merge되면 다음을 수행한다.

1. GitHub Pages 배포 성공 확인
2. 배포 URL에서 수동 확인
3. README 최종 진행 항목 체크
4. `Issue #1` close
5. 실습 회고를 README 또는 별도 문서에 남김

