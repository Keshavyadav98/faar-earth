"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { persistPreferredLanguage } from "@/lib/i18n";

function GBFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect width="24" height="24" fill="#00247d" />
      <path d="M0 0 L24 24 M24 0 L0 24" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 L24 24 M24 0 L0 24" stroke="#cf142b" strokeWidth="1.6" />
      <path d="M12 0 V24 M0 12 H24" stroke="#fff" strokeWidth="7" />
      <path d="M12 0 V24 M0 12 H24" stroke="#cf142b" strokeWidth="4" />
    </svg>
  );
}

function DEFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect width="24" height="8" fill="#000000" />
      <rect y="8" width="24" height="8" fill="#DD0000" />
      <rect y="16" width="24" height="8" fill="#FFCE00" />
    </svg>
  );
}

function NLFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect width="24" height="8" fill="#AE1C28" />
      <rect y="8" width="24" height="8" fill="#ffffff" />
      <rect y="16" width="24" height="8" fill="#21468B" />
    </svg>
  );
}

function FRFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect width="8" height="24" fill="#0055A4" />
      <rect x="8" width="8" height="24" fill="#ffffff" />
      <rect x="16" width="8" height="24" fill="#EF4135" />
    </svg>
  );
}

function ESFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect width="24" height="24" fill="#AA151B" />
      <rect y="6" width="24" height="12" fill="#F1BF00" />
    </svg>
  );
}

function ITFlag() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect width="8" height="24" fill="#009246" />
      <rect x="8" width="8" height="24" fill="#ffffff" />
      <rect x="16" width="8" height="24" fill="#CE2B37" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: "en", label: t("language.english"), Flag: GBFlag },
    { code: "de", label: t("language.german"), Flag: DEFlag },
    { code: "nl", label: t("language.dutch"), Flag: NLFlag },
    { code: "fr", label: t("language.french"), Flag: FRFlag },
    { code: "es", label: t("language.spanish"), Flag: ESFlag },
    { code: "it", label: t("language.italian"), Flag: ITFlag },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    persistPreferredLanguage(code);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-pill border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-[#404C3E] transition-colors hover:bg-gray-50"
        title={t("language.selectLanguage")}
      >
        <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full border border-border-gray">
          <currentLanguage.Flag />
        </span>
        <span className="hidden sm:inline">{currentLanguage.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                lang.code === i18n.language
                  ? "bg-primary-green text-white"
                  : "text-[#404C3E] hover:bg-gray-50"
              }`}
            >
              <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full border border-border-gray">
                <lang.Flag />
              </span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
