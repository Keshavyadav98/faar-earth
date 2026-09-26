"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  getConsent,
  setConsent,
  type ConsentState,
  OPEN_COOKIE_PREFERENCES_EVENT,
} from "@/lib/cookieConsent";
import { clearPreferredLanguage } from "@/lib/i18n";

const ALL_ACCEPTED: ConsentState = { functional: true, analytics: true, marketing: true };
const NONE_ACCEPTED: ConsentState = { functional: false, analytics: false, marketing: false };

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(NONE_ACCEPTED);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setDraft(existing);
    }

    const onOpenPreferences = () => {
      setDraft(getConsent() || NONE_ACCEPTED);
      setVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpenPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, onOpenPreferences);
  }, []);

  function acceptAll() {
    setConsent(ALL_ACCEPTED);
    close();
  }

  function rejectNonEssential() {
    setConsent(NONE_ACCEPTED);
    clearPreferredLanguage();
    close();
  }

  function savePreferences() {
    setConsent(draft);
    if (!draft.functional) clearPreferredLanguage();
    close();
  }

  function close() {
    setVisible(false);
    setShowPreferences(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-divider bg-white px-5 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-8"
    >
      <div className="container-xl">
        {!showPreferences ? (
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-[13px] leading-relaxed text-text-gray sm:text-left">
              {t("cookie.banner.message")}{" "}
              <Link href="/cookie-policy" className="underline hover:text-primary-green">
                {t("cookie.banner.policyLink")}
              </Link>{" "}
              {t("cookie.banner.messageSuffix")}
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="rounded-btn border border-border-gray px-5 py-2.5 text-[14px] font-medium text-text-gray transition-colors hover:bg-beige"
              >
                {t("cookie.banner.managePreferences")}
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-btn border-2 border-primary-green px-5 py-2.5 text-[14px] font-semibold text-primary-green transition-colors hover:bg-primary-green hover:text-white"
              >
                {t("cookie.banner.rejectNonEssential")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-btn bg-primary-green px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-hover-green"
              >
                {t("cookie.banner.acceptAll")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-heading text-[16px] font-semibold text-[#404C3E]">
              {t("cookie.preferences.title")}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-text-gray">
              {t("cookie.preferences.description")}{" "}
              <Link href="/cookie-policy" className="underline hover:text-primary-green">
                {t("cookie.banner.policyLink")}
              </Link>{" "}
              {t("cookie.preferences.descriptionSuffix")}
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 rounded-input border border-border-gray px-4 py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#404C3E]">{t("cookie.preferences.necessaryTitle")}</p>
                  <p className="text-[12px] text-text-gray">{t("cookie.preferences.necessaryDesc")}</p>
                </div>
                <input type="checkbox" checked disabled className="h-4 w-4 accent-primary-green" />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-input border border-border-gray px-4 py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#404C3E]">{t("cookie.preferences.functionalTitle")}</p>
                  <p className="text-[12px] text-text-gray">{t("cookie.preferences.functionalDesc")}</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.functional}
                  onChange={(e) => setDraft((d) => ({ ...d, functional: e.target.checked }))}
                  className="h-4 w-4 accent-primary-green"
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-input border border-border-gray px-4 py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#404C3E]">{t("cookie.preferences.analyticsTitle")}</p>
                  <p className="text-[12px] text-text-gray">{t("cookie.preferences.analyticsDesc")}</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                  className="h-4 w-4 accent-primary-green"
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-input border border-border-gray px-4 py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#404C3E]">{t("cookie.preferences.marketingTitle")}</p>
                  <p className="text-[12px] text-text-gray">{t("cookie.preferences.marketingDesc")}</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
                  className="h-4 w-4 accent-primary-green"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="rounded-btn border border-border-gray px-5 py-2.5 text-[14px] font-medium text-text-gray transition-colors hover:bg-beige"
              >
                {t("cookie.preferences.back")}
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-btn bg-primary-green px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-hover-green"
              >
                {t("cookie.preferences.save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
