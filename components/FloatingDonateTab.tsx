"use client";

import {useLocale} from "@/components/LocaleProvider";
import {Heart} from "lucide-react";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

const ZEFFY_DONATION_URL =
  "https://www.zeffy.com/en-US/donation-form/hapvi-for-better-happy-villages";

/** rgba/rgb 문자열 → 채널 (실패 시 null) */
function parseRgb(cssColor: string): [number, number, number, number] | null {
  const m = cssColor.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (!m) return null;
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  const a = m[4] !== undefined ? Number(m[4]) : 1;
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return [r, g, b, a];
}

/** WCAG 상대 휘도 */
function relativeLuminance(r: number, g: number, b: number): number {
  const lin = [r, g, b].map((c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!;
}

/**
 * 한 좌표의 불투명 배경이 얼마나 밝은지 추정.
 * 이미지/동영상은 부모 레이어의 오버레이 색으로 근사.
 */
function sampleIsLightAt(probeX: number, probeY: number): boolean {
  const stack = document.elementsFromPoint(probeX, probeY);
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    if (el.closest("[data-floating-donate]")) continue;

    let node: HTMLElement | null = el instanceof HTMLElement ? el : el.parentElement;
    while (node) {
      const bg = window.getComputedStyle(node).backgroundColor;
      const parsed = parseRgb(bg);
      if (!parsed) {
        node = node.parentElement;
        continue;
      }
      const [r, g, b, a] = parsed;
      if (a < 0.08) {
        node = node.parentElement;
        continue;
      }
      const L = relativeLuminance(r, g, b);
      return L > 0.7;
    }
  }

  return false;
}

/** 히어로용 큰 사진/영상이 이 좌표 스택에 있으면 true (오버레이가 투명해도 감지) */
function probeHitsLargePhotoOrVideo(probeX: number, probeY: number): boolean {
  const MIN_AREA = 14_000;
  const stack = document.elementsFromPoint(probeX, probeY);
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    if (el.closest("[data-floating-donate]")) continue;

    if (el.tagName === "IMG" && el instanceof HTMLImageElement) {
      const {width, height} = el.getBoundingClientRect();
      if (width * height >= MIN_AREA) return true;
    }
    if (el.tagName === "VIDEO") {
      const {width, height} = el.getBoundingClientRect();
      if (width * height >= MIN_AREA) return true;
    }
  }
  return false;
}

/**
 * 2열(왼쪽 사진·오른쪽 흰 카드) 구간에서 기존 로직은 화면 중앙만 짚어
 * 오른쪽 흰 배경으로 오판 → 버튼이 버건디로 나오는 문제가 있었음.
 *
 * - 왼쪽(탭 바로 옆): 어두우면 무조건 흰색 글리프
 * - 오른쪽 쪽도 함께 밝을 때만 해피 버건디 (크림/전체 밝은 페이지)
 * - 그라데이션 오버레이만 있으면 RGB 추적이 body 크림까지 올라가 버건디로 오판할 수 있음 → 큰 img/video 있으면 무조건 흰색
 */
function sampleIsLightSurfaceBehindContent(): boolean {
  if (typeof window === "undefined") return false;

  const probeY = window.innerHeight * 0.5;
  const nearTabX = Math.min(46, window.innerWidth - 8);
  const midPageX = Math.min(Math.max(nearTabX + 24, window.innerWidth * 0.42), window.innerWidth - 16);

  if (probeHitsLargePhotoOrVideo(nearTabX, probeY)) {
    return false;
  }

  const nearLight = sampleIsLightAt(nearTabX, probeY);
  const midLight = sampleIsLightAt(midPageX, probeY);

  return nearLight && midLight;
}

/** 모든 페이지 왼쪽에 고정 — HERoines식 세로 탭 */
export function FloatingDonateTab() {
  const {messages} = useLocale();
  const {label, ariaLabel} = messages.FloatingDonate;
  const pathname = usePathname();
  const [lightSurface, setLightSurface] = useState(false);

  useEffect(() => {
    let ticking = false;
    const tick = () => {
      ticking = false;
      setLightSurface(sampleIsLightSurfaceBehindContent());
    };
    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    schedule();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  if (pathname === "/about") {
    return null;
  }

  const tone = lightSurface ? "light" : "dark";

  return (
    <a
      data-floating-donate
      href={ZEFFY_DONATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`group fixed left-0 top-1/2 z-40 flex max-h-[85vh] -translate-y-1/2 flex-col items-center gap-2 rounded-r-2xl bg-transparent px-2 py-7 shadow-none backdrop-blur-[2px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 max-md:rounded-r-xl max-md:py-5 max-md:pl-[env(safe-area-inset-left,0px)] ${
        tone === "light"
          ? "hover:bg-hapvi-primary/10 focus-visible:ring-hapvi-primary focus-visible:ring-offset-cream"
          : "hover:bg-white/12 focus-visible:ring-white/90 focus-visible:ring-offset-transparent"
      }`}
    >
      <Heart
        className={`size-[26px] shrink-0 stroke-[2.25] transition group-hover:scale-105 ${
          tone === "light"
            ? "text-hapvi-primary drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
            : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        }`}
        aria-hidden
      />
      <span
        className={`select-none text-center text-[26px] font-bold leading-none tracking-tight [text-orientation:upright] [writing-mode:vertical-rl] ${
          tone === "light"
            ? "text-hapvi-primary drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
            : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        }`}
      >
        {label}
      </span>
    </a>
  );
}
