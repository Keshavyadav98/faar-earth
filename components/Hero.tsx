"use client";

import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="relative flex h-[92vh] min-h-[560px] w-full items-center justify-center overflow-hidden"
    >
      <img
        src="/Images/banner.png"
        alt="Faar Earth natural ingredients, seeds and cold pressed oils displayed on a wooden table"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center fade-up">
        {/* <span className="mb-5 rounded-pill border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          connect@faarearth.com
        </span> */}
        <h1 className="font-heading text-[40px] leading-tight font-bold text-white sm:text-[52px] md:text-h1">
          {t("hero.mainTitle")}
          <br />
          {t("hero.subTitle")}
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/90">
          {t("hero.description")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-pill bg-primary-green px-7 py-3.5 text-[16px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green"
          >
            {t("hero.exploreButton")} <span aria-hidden>→</span>
          </a>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 rounded-pill border border-white bg-transparent px-7 py-3.5 text-[16px] font-medium text-white transition-colors hover:bg-white hover:text-primary-green"
          >
            {t("hero.contactButton")} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
