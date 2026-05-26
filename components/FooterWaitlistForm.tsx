"use client";

import {useLocale} from "@/components/LocaleProvider";
import {trackEvent} from "@/lib/analytics";
import {usePathname} from "next/navigation";
import {useCallback, useEffect, useState, type FormEvent} from "react";

export function FooterWaitlistForm() {
  const {messages, locale} = useLocale();
  const cs = messages.Services.comingSoon;
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorKind, setErrorKind] = useState<"invalid_email" | "delivery_failed" | "network" | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStatus("idle");
      setErrorKind(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorKind(null);
      setStatus("loading");

      try {
        const form = e.currentTarget;
        const website = new FormData(form).get("website");
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email, locale, website}),
        });

        const data = (await res.json().catch(() => ({}))) as {error?: string};

        if (res.ok) {
          trackEvent("waitlist_signup");
          setStatus("success");
          setEmail("");
          return;
        }

        if (data.error === "rate_limited" || res.status === 429) {
          setErrorKind("delivery_failed");
          setStatus("error");
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
    [email, locale],
  );

  const message =
    status === "success"
      ? cs.submitSuccess
      : status === "error" && errorKind === "invalid_email"
        ? cs.errorInvalid
        : status === "error" && errorKind === "network"
          ? cs.errorNetwork
          : status === "error"
            ? cs.errorDelivery
            : null;

  return (
    <div className="mt-8">
      <form className="flex flex-col gap-3 sm:flex-row sm:justify-center" onSubmit={submit} noValidate>
        <div className="sr-only" aria-hidden>
          <label htmlFor="footer-website">Website</label>
          <input id="footer-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="footer-email" className="sr-only">
          {cs.placeholder}
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
          placeholder={cs.placeholder}
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
          {status === "loading" ? cs.submitting : cs.button}
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
