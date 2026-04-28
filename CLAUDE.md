# P10 선수존 (sunsujone) CLAUDE.md
> 최종 업데이트: 2026-04-28 | 작성자: 코부장

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 도메인 | https://www.sunsuzone.kr |
| Vercel 프로젝트 | sunsujone (choco org) |
| GitHub | https://github.com/bizsetter7/sunsujone |
| Supabase | P2와 공유 (ronqwailyistjuyolmyh) |
| 브랜드 컬러 | #D4AF37 (골드) |
| 타겟 | 남성 선수 알바 구직자 (호스트바, 텐카페 등) |

---

## 2. 기술 스택

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Supabase (공유 DB — P2/P9/P10 동일)
- Vercel (배포)

---

## 3. 라우팅 구조 (핵심 — 절대 변경 금지)

```
/                     → 홈 (HomePortalClient.tsx)
/coco/[region]        → 지역 SEO 랜딩 페이지
/coco/[region]/[id]   → 광고 상세
/jobs                 → 구인 목록
/jobs/[id]            → 구인 상세
/region               → 지역 목록
/community            → 커뮤니티
/go/[slug]            → 단축 URL 리다이렉트
/admin/*              → 관리자 (어드민 이메일 체크)
```

**⚠️ 주의**: Footer/page.tsx의 링크는 반드시 `/coco/` 경로 사용. `/sunsu/` 경로는 존재하지 않음!

---

## 4. P2 코코알바와의 차이점

| 구분 | P2 코코알바 | P10 선수존 |
|------|------------|-----------|
| 도메인 | cocoalba.kr | sunsuzone.kr |
| 브랜드 컬러 | 핑크 | 골드 |
| 타겟 | 여성알바 (유흥) | 남성 선수 (호스트바 등) |
| DB | 공유 | 공유 (같은 Supabase) |
| shops.json | 실제 광고 데이터 | 빈 배열 `[]` (DB에서 로드) |

---

## 5. 절대 원칙 (MUST NOT)

1. **`next.config.ts`에 `ignoreBuildErrors: true` 절대 금지** — Antigravity 위반 이력 있음 (2026-04-28 제거)
2. **`middleware.ts`에 어드민 리다이렉트 추가 금지** — Vercel 무한루프 원인
3. **파일 전체 덮어쓰기 금지** — Edit 핀셋 수정만
4. **shops.json에 P2 광고데이터 절대 복사 금지** — `[]` 유지
5. **`/sunsu/` 경로 링크 금지** — 존재하지 않는 라우트, `/coco/` 사용

---

## 6. 배포 체크리스트

- [ ] `npx tsc --noEmit` → 에러 0개 확인
- [ ] `npm run build` → Exit code 0 확인
- [ ] Git push → Vercel 자동 배포 (~2분)
- [ ] www.sunsuzone.kr 접속 확인
- [ ] /coco/서울 페이지 확인

---

## 7. DNS 설정 (Cafe24)

- A 레코드: `76.76.21.21` (Vercel IP) — 2026-04-28 설정
- www 서브도메인: Vercel 자동 관리
- 전파 시간: 최대 24시간 (보통 30분~1시간)

---

## 8. Supabase 공유 DB 주의사항

- P2/P9/P10이 같은 Supabase 프로젝트 사용
- P10에서 보이는 광고는 P2 DB의 광고 (공유)
- 새 광고는 P2 어드민 또는 야사장(P5)에서 등록
- Supabase OAuth: sunsuzone.kr redirect URL 등록 필요 (미완료)

---

## 9. 알려진 이슈 및 TODO

### 완료된 이슈
- [x] TS 빌드 에러 전면 수정 (work-type-guide.ts, Route exports, params Promise 등)
- [x] `ignoreBuildErrors: true` 제거 (Antigravity 위반사항)
- [x] shops.json 초기화
- [x] COCOALBA 브랜딩 잔재 제거
- [x] /sunsu/ → /coco/ 라우팅 수정
- [x] Shadow_SEO_Master.json "(COCOALBA)" 제거

### 미완료 TODO
- [ ] 독립 Supabase 프로젝트 분리 (장기 계획)
- [ ] Supabase OAuth redirect URL: sunsuzone.kr 등록
- [ ] 트위터/X API 환경변수 설정
- [ ] IndexNow API 키 등록
- [ ] DNS 전파 완료 후 www.sunsuzone.kr 접속 확인

---

## 10. 환경변수 (Vercel에 설정 필요)

```
NEXT_PUBLIC_SUPABASE_URL=       (P2와 공유)
NEXT_PUBLIC_SUPABASE_ANON_KEY=  (P2와 공유)
SUPABASE_SERVICE_ROLE_KEY=      (P2와 공유)
CRON_SECRET=                    (크론 보안키)
NEXT_PUBLIC_SITE_NAME=선수존
NEXT_PUBLIC_SITE_URL=https://www.sunsuzone.kr
```

---

## 11. 코드다이어트 분석 결과 (2026-04-28)

### 수정 완료
- `Shadow_SEO_Master.json`: "선수존 (COCOALBA)" → "선수존"
- `Footer.tsx`: POPULAR_REGIONS 링크 /sunsu/ → /coco/
- `page.tsx`: 내부 링크 /sunsu/ → /coco/
- `TabPolicies.tsx`: sunsujone.co.kr → www.sunsuzone.kr
- `work-type-guide.ts`: WorkTypeSlug 타입 완화 → string

### 안전하게 남겨둔 것 (의도적)
- `초코아이디어` 사업자 정보: 실제 운영사 맞음 → 유지
- `/src/app/admin/*`: 관리자 기능 필요 → 유지
- Twitter/SNS 크론: 환경변수 없으면 503 반환 → 안전하게 유지

### 추가 검토 필요
- `/api/cron/band-post/route.ts`: URL 하드코딩 여부
- `/api/cron/indexnow/route.ts`: sunsuzone.kr URL 확인
