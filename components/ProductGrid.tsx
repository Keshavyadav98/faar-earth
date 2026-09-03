"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/productStore";
import { localize } from "@/lib/locale";

export default function ProductGrid({
  products,
  categorySlug,
}: {
  products: Product[];
  categorySlug: string;
}) {
  const { i18n } = useTranslation();

  if (products.length === 0) {
    return <p className="text-center text-[15px] text-text-gray">No products in this category yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => {
        const title = localize(p.title, i18n.language);
        const description = localize(p.description, i18n.language);
        return (
          <div
            key={p.slug}
            className="flex flex-col overflow-hidden rounded-card border border-border-gray bg-white shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-beige">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={title} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-[17px] font-semibold text-[#404C3E]">{title}</h3>
              <p className="mt-2 line-clamp-2 flex-1 text-[14px] leading-relaxed text-text-gray">
                {description}
              </p>
              <Link
                href={`/products/${categorySlug}/${p.slug}`}
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-pill bg-primary-green px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-hover-green"
              >
                View Product <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
