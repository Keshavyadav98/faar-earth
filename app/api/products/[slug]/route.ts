import { NextRequest, NextResponse } from "next/server";
import { deleteProduct, findProductBySlug, updateProduct } from "@/lib/productStore";
import { findCategoryBySlug } from "@/lib/categoryStore";
import { deleteBlogImage, saveBlogImage } from "@/lib/blogImages";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";
import {
  parseLocalizedField,
  parseLocalizedListField,
  parseLocalizedFaqsField,
} from "@/lib/locale";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const existing = await findProductBySlug(slug);
    if (!existing) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const form = await req.formData();
    const title = parseLocalizedField(form.get("title"));
    const description = parseLocalizedField(form.get("description"));
    const metaTitle = parseLocalizedField(form.get("metaTitle"));
    const metaDescription = parseLocalizedField(form.get("metaDescription"));
    const metaKeywords = parseLocalizedField(form.get("metaKeywords"));
    const categorySlug = String(form.get("categorySlug") || "").trim();
    const formSpec = parseLocalizedField(form.get("form"));
    const hsHeading = String(form.get("hsHeading") || "").trim();
    const moq = parseLocalizedField(form.get("moq"));
    const primaryKeyword = String(form.get("primaryKeyword") || "").trim();
    const h1 = parseLocalizedField(form.get("h1"));
    const botanicalName = String(form.get("botanicalName") || "").trim();
    const origin = String(form.get("origin") || "").trim();
    const grading = parseLocalizedField(form.get("grading"));
    const packaging = parseLocalizedField(form.get("packaging"));
    const applications = parseLocalizedListField(form.get("applications"));
    const whySourceFromUs = parseLocalizedListField(form.get("whySourceFromUs"));
    const faqs = parseLocalizedFaqsField(form.get("faqs"));
    const removeImage = form.get("removeImage") === "true";
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

    const updated = await updateProduct(slug, {
      title,
      description,
      categorySlug,
      form: formSpec,
      hsHeading,
      moq,
      metaTitle,
      metaDescription,
      metaKeywords,
      primaryKeyword,
      h1,
      botanicalName,
      origin,
      grading,
      packaging,
      applications,
      whySourceFromUs,
      faqs,
      image: imagePath,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("Product update failed:", err);
    return NextResponse.json(
      { error: "Failed to update product. Please try again later." },
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
    const removed = await deleteProduct(slug);
    if (!removed) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    await deleteBlogImage(removed.image);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Product delete failed:", err);
    return NextResponse.json(
      { error: "Failed to delete product. Please try again later." },
      { status: 500 }
    );
  }
}
