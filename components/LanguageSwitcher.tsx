"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: "en", label: t("language.english"), flag: "🇬🇧" },
    { code: "de", label: t("language.german"), flag: "🇩🇪" },
    { code: "nl", label: t("language.dutch"), flag: "🇳🇱" },
    { code: "fr", label: t("language.french"), flag: "🇫🇷" },
    { code: "es", label: t("language.spanish"), flag: "🇪🇸" },
    { code: "it", label: t("language.italian"), flag: "🇮🇹" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("preferredLanguage", code);
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
        <span className="text-lg">{currentLanguage.flag}</span>
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
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
