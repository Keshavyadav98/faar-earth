import { NextRequest, NextResponse } from "next/server";
import {
  deleteDynamicBlogPost,
  findDynamicBlogBySlug,
  updateDynamicBlogPost,
} from "@/lib/blogStore";
import { deleteBlogImage, saveBlogImage } from "@/lib/blogImages";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const existing = await findDynamicBlogBySlug(slug);
    if (!existing) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    const form = await req.formData();
    const title = String(form.get("title") || "").trim();
    const content = String(form.get("content") || "").trim();
    const description = String(form.get("description") || "").trim();
    const author = String(form.get("author") || "").trim();
    const category = String(form.get("category") || "").trim();
    const dateInput = String(form.get("date") || "").trim();
    const removeImage = form.get("removeImage") === "true";
    const image = form.get("image");

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    let thumbnail = existing.thumbnail;

    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Uploaded file must be an image." },
          { status: 400 }
        );
      }
      await deleteBlogImage(existing.thumbnail);
      thumbnail = await saveBlogImage(slug, image);
    } else if (removeImage) {
      await deleteBlogImage(existing.thumbnail);
      thumbnail = "";
    }

    const updated = await updateDynamicBlogPost(slug, {
      title,
      content,
      description: description || content.slice(0, 160),
      author: author || existing.author,
      category: category || existing.category,
      date: dateInput || existing.date,
      thumbnail,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("Blog update failed:", err);
    return NextResponse.json(
      { error: "Failed to update blog. Please try again later." },
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
    const removed = await deleteDynamicBlogPost(slug);
    if (!removed) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    await deleteBlogImage(removed.thumbnail);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Blog delete failed:", err);
    return NextResponse.json(
      { error: "Failed to delete blog. Please try again later." },
      { status: 500 }
    );
  }
}
