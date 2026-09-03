import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";
import { getCategories } from "@/lib/categoryStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Products | Faar Earth Collective",
  description:
    "Browse seeds, spices, cold press oils, oleoresins, speciality flours and thickeners sourced and exported from India by Faar Earth Collective.",
};

export default async function ProductsIndexPage() {
  const categories = await getCategories();

  return (
    <main>
      <Header />
      <div className="section-pad">
        <div className="container-xl mb-12 text-center">
          <span className="eyebrow">Our Products</span>
          <h1 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">All Products</h1>
        </div>
        <div className="container-xl">
          <CategoryGrid categories={categories} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
