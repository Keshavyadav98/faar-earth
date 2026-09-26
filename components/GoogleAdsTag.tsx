"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasConsent, CONSENT_CHANGED_EVENT } from "@/lib/cookieConsent";

const ADS_ID = "AW-1018014349";

export default function GoogleAdsTag() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(hasConsent("analytics"));

    const onChange = () => setAllowed(hasConsent("analytics"));
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}
