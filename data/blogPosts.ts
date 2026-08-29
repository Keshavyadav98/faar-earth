export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  date: string;
  category: string;
  slugLink: string;
};

// Curated posts bundled with the app (rendered from hardcoded source, not
// editable via the admin panel). Currently empty — all blog posts, including
// the original oleoresin series, live in the file-based store instead (see
// lib/blogStore.ts) so they can be created/edited/deleted from /blog/8860.
export const staticPosts: BlogPost[] = [];

export function findStaticPostBySlug(slug: string): BlogPost | null {
  return staticPosts.find((p) => p.slug === slug) ?? null;
}
