import { NextRequest, NextResponse } from "next/server";
import {
  addDynamicBlogPost,
  getDynamicBlogPosts,
  isDynamicSlugTaken,
  type DynamicBlogPost,
} from "@/lib/blogStore";
import { findStaticPostBySlug } from "@/data/blogPosts";
import { saveBlogImage, slugify } from "@/lib/blogImages";
import { isAdminRequestAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  const posts = await getDynamicBlogPosts();
  return NextResponse.json({ data: posts });
}

export async function POST(req: NextRequest) {
  if (!isAdminRequestAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const title = String(form.get("title") || "").trim();
    const content = String(form.get("content") || "").trim();
    const description = String(form.get("description") || "").trim();
    const author = String(form.get("author") || "").trim();
    const category = String(form.get("category") || "").trim();
    const dateInput = String(form.get("date") || "").trim();
    const image = form.get("image");

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    if (!slug) {
      return NextResponse.json(
        { error: "Title must contain at least one letter or number." },
        { status: 400 }
      );
    }
    if ((await isDynamicSlugTaken(slug)) || findStaticPostBySlug(slug)) {
      let i = 2;
      while ((await isDynamicSlugTaken(`${slug}-${i}`)) || findStaticPostBySlug(`${slug}-${i}`)) {
        i++;
      }
      slug = `${slug}-${i}`;
    }

    let thumbnail = "";
    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Uploaded file must be an image." },
          { status: 400 }
        );
      }
      thumbnail = await saveBlogImage(slug, image);
    }

    const now = new Date();
    const date =
      dateInput ||
      now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const post: DynamicBlogPost = {
      id: `${Date.now()}`,
      slug,
      title,
      description: description || content.slice(0, 160),
      content,
      thumbnail,
      author: author || "Editorial Team",
      date,
      category: category || "General",
      slugLink: `/blog/${slug}`,
      createdAt: now.toISOString(),
    };

    await addDynamicBlogPost(post);

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (err) {
    console.error("Blog create failed:", err);
    return NextResponse.json(
      { error: "Failed to save blog. Please try again later." },
      { status: 500 }
    );
  }
}
