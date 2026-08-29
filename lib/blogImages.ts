import { promises as fs } from "fs";
import path from "path";

export const IMAGES_DIR = path.join(process.cwd(), "public", "Images");

// Matches filenames we generate ourselves: "<slug>-<timestamp>.<ext>".
// Used as a safety check before deleting, so we never remove a shared/static
// asset that happens to be referenced as a thumbnail.
const OWNED_FILENAME = /-\d{10,}\.[a-z0-9]+$/i;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveBlogImage(slug: string, image: File): Promise<string> {
  const ext = path.extname(image.name) || ".jpg";
  const filename = `${slug}-${Date.now()}${ext}`;
  await fs.mkdir(IMAGES_DIR, { recursive: true });
  const buffer = Buffer.from(await image.arrayBuffer());
  await fs.writeFile(path.join(IMAGES_DIR, filename), buffer);
  return `/Images/${filename}`;
}

export async function deleteBlogImage(thumbnail: string | undefined | null) {
  if (!thumbnail || !thumbnail.startsWith("/Images/")) return;
  const filename = path.basename(thumbnail);
  if (!OWNED_FILENAME.test(filename)) return;

  try {
    await fs.unlink(path.join(IMAGES_DIR, filename));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
}
