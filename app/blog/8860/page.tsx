import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminBlogDashboard from "@/components/admin/AdminBlogDashboard";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default async function BlogAdminPage() {
  const authed = await isAdminAuthenticated();

  return <main className="min-h-screen bg-offwhite">{authed ? <AdminBlogDashboard /> : <AdminLogin />}</main>;
}
