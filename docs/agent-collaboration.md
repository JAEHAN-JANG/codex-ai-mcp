# Agent Collaboration Harness

이 문서는 Habit Check 프로젝트에서 여러 개발 agent가 서로 협의하며 작업하는 방식을 정의합니다.

## 기본 원칙

1. 모든 agent는 `AGENTS.md`와 현재 이 문서를 먼저 따른다.
2. 역할별 산출물은 다음 agent가 바로 사용할 수 있을 만큼 구체적이어야 한다.
3. 구현 agent는 계획 없이 큰 변경을 시작하지 않는다.
4. 리뷰 agent는 칭찬보다 위험, 누락, 검증 공백을 먼저 찾는다.
5. QA agent는 실행한 명령과 확인하지 못한 항목을 분리해서 남긴다.
6. 작업 종료 시 README의 `진행 항목`을 갱신한다.

## Agent 흐름

```text
Planner
→ Implementer
→ Reviewer
→ QA
→ Release
→ Automation
```

작업 성격에 따라 일부 agent는 생략할 수 있지만, 다음 경우에는 생략하지 않습니다.

- 사용자에게 보이는 동작 변경
- GitHub Actions, Docker, 배포 변경
- 자동화 프롬프트 변경
- 저장소 운영 규칙 변경

## Handoff 형식

각 agent는 다음 형식으로 다음 agent에게 넘깁니다.

```md
## Context

## Decisions

## Files Touched Or Expected

## Risks

## Verification Required

## Open Questions
```

## 완료 기준

작업은 다음 조건을 만족해야 완료로 봅니다.

- 관련 테스트가 통과했다.
- 문서나 명령이 바뀌면 README, AGENTS, 관련 docs 중 필요한 곳이 갱신됐다.
- GitHub Actions나 Docker 변경은 로컬에서 가능한 범위까지 검증됐다.
- README의 `진행 항목`에 완료 여부가 반영됐다.
- 최종 응답에 실행한 검증과 남은 리스크가 포함됐다.
