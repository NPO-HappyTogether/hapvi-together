import en from "@/messages/en.json";
import es from "@/messages/es.json";
import ko from "@/messages/ko.json";

export type Locale = "ko" | "en" | "es";

export type Messages = typeof ko;

const messagesByLocale: Record<Locale, Messages> = {ko, en, es};

export function isLocale(value: string): value is Locale {
  return value === "ko" || value === "en" || value === "es";
}

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale];
}

export const LOCALES: Locale[] = ["ko", "en", "es"];

export const OG_LOCALE: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  es: "es_ES",
};
