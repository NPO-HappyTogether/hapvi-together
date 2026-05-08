import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-3xl px-4 pb-12 pt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          HapVi Together가 도와드리는 것들
        </h1>
        <p className="mt-6 text-xl text-gray-600">
          복잡한 미국 주거·복지 절차를 한국어로 처음부터 끝까지 함께합니다.
          <br />
          비용은 없습니다.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-20">
        <article className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div>
            <span className="inline-flex rounded-full bg-hapvi-light px-3 py-1 text-sm font-medium text-hapvi-dark">
              서비스 01
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">주거 연결 및 매칭</h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-gray-700">
              저렴한 임대 주택을 찾고 계신가요?
              {"\n"}섹션8(Section 8) 대기 리스트 신청이 필요하신가요?
              {"\n"}현재 주거 상황이 불안정하신가요?
              {"\n"}
              {"\n"}가족 상황에 맞는 주거 옵션을 함께 찾고, 신청 과정을 직접 안내해드립니다.
            </p>

            <p className="mt-6 text-sm font-semibold text-hapvi-primary">
              이런 분께 해당됩니다
            </p>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>LA에서 저렴한 임대 주택을 찾고 계신 분</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>섹션8 또는 HUD 프로그램 신청을 원하시는 분</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>주거가 불안정하거나 퇴거 위기에 처하신 분</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-hapvi-primary" />
                <span>공공 주거(Public Housing) 정보가 필요하신 분</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
            >
              상담 신청하기
            </Link>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-hapvi-light to-white p-8 text-center text-gray-500">
            이미지/아이콘 일러스트
          </div>
        </article>

        <article className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="order-2 md:order-1 rounded-2xl bg-gradient-to-br from-hapvi-light to-white p-8 text-center text-gray-500">
            이미지/아이콘 일러스트
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-flex rounded-full bg-hapvi-light px-3 py-1 text-sm font-medium text-hapvi-dark">
              서비스 02
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">정부 혜택 신청 지원</h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-gray-700">
              자격이 있어도 신청하지 못하는 경우가 많습니다.
              {"\n"}어떤 혜택을 받을 수 있는지 확인부터,
              {"\n"}서류 준비와 제출까지 한국어로 함께 진행합니다.
            </p>

            <p className="mt-6 text-sm font-semibold text-hapvi-primary">
              지원 가능한 주요 프로그램
            </p>
            <ul className="mt-3 space-y-2 text-gray-800">
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>섹션8 (Section 8 / Housing Choice Voucher)</span>
              </li>
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>캘프레시 — 식품 지원 (CalFresh / SNAP)</span>
              </li>
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>메디칼 — 의료 지원 (Medi-Cal)</span>
              </li>
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>LIHEAP — 공과금 지원</span>
              </li>
              <li className="flex items-start gap-2 font-medium">
                <Circle className="mt-1 h-3.5 w-3.5 fill-current text-hapvi-primary" />
                <span>긴급 주거 지원 (General Relief 등)</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
            >
              상담 신청하기
            </Link>
          </div>
        </article>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border-2 border-dashed border-[#d9cdb2] bg-[#F1EFE8] p-8 text-center">
          <span className="inline-flex rounded-full bg-[#FAEEDA] px-3 py-1 text-sm font-medium text-[#854F0B]">
            준비 중 · Coming 2026
          </span>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">온라인 혜택 신청 플랫폼</h2>
          <p className="mt-4 whitespace-pre-line text-lg text-gray-700">
            주거 탐색부터 정부 혜택 신청까지 한 곳에서 할 수 있는
            {"\n"}한국어 온라인 플랫폼을 준비 중입니다.
            {"\n"}출시 소식을 가장 먼저 받아보세요.
          </p>

          <form className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="이메일 주소"
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-full border border-hapvi-primary px-5 py-3 text-sm font-medium text-hapvi-primary transition hover:bg-hapvi-light"
            >
              출시 알림 신청하기
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
