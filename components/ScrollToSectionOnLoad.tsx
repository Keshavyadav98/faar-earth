"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PATH_TO_ID: Record<string, string> = {
  "/categories": "categories",
  "/products": "products",
  "/certifications": "certifications",
  "/how-to-order": "how-to-order",
  "/about": "about",
  "/enquiry": "enquiry",
};

export default function ScrollToSectionOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    const id = PATH_TO_ID[pathname];
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
  }, [pathname]);

  return null;
}
