"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MobileNav from "./MobileNav";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  const NAV_LINKS = [
    { label: t("header.products"), href: "#categories" },
    { label: t("header.compliances"), href: "#certifications" },
    { label: t("header.howToOrder"), href: "#how-to-order" },
    { label: t("header.aboutUs"), href: "#about" },
    { label: t("header.blog"), href: "/blog" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
   
  useEffect(() => {
    const sections = NAV_LINKS.filter((l) => l.href.startsWith("#"))
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [NAV_LINKS]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="bg-primary-green py-2 text-[13px] text-white">
        <div className="container-xl flex flex-col items-center justify-center gap-2 text-center text-sm md:flex-row md:gap-6 md:text-[14px]">
          <span className="text-sm font-medium text-white">
            +91 8700879647
          </span>

          <span className="flex items-center gap-5">
            <span className="border-b border-white/40 text-sm font-medium text-white">
              connect@faarearth.com
            </span>

            <a
              href="https://instagram.com/faar.earth"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white transition-opacity hover:opacity-75"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/faarearth/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white transition-opacity hover:opacity-75"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
      <div className="container-xl flex h-20 items-center justify-between">
        <a href="#top" onClick={(e) => scrollToSection(e, "#top")} className="flex items-center gap-2">
         <Image src='/Images/faarEarthLogo.png' alt="Faar Earth Logo" width={180} height={40} />
        </a>

        <nav className="hidden xl:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`whitespace-nowrap text-[16px] font-medium text-[#404C3E] transition-colors hover:text-primary-green ${
                activeHref === link.href
                  ? "text-primary-green underline underline-offset-8"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#enquiry"
            onClick={(e) => scrollToSection(e, "#enquiry")}
            className="hidden md:inline-flex items-center gap-2 rounded-btn bg-primary-green px-7 py-3.5 text-[16px] font-medium capitalize text-white shadow-btn transition-colors hover:bg-hover-green"
          >
            {t("enquiry.enquire")}
          </a>

          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="xl:hidden flex h-11 w-11 items-center justify-center rounded-btn border border-border-gray"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 5h18M2 11h18M2 17h18" stroke="#333333" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        activeHref={activeHref}
      />
    </header>
  );
}
