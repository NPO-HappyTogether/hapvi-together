export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <h2 className="text-xl font-bold text-hapvi-dark">HapVi Together</h2>
        <p className="mt-3 text-sm text-gray-700">
          캘리포니아 주 등록 501(c)(3) 비영리 단체 | 모든 서비스는 무료입니다.
        </p>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          {/* [PLACEHOLDER] 이메일 주소 확정 후 교체 */}
          <p>이메일: [EMAIL_PLACEHOLDER]</p>
          {/* [PLACEHOLDER] 전화번호 확정 후 교체 */}
          <p>전화: [PHONE_PLACEHOLDER]</p>
          {/* [PLACEHOLDER] 카카오톡 채널 링크 확정 후 교체 */}
          <p>카카오톡: [KAKAO_PLACEHOLDER]</p>
          <p>주소: 540 S. Normandie Ave #203, Los Angeles, CA 90020</p>
          <p>운영시간: 월–금 오전 9시 ~ 오후 5시 (태평양 표준시)</p>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          © 2025 HapVi Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
