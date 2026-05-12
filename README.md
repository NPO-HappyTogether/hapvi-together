# HapVi Together — Happy Village Together

LA 저소득 한인 가정을 위한 주거 지원 및 정부 혜택 연결 비영리 단체입니다.
미국 국세법 Section 501(c)(3)에 의거한 면세 비영리 단체이며, 캘리포니아 주에 등록된 법인입니다.

## 미션

LA 한인 가정이 언어와 정보의 장벽 없이 미국의 주거 지원과 정부 혜택을 온전히 누릴 수 있도록 함께합니다.

## 웹사이트

https://hapvi.org

## 기술 스택

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Language: TypeScript
- i18n: next-intl (한국어/영어/스페인어)
- Email: Resend
- Hosting: Vercel

## 로컬 개발

`.env.example`을 `.env.local`로 복사한 뒤 값을 채웁니다. 프로덕션(Vercel)에도 동일한 변수명으로 [Environment Variables](https://vercel.com/docs/projects/environment-variables)에 등록합니다. 상담 폼의 Google Sheets 연동에는 **`GOOGLE_SHEETS_WEBHOOK_URL`** 이 필요합니다.

```bash
npm install
npm run dev
```

## 연락처

info@hapvi.org

https://hapvi.org/contact

## License

This project is maintained by HapVi Together, a 501(c)(3) nonprofit organization.
