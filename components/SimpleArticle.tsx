import type { DynamicBlogPost } from "@/lib/blogStore";

export default function SimpleArticle({ post }: { post: DynamicBlogPost }) {
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-8">
      {post.thumbnail && (
        <div className="mb-8 w-full overflow-hidden rounded-card bg-beige" style={{ aspectRatio: "16/7" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}
      <h1 className="mb-3 font-heading text-[28px] font-bold leading-tight text-[#404C3E] sm:text-[36px]">
        {post.title}
      </h1>
      <p className="mb-8 text-[13px] text-text-gray">
        {post.author} · {post.date}
      </p>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-5 text-[16px] leading-relaxed text-text-gray">
          {p}
        </p>
      ))}
    </article>
  );
}
