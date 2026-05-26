# Phase 9 — 지역·정부 자원 디렉토리 (Google Sheets CMS)

## 목표

비개발자가 Google Sheets에서 자원 목록을 수정하면, 사이트 `/[locale]/resources`에 반영된다.  
Phase 8(혜택 안내)과 동일하게 **공식 링크만 제공**하고, 자격·소득 숫자는 넣지 않는다.

## URL

| 경로 | 설명 |
|------|------|
| `/resources` | 기본 한국어 |
| `/ko/resources`, `/en/resources`, `/es/resources` | locale별 |

## Google Sheet 탭: `community_resources`

| 열 | 필수 | 설명 |
|----|------|------|
| `id` | ✅ | 고유 ID (예: `la-korean-center`) |
| `category` | ✅ | `housing` \| `food` \| `health` \| `legal` \| `emergency` \| `community` \| `other` |
| `title_ko` | ✅ | 한국어 제목 |
| `title_en` | ✅ | 영어 제목 |
| `title_es` | ✅ | 스페인어 제목 |
| `description_ko` | ✅ | 한국어 설명 (1~3문장) |
| `description_en` | ✅ | 영어 설명 |
| `description_es` | ✅ | 스페인어 설명 |
| `url` | ✅ | 공식 사이트 URL |
| `active` | ✅ | `TRUE` / `FALSE` |
| `sort_order` | | 숫자 (작을수록 위) |
| `last_verified` | | `2026-05` 형식 (선택) |

## 환경변수

```env
# Apps Script 웹앱 URL (GET → JSON 목록). Vercel Production에 설정.
RESOURCES_CMS_URL=https://script.google.com/macros/s/.../exec
```

미설정 시 `data/resources-fallback.json`을 사용 (로컬·빌드용).

## Apps Script

`docs/google-apps-script-resources.gs` 를 CRM 스프레드시트에 붙이고, 웹앱으로 **실행 사용자: 나**, **액세스: 모든 사용자** 배포.

## 완료 기준

- [ ] Sheet 탭 `community_resources` + Apps Script 배포 + Vercel `RESOURCES_CMS_URL` (운영 설정)
- [x] 3개 언어 UI (`messages/*.json` → `Resources`)
- [x] 헤더·홈(지역 자원 카드)에서 `/[locale]/resources` 진입
- [x] sitemap에 `/resources` 및 locale URL 포함
- [x] 외부 링크 `rel="noopener noreferrer"`
