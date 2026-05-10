"use client";

import type {Locale} from "@/components/LocaleProvider";
import {useLocale} from "@/components/LocaleProvider";
import PrivacyPageClient from "@/app/privacy/privacy-client";
import {useEffect} from "react";

export default function PrivacyLocaleSync({locale}: {locale: Locale}) {
  const {setLocale} = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return <PrivacyPageClient />;
}
