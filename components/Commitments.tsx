"use client";

import { useTranslation } from "react-i18next";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.3 0-2.5-.3-3.6-.8L3 21l1.8-5.4A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21c0-9 6-15 15-15 0 9-6 15-15 15z" />
      <path d="M5 21c3-3 6-6 12-12" />
    </svg>
  );
}

export default function Commitments() {
  const { t } = useTranslation();

  const ITEMS = [
    { icon: <ClockIcon />, title: t("commitments.item1Title"), desc: t("commitments.item1Desc") },
    { icon: <ShieldCheckIcon />, title: t("commitments.item2Title"), desc: t("commitments.item2Desc") },
    { icon: <PackageIcon />, title: t("commitments.item3Title"), desc: t("commitments.item3Desc") },
    { icon: <ChatIcon />, title: t("commitments.item4Title"), desc: t("commitments.item4Desc") },
    { icon: <LeafIcon />, title: t("commitments.item5Title"), desc: t("commitments.item5Desc") },
  ];

  return (
    <section className="section-pad bg-beige">
      <div className="container-xl">
        <div className="text-center">
          <span className="eyebrow">{t("commitments.eyebrow")}</span>
          <h2 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            {t("commitments.heading")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[20px] border border-border-gray bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-green hover:bg-primary-green hover:shadow-card-hover"
            >
              <span className="absolute left-0 top-0 h-1 w-full bg-[#8A9A80]" />

              <span className="pointer-events-none absolute -right-7 -top-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#8A9A80]">
                <span className="font-heading text-[22px] font-bold text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8A9A80] text-white shadow-sm transition-colors duration-300 group-hover:bg-white group-hover:text-primary-green">
                {item.icon}
              </span>
              <h3 className="relative z-10 mt-4 font-heading text-[16px] font-bold text-[#404C3E] transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h3>
              <p className="relative z-10 mt-1.5 text-[13px] leading-snug text-text-gray transition-colors duration-300 group-hover:text-white/85">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-card bg-primary-green px-6 py-8 text-center sm:px-10">
          <p className="mx-auto max-w-3xl text-[15px] leading-relaxed text-white/90">
            {t("commitments.trustStatement")}
          </p>
        </div>
      </div>
    </section>
  );
}
