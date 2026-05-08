# HapVi Together — Website PRD (Product Requirements Document)
# Cursor AI 전용 | 이 파일을 읽고 웹사이트를 빌드하세요.

---

## PROJECT OVERVIEW

```
단체명:     HapVi Together (Happy Village Together)
법적 형태:  501(c)(3) Nonprofit Corporation
주소:       540 S. Normandie Ave #203, Los Angeles, CA 90020
기본 언어:  한국어
대상 유저:  LA 거주 저소득 한인 가정 (영어에 서투른 한인 1세)
핵심 서비스: 주거 연결, 정부 혜택 신청 지원, 지역 자원 연결
태그라인:   For a Better Village
```

---

## SITE STRUCTURE

```
/ (Landing)
/services (서비스)
/about (소개)
/contact (문의)
```

---

## GLOBAL COMPONENTS

### <Header />
```
위치: 모든 페이지 상단 고정 (sticky)
좌측: 로고 텍스트 "HapVi Together" + 태그라인 "For a Better Village"
중앙: 네비게이션 [홈, 서비스, 소개, 문의]
우측: 언어 전환 버튼 2개
  - [English] → 파란색 (#185FA5 bg: #E6F1FB)
  - [Español] → 주황색 (#854F0B bg: #FAEEDA)
모바일: 햄버거 메뉴로 전환
```

### <Footer />
```
단체명: HapVi Together
법적 고지: 캘리포니아 주 등록 501(c)(3) 비영리 단체 | 모든 서비스는 무료입니다.
연락처:
  - 이메일: [EMAIL_PLACEHOLDER]
  - 전화: [PHONE_PLACEHOLDER]
  - 카카오톡: [KAKAO_PLACEHOLDER]
주소: 540 S. Normandie Ave #203, Los Angeles, CA 90020
운영시간: 월–금 오전 9시 ~ 오후 5시 (태평양 표준시)
저작권: © 2025 HapVi Together. All rights reserved.
```

---

## PAGE 1: LANDING PAGE (/)

### Section 1 — <HeroSection />
```
컴포넌트: HeroSection
레이아웃: full-width, min-height: 100vh, 중앙 정렬
배경: 그라디언트 또는 따뜻한 녹색 계열 + 반투명 오버레이

HEADLINE (h1, text-4xl md:text-6xl, font-bold):
"미국 주거 지원,
한국어로 함께합니다."

SUBHEADLINE (p, text-lg md:text-xl, text-gray-700):
"LA에 사시는 한인 가정을 위해 주거 연결, 정부 혜택 신청,
지역 자원을 무료로 안내해드립니다."

BUTTONS:
- Primary: "무료 상담 신청하기" → href="/contact" (bg: #1D9E75, text-white)
- Secondary: "서비스 알아보기" → href="/services" (border: #1D9E75, text: #1D9E75)
```

### Section 2 — <ProblemSection />
```
컴포넌트: ProblemSection
레이아웃: max-w-3xl mx-auto, py-24, 텍스트 중심

HEADLINE (h2, text-3xl, font-bold, 중앙 정렬):
"받을 수 있는 혜택인데,
몰라서 못 받고 계신 건 아닌가요?"

BODY (p, text-lg, leading-relaxed, text-gray-600):
"미국에는 저소득 가정을 위한 주거 지원과 생활 혜택 프로그램이 많습니다.
하지만 영어 서류, 복잡한 절차, 어디서 시작해야 할지 몰라 지나치는 경우가 많습니다."

EMPHASIS (p, text-lg, font-medium, text-[#1D9E75]):
"HapVi Together는 그 과정을 한국어로 처음부터 끝까지 함께합니다."
```

### Section 3 — <ServicesSnapshotSection />
```
컴포넌트: ServicesSnapshotSection
레이아웃: 3열 카드 그리드 (grid grid-cols-1 md:grid-cols-3 gap-6)
배경: #E1F5EE (연한 녹색)

SECTION HEADLINE (h2, text-2xl, font-bold, 중앙):
"우리가 도와드리는 것들"

CARD 1:
  icon: Home (lucide-react)
  title: "주거 연결"
  description: "임대 주택·섹션8·공공 주거 프로그램 안내"
  link: "자세히 보기 →" → href="/services"

CARD 2:
  icon: FileText (lucide-react)
  title: "정부 혜택 신청"
  description: "CalFresh, Medi-Cal, LIHEAP 등 신청 동행"
  link: "자세히 보기 →" → href="/services"

CARD 3:
  icon: HandHeart (lucide-react)
  title: "지역 자원 연결"
  description: "커뮤니티 기관 및 긴급 지원 연결"
  link: "자세히 보기 →" → href="/services"
```

### Section 4 — <VisionBannerSection />
```
컴포넌트: VisionBannerSection
레이아웃: full-width, py-20, 배경: #1D9E75 (녹색), 텍스트 흰색

QUOTE (blockquote, text-2xl md:text-3xl, italic, text-white, 중앙):
"모든 한인 가정이 이 땅에서 안정된 집을 갖고,
마땅히 받아야 할 혜택을 누릴 수 있는 커뮤니티."
```

### Section 5 — <CtaBannerSection />
```
컴포넌트: CtaBannerSection
레이아웃: max-w-2xl mx-auto, py-20, 중앙 정렬

HEADLINE (h2, text-2xl, font-bold):
"지금 도움이 필요하신가요?"

BODY (p, text-lg):
"어디서 시작해야 할지 몰라도 괜찮습니다.
먼저 연락해주시면 함께 방법을 찾겠습니다."

EMPHASIS (p, text-sm, text-[#1D9E75], font-medium):
"모든 서비스는 무료입니다."

BUTTON: "무료 상담 신청하기" → href="/contact" (Primary 스타일)
```

---

## PAGE 2: SERVICES PAGE (/services)

### Section 1 — <ServicesHeroSection />
```
컴포넌트: ServicesHeroSection
레이아웃: max-w-3xl mx-auto, pt-24 pb-12, 중앙

HEADLINE (h1, text-4xl, font-bold):
"HapVi Together가 도와드리는 것들"

SUBHEADLINE (p, text-xl, text-gray-600):
"복잡한 미국 주거·복지 절차를 한국어로 처음부터 끝까지 함께합니다.
비용은 없습니다."
```

### Section 2 — <ServiceDetailCard /> × 2 (교차 레이아웃)

#### Service 1
```
컴포넌트: ServiceDetailCard (variant="left-text")
레이아웃: 2열 grid (좌: 텍스트, 우: 이미지/아이콘 일러스트)

BADGE: "서비스 01"
TITLE (h2, text-3xl, font-bold): "주거 연결 및 매칭"

DESCRIPTION (p, text-lg, leading-relaxed):
"저렴한 임대 주택을 찾고 계신가요?
섹션8(Section 8) 대기 리스트 신청이 필요하신가요?
현재 주거 상황이 불안정하신가요?

가족 상황에 맞는 주거 옵션을 함께 찾고, 신청 과정을 직접 안내해드립니다."

CHECKLIST LABEL: "이런 분께 해당됩니다"
CHECKLIST ITEMS (ul, 체크 아이콘):
- "LA에서 저렴한 임대 주택을 찾고 계신 분"
- "섹션8 또는 HUD 프로그램 신청을 원하시는 분"
- "주거가 불안정하거나 퇴거 위기에 처하신 분"
- "공공 주거(Public Housing) 정보가 필요하신 분"

BUTTON: "상담 신청하기" → href="/contact"
```

#### Service 2
```
컴포넌트: ServiceDetailCard (variant="right-text")
레이아웃: 2열 grid (좌: 이미지/아이콘, 우: 텍스트) — 교차 배치

BADGE: "서비스 02"
TITLE (h2, text-3xl, font-bold): "정부 혜택 신청 지원"

DESCRIPTION (p, text-lg, leading-relaxed):
"자격이 있어도 신청하지 못하는 경우가 많습니다.
어떤 혜택을 받을 수 있는지 확인부터,
서류 준비와 제출까지 한국어로 함께 진행합니다."

PROGRAM LIST LABEL: "지원 가능한 주요 프로그램"
PROGRAM LIST ITEMS (ul, 점 아이콘, font-medium):
- "섹션8 (Section 8 / Housing Choice Voucher)"
- "캘프레시 — 식품 지원 (CalFresh / SNAP)"
- "메디칼 — 의료 지원 (Medi-Cal)"
- "LIHEAP — 공과금 지원"
- "긴급 주거 지원 (General Relief 등)"

BUTTON: "상담 신청하기" → href="/contact"
```

### Section 3 — <ComingSoonCard />
```
컴포넌트: ComingSoonCard
레이아웃: max-w-2xl mx-auto, 배경: #F1EFE8, border-dashed, border-2

BADGE: "준비 중 · Coming 2026" (bg: #FAEEDA, text: #854F0B)
TITLE (h2, text-2xl, font-bold): "온라인 혜택 신청 플랫폼"

DESCRIPTION (p, text-lg):
"주거 탐색부터 정부 혜택 신청까지 한 곳에서 할 수 있는
한국어 온라인 플랫폼을 준비 중입니다.
출시 소식을 가장 먼저 받아보세요."

BUTTON (outline 스타일): "출시 알림 신청하기" → 이메일 입력 인라인 폼 또는 모달
```

---

## PAGE 3: ABOUT PAGE (/about)

### Section 1 — <AboutHeroSection />
```
컴포넌트: AboutHeroSection
레이아웃: max-w-3xl mx-auto, pt-24

HEADLINE (h1, text-4xl, font-bold):
"이 커뮤니티 안에서 시작되었습니다."

BODY (p, text-lg, leading-relaxed, text-gray-700):
"미국에는 저소득 가정을 위한 다양한 주거 지원과 복지 프로그램이 있습니다.
하지만 영어 장벽, 복잡한 절차, 어디서 물어봐야 할지 모르는 상황 때문에
많은 한인 가정이 마땅히 받아야 할 혜택을 받지 못하고 있습니다.

HapVi Together는 그 간격을 채우기 위해
LA 한인 커뮤니티 안에서 설립된 비영리 단체입니다.

이름처럼 — Happy Village Together —
함께 더 나은 마을을 만들어가는 것이 우리의 시작입니다."
```

### Section 2 — <MissionVisionSection />
```
컴포넌트: MissionVisionSection
레이아웃: 2열 grid (gap-12), 배경: #E1F5EE, py-20

CARD LEFT:
  label: "미션" (text-sm, font-medium, text-[#1D9E75])
  text (text-xl, font-medium, leading-relaxed):
  "LA 한인 가정이 언어와 정보의 장벽 없이
  미국의 주거 지원과 정부 혜택을 온전히 누릴 수 있도록 함께합니다."

CARD RIGHT:
  label: "비전" (text-sm, font-medium, text-[#1D9E75])
  text (text-xl, font-medium, leading-relaxed):
  "모든 한인 가정이 안정된 집에서 시작해,
  이 땅에서 다음 세대를 위한 삶을 만들어갈 수 있는 커뮤니티."
```

### Section 3 — <ValuesSection />
```
컴포넌트: ValuesSection
레이아웃: 3열 카드 그리드

SECTION HEADLINE (h2, text-2xl, font-bold, 중앙): "우리가 일하는 방식"

VALUE CARD 1:
  icon: Users (lucide-react)
  title: "동행"
  description: "대신 해주는 것이 아닌, 옆에서 함께하는 방식으로 일합니다."

VALUE CARD 2:
  icon: Unlock (lucide-react)
  title: "접근성"
  description: "언어·비용·신분의 장벽 없이 누구나 도움을 받을 수 있어야 합니다."

VALUE CARD 3:
  icon: Heart (lucide-react)
  title: "커뮤니티"
  description: "우리 안에서, 우리를 위해 존재합니다."
```

### Section 4 — <TeamSection />
```
컴포넌트: TeamSection
레이아웃: max-w-4xl mx-auto

SECTION HEADLINE (h2, text-2xl, font-bold): "함께하는 사람들"

[팀원 데이터는 아래 배열로 관리]
const team = [
  {
    name: "[이름]",
    role: "[역할]",
    bio: "[한 줄 소개]",
    image: "/images/team/[파일명].jpg"
  }
]

NOTE: 팀원 정보 확정 전까지 placeholder 카드 렌더링
```

### Section 5 — <TrustBadgeSection />
```
컴포넌트: TrustBadgeSection
레이아웃: full-width, 배경: #F1EFE8, py-12, 중앙

TEXT (p, text-lg, font-medium):
"HapVi Together는 캘리포니아 주 등록 501(c)(3) 비영리 단체입니다."

SUBTEXT (p, text-base, text-gray-600):
"모든 서비스는 무료로 제공됩니다."
```

---

## PAGE 4: CONTACT PAGE (/contact)

### Section 1 — <ContactHeroSection />
```
컴포넌트: ContactHeroSection
레이아웃: max-w-2xl mx-auto, pt-24 pb-12, 중앙

HEADLINE (h1, text-4xl, font-bold): "언제든지 연락해주세요."

SUBHEADLINE (p, text-xl, text-gray-600):
"어디서부터 시작해야 할지 몰라도 괜찮습니다.
지금 상황을 간단히 알려주시면, 함께 방법을 찾아드립니다."
```

### Section 2 — <ContactSection />
```
컴포넌트: ContactSection
레이아웃: 2열 grid (좌: 폼, 우: 연락처 정보)
모바일: 1열 (폼 먼저, 연락처 나중)

[LEFT] <ContactForm />
라이브러리: React Hook Form
제출 방식: fetch('/api/contact') 또는 Formspree/EmailJS

FORM FIELDS:
  1. name:
     type: text
     label: "이름"
     placeholder: "홍길동"
     required: true

  2. contact:
     type: text
     label: "연락처 (전화번호 또는 이메일)"
     placeholder: "010-0000-0000 또는 email@example.com"
     required: true

  3. helpType:
     type: checkbox-group
     label: "필요한 도움을 선택해주세요"
     options:
       - value: "housing" label: "주거 연결"
       - value: "benefits" label: "정부 혜택 신청"
       - value: "unknown" label: "잘 모르겠음"
     required: false

  4. message:
     type: textarea
     label: "상황을 간략히 알려주세요 (선택)"
     placeholder: "현재 상황을 자유롭게 적어주세요."
     rows: 4
     required: false

SUBMIT BUTTON: "상담 신청하기" (full-width, Primary 스타일)

SUCCESS MESSAGE (제출 후 표시):
"감사합니다! 빠른 시일 내에 연락드리겠습니다."

[RIGHT] <ContactInfo />
항목:
  - icon: Mail, label: "이메일", value: "[EMAIL_PLACEHOLDER]"
  - icon: Phone, label: "전화", value: "[PHONE_PLACEHOLDER]"
  - icon: MessageCircle, label: "카카오톡", value: "[KAKAO_PLACEHOLDER]"
  - icon: Clock, label: "운영시간", value: "월–금 오전 9시 ~ 오후 5시 (PT)"
```

### Section 3 — <ReassuranceBanner />
```
컴포넌트: ReassuranceBanner
레이아웃: full-width, 배경: #E1F5EE, py-10, 중앙

TEXT (p, text-lg, font-medium, text-[#0F6E56]):
"모든 상담은 무료이며 비밀이 보장됩니다."

SUBTEXT (p, text-base, text-gray-600):
"체류 신분이나 서류 상태에 관계없이 도와드립니다."
```

---

## COMPONENT CHECKLIST
```
[ ] Header (with language toggle)
[ ] Footer
[ ] HeroSection
[ ] ProblemSection
[ ] ServicesSnapshotSection
[ ] VisionBannerSection
[ ] CtaBannerSection
[ ] ServicesHeroSection
[ ] ServiceDetailCard (left + right variant)
[ ] ComingSoonCard
[ ] AboutHeroSection
[ ] MissionVisionSection
[ ] ValuesSection
[ ] TeamSection
[ ] TrustBadgeSection
[ ] ContactHeroSection
[ ] ContactForm
[ ] ContactInfo
[ ] ReassuranceBanner
```

---

## PLACEHOLDERS (나중에 채울 항목)
```
[EMAIL_PLACEHOLDER]   → 이메일 주소 확정 후 교체
[PHONE_PLACEHOLDER]   → 전화번호 확정 후 교체
[KAKAO_PLACEHOLDER]   → 카카오톡 채널 링크 확정 후 교체
팀원 정보             → 이름·역할·사진 확정 후 TeamSection에 추가
도메인                → 확정 후 next.config.js에 설정
```

---

## CURSOR PROMPT (복사해서 바로 사용)
```
이 PRD 파일을 읽고 HapVi Together 웹사이트를 빌드해줘.

기술 스택: Next.js 14 (App Router) + Tailwind CSS + lucide-react
폰트: Noto Sans KR (한국어), Inter (영어) — next/font 사용
컬러: Primary #1D9E75, Light #E1F5EE, Dark #0F6E56

요구사항:
1. .cursor/rules 파일 규칙을 반드시 따를 것
2. 모든 컴포넌트는 /components 폴더에 분리해서 만들 것
3. 모바일 퍼스트로 작성할 것
4. 한국어 텍스트는 절대 변경하지 말 것
5. [PLACEHOLDER] 항목은 그대로 두고 주석으로 표시할 것

시작: Header와 Footer 먼저 만들고, Landing 페이지부터 빌드해줘.
```
