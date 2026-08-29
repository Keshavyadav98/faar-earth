"use client";

import { useState } from "react";
import Link from "next/link";

export type BlogCardPost = {
  id: string | number;
  title: string;
  description: string;
  thumbnail?: string;
  date?: string;
  slugLink: string;
};

export default function BlogCard({
  post,
  animationDelay = 0,
}: {
  post: BlogCardPost;
  animationDelay?: number;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      className="group flex cursor-pointer flex-col"
      style={{
        animation: "fadeSlideUp 0.45s ease both",
        animationDelay: `${animationDelay * 80}ms`,
      }}
    >
      {post.thumbnail && (
        <div
          className="w-full overflow-hidden rounded-card bg-beige"
          style={{ aspectRatio: "16/10" }}
        >
          <Link href={post.slugLink}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail}
              alt={post.title}
              onLoad={() => setImgLoaded(true)}
              className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>
        </div>
      )}

      <div className="flex flex-1 flex-col pt-4">
        <Link href={post.slugLink}>
          <h3 className="mb-2 line-clamp-2 font-heading text-[18px] font-semibold leading-snug text-[#404C3E] transition-colors group-hover:text-primary-green">
            {post.title}
          </h3>
        </Link>
        {post.date && <p className="mb-2 text-[13px] text-text-gray">{post.date}</p>}
        <p className="mb-3 line-clamp-3 flex-1 cursor-default text-[14px] leading-relaxed text-text-gray">
          {post.description}
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </article>
  );
}
