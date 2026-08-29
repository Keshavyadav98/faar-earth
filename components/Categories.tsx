"use client";

import { categores } from "@/data/products";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import { scrollToSection } from "@/lib/scrollToSection";

export default function Categories() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const slugFromPath = pathname.replace(/^\//, "");
  const [openSlug, setOpenSlug] = useState<string | null>(
    categores.some((c) => c.slug === slugFromPath) ? slugFromPath : null
  );

  useEffect(() => {
    const slug = pathname.replace(/^\//, "");
    setOpenSlug(categores.some((c) => c.slug === slug) ? slug : null);
  }, [pathname]);

  const activeCategory = categores.find((c) => c.slug === openSlug) ?? null;

  const handleOpen = (slug: string) => {
    setOpenSlug(slug);
    router.push(`/${slug}`, { scroll: false });
  };

  const handleClose = () => {
    setOpenSlug(null);
    router.push("/", { scroll: false });
  };

  return (
    <section id="categories" className="section-pad bg-offwhite">
      <div className="container-xl">
        <div className="mb-14 text-center">
          <span className="eyebrow">{t("categories.title")}</span>
          <h2 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            {t("categories.title")}
          </h2>
          <div className="mx-auto flex w-full max-w-[180px]  items-center gap-3">
            <span className="block h-px w-full bg-primary-green" />
            <Image
              src="/Images/lineLeaf.png"
              alt="leaf"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
        </div>

       <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
  {categores.map((cat) => (
    <div
      key={cat.nameKey}
      className="group relative overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={cat.image}
          alt={t(cat.nameKey)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-[20px] font-semibold text-white">
              {t(cat.nameKey)}
            </h3>

            <button
              type="button"
              onClick={() => handleOpen(cat.slug)}
              className="text-[13px] text-white/80 underline-offset-2 hover:text-white hover:underline"
            >
              {t(cat.taglineKey)}
            </button>
          </div>

          <a
            href="#products"
            onClick={(e) => scrollToSection(e, "#products")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-[13px] font-medium text-[#404C3E] transition-colors hover:bg-primary-green hover:text-white"
          >
            {t("categories.viewNow")} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>

      <CategoryModal category={activeCategory} onClose={handleClose} />
    </section>
  );
}
