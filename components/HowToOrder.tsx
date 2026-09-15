"use client";

import { useTranslation } from "react-i18next";

function ArrowIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 20 12" fill="none">
      <path d="M0 6h17M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICON_PROPS = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#404C3E",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STEP_ICONS = [
  // Enquire
  <svg key="enquire" {...ICON_PROPS}>
    <path d="M4 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    <circle cx="8" cy="10.5" r="0.6" fill="#404C3E" stroke="none" />
    <circle cx="11.5" cy="10.5" r="0.6" fill="#404C3E" stroke="none" />
    <circle cx="15" cy="10.5" r="0.6" fill="#404C3E" stroke="none" />
  </svg>,
  // Sample & Spec Sheet
  <svg key="sample" {...ICON_PROPS}>
    <path d="M4 2h7l4 4v9H4V2z" />
    <path d="M11 2v4h4" />
    <path d="M6.5 9.5h4M6.5 12h3" />
    <path d="M14 13.5l3.2 1.8v3.6L14 20.7l-3.2-1.8v-3.6L14 13.5z" />
    <path d="M14 13.5v3.7M14 17.2l-3.2-1.7M14 17.2l3.2-1.7" />
  </svg>,
  // Confirm Order
  <svg key="confirm" {...ICON_PROPS}>
    <path d="M2.5 10.5l3.8-2.6 3 1.8 2.2-1.1 2.2 1.1 3-1.8 3.8 2.6" />
    <path d="M6.3 7.9l3 5.6 2.2-1.2 2 1.2 3-5.6" />
    <path d="M9.3 13.5l1.8 1.8 1.8-1.8" />
  </svg>,
  // Documentation Prepared
  <svg key="docs" {...ICON_PROPS}>
    <path d="M5 2h8l4 4v14H5V2z" />
    <path d="M13 2v4h4" />
    <path d="M8 11h5M8 14h3" />
    <circle cx="16.5" cy="17.5" r="3.1" />
    <path d="M15 17.5l1.1 1.1 2-2.1" />
  </svg>,
  // Production & Dispatch
  <svg key="production" {...ICON_PROPS}>
    <path d="M3 21V11l5 3v-3l5 3V9l5 3v9H3z" />
    <path d="M17 9V5h2v2" />
    <path d="M6.5 21v-4M10.5 21v-4M14.5 21v-4" />
  </svg>,
  // Shipping & Customs Support
  <svg key="shipping" {...ICON_PROPS}>
    <path d="M12 3v6" />
    <path d="M9 5h6" />
    <path d="M5 12h14l-2 6H7l-2-6z" />
    <path d="M2.5 17.5c1.5 1.4 3 1.4 4.5 0s3-1.4 4.5 0 3 1.4 4.5 0 3-1.4 4.5 0" />
  </svg>,
];

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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-xl border border-divider bg-white/50 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-wide text-[#404C3E]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-green text-white">
                    <ArrowIcon />
                  </span>
                )}
              </div>
              <div className="mt-4 flex h-10 items-center">{STEP_ICONS[i]}</div>
              <h3 className="mt-4 font-heading text-[19px] font-semibold text-[#404C3E]">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-text-gray">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
