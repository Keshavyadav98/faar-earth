"use client";

import Image from "next/image";
import { useEffect } from "react";

type Link = { label: string; href: string };

export default function MobileNav({
  open,
  onClose,
  links,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  links: Link[];
  activeHref: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel — half of screen width, slides from right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 h-full w-1/2 min-w-[240px] max-w-[340px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="float-right h-40 items-center justify-between px-5 border-b border-border-gray">
       
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-btn border border-border-gray"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1l14 14M15 1L1 15" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-5 py-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-btn px-3 py-3 text-[16px] font-medium transition-colors ${
                activeHref === link.href
                  ? "bg-beige text-primary-green"
                  : "text-text-dark hover:bg-beige"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-5">
          <a
           href="tel:+91 8860611200"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary-green px-6 py-3.5 text-[15px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green"
          >
            Inquiry Now <span aria-hidden>→</span>
          </a>
        </div>
      </aside>
    </>
  );
}
