export type ContactMessageLanguage = "Korean" | "English" | "Spanish" | "Other";

/** 한글 음절·자모 */
const HANGUL_RE = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/;

/** 스페인어 특유 문자 또는 흔한 단어(악센트 없는 입력 보조) */
const SPANISH_MARK_RE = /[ñáéíóúü¿¡]/i;
const SPANISH_WORD_RE =
  /\b(el|la|los|las|que|por|para|con|gracias|hola|bienvenido|bienvenida|cómo|como|está|están|usted|ustedes|mucho|gusto)\b/i;

/** 영어에서 자주 쓰이는 짧은 단어(라틴 문자 위주 메시지 분류 보조) */
const ENGLISH_WORD_RE =
  /\b(the|and|for|you|with|from|this|that|have|has|are|was|were|help|please|hello|thanks|contact|need|want|here)\b/i;

/**
 * message 텍스트 기준 언어 추정.
 * 비어 있으면 Other. 한글·스페인어 신호·영어 신호 순으로 판별.
 */
export function detectMessageLanguage(message: string): ContactMessageLanguage {
  const s = message.trim();
  if (!s) return "Other";

  if (HANGUL_RE.test(s)) return "Korean";

  if (SPANISH_MARK_RE.test(s) || SPANISH_WORD_RE.test(s)) return "Spanish";

  if (/[a-zA-Z]/.test(s) && ENGLISH_WORD_RE.test(s)) return "English";

  if (/[a-zA-Z]/.test(s)) {
    const letters = (s.match(/[a-zA-Z]/g) ?? []).length;
    const nonSpace = s.replace(/\s/g, "").length || 1;
    if (letters / nonSpace >= 0.45) return "English";
  }

  return "Other";
}
