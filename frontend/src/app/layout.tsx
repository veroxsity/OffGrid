import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
