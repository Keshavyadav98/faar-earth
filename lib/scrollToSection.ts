import type { MouseEvent } from "react";

const SECTION_PATHS: Record<string, string> = {
  top: "/",
  categories: "/categories",
  products: "/products",
  about: "/about",
  enquiry: "/enquiry",
};

export function scrollToSection(e: MouseEvent, href: string) {
  if (!href.startsWith("#")) return;
  e.preventDefault();

  const id = href.slice(1);
  const path = SECTION_PATHS[id] ?? `/${id}`;
  const el = document.getElementById(id);

  if (!el) {
    // Section isn't on this page (e.g. clicking "Categories" from /blog) —
    // do a full navigation to the page that has it.
    window.location.href = path;
    return;
  }

  el.scrollIntoView({ behavior: "smooth" });
  if (window.location.pathname !== path) {
    window.history.pushState(null, "", path);
  }
}
