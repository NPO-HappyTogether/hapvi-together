"use client";

import {useLocale, type Locale} from "@/components/LocaleProvider";
import {useEffect} from "react";
import EligibilityPageClient from "./eligibility-client";

export default function EligibilityLocaleSync({locale}: {locale: Locale}) {
  const {setLocale} = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return <EligibilityPageClient />;
}
