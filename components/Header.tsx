"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/services", label: "서비스" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold text-hapvi-dark">HapVi Together</span>
          <span className="text-xs text-gray-600">For a Better Village</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-hapvi-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className="rounded-full bg-[#E6F1FB] px-3 py-1.5 text-sm font-medium text-[#185FA5]"
          >
            English
          </button>
          <button
            type="button"
            className="rounded-full bg-[#FAEEDA] px-3 py-1.5 text-sm font-medium text-[#854F0B]"
          >
            Español
          </button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-gray-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="mb-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full bg-[#E6F1FB] px-3 py-1.5 text-sm font-medium text-[#185FA5]"
            >
              English
            </button>
            <button
              type="button"
              className="rounded-full bg-[#FAEEDA] px-3 py-1.5 text-sm font-medium text-[#854F0B]"
            >
              Español
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
