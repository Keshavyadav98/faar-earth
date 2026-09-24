import { promises as fs } from "fs";
import path from "path";
import type { LocalizedText } from "./locale";

export type DynamicBlogPost = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  content: LocalizedText;
  thumbnail: string;
  author: string;
  date: string;
  category: string;
  slugLink: string;
  createdAt: string;
  updatedAt?: string;
};

const STORE_PATH = path.join(process.cwd(), "data", "blog-store.json");

async function readStore(): Promise<DynamicBlogPost[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as DynamicBlogPost[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeStore(posts: DynamicBlogPost[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export async function getDynamicBlogPosts(): Promise<DynamicBlogPost[]> {
  const posts = await readStore();
  return [...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addDynamicBlogPost(post: DynamicBlogPost): Promise<DynamicBlogPost> {
  const posts = await readStore();
  posts.unshift(post);
  await writeStore(posts);
  return post;
}

export async function findDynamicBlogBySlug(slug: string): Promise<DynamicBlogPost | null> {
  const posts = await readStore();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function isDynamicSlugTaken(slug: string): Promise<boolean> {
  const posts = await readStore();
  return posts.some((p) => p.slug === slug);
}

export async function updateDynamicBlogPost(
  slug: string,
  updates: Partial<Omit<DynamicBlogPost, "id" | "slug" | "slugLink" | "createdAt">>
): Promise<DynamicBlogPost | null> {
  const posts = await readStore();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const updated: DynamicBlogPost = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  posts[index] = updated;
  await writeStore(posts);
  return updated;
}

export async function deleteDynamicBlogPost(slug: string): Promise<DynamicBlogPost | null> {
  const posts = await readStore();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const [removed] = posts.splice(index, 1);
  await writeStore(posts);
  return removed;
}
