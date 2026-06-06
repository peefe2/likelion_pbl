# Mission 7 - React Router 기반 아기 사자 대시보드

### 프로젝트 설명
React Router v6을 활용하여 목록/상세 페이지를 분리하고, URL 쿼리 파라미터로 필터/정렬/검색 상태를 관리하는 SPA 대시보드입니다.

### 작성자
- **작성자:** pfe (Sunchon National University)
- **과정:** 멋사 PBL 12기

### 실행 방법
```bash
yarn install
yarn dev
```
→ http://localhost:5173

### 주요 기능
- `/` — 목록 페이지 (요약 카드 그리드, 추가/삭제, 랜덤 불러오기)
- `/lions/:id` — 상세 프로필 페이지
- URL 쿼리 파라미터로 필터/정렬/검색 상태 유지 (예: `/?part=Frontend&sort=name&q=김`)
- 브라우저 뒤로가기/앞으로가기 정상 동작
