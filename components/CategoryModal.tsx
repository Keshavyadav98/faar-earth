"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export type CategoryDetail = {
  nameKey: string;
  descKey: string;
  image: string;
};

export default function CategoryModal({
  category,
  onClose,
}: {
  category: CategoryDetail | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = category ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [category]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!category) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t(category.nameKey)}
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-card bg-white shadow-card-hover sm:max-h-[85vh] sm:rounded-card">
        <button
          aria-label={t("products.closeModal")}
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-btn border border-border-gray bg-white transition-colors hover:bg-beige"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1l14 14M15 1L1 15" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="aspect-[16/9] w-full shrink-0 overflow-hidden">
          <img
            src={category.image}
            alt={t(category.nameKey)}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <h3 className="font-heading text-[24px] font-semibold text-[#404C3E]">
            {t(category.nameKey)}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-text-gray">
            {t(category.descKey)}
          </p>
        </div>
      </div>
    </div>
  );
}
