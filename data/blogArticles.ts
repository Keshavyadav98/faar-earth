// Rich, fully-authored article content keyed by slug.
// A single <ArticleTemplate> renders whichever record is looked up here —
// adding a new in-depth post means adding an entry, not a new page file.

export type ArticleBlock =
  | { type: "h1" | "h2" | "h3"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; text: string };

export type RelatedArticle = {
  title: string;
  date: string;
  tag: string;
  tagColor: string;
  href: string;
  img?: string;
};

export type ArticleContent = {
  seo: { title: string; description: string; canonical: string };
  hero: { image: string; alt: string; category: string; title: string };
  meta: { author: string; avatarInitials: string; date: string; readTime: string };
  tableOfContents: { id: string; label: string }[];
  relatedArticles: RelatedArticle[];
  linkMap: { word: string; href: string; title?: string }[];
  blocks: ArticleBlock[];
};

// Currently empty — the oleoresin series that used to live here has been
// migrated to the file-based store (data/blog-store.json) so it can be
// created/edited/deleted from the admin panel at /blog/8860. Add entries here
// only for future posts that need this template's rich layout (TOC, related
// articles sidebar, hero banner) and don't need runtime editing.
export const articleContent: Record<string, ArticleContent> = {};
