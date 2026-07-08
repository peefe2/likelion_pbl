# Mission 8 - TypeScript 마이그레이션 아기 사자 대시보드

### 프로젝트 설명
7주차 React Router 기반 아기 사자 대시보드를 기능 변경 없이 TypeScript(.tsx/.ts)로 마이그레이션한 프로젝트입니다.

### 작성자
- **작성자:** 전인철 (Sunchon National University)
- **과정:** 멋사 PBL 12기

### 실행 방법
```bash
yarn install
yarn dev
```
→ http://localhost:5173

### 타입 검사 / 빌드
```bash
yarn build   # tsc -b && vite build
```

### 주요 기능
- `/` — 목록 페이지 (요약 카드 그리드, 추가/삭제, 랜덤 불러오기)
- `/lions/:id` — 상세 프로필 페이지
- URL 쿼리 파라미터로 필터/정렬/검색 상태 유지 (예: `/?part=Frontend&sort=name&q=김`)
- 브라우저 뒤로가기/앞으로가기 정상 동작

### TypeScript 적용 사항
- 모든 컴포넌트는 `.tsx`, 유틸리티/훅/데이터 파일은 `.ts`로 작성
- `src/types/` 디렉토리에 공통 타입 분리 (`lion.ts`, `randomUser.ts`, `hooks.ts`)
- 모든 컴포넌트 props에 `interface` 정의
- `useState`에 제네릭으로 상태 타입 명시
- 이벤트 핸들러에 `ChangeEvent`, `FormEvent` 등 React 타입 적용
- `any` 미사용, `part` 문자열 좁히기는 타입 단언(`as`) 대신 타입 가드 사용
- `tsconfig`의 `strict: true` 유지, `tsc -b` 빌드 통과
