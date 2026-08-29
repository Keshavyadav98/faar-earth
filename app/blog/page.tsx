import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListing from "@/components/BlogListing";
import { getDynamicBlogPosts } from "@/lib/blogStore";

export const metadata: Metadata = {
  title: "Blog | Faar Earth Collective",
  description:
    "Insights on India's oleoresins, spice oils, cold pressed oils and edible seed export industry from Faar Earth Collective.",
};

export default async function BlogIndexPage() {
  const posts = await getDynamicBlogPosts();

  return (
    <main>
      <Header />
      <BlogListing initialPosts={posts} />
      <Footer />
    </main>
  );
}
