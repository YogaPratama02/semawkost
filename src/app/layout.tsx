import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SemawKos - Cari Kost Impianmu",
  description:
    "Platform pencarian kost modern, cepat, dan terpercaya. Temukan kost idaman dekat kampus dan tempat kerja Anda dengan mudah.",
  keywords: ["kost", "sewa kost", "kost murah", "cari kost", "kost mahasiswa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-brand-cream text-slate-800 dark:bg-slate-950 dark:text-gray-100 min-h-screen`}>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-brand-latte/60 bg-white dark:border-white/5 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-slate-500 dark:text-gray-500">
                  © {new Date().getFullYear()} SemawKos. Semua hak cipta dilindungi.
                </p>
                <div className="flex gap-6">
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-brand-peach dark:text-gray-500 dark:hover:text-brand-peach">
                    Tentang Kami
                  </a>
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-brand-peach dark:text-gray-500 dark:hover:text-brand-peach">
                    Kebijakan Privasi
                  </a>
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-brand-peach dark:text-gray-500 dark:hover:text-brand-peach">
                    Kontak
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
