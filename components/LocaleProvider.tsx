"use client";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import ko from "@/messages/ko.json";
import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from "react";

export type Locale = "ko" | "en" | "es";
export type Messages = typeof ko;

const messagesByLocale: Record<Locale, Messages> = {
  ko,
  en,
  es,
};

const STORAGE_KEY = "hapvi-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({children}: {children: ReactNode}) {
  const [locale, setLocaleState] = useState<Locale>("ko");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "es" || stored === "ko") {
        setLocaleState(stored);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const lang = locale === "ko" ? "ko" : locale === "es" ? "es" : "en";
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const messages = useMemo(() => messagesByLocale[locale], [locale]);

  const value = useMemo(() => ({locale, setLocale, messages}), [locale, setLocale, messages]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
