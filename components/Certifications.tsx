"use client";

import { useTranslation } from "react-i18next";
import ComplianceRequestModal from "@/components/ComplianceRequestModal";

const CERTIFICATIONS = [
  { src: "/Images/Indian_Organic_Logo.png", alt: "India Organic" },
  { src: "/Images/fssai-logo-.jpg", alt: "FSSAI" },
  { src: "/Images/EU organic.jfif", alt: "EU Organic" },
  { src: "/Images/HACCP.webp", alt: "HACCP" },
  { src: "/Images/green-iso-22000-certified-stamp-260nw-2300012365.webp", alt: "ISO 22000 Certified" },
  { src: "/Images/bc-kosher-certification-services-500x500.webp", alt: "BC Kosher Certified" },
  { src: "/Images/Firefly_RemoveBackground.png", alt: "Halal Certified" },
];

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <section id="certifications" className="section-pad bg-beige">
      <div className="container-xl text-center">
        <p className="text-[14px] font-medium uppercase tracking-wide text-[#404C3E]">
          {t("about.certifications")}
        </p>
        <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-text-gray">
          {t("certifications.intro")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.src}
              className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-card"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="h-20 w-20 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 text-left sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-[17px] font-semibold leading-snug text-[#404C3E]">
              {t("certifications.standardTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                t("certifications.standard1"),
                t("certifications.standard2"),
                t("certifications.standard3"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-text-gray">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-[17px] font-semibold leading-snug text-[#404C3E]">
              {t("certifications.onRequestTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                t("certifications.onRequest1"),
                t("certifications.onRequest2"),
                t("certifications.onRequest3"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-text-gray">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <ComplianceRequestModal />
        </div>
      </div>
    </section>
  );
}
