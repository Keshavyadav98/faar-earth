"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/productStore";
import type { ProductCategory } from "@/lib/categoryStore";
import { localize } from "@/lib/locale";

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

  const specs = [
    { label: "Form", value: product.form },
    { label: "HS Heading", value: product.hsHeading },
    { label: "MOQ", value: product.moq },
  ].filter((s) => s.value);

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
            {title}
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
            <a
              href="/#enquiry"
              className="inline-flex items-center gap-2 rounded-btn bg-primary-green px-7 py-3.5 text-[16px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green"
            >
              Enquire About This Product <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
