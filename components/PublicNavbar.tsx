"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#benefits", label: "Why Bloom" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#product", label: "The experience" },
];

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e7e1] bg-[#faf9f6]/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link href="/" className="flex items-center gap-2" aria-label="Bloom home">
          <Image src="/icons/logo.svg" width={31} height={31} alt="" />
          <span className="text-[21px] font-bold tracking-[-0.07em] text-[#18231f]">
            bloom
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#59615d] transition hover:text-[#192720] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d4b]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-[#27352e] hover:text-[#52735d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d4b]"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-[#203b30] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#315746] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d4b]"
          >
            Get started
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="public-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-full text-[#203b30] transition hover:bg-[#eeede7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d4b] md:hidden"
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="public-mobile-menu"
        className={`${menuOpen ? "block" : "hidden"} border-t border-[#e9e7e1] bg-[#faf9f6] px-5 pb-6 pt-3 md:hidden`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="rounded-xl px-3 py-3 text-sm font-medium text-[#46534b] hover:bg-[#f0efe9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#315d4b]"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-3 border-t border-[#e9e7e1] pt-4">
            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full border border-[#d8d9d2] px-4 py-3 text-center text-sm font-semibold text-[#27352e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#315d4b]"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full bg-[#203b30] px-4 py-3 text-center text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d4b]"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
