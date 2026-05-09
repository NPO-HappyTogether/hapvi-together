"use client";

import {usePathname} from "@/i18n/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useCallback, useEffect, useState, type FormEvent} from "react";

export function FooterWaitlistForm() {
  const t = useTranslations("Services");
  const pathname = usePathname();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorKind, setErrorKind] = useState<"invalid_email" | "delivery_failed" | "network" | null>(null);

  /* 푸터는 레이아웃에 고정이라 페이지 이동 후에도 성공 메시지 state가 남지 않도록 초기화 */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStatus("idle");
      setErrorKind(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, locale]);

  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorKind(null);
      setStatus("loading");

      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email}),
        });

        const data = (await res.json().catch(() => ({}))) as {error?: string};

        if (res.ok) {
          setStatus("success");
          setEmail("");
          return;
        }

        if (data.error === "invalid_email" || res.status === 400) {
          setErrorKind("invalid_email");
        } else if (data.error === "delivery_failed" || res.status === 502) {
          setErrorKind("delivery_failed");
        } else {
          setErrorKind("delivery_failed");
        }
        setStatus("error");
      } catch {
        setErrorKind("network");
        setStatus("error");
      }
    },
    [email],
  );

  const message =
    status === "success"
      ? t("comingSoon.submitSuccess")
      : status === "error" && errorKind === "invalid_email"
        ? t("comingSoon.errorInvalid")
        : status === "error" && errorKind === "network"
          ? t("comingSoon.errorNetwork")
          : status === "error"
            ? t("comingSoon.errorDelivery")
            : null;

  return (
    <div className="mt-8">
      <form className="flex flex-col gap-3 sm:flex-row sm:justify-center" onSubmit={submit} noValidate>
        <label htmlFor="footer-email" className="sr-only">
          {t("comingSoon.placeholder")}
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          disabled={status === "loading"}
          placeholder={t("comingSoon.placeholder")}
          onChange={(ev) => {
            setEmail(ev.target.value);
            if (status === "success" || status === "error") {
              setStatus("idle");
              setErrorKind(null);
            }
          }}
          className="w-full rounded-lg border border-white/25 bg-hapvi-dark px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-hapvi-light focus:ring-2 focus:ring-hapvi-light/30 disabled:opacity-60 sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-hapvi-dark disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "loading" ? t("comingSoon.submitting") : t("comingSoon.button")}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-4 text-sm ${status === "success" ? "text-hapvi-light" : "text-amber-200/95"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
