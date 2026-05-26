<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# === HAPVI.ORG WEBSITE & GITHUB ===

홈페이지 코드베이스 — Cursor 작업 시 반드시 참고하는 섹션

## 저장소 정보

- **GitHub:** https://github.com/NPO-HappyTogether/hapvi-together
- **배포:** https://hapvi.org (Vercel 자동 배포 — `main` 브랜치 push 시 1~2분 내 반영)
- **Vercel:** https://vercel.com/info-70626912s-projects/hapvi-together

## 기술 스택

- Next.js 16.2.5 / React 19 / TypeScript
- Tailwind CSS 4
- **i18n:** `LocaleProvider` + `messages/` JSON (ko / en / es) — URL locale은 `/[locale]/…` 일부 페이지만 (privacy, eligibility)
- Resend (이메일 발송, 월 3,000건 무료)
- Vercel (호스팅, 무료 플랜)
- Google Sheets + Apps Script (CRM 웹훅)
- GA4 측정 ID: `G-LV7PFSGM3E`

## 폴더 구조

```
app/
  about/              → About 페이지
  contact/            → 상담 신청 폼
  services/           → 서비스 소개
  privacy/            → 개인정보 정책 (기본 ko)
  eligibility/        → 정부 혜택 안내 디렉토리 (기본 ko)
  [locale]/           → i18n 라우팅 (ko/en/es): privacy, eligibility
  (Phase 9) [locale]/resources → 지역·정부 자원 디렉토리 (Google Sheets CMS)
  api/contact/        → 상담 신청 API (rate limit + locale)
  api/waitlist/       → 뉴스레터 구독 API

components/
  Header.tsx, Footer.tsx, FooterWaitlistForm.tsx
  FloatingDonateTab.tsx, LocaleProvider.tsx, StockPhoto.tsx

lib/
  contact-welcome-mail.ts   → 환영 메일 HTML (3개 언어, 버건디 #5D1818)
  contact-google-sheet.ts   → Contact → Google Sheets
  contact-notify.ts         → 관리자 알림 메일
  contact-locale.ts         → locale → ContactMessageLanguage
  rate-limit.ts, sanitize.ts, analytics.ts, i18n.ts
  admin-mail.ts, waitlist-google-sheet.ts, waitlist-notify.ts
  seo.ts, site-images.ts
  resources.ts → Google Sheets JSON (`RESOURCES_WEBHOOK_URL?type=resources`)

messages/
  ko.json, en.json, es.json
```

## 핵심 환경변수 (Vercel에 설정됨)

- `RESEND_API_KEY` — Resend 이메일 발송 키
- `RESEND_FROM` — `HapVi Together <info@hapvi.org>`
- `GOOGLE_SHEETS_WEBHOOK_URL` — Apps Script 웹앱 URL (contact + waitlist 공통)
- `WAITLIST_GOOGLE_SHEETS_WEBHOOK_URL` — Waitlist 전용 (동일 URL, `type` 파라미터로 분기)

로컬 개발: `.env.local` (GitHub 미포함)

## Google Sheets CRM

- 파일명: **HapVi Together — CRM** (Google Drive)
- 탭 1: `consultation_requests` → Contact 폼 제출
- 탭 2: `waitlist` → 뉴스레터 구독
- 저장 항목: id / 날짜 / 이름 / 이메일 / 언어 / 메시지 / 상태

## 현재 완성 범위 (Phase 1–8)

- hapvi.org 배포 (Vercel)
- 4개 메인 페이지 (홈·서비스·소개·문의) + Privacy + **혜택 자격 확인**
- 3개 언어 (한국어·영어·스페인어)
- 환영 메일 자동화 (Resend, locale 기반 3개 언어)
- Google Sheets CRM (`consultation_requests` + `waitlist`)
- 보안 헤더 + DMARC + Rate Limiting
- SEO (Search Console + Sitemap + GA4)
- 접근성 AIM 9.9 / WCAG AA
- Privacy Policy (`/privacy`, `/[locale]/privacy`)
- EIN: 33-3980325 푸터 표기
- **Phase 8:** `/[locale]/eligibility` — 공식 링크만 있는 혜택 안내 디렉토리 (방법 A, 자격 숫자 없음)
- **품질 패스 (2026-05):** 동적 sitemap, JSON-LD, honeypot/rate limit, FAQ·신뢰 블록, GA CSP

## 브랜드 컬러

- **버건디:** `#5D1818` (헤더·버튼·강조·이메일 배너)
- Tailwind: `hapvi-primary`, `hapvi-dark`, `hapvi-light`, `cream`, `ink`

## 다음 개발 과제 (Phase 9+)

- **Phase 9:** `/[locale]/resources` — 정부 자원 디렉토리 (Google Sheets CMS, `RESOURCES_WEBHOOK_URL` — `docs/PHASE9.md`)
- **Phase 10 이후:** 예약·케이스 트래킹·문서 포털 (장기)
- **선택:** Upstash Redis 무료 티어로 분산 rate limit (현재 인메모리 + honeypot)

# === BEHAVIOR RULES ===

- 코드 수정 후 필요 시 `git push` → Vercel 자동 배포 확인 (`main`)
- 환경변수는 **Vercel 대시보드**에서만 관리 (`.env.local`은 GitHub에 미포함)
- 메시지 파일: `messages/ko.json`, `en.json`, `es.json` — **신규 UI 문구는 3개 언어 키 동시 추가**
- 새 페이지: 기존 패턴 따름 (`page.tsx` + `*-client.tsx`, `buildPageMetadata` from `lib/seo.ts`)
- Next.js 코드 작성 전 `node_modules/next/dist/docs/` 참고 (breaking changes)
