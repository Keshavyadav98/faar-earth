import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, findCategoryBySlug, updateCategory } from "@/lib/categoryStore";
import { getProductsByCategory } from "@/lib/productStore";
import { deleteBlogImage, saveBlogImage } from "@/lib/blogImages";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";
import { parseLocalizedField } from "@/lib/locale";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const existing = await findCategoryBySlug(slug);
    if (!existing) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    const form = await req.formData();
    const name = parseLocalizedField(form.get("name"));
    const intro = parseLocalizedField(form.get("intro"));
    const metaTitle = parseLocalizedField(form.get("metaTitle"));
    const metaDescription = parseLocalizedField(form.get("metaDescription"));
    const metaKeywords = parseLocalizedField(form.get("metaKeywords"));
    const removeImage = form.get("removeImage") === "true";
    const image = form.get("image");

    if (!name.en) {
      return NextResponse.json({ error: "English name is required." }, { status: 400 });
    }

    let imagePath = existing.image;
    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 });
      }
      await deleteBlogImage(existing.image);
      imagePath = await saveBlogImage(slug, image);
    } else if (removeImage) {
      await deleteBlogImage(existing.image);
      imagePath = "";
    }

    const updated = await updateCategory(slug, {
      name,
      intro,
      metaTitle,
      metaDescription,
      metaKeywords,
      image: imagePath,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("Category update failed:", err);
    return NextResponse.json(
      { error: "Failed to update category. Please try again later." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { slug } = await params;

    const productsInCategory = await getProductsByCategory(slug);
    if (productsInCategory.length > 0) {
      return NextResponse.json(
        { error: `Delete or move the ${productsInCategory.length} product(s) in this category first.` },
        { status: 400 }
      );
    }

    const removed = await deleteCategory(slug);
    if (!removed) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    await deleteBlogImage(removed.image);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Category delete failed:", err);
    return NextResponse.json(
      { error: "Failed to delete category. Please try again later." },
      { status: 500 }
    );
  }
}
