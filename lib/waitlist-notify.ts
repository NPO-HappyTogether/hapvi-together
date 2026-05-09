import {sendTeamEmail} from "@/lib/admin-mail";

/**
 * 푸터 출시 알림 — 환경 변수 설명은 lib/admin-mail.ts 참고.
 */

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function formatPayload(signupEmail: string) {
  const subject = "[HapVi Together] 플랫폼 출시 알림 신청";
  const html = `
    <p>웹사이트 푸터에서 출시 알림을 신청한 주소입니다.</p>
    <p><strong>신청 이메일:</strong> ${escapeHtml(signupEmail)}</p>
    <p><strong>UTC 시각:</strong> ${escapeHtml(new Date().toISOString())}</p>
  `.trim();
  const text = `플랫폼 출시 알림 신청\n신청 이메일: ${signupEmail}\nUTC 시각: ${new Date().toISOString()}`;
  return {subject, html, text};
}

/** 알림 메일을 보냈으면 true, 전송 계층이 없어 건너뛰었으면 false */
export async function sendWaitlistAdminNotification(signupEmail: string): Promise<boolean> {
  const {subject, html, text} = formatPayload(signupEmail);
  return sendTeamEmail({subject, html, text, replyTo: signupEmail});
}
