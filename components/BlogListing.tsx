"use client";

import { useEffect, useState } from "react";
import { staticPosts } from "@/data/blogPosts";
import type { DynamicBlogPost } from "@/lib/blogStore";
import BlogCard, { type BlogCardPost } from "@/components/BlogCard";

const INITIAL_VISIBLE = 6;
const LOAD_MORE_COUNT = 6;

function toCardPost(post: DynamicBlogPost): BlogCardPost {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    thumbnail: post.thumbnail,
    date: post.date,
    slugLink: post.slugLink,
  };
}

export default function BlogListing() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<BlogCardPost[]>(
    staticPosts.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      thumbnail: p.thumbnail,
      date: p.date,
      slugLink: p.slugLink,
    }))
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) return;
        const body = await res.json();
        const dynamicPosts: DynamicBlogPost[] = body.data || [];
        if (!cancelled && dynamicPosts.length) {
          setAllPosts((prev) => [...dynamicPosts.map(toCardPost), ...prev]);
        }
      } catch {
        // Static posts are already shown; a failed dynamic fetch is non-fatal.
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
          <span className="eyebrow">Our Blog</span>
          <h1 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            Insights from the Source
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {visiblePosts.map((post, idx) => (
            <BlogCard key={post.id} post={post} animationDelay={idx % LOAD_MORE_COUNT} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-btn bg-primary-green px-7 py-3 text-[14px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
