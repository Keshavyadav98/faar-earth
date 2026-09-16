"use client";

import { useTranslation } from "react-i18next";

function ArrowIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 20 12" fill="none">
      <path d="M0 6h17M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HowToOrder() {
  const { t } = useTranslation();

  const STEPS = [
    { title: t("howToOrder.step1Title"), desc: t("howToOrder.step1Desc") },
    { title: t("howToOrder.step2Title"), desc: t("howToOrder.step2Desc") },
    { title: t("howToOrder.step3Title"), desc: t("howToOrder.step3Desc") },
    { title: t("howToOrder.step4Title"), desc: t("howToOrder.step4Desc") },
    { title: t("howToOrder.step5Title"), desc: t("howToOrder.step5Desc") },
    { title: t("howToOrder.step6Title"), desc: t("howToOrder.step6Desc") },
  ];

  return (
    <section id="how-to-order" className="section-pad bg-beige">
      <div className="container-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">{t("howToOrder.eyebrow")}</span>
            <h2 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
              {t("howToOrder.titleLine1")}
              <br />
              <span className="italic">{t("howToOrder.titleLine2")}</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-text-gray lg:text-right">
            {t("howToOrder.intro")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-lg border-b-4 border-primary-green bg-white p-5 shadow-card"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-green/10 text-[13px] font-bold text-primary-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-[16px] font-semibold text-primary-green">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-text-gray">
                {step.desc}
              </p>

              {i < STEPS.length - 1 && (
                <span className="absolute right-[-14px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-primary-green text-white shadow-card lg:flex">
                  <ArrowIcon />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
