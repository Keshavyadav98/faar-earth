"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

const FILTERS = ["All"] as const;

export default function ProductsModal({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: Product[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter, products]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="All products"
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="relative z-10 flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-card bg-white shadow-card-hover sm:max-h-[85vh] sm:rounded-card">
        <div className="flex items-center justify-between border-b border-border-gray px-6 py-5">
          <div>
            <h3 className="font-heading text-[22px] font-semibold text-[#404C3E]">
              All Products
            </h3>
            <p className="text-[13px] text-text-gray">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-btn border border-border-gray transition-colors hover:bg-beige"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1l14 14M15 1L1 15" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible overflow-y-auto border-b border-border-gray px-6 py-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-pill px-4 pb-2 pt-2 text-center text-[14px] font-medium transition-colors ${
                filter === f
                  ? "bg-primary-green text-white"
                  : "bg-beige text-[#404C3E] hover:bg-divider/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-card border border-border-gray shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-[12px] font-medium uppercase tracking-wide text-primary-green">
                    {p.category}
                  </span>
                  <h4 className="mt-1 font-heading text-[17px] font-semibold text-[#404C3E]">
                    {p.name}
                  </h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-text-gray">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
