import { promises as fs } from "fs";
import path from "path";

export type DynamicBlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  author: string;
  date: string;
  category: string;
  slugLink: string;
  createdAt: string;
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
