"use client";

import { I18nextProvider } from "react-i18next";
import i18n, { getPreferredLanguage } from "@/lib/i18n";
import { ReactNode, useEffect, useState } from "react";

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const preferred = getPreferredLanguage();
    if (preferred !== i18n.language) {
      i18n.changeLanguage(preferred);
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
