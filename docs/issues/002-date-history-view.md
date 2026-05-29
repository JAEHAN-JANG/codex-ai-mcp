# 002. 날짜별 기록 보기

## 배경

현재 Habit Check는 날짜별 습관 완료 상태를 `localStorage`에 저장하지만, 사용자가 앱 안에서 이전 날짜의 기록을 탐색할 수 없다.
다음 기능은 GitHub Issue와 PR 흐름으로 진행할 작은 기능 단위로 정의한다.

## 목표

사용자가 선택한 날짜의 습관 완료 상태를 확인하고, 오늘 기록으로 쉽게 돌아올 수 있게 한다.

## 사용자 흐름

1. 사용자는 앱 상단에서 현재 선택된 날짜를 확인한다.
2. 사용자는 이전/다음 날짜 버튼 또는 날짜 입력으로 다른 날짜를 선택한다.
3. 앱은 선택한 날짜의 완료 상태를 표시한다.
4. 사용자는 오늘로 돌아가기 버튼으로 현재 날짜 기록으로 복귀한다.

## 수용 기준

- [ ] 선택 날짜가 앱 화면에 명확히 표시된다.
- [ ] 이전 날짜와 다음 날짜로 이동할 수 있다.
- [ ] 오늘로 돌아가기 동작이 제공된다.
- [ ] 날짜별 완료 상태는 기존 `localStorage` 저장 구조와 호환된다.
- [ ] 날짜 이동은 기존 습관 목록, 완료 토글, 완료된 습관 숨기기 기능을 깨뜨리지 않는다.
- [ ] `node tests/core.test.mjs`가 통과한다.
- [ ] `node tests/smoke.test.mjs`가 통과한다.
- [ ] 데스크톱과 모바일 화면에서 수동 확인한다.

## 범위 제외

- 서버 저장소 또는 계정 동기화
- 달력 월간 뷰
- 통계 차트

## Agent 라우팅

- Planner: UI 흐름과 상태 변경 범위 정리
- Implementer: `src/core.js`, `src/app.js`, `index.html`, `styles/main.css` 변경
- Reviewer: 기존 `localStorage` 호환성과 회귀 위험 점검
- QA: core/smoke test 및 브라우저 수동 확인
- Release: README 진행 항목과 PR 설명 정리

## 검증 계획

```powershell
node tests/core.test.mjs
node tests/smoke.test.mjs
node scripts/serve.mjs
```

