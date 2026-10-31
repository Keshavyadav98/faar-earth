"use client";

import { useTranslation } from "react-i18next";
import type { ProductCategory } from "@/lib/categoryStore";
import { localizeFaqs } from "@/lib/locale";

export default function CategoryFaq({ category }: { category: ProductCategory }) {
  const { t, i18n } = useTranslation();
  const faqs = localizeFaqs(category.faqs, i18n.language);

  if (faqs.length === 0) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="container-xl mt-16">
      <div className="mx-auto max-w-[720px] text-left">
        <h2 className="text-center font-heading text-[22px] font-semibold text-[#404C3E]">
          {t("productDetail.faqTitle")}
        </h2>
        <div className="mt-4 divide-y divide-border-gray rounded-card border border-border-gray">
          {faqs.map((f) => (
            <details key={f.question} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-[15px] font-medium text-[#404C3E] marker:content-none">
                {f.question}
              </summary>
              <p className="mt-2 text-[14px] leading-relaxed text-text-gray">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
