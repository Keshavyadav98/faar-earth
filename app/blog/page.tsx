import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListing from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Blog | Faar Earth Collective",
  description:
    "Insights on India's oleoresins, spice oils, cold pressed oils and edible seed export industry from Faar Earth Collective.",
};

export default function BlogIndexPage() {
  return (
    <main>
      <Header />
      <BlogListing />
      <Footer />
    </main>
  );
}
