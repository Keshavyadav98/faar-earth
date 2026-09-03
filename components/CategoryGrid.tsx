"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { ProductCategory } from "@/lib/categoryStore";
import { localize } from "@/lib/locale";

export default function CategoryGrid({ categories }: { categories: ProductCategory[] }) {
  const { i18n } = useTranslation();

  if (categories.length === 0) {
    return <p className="text-center text-[15px] text-text-gray">No product categories yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const name = localize(cat.name, i18n.language);
        const intro = localize(cat.intro, i18n.language);
        return (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="group relative overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-beige">
              {cat.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cat.image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-heading text-[20px] font-semibold text-white">{name}</h3>
                  <p className="line-clamp-1 text-[13px] text-white/80">{intro}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-[13px] font-medium text-[#404C3E] transition-colors group-hover:bg-primary-green group-hover:text-white">
                  View <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
