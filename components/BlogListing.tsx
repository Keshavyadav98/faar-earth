"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { DynamicBlogPost } from "@/lib/blogStore";
import { localize } from "@/lib/locale";
import BlogCard, { type BlogCardPost } from "@/components/BlogCard";

const INITIAL_VISIBLE = 6;
const LOAD_MORE_COUNT = 6;

function toCardPost(post: DynamicBlogPost, lang: string): BlogCardPost {
  return {
    id: post.id,
    title: localize(post.title, lang),
    description: localize(post.description, lang),
    thumbnail: post.thumbnail,
    date: post.date,
    slugLink: post.slugLink,
  };
}

export default function BlogListing({ initialPosts }: { initialPosts: DynamicBlogPost[] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(false);
  const [dynamicPosts, setDynamicPosts] = useState<DynamicBlogPost[]>(initialPosts);
  const allPosts = dynamicPosts.map((p) => toCardPost(p, lang));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) return;
        const body = await res.json();
        const posts: DynamicBlogPost[] = body.data || [];
        if (!cancelled) setDynamicPosts(posts);
      } catch {
        // Server-rendered posts are already shown; a failed refresh is non-fatal.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, allPosts.length));
      setLoading(false);
    }, 400);
  };

  return (
    <section className="section-pad bg-offwhite">
      <div className="container-xl">
        <div className="mb-14 text-center">
          <span className="eyebrow">{t("blog.eyebrow")}</span>
          <h1 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            {t("blog.heading")}
          </h1>
        </div>

        {allPosts.length === 0 ? (
          <p className="text-center text-[15px] text-text-gray">{t("blog.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {visiblePosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} animationDelay={idx % LOAD_MORE_COUNT} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-btn bg-primary-green px-7 py-3 text-[14px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t("blog.loading") : t("blog.loadMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
