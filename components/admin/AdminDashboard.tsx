"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminBlogDashboard from "./AdminBlogDashboard";
import AdminProductDashboard from "./AdminProductDashboard";
import AdminCategoryDashboard from "./AdminCategoryDashboard";

const TABS = ["Blog Posts", "Products", "Categories"] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Blog Posts");

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-[24px] font-semibold text-[#404C3E]">Admin</h1>
        <button
          onClick={handleLogout}
          className="rounded-btn border border-border-gray px-4 py-2 text-[14px] font-medium text-text-gray transition-colors hover:bg-beige"
        >
          Log out
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-border-gray">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-[14px] font-medium transition-colors ${
              tab === t
                ? "border-b-2 border-primary-green text-primary-green"
                : "text-text-gray hover:text-[#404C3E]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Blog Posts" && <AdminBlogDashboard />}
      {tab === "Products" && <AdminProductDashboard />}
      {tab === "Categories" && <AdminCategoryDashboard />}
    </div>
  );
}
