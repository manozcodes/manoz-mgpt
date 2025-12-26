import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0C0D",
}

export const metadata: Metadata = {
  title: {
    default: "MusicGPT - Create Music with AI",
    template: "%s | MusicGPT",
  },
  description: "Create music with AI using MusicGPT. Generate original tracks, remixes, and covers with our latest AI audio model. Start creating your music today.",
  keywords: ["AI music", "music generation", "AI audio", "music creation", "MusicGPT", "AI composer", "music AI"],
  authors: [{ name: "MusicGPT" }],
  creator: "MusicGPT",
  publisher: "MusicGPT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "MusicGPT - Create Music with AI",
    description: "Create music with AI using MusicGPT. Generate original tracks, remixes, and covers with our latest AI audio model.",
    siteName: "MusicGPT",
    images: [
      {
        url: "/christmas.svg",
        width: 1200,
        height: 630,
        alt: "MusicGPT - Create Music with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MusicGPT - Create Music with AI",
    description: "Create music with AI using MusicGPT. Generate original tracks, remixes, and covers.",
    images: ["/christmas.svg"],
    creator: "@musicgpt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/christmas.svg", type: "image/svg+xml" },
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "MusicGPT",
              description: "Create music with AI using MusicGPT. Generate original tracks, remixes, and covers.",
              url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
              applicationCategory: "MusicApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "MusicGPT",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0A0C0D] text-[#E4E6E8]`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#ff7b16] focus:text-white focus:rounded-md focus:font-medium focus:outline-none focus:ring-2 focus:ring-[#ff7b16] focus:ring-offset-2 focus:ring-offset-[#0A0C0D]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
