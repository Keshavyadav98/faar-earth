import { NextRequest, NextResponse } from "next/server";
import {
  addProduct,
  getProducts,
  getProductsByCategory,
  isProductSlugTaken,
  type Product,
} from "@/lib/productStore";
import { findCategoryBySlug } from "@/lib/categoryStore";
import { saveBlogImage, slugify } from "@/lib/blogImages";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";
import { parseLocalizedField } from "@/lib/locale";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const products = category ? await getProductsByCategory(category) : await getProducts();
  return NextResponse.json({ data: products });
}

export async function POST(req: NextRequest) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const title = parseLocalizedField(form.get("title"));
    const description = parseLocalizedField(form.get("description"));
    const metaTitle = parseLocalizedField(form.get("metaTitle"));
    const metaDescription = parseLocalizedField(form.get("metaDescription"));
    const metaKeywords = parseLocalizedField(form.get("metaKeywords"));
    const categorySlug = String(form.get("categorySlug") || "").trim();
    const formSpec = String(form.get("form") || "").trim();
    const hsHeading = String(form.get("hsHeading") || "").trim();
    const moq = String(form.get("moq") || "").trim();
    const image = form.get("image");

    if (!title.en) {
      return NextResponse.json({ error: "English title is required." }, { status: 400 });
    }
    if (!categorySlug) {
      return NextResponse.json({ error: "Category is required." }, { status: 400 });
    }
    if (!(await findCategoryBySlug(categorySlug))) {
      return NextResponse.json({ error: "Selected category does not exist." }, { status: 400 });
    }

    let slug = slugify(title.en);
    if (!slug) {
      return NextResponse.json(
        { error: "Title must contain at least one letter or number." },
        { status: 400 }
      );
    }
    if (await isProductSlugTaken(slug)) {
      let i = 2;
      while (await isProductSlugTaken(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }

    let imagePath = "";
    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 });
      }
      imagePath = await saveBlogImage(slug, image);
    }

    const product: Product = {
      id: `${Date.now()}`,
      slug,
      categorySlug,
      title,
      description,
      image: imagePath,
      form: formSpec,
      hsHeading,
      moq,
      metaTitle,
      metaDescription,
      metaKeywords,
      createdAt: new Date().toISOString(),
    };

    await addProduct(product);

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (err) {
    console.error("Product create failed:", err);
    return NextResponse.json(
      { error: "Failed to save product. Please try again later." },
      { status: 500 }
    );
  }
}
