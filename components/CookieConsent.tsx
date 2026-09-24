"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookieConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable — just don't show the banner
    }
  }, []);

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-divider bg-white px-5 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-8"
    >
      <div className="container-xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-[13px] leading-relaxed text-text-gray sm:text-left">
          We use cookies to improve your experience on our site and to understand how it&apos;s
          used. By clicking &ldquo;Accept&rdquo;, you agree to our use of cookies.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-btn border border-border-gray px-5 py-2.5 text-[14px] font-medium text-text-gray transition-colors hover:bg-beige"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-btn bg-primary-green px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-hover-green"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
