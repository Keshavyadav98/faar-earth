import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/ArticleTemplate";
import SimpleArticle from "@/components/SimpleArticle";
import { articleContent } from "@/data/blogArticles";
import { findStaticPostBySlug } from "@/data/blogPosts";
import { findDynamicBlogBySlug } from "@/lib/blogStore";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rich = articleContent[slug];
  if (rich) {
    return {
      title: rich.seo.title,
      description: rich.seo.description,
      alternates: { canonical: rich.seo.canonical },
    };
  }

  const dynamicPost = await findDynamicBlogBySlug(slug);
  if (dynamicPost) {
    return {
      title: `${dynamicPost.title.en} | Faar Earth Collective`,
      description: dynamicPost.description.en,
    };
  }

  return {};
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rich = articleContent[slug];

  if (rich) {
    return (
      <main>
        <Header />
        <ArticleTemplate data={rich} />
        <Footer />
      </main>
    );
  }

  const dynamicPost = await findDynamicBlogBySlug(slug);
  if (dynamicPost) {
    return (
      <main>
        <Header />
        <SimpleArticle post={dynamicPost} />
        <Footer />
      </main>
    );
  }

  const staticPost = findStaticPostBySlug(slug);
  if (!staticPost) {
    notFound();
  }

  return (
    <main>
      <Header />
      <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-8">
        <Link href="/blog" className="text-sm text-text-gray hover:text-primary-green">
          ← Back to all posts
        </Link>
        <h1 className="mb-3 mt-6 font-heading text-[28px] font-bold text-[#404C3E] sm:text-[36px]">
          {staticPost.title}
        </h1>
        {staticPost.date && <p className="mb-6 text-[13px] text-text-gray">{staticPost.date}</p>}
        <p className="text-[16px] leading-relaxed text-text-gray">{staticPost.description}</p>
      </div>
      <Footer />
    </main>
  );
}
