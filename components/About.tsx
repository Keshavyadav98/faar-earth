"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const FEATURES = [
    {
      title: t("usp.sustainability"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3c4 3 7 6 7 10a7 7 0 11-14 0c0-4 3-7 7-10z" stroke="#4C5A44" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      title: t("usp.premium"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="#4C5A44" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" stroke="#4C5A44" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      title: t("usp.partnership"),
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
                        src="/Images/lineLeaf.png"
                        alt="leaf"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>

          <p className="mt-6 text-[16px] text-center leading-relaxed text-text-gray">
            {t("about.description1")}
          </p>
          <p className="mt-4 text-[16px] text-center leading-relaxed text-text-gray">
            {t("about.description2")}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-green/15">
                  {f.icon}
                </span>
                <p className="text-[14px] font-medium leading-snug text-[#404C3E]">
                  {f.title}
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
    </section>
  );
}
