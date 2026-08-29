import type { DynamicBlogPost } from "@/lib/blogStore";

function renderContent(content: string) {
  const blocks = content.split(/\n\s*\n/).filter(Boolean);

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mb-4 mt-10 font-heading text-[22px] font-semibold leading-snug text-[#404C3E] sm:text-[26px]"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i} className="mb-5 list-disc space-y-2 pl-5">
          {lines.map((l, j) => (
            <li key={j} className="text-[16px] leading-relaxed text-text-gray">
              {l.slice(2)}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="mb-5 text-[16px] leading-relaxed text-text-gray">
        {trimmed}
      </p>
    );
  });
}

export default function SimpleArticle({ post }: { post: DynamicBlogPost }) {
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
      {renderContent(post.content)}
    </article>
  );
}
