"use client";

import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/locale";

export default function LocaleTabs({
  active,
  onChange,
}: {
  active: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded-pill px-4 py-1.5 text-[13px] font-medium transition-colors ${
            active === locale
              ? "bg-primary-green text-white"
              : "bg-beige text-[#404C3E] hover:bg-divider/60"
          }`}
        >
          {LOCALE_LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
