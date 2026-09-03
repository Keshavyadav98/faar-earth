"use client";

import { useTranslation } from "react-i18next";
import type { ProductCategory } from "@/lib/categoryStore";
import { localize } from "@/lib/locale";

export default function CategoryHeader({ category }: { category: ProductCategory }) {
  const { i18n } = useTranslation();

  return (
    <div className="container-xl mb-12 text-center">
      <span className="eyebrow">Category</span>
      <h1 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
        {localize(category.name, i18n.language)}
      </h1>
      <p className="mx-auto mt-4 max-w-[720px] text-[15px] leading-relaxed text-text-gray">
        {localize(category.intro, i18n.language)}
      </p>
    </div>
  );
}
