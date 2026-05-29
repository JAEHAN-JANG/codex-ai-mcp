# Completion Protocol

이 문서는 연결된 작업이 끝날 때마다 수행해야 하는 종료 절차입니다.

## 적용 대상

다음 작업은 반드시 이 절차를 따릅니다.

- 기능 추가 또는 수정
- 테스트, CI, CD, Docker 변경
- MCP, 자동화, agent 하네스 변경
- GitHub Issue/PR 템플릿 변경
- README, AGENTS, 운영 문서 변경

## 종료 절차

1. 관련 테스트를 실행한다.
2. 실행하지 못한 검증이 있으면 이유를 기록한다.
3. 문서와 실제 명령어가 일치하는지 확인한다.
4. README의 `진행 항목` 목록을 갱신한다.
5. 새 후속 작업이 생기면 `docs/issues/` 또는 GitHub Issue로 남긴다.
6. 최종 응답에 변경사항, 검증 결과, 남은 리스크를 포함한다.

## README 진행 항목 규칙

README에는 다음 형식의 진행 항목을 둡니다.

```md
<details>
<summary>진행 항목</summary>

- [x] 완료된 항목
- [ ] 예정된 항목

</details>
```

완료된 작업은 `[x]`로 표시하고, 아직 검증되지 않은 작업은 완료로 표시하지 않습니다.

## 자동화 점검 기준

자동화는 다음을 확인합니다.

- 최근 변경과 README 진행 항목이 맞는가?
- CI/CD, Docker, agent 하네스 변경이 문서화됐는가?
- 테스트 명령이 README와 AGENTS에서 일치하는가?
- Browser MCP 실패 같은 known limitation이 계속 명시돼 있는가?
