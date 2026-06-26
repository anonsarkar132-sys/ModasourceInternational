import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Moda Source",
    default: "Moda Source | Global Apparel Sourcing & Design",
  },
  description:
    "One stop destination for apparel needs. A premier sourcing solutions provider celebrated for innovation in fabrics, sustainability, and design.",
  keywords: [
    "Apparel Sourcing",
    "Fashion Manufacturing",
    "3D Fashion Design",
    "Garment Production",
    "Sustainable Fabrics",
    "Global Sourcing",
  ],
  authors: [{ name: "Moda Source" }],
  creator: "Moda Source",
  publisher: "Moda Source International",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest",
      },
    ],
  },

  openGraph: {
    title: "Moda Source | Global Apparel Sourcing & Design",
    description:
      "Your one-stop destination for apparel needs. Bolder, brighter, together.",
    url: "https://modasource.com",
    siteName: "Moda Source",
    images: [
      {
        url: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Moda Source Global Sourcing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 selection:bg-[#C89B3C] selection:text-white">
        {children}
      </body>
    </html>
  );
}