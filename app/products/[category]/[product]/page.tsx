import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { findCategoryBySlug } from "@/lib/categoryStore";
import { findProductBySlug } from "@/lib/productStore";
import { localize } from "@/lib/locale";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category, product } = await params;
  const item = await findProductBySlug(product);
  if (!item || item.categorySlug !== category) return {};

  const title = localize(item.title, "en");
  return {
    title: localize(item.metaTitle, "en") || `${title} | Faar Earth Collective`,
    description: localize(item.metaDescription, "en") || localize(item.description, "en"),
    keywords: localize(item.metaKeywords, "en") || undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const cat = await findCategoryBySlug(category);
  const item = await findProductBySlug(product);

  if (!cat || !item || item.categorySlug !== category) notFound();

  return (
    <main>
      <Header />
      <ProductDetail product={item} category={cat} />
      <Footer />
    </main>
  );
}
