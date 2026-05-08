"use client";

import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-2xl px-4 pb-12 pt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">언제든지 연락해주세요.</h1>
        <p className="mt-6 whitespace-pre-line text-xl text-gray-600">
          어디서부터 시작해야 할지 몰라도 괜찮습니다.
          {"\n"}지금 상황을 간단히 알려주시면, 함께 방법을 찾아드립니다.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 pb-20 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-800">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="contact" className="mb-2 block text-sm font-medium text-gray-800">
                연락처 (전화번호 또는 이메일)
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                placeholder="010-0000-0000 또는 email@example.com"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
              />
            </div>

            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-gray-800">
                필요한 도움을 선택해주세요
              </legend>
              <div className="space-y-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="helpType" value="housing" />
                  <span>주거 연결</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="helpType" value="benefits" />
                  <span>정부 혜택 신청</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="helpType" value="unknown" />
                  <span>잘 모르겠음</span>
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-800">
                상황을 간략히 알려주세요 (선택)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="현재 상황을 자유롭게 적어주세요."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none ring-hapvi-primary placeholder:text-gray-400 focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-hapvi-primary px-6 py-3 text-base font-medium text-white transition hover:bg-hapvi-dark"
            >
              상담 신청하기
            </button>
          </form>

          {submitted && (
            <p className="mt-4 rounded-xl bg-hapvi-light px-4 py-3 text-sm font-medium text-hapvi-dark">
              감사합니다! 빠른 시일 내에 연락드리겠습니다.
            </p>
          )}
        </div>

        <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-gray-900">연락처 정보</h2>
          <ul className="mt-5 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-hapvi-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">이메일</p>
                {/* [PLACEHOLDER] 이메일 주소 확정 후 교체 */}
                <p>[EMAIL_PLACEHOLDER]</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-hapvi-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">전화</p>
                {/* [PLACEHOLDER] 전화번호 확정 후 교체 */}
                <p>[PHONE_PLACEHOLDER]</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 text-hapvi-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">카카오톡</p>
                {/* [PLACEHOLDER] 카카오톡 채널 링크 확정 후 교체 */}
                <p>[KAKAO_PLACEHOLDER]</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-hapvi-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">운영시간</p>
                <p>월–금 오전 9시 ~ 오후 5시 (PT)</p>
              </div>
            </li>
          </ul>
        </aside>
      </section>

      <section className="bg-hapvi-light px-4 py-10 text-center">
        <p className="text-lg font-medium text-hapvi-dark">
          모든 상담은 무료이며 비밀이 보장됩니다.
        </p>
        <p className="mt-2 text-base text-gray-600">
          체류 신분이나 서류 상태에 관계없이 도와드립니다.
        </p>
      </section>
    </div>
  );
}
