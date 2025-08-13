import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Off-Grid Freedom | Privacy-First Self-Hosting Guides",
  description: "No bullshit tutorials for self-hosting, VPN setup, and digital privacy. UK-focused guides that actually work.",
  keywords: "self-hosting, privacy, VPN, homelab, nextcloud, plex, wireguard, UK",
  authors: [{ name: "Off-Grid Freedom" }],
  robots: "index, follow",
  openGraph: {
    title: "Off-Grid Freedom | Privacy-First Self-Hosting Guides",
    description: "No bullshit tutorials for self-hosting, VPN setup, and digital privacy.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 theme-transition`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 px-4 py-2 rounded-md bg-red-600 text-white shadow-lg">Skip to content</a>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-grow og-container w-full py-6 sm:py-10">
              {children}
            </main>
            <Footer />
            <div id="og-toaster" aria-live="polite" aria-atomic="true" />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
