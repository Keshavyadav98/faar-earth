"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/productStore";
import type { ProductCategory } from "@/lib/categoryStore";
import { localize } from "@/lib/locale";
import ProductEnquiryModal from "@/components/ProductEnquiryModal";

export default function ProductDetail({
  product,
  category,
}: {
  product: Product;
  category: ProductCategory;
}) {
  const { i18n } = useTranslation();
  const title = localize(product.title, i18n.language);
  const description = localize(product.description, i18n.language);
  const categoryName = localize(category.name, i18n.language);
  const heading = product.h1 || title;

  const specs = [
    { label: "Botanical Name", value: product.botanicalName },
    { label: "Form", value: product.form },
    { label: "Origin", value: product.origin },
    { label: "HS Heading", value: product.hsHeading },
    { label: "MOQ", value: product.moq },
    { label: "Lead Time", value: "2-3 weeks" },
    { label: "Grading", value: product.grading },
    { label: "Packaging", value: product.packaging },
  ].filter((s) => s.value);

  const applications = (product.applications || []).filter(Boolean);
  const whySourceFromUs = (product.whySourceFromUs || []).filter(Boolean);
  const faqs = (product.faqs || []).filter((f) => f.question && f.answer);

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <article className="section-pad">
      <div className="container-xl mb-8">
        <Link
          href={`/products/${category.slug}`}
          className="text-sm text-text-gray hover:text-primary-green"
        >
          ← Back to {categoryName}
        </Link>
      </div>

      <div className="container-xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-img bg-beige">
          {product.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={title} className="h-full w-full object-cover" />
          )}
        </div>

        <div>
          <span className="eyebrow">{categoryName}</span>
          <h1 className="mt-2 font-heading text-[28px] font-bold leading-tight text-[#404C3E] sm:text-[36px]">
            {heading}
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-text-gray">{description}</p>

          {specs.length > 0 && (
            <dl className="mt-8 divide-y divide-border-gray rounded-card border border-border-gray">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-[13px] font-medium uppercase tracking-wide text-text-gray">
                    {s.label}
                  </dt>
                  <dd className="text-[14px] font-medium text-[#404C3E]">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8">
            <ProductEnquiryModal productName={title} />
          </div>
        </div>
      </div>

      {(applications.length > 0 || whySourceFromUs.length > 0 || faqs.length > 0) && (
        <div className="container-xl mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {applications.length > 0 && (
            <div>
              <h2 className="font-heading text-[22px] font-semibold text-[#404C3E]">
                Applications
              </h2>
              <ul className="mt-4 space-y-3">
                {applications.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] leading-relaxed text-text-gray">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {whySourceFromUs.length > 0 && (
            <div>
              <h2 className="font-heading text-[22px] font-semibold text-[#404C3E]">
                Why Source From Faar Earth
              </h2>
              <ul className="mt-4 space-y-3">
                {whySourceFromUs.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] leading-relaxed text-text-gray">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {faqs.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="font-heading text-[22px] font-semibold text-[#404C3E]">
                Frequently Asked Questions
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
          )}
        </div>
      )}

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </article>
  );
}
