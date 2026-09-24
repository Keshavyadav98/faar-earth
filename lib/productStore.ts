import { promises as fs } from "fs";
import path from "path";
import type { LocalizedText, LocalizedStringList, LocalizedFaqs, FaqItem } from "./locale";

export type { FaqItem };

export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  form: LocalizedText;
  hsHeading: string;
  moq: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  metaKeywords: LocalizedText;
  createdAt: string;
  updatedAt?: string;
  // SEO / content-brief fields
  primaryKeyword?: string;
  h1?: LocalizedText;
  botanicalName?: string;
  origin?: string;
  grading?: LocalizedText;
  packaging?: LocalizedText;
  applications?: LocalizedStringList;
  whySourceFromUs?: LocalizedStringList;
  faqs?: LocalizedFaqs;
};

const STORE_PATH = path.join(process.cwd(), "data", "products-store.json");

async function readStore(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeStore(products: Product[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export async function getProducts(): Promise<Product[]> {
  return readStore();
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await readStore();
  return products.filter((p) => p.categorySlug === categorySlug);
}

export async function addProduct(product: Product): Promise<Product> {
  const products = await readStore();
  products.push(product);
  await writeStore(products);
  return product;
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  const products = await readStore();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function isProductSlugTaken(slug: string): Promise<boolean> {
  const products = await readStore();
  return products.some((p) => p.slug === slug);
}

export async function updateProduct(
  slug: string,
  updates: Partial<Omit<Product, "id" | "slug" | "createdAt">>
): Promise<Product | null> {
  const products = await readStore();
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const updated: Product = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updated;
  await writeStore(products);
  return updated;
}

export async function deleteProduct(slug: string): Promise<Product | null> {
  const products = await readStore();
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const [removed] = products.splice(index, 1);
  await writeStore(products);
  return removed;
}

export async function deleteProductsByCategory(categorySlug: string): Promise<void> {
  const products = await readStore();
  const remaining = products.filter((p) => p.categorySlug !== categorySlug);
  await writeStore(remaining);
}
