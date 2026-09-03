import { promises as fs } from "fs";
import path from "path";
import type { LocalizedText } from "./locale";

export type ProductCategory = {
  id: string;
  slug: string;
  name: LocalizedText;
  intro: LocalizedText;
  image: string;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  metaKeywords: LocalizedText;
  createdAt: string;
  updatedAt?: string;
};

const STORE_PATH = path.join(process.cwd(), "data", "categories-store.json");

async function readStore(): Promise<ProductCategory[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as ProductCategory[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeStore(categories: ProductCategory[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(categories, null, 2), "utf-8");
}

export async function getCategories(): Promise<ProductCategory[]> {
  return readStore();
}

export async function addCategory(category: ProductCategory): Promise<ProductCategory> {
  const categories = await readStore();
  categories.push(category);
  await writeStore(categories);
  return category;
}

export async function findCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  const categories = await readStore();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function isCategorySlugTaken(slug: string): Promise<boolean> {
  const categories = await readStore();
  return categories.some((c) => c.slug === slug);
}

export async function updateCategory(
  slug: string,
  updates: Partial<Omit<ProductCategory, "id" | "slug" | "createdAt">>
): Promise<ProductCategory | null> {
  const categories = await readStore();
  const index = categories.findIndex((c) => c.slug === slug);
  if (index === -1) return null;

  const updated: ProductCategory = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  categories[index] = updated;
  await writeStore(categories);
  return updated;
}

export async function deleteCategory(slug: string): Promise<ProductCategory | null> {
  const categories = await readStore();
  const index = categories.findIndex((c) => c.slug === slug);
  if (index === -1) return null;

  const [removed] = categories.splice(index, 1);
  await writeStore(categories);
  return removed;
}
