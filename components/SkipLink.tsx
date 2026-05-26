"use client";

import {useLocale} from "@/components/LocaleProvider";

export function SkipLink() {
  const {messages} = useLocale();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-hapvi-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      {messages.A11y.skipToContent}
    </a>
  );
}
