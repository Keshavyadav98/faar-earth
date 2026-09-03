"use client";

import type { Locale, LocalizedText } from "@/lib/locale";

export default function LocalizedField({
  label,
  value,
  onChange,
  locale,
  required,
  multiline,
  rows = 2,
  placeholder,
}: {
  label: string;
  value: LocalizedText;
  onChange: (next: LocalizedText) => void;
  locale: Locale;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const current = value[locale] ?? "";
  const isRequiredHere = required && locale === "en";

  const handleChange = (v: string) => {
    onChange({ ...value, [locale]: v });
  };

  return (
    <div>
      <label className="mb-1 block text-[13px] font-medium text-text-gray">
        {label} {isRequiredHere && "*"}
        {locale !== "en" && !current && (
          <span className="text-text-gray/60"> (falls back to English if left blank)</span>
        )}
      </label>
      {multiline ? (
        <textarea
          value={current}
          onChange={(e) => handleChange(e.target.value)}
          required={isRequiredHere}
          rows={rows}
          placeholder={placeholder}
          className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
        />
      ) : (
        <input
          type="text"
          value={current}
          onChange={(e) => handleChange(e.target.value)}
          required={isRequiredHere}
          placeholder={placeholder}
          className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
        />
      )}
    </div>
  );
}
