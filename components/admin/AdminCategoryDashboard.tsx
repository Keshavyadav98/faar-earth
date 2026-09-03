"use client";

import { useEffect, useState } from "react";
import type { ProductCategory } from "@/lib/categoryStore";
import type { Locale, LocalizedText } from "@/lib/locale";
import LocaleTabs from "./LocaleTabs";
import LocalizedField from "./LocalizedField";

const EMPTY_FORM: {
  name: LocalizedText;
  intro: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  metaKeywords: LocalizedText;
} = {
  name: {},
  intro: {},
  metaTitle: {},
  metaDescription: {},
  metaKeywords: {},
};

export default function AdminCategoryDashboard() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [locale, setLocale] = useState<Locale>("en");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const body = await res.json();
      setCategories(body.data || []);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setLocale("en");
    setImageFile(null);
    setRemoveImage(false);
    setEditingSlug(null);
  };

  const startEdit = (cat: ProductCategory) => {
    setEditingSlug(cat.slug);
    setForm({
      name: cat.name,
      intro: cat.intro,
      metaTitle: cat.metaTitle,
      metaDescription: cat.metaDescription,
      metaKeywords: cat.metaKeywords,
    });
    setLocale("en");
    setImageFile(null);
    setRemoveImage(false);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Delete this category? This cannot be undone.")) return;
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/categories/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Failed to delete category.");
        return;
      }
      setMessage("Category deleted.");
      if (editingSlug === slug) resetForm();
      load();
    } catch {
      setError("Failed to delete category.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const fd = new FormData();
    fd.set("name", JSON.stringify(form.name));
    fd.set("intro", JSON.stringify(form.intro));
    fd.set("metaTitle", JSON.stringify(form.metaTitle));
    fd.set("metaDescription", JSON.stringify(form.metaDescription));
    fd.set("metaKeywords", JSON.stringify(form.metaKeywords));
    if (imageFile) fd.set("image", imageFile);
    if (editingSlug && removeImage) fd.set("removeImage", "true");

    try {
      const res = await fetch(editingSlug ? `/api/categories/${editingSlug}` : "/api/categories", {
        method: editingSlug ? "PUT" : "POST",
        body: fd,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Failed to save category.");
        return;
      }
      setMessage(editingSlug ? "Category updated." : "Category created.");
      resetForm();
      load();
    } catch {
      setError("Failed to save category.");
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
          {editingSlug ? `Edit: ${editingSlug}` : "New Category"}
        </h2>

        <LocaleTabs active={locale} onChange={setLocale} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <LocalizedField
              label="Name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              locale={locale}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <LocalizedField
              label="Intro / description"
              value={form.intro}
              onChange={(v) => setForm((f) => ({ ...f, intro: v }))}
              locale={locale}
              required
              multiline
              rows={4}
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Image {editingSlug && "(leave blank to keep current)"}
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
            <hr className="border-border-gray" />
          </div>

          <div className="sm:col-span-2">
            <LocalizedField
              label="Meta title"
              value={form.metaTitle}
              onChange={(v) => setForm((f) => ({ ...f, metaTitle: v }))}
              locale={locale}
              placeholder="Shown as the browser tab / search result title"
            />
          </div>

          <div className="sm:col-span-2">
            <LocalizedField
              label="Meta description"
              value={form.metaDescription}
              onChange={(v) => setForm((f) => ({ ...f, metaDescription: v }))}
              locale={locale}
              multiline
              placeholder="Shown as the search result snippet"
            />
          </div>

          <div className="sm:col-span-2">
            <LocalizedField
              label="Meta keywords"
              value={form.metaKeywords}
              onChange={(v) => setForm((f) => ({ ...f, metaKeywords: v }))}
              locale={locale}
              placeholder="Comma-separated"
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
            {submitting ? "Saving…" : editingSlug ? "Update Category" : "Create Category"}
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
        Categories ({categories.length})
      </h2>

      {loading ? (
        <p className="text-[14px] text-text-gray">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-[14px] text-text-gray">No categories created yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col gap-3 rounded-card border border-border-gray bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[#404C3E]">{cat.name.en}</p>
                <p className="text-[13px] text-text-gray">/products/{cat.slug}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(cat)}
                  className="rounded-btn border border-border-gray px-4 py-2 text-[13px] font-medium text-text-gray transition-colors hover:bg-beige"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.slug)}
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
