"use client";

import {FooterWaitlistForm} from "@/components/FooterWaitlistForm";
import {useLocale} from "@/components/LocaleProvider";
import {SITE_IMAGES} from "@/lib/site-images";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const {messages} = useLocale();
  const footer = messages.Footer;
  const header = messages.Header;
  const services = messages.Services;

  return (
    <footer className="bg-hapvi-dark text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{services.comingSoon.title}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/75 md:text-base">
            {services.comingSoon.description}
          </p>
          <FooterWaitlistForm />
        </div>

        <div className="mt-14 flex flex-col gap-10 border-t border-white/15 pt-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-md">
            <Link href="/" className="group inline-flex items-center gap-3 md:gap-4">
              <Image
                src={SITE_IMAGES.logos.white}
                alt=""
                width={503}
                height={503}
                aria-hidden
                className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12"
              />
              <span className="flex min-w-0 flex-col gap-0.5 text-left leading-tight">
                <span className="text-[1.05rem] font-semibold tracking-tight text-white transition group-hover:text-hapvi-light md:text-lg">
                  HapVi Together
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/70 md:text-xs md:tracking-[0.18em]">
                  {header.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/75">{footer.description}</p>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p className="font-medium text-white">
              {footer.email}: info@hapvi.org
            </p>
            <p className="leading-relaxed">{footer.hours}</p>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/45">
          © 2026 HapVi Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
