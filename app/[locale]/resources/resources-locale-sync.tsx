"use client";

import {useLocale, type Locale} from "@/components/LocaleProvider";
import {useEffect} from "react";

export default function ResourcesLocaleSync({locale}: {locale: Locale}) {
  const {setLocale} = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return null;
}
