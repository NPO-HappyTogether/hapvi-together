# Phase 9 — 정부 자원 디렉토리 (Google Sheets CMS)

## URL

| 경로 | 설명 |
|------|------|
| `/resources` | 기본 한국어 |
| `/ko/resources`, `/en/resources`, `/es/resources` | locale별 |

## API

Apps Script `GET` with `?type=resources`:

```json
{
  "data": [
    {
      "id": "1",
      "category": "housing",
      "name_ko": "LA 주거 지원 프로그램",
      "name_en": "LA Housing Program",
      "name_es": "Programa de Vivienda de LA",
      "desc_ko": "LA 저소득 가정을 위한 임대 지원",
      "desc_en": "Rental assistance for low-income families",
      "desc_es": "Asistencia de renta para familias",
      "url": "https://www.hacla.org"
    }
  ]
}
```

`category`: `housing` | `food` | `health` | `utility` | `emergency`

## 환경변수

```env
# 기존 CRM Apps Script 웹앱 URL (contact/waitlist와 동일 가능)
RESOURCES_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

사이트는 `RESOURCES_WEBHOOK_URL?type=resources` 로 GET 합니다. 미설정·오류 시 빈 목록.

## 코드

- `lib/resources.ts` — fetch + types, `revalidate: 3600`
- `app/[locale]/resources/page.tsx` — 서버 fetch
- `app/[locale]/resources/resources-client.tsx` — 카테고리 필터 탭

## 배포 체크리스트

- [ ] Sheet 탭 `community_resources` + 샘플 행
- [ ] `docs/google-apps-script-resources.gs` 배포
- [ ] Vercel `RESOURCES_WEBHOOK_URL`
- [x] UI·헤더·sitemap·3개 언어 `messages/*.json` → `resources`
