"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/lib/scrollToSection";
import type { ProductCategory } from "@/lib/categoryStore";
import { localize } from "@/lib/locale";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((body) => setCategories(body.data || []))
      .catch(() => {});
  }, []);

  const QUICK_LINKS = [
    { label: t("footer.categories"), href: "#categories" },
    { label: t("footer.products"), href: "/products" },
    { label: t("header.aboutUs"), href: "#about" },
    { label: t("footer.contactUs"), href: "#enquiry" },
  ];

  return (
    <footer className="bg-beige">
      <div className="container-xl grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <a href="#top" onClick={(e) => scrollToSection(e, "#top")} className="inline-flex items-center justify-center">
            <Image src="/Images/faarEarthLogo.png" alt="Faar Earth Logo" width={80} height={80} className="h-auto w-[480px] object-contain" />
          </a>
          <p className="mt-3 text-center text-[13px] text-text-gray">
            IEC: AAHCF0698K
          </p>
        </div>

        <div className="hidden lg:block text-center sm:text-left">
          <h4 className="mb-4 text-[15px] font-semibold text-[#404C3E]">{t("footer.quickLinks")}</h4>
          <ul className="space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => scrollToSection(e, l.href)} className="text-[14px] text-text-gray transition-colors hover:text-primary-green">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block text-center sm:text-left">
          <h4 className="mb-4 text-[15px] font-semibold text-[#404C3E]">{t("footer.ourCategories")}</h4>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="text-[14px] text-text-gray transition-colors hover:text-primary-green">
                  {localize(c.name, i18n.language)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="mb-4 text-[15px] font-semibold text-[#404C3E]">{t("footer.contactUs")}</h4>
          <div className="space-y-2 text-[14px] text-text-gray">
            <p>+91 87008 79647 <br />connect@faarearth.com</p>
            <p>
              FaarEarth Collective Private Limited <br /> The Circle Work, A212,<br /> Unitech Business Zone, Sector 50, Gurgaon, India.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-divider py-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
          <p className="text-[13px] text-text-gray">
            © {new Date().getFullYear()} Faar Earth Collective. All Rights Reserved.
          </p>
          <Link
            href="/cookie-policy"
            className="text-[15px] font-semibold text-primary-green underline underline-offset-2 transition-colors hover:text-hover-green"
          >
            Cookie Policy
          </Link>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="text-[13px] text-text-gray transition-colors hover:text-primary-green hover:underline"
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
}
