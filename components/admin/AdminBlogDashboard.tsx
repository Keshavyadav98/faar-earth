"use client";

import { useEffect, useState } from "react";
import type { DynamicBlogPost } from "@/lib/blogStore";

const EMPTY_FORM = {
  title: "",
  description: "",
  content: "",
  author: "",
  category: "",
  date: "",
};

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState<DynamicBlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/blogs");
      const body = await res.json();
      setPosts(body.data || []);
    } catch {
      setError("Failed to load blog posts.");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setRemoveImage(false);
    setEditingSlug(null);
  };

  const startEdit = (post: DynamicBlogPost) => {
    setEditingSlug(post.slug);
    setForm({
      title: post.title,
      description: post.description,
      content: post.content,
      author: post.author,
      category: post.category,
      date: post.date,
    });
    setImageFile(null);
    setRemoveImage(false);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Delete this blog post? This cannot be undone.")) return;
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Failed to delete post.");
        return;
      }
      setMessage("Post deleted.");
      if (editingSlug === slug) resetForm();
      loadPosts();
    } catch {
      setError("Failed to delete post.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const fd = new FormData();
    fd.set("title", form.title);
    fd.set("description", form.description);
    fd.set("content", form.content);
    fd.set("author", form.author);
    fd.set("category", form.category);
    fd.set("date", form.date);
    if (imageFile) fd.set("image", imageFile);
    if (editingSlug && removeImage) fd.set("removeImage", "true");

    try {
      const res = await fetch(editingSlug ? `/api/blogs/${editingSlug}` : "/api/blogs", {
        method: editingSlug ? "PUT" : "POST",
        body: fd,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Failed to save post.");
        return;
      }
      setMessage(editingSlug ? "Post updated." : "Post created.");
      resetForm();
      loadPosts();
    } catch {
      setError("Failed to save post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-12 rounded-card border border-border-gray bg-white p-6 shadow-card sm:p-8"
      >
        <h2 className="mb-5 font-heading text-[18px] font-semibold text-[#404C3E]">
          {editingSlug ? `Edit: ${editingSlug}` : "New Post"}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[13px] font-medium text-text-gray">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder="Editorial Team"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="General"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Date <span className="text-text-gray/60">(e.g. 29 Aug 2026)</span>
            </label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              placeholder="Today"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Thumbnail image {editingSlug && "(leave blank to keep current)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-[14px]"
            />
            {editingSlug && (
              <label className="mt-2 flex items-center gap-2 text-[13px] text-text-gray">
                <input
                  type="checkbox"
                  checked={removeImage}
                  onChange={(e) => setRemoveImage(e.target.checked)}
                />
                Remove current image
              </label>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Description <span className="text-text-gray/60">(optional, auto-generated if blank)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Content *{" "}
              <span className="text-text-gray/60">
                (blank line between paragraphs · start a line with &quot;## &quot; for a heading ·
                start lines with &quot;- &quot; for a bullet list)
              </span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              required
              rows={10}
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-[13px] text-red-600">{error}</p>}
        {message && <p className="mt-4 text-[13px] text-primary-green">{message}</p>}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-btn bg-primary-green px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-hover-green disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving…" : editingSlug ? "Update Post" : "Create Post"}
          </button>
          {editingSlug && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-btn border border-border-gray px-6 py-3 text-[15px] font-medium text-text-gray transition-colors hover:bg-beige"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-4 font-heading text-[18px] font-semibold text-[#404C3E]">
        Posts ({posts.length})
      </h2>

      {loadingPosts ? (
        <p className="text-[14px] text-text-gray">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-[14px] text-text-gray">No blog posts created yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 rounded-card border border-border-gray bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[#404C3E]">{post.title}</p>
                <p className="text-[13px] text-text-gray">
                  {post.slug} · {post.date}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(post)}
                  className="rounded-btn border border-border-gray px-4 py-2 text-[13px] font-medium text-text-gray transition-colors hover:bg-beige"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="rounded-btn border border-red-200 px-4 py-2 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
