"use client";

import { useEffect, useRef, useState } from "react";
import type { ArticleContent } from "@/data/blogArticles";

function slugify(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function BlogH2({ id, text }: { id?: string; text: string }) {
  return (
    <h2
      id={id || slugify(text)}
      style={{
        fontSize: "clamp(20px, 2.5vw, 28px)",
        fontWeight: 700,
        color: "#0F172A",
        fontFamily: "Inter, sans-serif",
        marginTop: "40px",
        marginBottom: "16px",
        lineHeight: 1.3,
        paddingBottom: "10px",
        borderBottom: "2px solid #EEF2F7",
      }}
    >
      {text}
    </h2>
  );
}

function BlogP({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: "clamp(15px, 1.3vw, 17px)",
        color: "#475569",
        fontFamily: "Inter, sans-serif",
        lineHeight: 1.85,
        marginBottom: "18px",
      }}
    >
      {text}
    </p>
  );
}

function BlogList({ items }: { items: string[] }) {
  return (
    <ul style={{ marginBottom: "24px", paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => {
        const colonIdx = item.indexOf(":");
        const bold = colonIdx !== -1 ? item.slice(0, colonIdx) : item;
        const rest = colonIdx !== -1 ? item.slice(colonIdx + 1) : "";
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: "14px",
              marginBottom: "16px",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4C5A44, #8AA07C)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "#475569",
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: "#0F172A", fontWeight: 600 }}>{bold}:</strong>
              {rest}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function TOC({ items, active }: { items: { id: string; label: string }[]; active: string }) {
  if (!items?.length) return null;
  return (
    <nav
      style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "14px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        In This Article
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <a
              href={`#${item.id}`}
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                fontWeight: active === item.id ? 600 : 400,
                color: active === item.id ? "#4C5A44" : "#475569",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "color 0.2s ease",
                paddingLeft: active === item.id ? "4px" : "0",
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: active === item.id ? "#4C5A44" : "#CBD5E1",
                  flexShrink: 0,
                  transition: "background 0.2s ease",
                }}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function RelatedArticles({ articles }: { articles: ArticleContent["relatedArticles"] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  if (!articles?.length) return null;
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Related Articles
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {articles.map((a, i) => (
          <a
            key={i}
            href={a.href || "#"}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              gap: "12px",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "10px",
              background: hovered === i ? "#F8FAFC" : "transparent",
              transition: "background 0.18s ease",
              textDecoration: "none",
            }}
          >
            {a.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.img}
                alt={a.title}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: a.tagColor,
                  background: `${a.tagColor}18`,
                  borderRadius: "20px",
                  padding: "2px 8px",
                  marginBottom: "4px",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {a.tag}
              </span>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: hovered === i ? "#4C5A44" : "#0F172A",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.4,
                  marginBottom: "4px",
                  transition: "color 0.18s ease",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {a.title}
              </p>
              <p style={{ fontSize: "11px", color: "#94A3B8", fontFamily: "Inter, sans-serif" }}>
                {a.date}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ArticleTemplate({ data }: { data: ArticleContent }) {
  const { hero, blocks = [], tableOfContents = [], relatedArticles = [] } = data;

  const [activeSection, setActiveSection] = useState("");
  const [shareTooltip, setShareTooltip] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = tableOfContents.map((t) => t.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [tableOfContents]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  return (
    <article
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "clamp(16px, 4vw, 40px) clamp(16px, 4vw, 32px)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "40px" }}
        className="blog-hero"
      >
        {hero?.image && (
          <div
            style={{
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "16/7",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.image}
              alt={hero.alt || ""}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.45) 55%, rgba(15,23,42,0.05) 100%)",
              }}
            />
            {hero.title && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "clamp(20px, 4vw, 48px)",
                  maxWidth: "78%",
                }}
              >
                {hero.category && (
                  <span
                    style={{
                      display: "block",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      marginBottom: "10px",
                      opacity: 0.9,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {hero.category}
                  </span>
                )}
                <h1
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(22px, 3.2vw, 38px)",
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {hero.title}
                </h1>
              </div>
            )}

            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <button
                onClick={handleShare}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(15,23,42,0.55)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(15,23,42,0.75)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15,23,42,0.55)";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
              {shareTooltip && (
                <span
                  style={{
                    position: "absolute",
                    top: "-34px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#0F172A",
                    color: "#fff",
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  Link copied!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ width: "100%", height: "1px", background: "#E2E8F0", marginBottom: "40px" }} />

      <div
        style={{ display: "flex", gap: "clamp(24px, 4vw, 56px)", alignItems: "flex-start" }}
        className="blog-body"
      >
        <div ref={contentRef} style={{ flex: "1 1 0", minWidth: 0 }}>
          {blocks.map((item, index) => {
            switch (item.type) {
              case "h1":
                return (
                  <h1
                    key={index}
                    id={item.id || slugify(item.text)}
                    style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      fontWeight: 700,
                      color: "#0F172A",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "16px",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.text}
                  </h1>
                );
              case "h2":
                return <BlogH2 key={index} id={item.id} text={item.text} />;
              case "h3":
                return (
                  <h3
                    key={index}
                    id={item.id || slugify(item.text)}
                    style={{
                      fontSize: "clamp(16px, 1.8vw, 22px)",
                      fontWeight: 600,
                      color: "#0F172A",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "12px",
                      marginTop: "28px",
                    }}
                  >
                    {item.text}
                  </h3>
                );
              case "p":
                return <BlogP key={index} text={item.text} />;
              case "image":
                return (
                  <div key={index} style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "28px", marginTop: "8px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.alt || ""} style={{ width: "100%", display: "block", objectFit: "cover" }} />
                    {item.caption && (
                      <p style={{ fontSize: "13px", color: "#94A3B8", fontFamily: "Inter, sans-serif", marginTop: "8px", textAlign: "center" }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                );
              case "list":
                return <BlogList key={index} items={item.items} />;
              case "quote":
                return (
                  <blockquote
                    key={index}
                    style={{
                      borderLeft: "4px solid #4C5A44",
                      background: "#F0F3EE",
                      borderRadius: "0 12px 12px 0",
                      padding: "16px 24px",
                      marginBottom: "24px",
                      marginTop: "8px",
                      fontStyle: "italic",
                      fontSize: "clamp(15px, 1.3vw, 18px)",
                      color: "#3A4534",
                      fontFamily: "Inter, sans-serif",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.text}
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </div>

        <aside
          style={{
            width: "clamp(240px, 28%, 320px)",
            flexShrink: 0,
            position: "sticky",
            top: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
          className="blog-sidebar"
        >
          <TOC items={tableOfContents} active={activeSection} />
          <RelatedArticles articles={relatedArticles} />
        </aside>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .blog-sidebar { display: none !important; }
          .blog-body { flex-direction: column !important; }
        }
      `}</style>
    </article>
  );
}
