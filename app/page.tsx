import Link from "next/link";
import { FileText, HandHeart, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white">
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-hapvi-light via-white to-[#f0fbf6] px-4 py-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            미국 주거 지원,
            <br />
            한국어로 함께합니다.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
            LA에 사시는 한인 가정을 위해 주거 연결, 정부 혜택 신청, 지역 자원을
            무료로 안내해드립니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-full bg-hapvi-primary px-6 py-3 text-center text-base font-medium text-white transition hover:bg-hapvi-dark sm:w-auto"
            >
              무료 상담 신청하기
            </Link>
            <Link
              href="/services"
              className="w-full rounded-full border border-hapvi-primary px-6 py-3 text-center text-base font-medium text-hapvi-primary transition hover:bg-hapvi-light sm:w-auto"
            >
              서비스 알아보기
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
        <h2 className="text-3xl font-bold leading-snug text-gray-900">
          받을 수 있는 혜택인데,
          <br className="sm:hidden" /> 몰라서 못 받고 계신 건 아닌가요?
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          미국에는 저소득 가정을 위한 주거 지원과 생활 혜택 프로그램이 많습니다.
          하지만 영어 서류, 복잡한 절차, 어디서 시작해야 할지 몰라 지나치는
          경우가 많습니다.
        </p>
        <p className="mt-5 text-lg font-medium text-hapvi-primary">
          HapVi Together는 그 과정을 한국어로 처음부터 끝까지 함께합니다.
        </p>
      </section>

      <section className="bg-hapvi-light px-4 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            우리가 도와드리는 것들
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <HomeIcon className="h-7 w-7 text-hapvi-primary" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">주거 연결</h3>
              <p className="mt-3 text-gray-600">
                임대 주택·섹션8·공공 주거 프로그램 안내
              </p>
              <Link
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-hapvi-dark hover:underline"
              >
                자세히 보기 →
              </Link>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <FileText className="h-7 w-7 text-hapvi-primary" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">정부 혜택 신청</h3>
              <p className="mt-3 text-gray-600">
                CalFresh, Medi-Cal, LIHEAP 등 신청 동행
              </p>
              <Link
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-hapvi-dark hover:underline"
              >
                자세히 보기 →
              </Link>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <HandHeart className="h-7 w-7 text-hapvi-primary" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">지역 자원 연결</h3>
              <p className="mt-3 text-gray-600">
                커뮤니티 기관 및 긴급 지원 연결
              </p>
              <Link
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-hapvi-dark hover:underline"
              >
                자세히 보기 →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-hapvi-primary px-4 py-20 text-white">
        <blockquote className="mx-auto max-w-4xl text-center text-2xl italic leading-relaxed md:text-3xl">
          "모든 한인 가정이 이 땅에서 안정된 집을 갖고, 마땅히 받아야 할 혜택을
          누릴 수 있는 커뮤니티."
        </blockquote>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">지금 도움이 필요하신가요?</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            어디서 시작해야 할지 몰라도 괜찮습니다. 먼저 연락해주시면 함께 방법을
            찾겠습니다.
          </p>
          <p className="mt-3 text-sm font-medium text-hapvi-primary">
            모든 서비스는 무료입니다.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
