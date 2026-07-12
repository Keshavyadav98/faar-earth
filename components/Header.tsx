"use client";

import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Categories", href: "#categories" },
  { label: "Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#enquiry" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el
    );
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
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-20 bg-white transition-shadow ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="container-xl flex h-full items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
         <Image src='/Images/faarEarthLogo.png' alt="Faar Earth Logo" width={180} height={40} />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[16px] font-medium text-text-dark transition-colors hover:text-primary-green ${
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
          <a
            href="tel:+91 8860611200"
            className="hidden md:inline-flex items-center gap-2 rounded-btn bg-primary-green px-7 py-3.5 text-[16px] font-medium capitalize text-white shadow-btn transition-colors hover:bg-hover-green"
          >
            +91 8860611200 
          </a>

          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-btn border border-border-gray"
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
