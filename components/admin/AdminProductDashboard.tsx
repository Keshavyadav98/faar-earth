"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/productStore";
import type { ProductCategory } from "@/lib/categoryStore";
import type {
  Locale,
  LocalizedText,
  LocalizedStringList,
  LocalizedFaqs,
  FaqItem,
} from "@/lib/locale";
import LocaleTabs from "./LocaleTabs";
import LocalizedField from "./LocalizedField";

const EMPTY_FORM: {
  title: LocalizedText;
  description: LocalizedText;
  categorySlug: string;
  form: LocalizedText;
  hsHeading: string;
  moq: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  metaKeywords: LocalizedText;
  primaryKeyword: string;
  h1: LocalizedText;
  botanicalName: string;
  origin: string;
  grading: LocalizedText;
  packaging: LocalizedText;
  applications: LocalizedStringList;
  whySourceFromUs: LocalizedStringList;
  faqs: LocalizedFaqs;
} = {
  title: {},
  description: {},
  categorySlug: "",
  form: {},
  hsHeading: "",
  moq: {},
  metaTitle: {},
  metaDescription: {},
  metaKeywords: {},
  primaryKeyword: "",
  h1: {},
  botanicalName: "",
  origin: "",
  grading: {},
  packaging: {},
  applications: {},
  whySourceFromUs: {},
  faqs: {},
};

const inputClass =
  "w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green";

function LocalizedTextListEditor({
  label,
  hint,
  value,
  locale,
  onChange,
}: {
  label: string;
  hint?: string;
  value: LocalizedStringList;
  locale: Locale;
  onChange: (next: LocalizedStringList) => void;
}) {
  const items = value[locale] ?? [];

  const setItems = (next: string[]) => {
    onChange({ ...value, [locale]: next });
  };

  return (
    <div className="sm:col-span-2">
      <label className="mb-1 block text-[13px] font-medium text-text-gray">
        {label}
        {locale !== "en" && items.length === 0 && (
          <span className="text-text-gray/60"> (falls back to English if left blank)</span>
        )}
      </label>
      {hint && <p className="mb-2 text-[12px] text-text-gray/70">{hint}</p>}
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                setItems(next);
              }}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-btn border border-red-200 px-3 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems([...items, ""])}
        className="mt-2 rounded-btn border border-border-gray px-4 py-2 text-[13px] font-medium text-text-gray transition-colors hover:bg-beige"
      >
        + Add item
      </button>
    </div>
  );
}

function LocalizedFaqEditor({
  value,
  locale,
  onChange,
}: {
  value: LocalizedFaqs;
  locale: Locale;
  onChange: (next: LocalizedFaqs) => void;
}) {
  const items = value[locale] ?? [];

  const setItems = (next: FaqItem[]) => {
    onChange({ ...value, [locale]: next });
  };

  return (
    <div className="sm:col-span-2">
      <label className="mb-1 block text-[13px] font-medium text-text-gray">
        Frequently Asked Questions
        {locale !== "en" && items.length === 0 && (
          <span className="text-text-gray/60"> (falls back to English if left blank)</span>
        )}
      </label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-input border border-border-gray p-3">
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], question: e.target.value };
                    setItems(next);
                  }}
                  placeholder="Question"
                  className={inputClass}
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], answer: e.target.value };
                    setItems(next);
                  }}
                  placeholder="Answer"
                  rows={2}
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                className="shrink-0 rounded-btn border border-red-200 px-3 py-2 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems([...items, { question: "", answer: "" }])}
        className="mt-2 rounded-btn border border-border-gray px-4 py-2 text-[13px] font-medium text-text-gray transition-colors hover:bg-beige"
      >
        + Add question
      </button>
    </div>
  );
}

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
      primaryKeyword: p.primaryKeyword || "",
      h1: p.h1 || {},
      botanicalName: p.botanicalName || "",
      origin: p.origin || "",
      grading: p.grading || {},
      packaging: p.packaging || {},
      applications: p.applications || {},
      whySourceFromUs: p.whySourceFromUs || {},
      faqs: p.faqs || {},
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
    fd.set("form", JSON.stringify(form.form));
    fd.set("hsHeading", form.hsHeading);
    fd.set("moq", JSON.stringify(form.moq));
    fd.set("metaTitle", JSON.stringify(form.metaTitle));
    fd.set("metaDescription", JSON.stringify(form.metaDescription));
    fd.set("metaKeywords", JSON.stringify(form.metaKeywords));
    fd.set("primaryKeyword", form.primaryKeyword);
    fd.set("h1", JSON.stringify(form.h1));
    fd.set("botanicalName", form.botanicalName);
    fd.set("origin", form.origin);
    fd.set("grading", JSON.stringify(form.grading));
    fd.set("packaging", JSON.stringify(form.packaging));
    fd.set("applications", JSON.stringify(form.applications));
    fd.set("whySourceFromUs", JSON.stringify(form.whySourceFromUs));
    fd.set("faqs", JSON.stringify(form.faqs));
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

          <LocalizedField
            label="Form"
            value={form.form}
            onChange={(v) => setForm((f) => ({ ...f, form: v }))}
            locale={locale}
            placeholder="e.g. Whole, cleaned"
          />

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              HS Heading <span className="text-text-gray/60">(code — same across all languages)</span>
            </label>
            <input
              type="text"
              value={form.hsHeading}
              onChange={(e) => setForm((f) => ({ ...f, hsHeading: e.target.value }))}
              placeholder="e.g. 1207.99"
              className="w-full rounded-input border border-border-gray px-3 py-2.5 text-[15px] outline-none focus:border-primary-green"
            />
          </div>

          <LocalizedField
            label="MOQ"
            value={form.moq}
            onChange={(v) => setForm((f) => ({ ...f, moq: v }))}
            locale={locale}
            placeholder="e.g. From 100 kg"
          />

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Botanical Name <span className="text-text-gray/60">(Latin — same across all languages)</span>
            </label>
            <input
              type="text"
              value={form.botanicalName}
              onChange={(e) => setForm((f) => ({ ...f, botanicalName: e.target.value }))}
              placeholder="e.g. Cucurbita pepo"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Origin <span className="text-text-gray/60">(place names — same across all languages)</span>
            </label>
            <input
              type="text"
              value={form.origin}
              onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
              placeholder="e.g. Madhya Pradesh, Chhattisgarh"
              className={inputClass}
            />
          </div>

          <LocalizedField
            label="Grading"
            value={form.grading}
            onChange={(v) => setForm((f) => ({ ...f, grading: v }))}
            locale={locale}
            placeholder="e.g. Purity, moisture, size"
          />

          <LocalizedField
            label="Packaging"
            value={form.packaging}
            onChange={(v) => setForm((f) => ({ ...f, packaging: v }))}
            locale={locale}
            placeholder="e.g. Food-grade bulk, export-packed"
          />

          <div className="sm:col-span-2">
            <hr className="border-border-gray" />
          </div>

          <div>
            <label className="mb-1 block text-[13px] font-medium text-text-gray">
              Primary Keyword <span className="text-text-gray/60">(internal SEO reference, not shown on page)</span>
            </label>
            <input
              type="text"
              value={form.primaryKeyword}
              onChange={(e) => setForm((f) => ({ ...f, primaryKeyword: e.target.value }))}
              placeholder="e.g. pumpkin seeds exporter India"
              className={inputClass}
            />
          </div>

          <LocalizedField
            label="H1"
            value={form.h1}
            onChange={(v) => setForm((f) => ({ ...f, h1: v }))}
            locale={locale}
            placeholder="e.g. Pumpkin Seeds Exporter India — Hulled & Unhulled Bulk Supply"
          />

          <LocalizedTextListEditor
            label="Applications"
            hint="One line per application, e.g. “Bakery — breads, granola, health bars, toppings”"
            value={form.applications}
            locale={locale}
            onChange={(next) => setForm((f) => ({ ...f, applications: next }))}
          />

          <LocalizedTextListEditor
            label="Why Source From Faar Earth"
            value={form.whySourceFromUs}
            locale={locale}
            onChange={(next) => setForm((f) => ({ ...f, whySourceFromUs: next }))}
          />

          <LocalizedFaqEditor
            value={form.faqs}
            locale={locale}
            onChange={(next) => setForm((f) => ({ ...f, faqs: next }))}
          />

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
