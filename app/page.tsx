import Header from "@/components/Header";
import Hero from "@/components/Hero";
import USPStrip from "@/components/USPStrip";
import Categories from "@/components/Categories";
import ProductsGallery from "@/components/ProductsGallery";
import About from "@/components/About";
import Enquiry from "@/components/Enquiry";
import Footer from "@/components/Footer";
import ScrollToSectionOnLoad from "@/components/ScrollToSectionOnLoad";

export default function Home() {
  return (
    <main>
      <ScrollToSectionOnLoad />
      <Header />
      <Hero />
      <USPStrip />
      <Categories />
      <ProductsGallery />
      <About />
      <Enquiry />
      <Footer />
    </main>
  );
}
