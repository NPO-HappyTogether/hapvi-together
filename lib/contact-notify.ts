import {sendTeamEmail} from "@/lib/admin-mail";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const HELP_LABELS_KO: Record<string, string> = {
  housing: "주거 연결",
  benefits: "정부 혜택 신청",
  unknown: "저렴한 주택 정보",
};

export async function sendContactConsultationEmail(payload: {
  name: string;
  contact: string;
  helpTypes: string[];
  message: string;
}): Promise<boolean> {
  const helpLine = payload.helpTypes.map((v) => HELP_LABELS_KO[v] ?? v).join(", ");

  const subject = `[HapVi Together] 상담 신청: ${payload.name}`;

  const html = `
    <p><strong>이름:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>연락처:</strong> ${escapeHtml(payload.contact)}</p>
    <p><strong>필요한 도움:</strong> ${escapeHtml(helpLine || "(없음)")}</p>
    <p><strong>상황:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(payload.message || "(없음)")}</pre>
    <p><strong>UTC 시각:</strong> ${escapeHtml(new Date().toISOString())}</p>
  `.trim();

  const text = [
    `상담 신청 (웹 문의 폼)`,
    `이름: ${payload.name}`,
    `연락처: ${payload.contact}`,
    `필요한 도움: ${helpLine || "(없음)"}`,
    `상황: ${payload.message || "(없음)"}`,
    `UTC 시각: ${new Date().toISOString()}`,
  ].join("\n");

  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.contact.trim())
    ? payload.contact.trim()
    : undefined;

  return sendTeamEmail({subject, html, text, replyTo});
}
