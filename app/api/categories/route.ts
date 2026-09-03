import { NextRequest, NextResponse } from "next/server";
import {
  addCategory,
  getCategories,
  isCategorySlugTaken,
  type ProductCategory,
} from "@/lib/categoryStore";
import { saveBlogImage, slugify } from "@/lib/blogImages";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";
import { parseLocalizedField } from "@/lib/locale";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json({ data: categories });
}

export async function POST(req: NextRequest) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const name = parseLocalizedField(form.get("name"));
    const intro = parseLocalizedField(form.get("intro"));
    const metaTitle = parseLocalizedField(form.get("metaTitle"));
    const metaDescription = parseLocalizedField(form.get("metaDescription"));
    const metaKeywords = parseLocalizedField(form.get("metaKeywords"));
    const image = form.get("image");

    if (!name.en) {
      return NextResponse.json({ error: "English name is required." }, { status: 400 });
    }

    let slug = slugify(name.en);
    if (!slug) {
      return NextResponse.json(
        { error: "Name must contain at least one letter or number." },
        { status: 400 }
      );
    }
    if (await isCategorySlugTaken(slug)) {
      let i = 2;
      while (await isCategorySlugTaken(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }

    let imagePath = "";
    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 });
      }
      imagePath = await saveBlogImage(slug, image);
    }

    const category: ProductCategory = {
      id: `${Date.now()}`,
      slug,
      name,
      intro,
      image: imagePath,
      metaTitle,
      metaDescription,
      metaKeywords,
      createdAt: new Date().toISOString(),
    };

    await addCategory(category);

    return NextResponse.json({ data: category }, { status: 201 });
  } catch (err) {
    console.error("Category create failed:", err);
    return NextResponse.json(
      { error: "Failed to save category. Please try again later." },
      { status: 500 }
    );
  }
}
