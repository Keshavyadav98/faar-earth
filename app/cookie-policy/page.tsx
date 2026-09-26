import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookiePolicyContent from "@/components/CookiePolicyContent";

export const metadata: Metadata = {
  title: "Cookie Policy | Faar Earth Collective",
  description:
    "How Faar Earth Collective uses cookies and similar technologies on www.faarearth.com, and how to control them.",
};

export default function CookiePolicyPage() {
  return (
    <main>
      <Header />
      <CookiePolicyContent />
      <Footer />
    </main>
  );
}
