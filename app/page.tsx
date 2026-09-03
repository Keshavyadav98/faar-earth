import Header from "@/components/Header";
import Hero from "@/components/Hero";
import USPStrip from "@/components/USPStrip";
import Categories from "@/components/Categories";
import ProductsGallery from "@/components/ProductsGallery";
import About from "@/components/About";
import Enquiry from "@/components/Enquiry";
import Footer from "@/components/Footer";
import ScrollToSectionOnLoad from "@/components/ScrollToSectionOnLoad";
import { getCategories } from "@/lib/categoryStore";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main>
      <ScrollToSectionOnLoad />
      <Header />
      <Hero />
      <USPStrip />
      <Categories categories={categories} />
      <ProductsGallery />
      <About />
      <Enquiry />
      <Footer />
    </main>
  );
}
