"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/productStore";
import type { ProductCategory } from "@/lib/categoryStore";
import type { Locale, LocalizedText } from "@/lib/locale";
import LocaleTabs from "./LocaleTabs";
import LocalizedField from "./LocalizedField";

const EMPTY_FORM: {
  title: LocalizedText;
  description: LocalizedText;
  categorySlug: string;
  form: string;
  hsHeading: string;
  moq: string;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  metaKeywords: LocalizedText;
} = {
  title: {},
  description: {},
  categorySlug: "",
  form: "",
  hsHeading: "",
  moq: "",
  metaTitle: {},
  metaDescription: {},
  metaKeywords: {},
};

export default function AdminProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
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
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);
      const productsBody = await productsRes.json();
      const categoriesBody = await categoriesRes.json();
      setProducts(productsBody.data || []);
      setCategories(categoriesBody.data || []);
    } catch {
      setError("Failed to load products.");
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

  const startEdit = (p: Product) => {
    setEditingSlug(p.slug);
    setForm({
      title: p.title,
      description: p.description,
      categorySlug: p.categorySlug,
      form: p.form,
      hsHeading: p.hsHeading,
      moq: p.moq,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      metaKeywords: p.metaKeywords,
    });
    setLocale("en");
    setImageFile(null);
    setRemoveImage(false);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Failed to delete product.");
        return;
      }
      setMessage("Product deleted.");
      if (editingSlug === slug) resetForm();
      load();
    } catch {
      setError("Failed to delete product.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    if (!form.categorySlug) {
      setError("Please select a category.");
      setSubmitting(false);
      return;
    }

    const fd = new FormData();
    fd.set("title", JSON.stringify(form.title));
    fd.set("description", JSON.stringify(form.description));
    fd.set("categorySlug", form.categorySlug);
    fd.set("form", form.form);
    fd.set("hsHeading", form.hsHeading);
    fd.set("moq", form.moq);
    fd.set("metaTitle", JSON.stringify(form.metaTitle));
    fd.set("metaDescription", JSON.stringify(form.metaDescription));
    fd.set("metaKeywords", JSON.stringify(form.metaKeywords));
    if (imageFile) fd.set("image", imageFile);
    if (editingSlug && removeImage) fd.set("removeImage", "true");

    try {
      const res = await fetch(editingSlug ? `/api/products/${editingSlug}` : "/api/products", {
        method: editingSlug ? "PUT" : "POST",
        body: fd,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Failed to save product.");
        return;
      }
      setMessage(editingSlug ? "Product updated." : "Product created.");
      resetForm();
      load();
    } catch {
      setError("Failed to save product.");
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
          {editingSlug ? `Edit: ${editingSlug}` : "New Product"}
        </h2>

        <LocaleTabs active={locale} onChange={setLocale} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <LocalizedField
              label="Title"
              value={form.title}
              onChange={(v) => setForm((f) => ({ ...f, title: v }))}
              locale={locale}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">Category *</label>
            <select
              value={form.categorySlug}
              onChange={(e) => setForm((f) => ({ ...f, categorySlug: e.target.value }))}
              required
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            >
              <option value="">Select a category…</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name.en}
                </option>
              ))}
            </select>
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
            <LocalizedField
              label="Description"
              value={form.description}
              onChange={(v) => setForm((f) => ({ ...f, description: v }))}
              locale={locale}
              required
              multiline
              rows={4}
              placeholder="Shown on the product card (first 2 lines) and the product page (in full)"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">Form</label>
            <input
              type="text"
              value={form.form}
              onChange={(e) => setForm((f) => ({ ...f, form: e.target.value }))}
              placeholder="e.g. Whole, cleaned"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">HS Heading</label>
            <input
              type="text"
              value={form.hsHeading}
              onChange={(e) => setForm((f) => ({ ...f, hsHeading: e.target.value }))}
              placeholder="e.g. 1207.99"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">MOQ</label>
            <input
              type="text"
              value={form.moq}
              onChange={(e) => setForm((f) => ({ ...f, moq: e.target.value }))}
              placeholder="e.g. From 100 kg"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
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
            {submitting ? "Saving…" : editingSlug ? "Update Product" : "Create Product"}
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
        Products ({products.length})
      </h2>

      {loading ? (
        <p className="text-[14px] text-text-gray">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-[14px] text-text-gray">No products created yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-card border border-border-gray bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[#404C3E]">{p.title.en}</p>
                <p className="text-[13px] text-text-gray">
                  /products/{p.categorySlug}/{p.slug}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="rounded-btn border border-border-gray px-4 py-2 text-[13px] font-medium text-text-gray transition-colors hover:bg-beige"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.slug)}
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
