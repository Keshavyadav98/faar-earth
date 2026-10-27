"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/lib/scrollToSection";

export default function About() {
  const { t } = useTranslation();

  const FEATURES = [
    {
      title: t("usp.sustainability"),
      desc: t("usp.sustainabilityDesc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3c4 3 7 6 7 10a7 7 0 11-14 0c0-4 3-7 7-10z" stroke="#4C5A44" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      title: t("usp.premium"),
      desc: t("usp.premiumDesc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="#4C5A44" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" stroke="#4C5A44" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      title: t("usp.partnership"),
      desc: t("usp.partnershipDesc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="9" r="3" stroke="#4C5A44" strokeWidth="1.6" />
          <circle cx="16" cy="9" r="3" stroke="#4C5A44" strokeWidth="1.6" />
          <path d="M3 20c0-2.8 2.2-5 5-5s5 2.2 5 5M11 20c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#4C5A44" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="section-pad bg-beige">
      <div className="container-xl grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            {t("about.title")}
            <br />
            {t("about.subTitle")}
          </h2>
          <div className="flex w-full max-w-[280px]  items-center gap-3">
                      <span className="block h-px w-full bg-primary-green" />
                      <Image
                        src="/Images/line-leaf.png"
                        alt="leaf"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>

          <p className="mt-6 text-[16px] text-left leading-relaxed text-text-gray">
            {t("about.description1")}
          </p>
          <p className="mt-4 text-[16px] text-left leading-relaxed text-text-gray">
            {t("about.description2")}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-card border border-border-gray bg-white p-5 shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-green/15">
                  {f.icon}
                </span>
                <p className="mt-3 text-[14px] font-semibold leading-snug text-[#404C3E]">
                  {f.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-text-gray">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-card">
          <img
            src="/Images/high-key-product-photography-moringa-seed-essential-oil.jpeg"
            alt="Faar Earth natural lifestyle setting with essential oil bottles and leaves"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="container-xl mt-12">
        <div className="relative mx-auto max-w-[820px] overflow-hidden rounded-card bg-primary-green p-6 text-left shadow-card-hover sm:p-8">
          <span className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/5" />
          <span className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-white/5" />

          <div className="relative z-10 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
            <h3 className="font-heading text-h4 text-white">
              {t("cantFind.heading")}
            </h3>
          </div>

          <p className="relative z-10 mt-4 max-w-2xl text-[14px] leading-relaxed text-white/85">
            {t("cantFind.intro")}
          </p>

          <ul className="relative z-10 mt-4 max-w-2xl space-y-2.5">
            {(t("cantFind.bullets", { returnObjects: true }) as string[]).map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/90">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>

          <a
            href="#enquiry"
            onClick={(e) => scrollToSection(e, "#enquiry")}
            className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-btn bg-white px-6 py-2.5 text-[15px] font-semibold text-primary-green shadow-btn transition-colors hover:bg-beige"
          >
            {t("cantFind.button")} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
