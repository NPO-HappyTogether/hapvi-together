"use client";

import {useLocale, type Locale} from "@/components/LocaleProvider";
import {useEffect} from "react";

/** URL locale과 헤더·푸터 언어를 맞춥니다. */
export default function EligibilityLocaleSync({locale}: {locale: Locale}) {
  const {setLocale} = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return null;
}
