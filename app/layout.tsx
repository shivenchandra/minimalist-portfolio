import Script from "next/script";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateStructuredData } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* =========================
   GLOBAL SEO METADATA
========================= */
export const metadata: Metadata = {
  title:
    "Shiven Chandra — Software Developer (TypeScript, Go, Next.js, Node.js, PostgreSQL)",
  description:
    "Shiven Chandra is a Software Developer specializing in Go, Next.js, TypeScript, and PostgreSQL. Explore real-world projects, scalable systems, and modern web engineering practices.",
  keywords: [
    "Shiven Chandra",
    "Software Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "Go Developer",
    "Node.js",
    "PostgreSQL",
  ],
  authors: [
    {
      name: "Shiven Chandra",
      url: "https://minimalist-portfolio-shiven.vercel.app",
    },
  ],
  creator: "Shiven Chandra",
  publisher: "Shiven Chandra",
  metadataBase: new URL("https://minimalist-portfolio-shiven.vercel.app"),
  alternates: {
    canonical: "https://minimalist-portfolio-shiven.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://minimalist-portfolio-shiven.vercel.app",
    siteName: "Shiven Chandra Portfolio",
    title:
      "Shiven Chandra — Software Developer (TypeScript, Go, Next.js, Node.js)",
    description:
      "Portfolio of Shiven Chandra showcasing full-stack projects, scalable systems, and modern web development with Go, Next.js, and PostgreSQL.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shiven Chandra Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shiven Chandra — Software Developer (TypeScript, Go, Next.js, Node.js)",
    description:
      "Software Developer building production-ready web applications with Go, Next.js, TypeScript, and PostgreSQL.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/* =========================
   VIEWPORT CONFIG
========================= */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/* =========================
   ROOT LAYOUT
========================= */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = generateStructuredData("person", {
    name: "Shiven Chandra",
    url: "https://minimalist-portfolio-shiven.vercel.app",
    sameAs: [
      "https://github.com/shivenchandra",
      "https://x.com/shivenchandra",
    ],
  });

  const websiteSchema = generateStructuredData("website", {
    name: "Shiven Chandra Portfolio",
    url: "https://minimalist-portfolio-shiven.vercel.app",
    description:
      "Personal portfolio of Shiven Chandra, a Software Developer specializing in modern full-stack web development.",
    authorName: "Shiven Chandra",
  });

  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
