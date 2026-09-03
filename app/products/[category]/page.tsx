import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import CategoryHeader from "@/components/CategoryHeader";
import { findCategoryBySlug } from "@/lib/categoryStore";
import { getProductsByCategory } from "@/lib/productStore";
import { localize } from "@/lib/locale";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await findCategoryBySlug(category);
  if (!cat) return {};

  const name = localize(cat.name, "en");
  return {
    title: localize(cat.metaTitle, "en") || `${name} | Faar Earth Collective`,
    description: localize(cat.metaDescription, "en") || localize(cat.intro, "en"),
    keywords: localize(cat.metaKeywords, "en") || undefined,
  };
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = await findCategoryBySlug(category);
  if (!cat) notFound();

  const products = await getProductsByCategory(category);

  return (
    <main>
      <Header />
      <div className="section-pad">
        <div className="container-xl mb-10">
          <Link href="/products" className="text-sm text-text-gray hover:text-primary-green">
            ← All products
          </Link>
        </div>
        <CategoryHeader category={cat} />
        <div className="container-xl">
          <ProductGrid products={products} categorySlug={category} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
