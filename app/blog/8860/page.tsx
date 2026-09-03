import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  return <main className="min-h-screen bg-offwhite">{authed ? <AdminDashboard /> : <AdminLogin />}</main>;
}
