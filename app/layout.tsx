import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const heading = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faar Earth Collective | Pure Ingredients, Trusted by Nature",
  description:
    "Premium quality edible seeds, cold pressed oils and essential oils for B2B, pan-India and global bulk supply. Natural, sustainable, quality assured.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body text-text-dark antialiased">
        <div className="relative min-h-screen">
          {children}
          <a
            href="https://wa.me/918860611200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.966-.273-.099-.486-.149-.691.149-.204.297-.788.966-.967 1.164-.18.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.199-.297.299-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.208-.241-.579-.486-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.521.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.099 3.2 5.076 4.487.709.306 1.263.489 1.695.625.712.227 1.361.195 1.873.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.174-1.413-.074-.123-.272-.198-.57-.347z" />
              <path d="M12.001 2C6.477 2 2 6.477 2 12c0 2.045.64 3.95 1.742 5.53L2 22l4.6-1.21A9.96 9.96 0 0 0 12.001 22c5.524 0 10-4.476 10-10S17.525 2 12.001 2zm0 18.2a8.18 8.18 0 0 1-4.16-1.14l-.298-.177-2.73.72.73-2.66-.194-.29A8.18 8.18 0 0 1 3.8 12c0-4.53 3.67-8.2 8.2-8.2 4.53 0 8.2 3.67 8.2 8.2 0 4.53-3.67 8.2-8.2 8.2z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
