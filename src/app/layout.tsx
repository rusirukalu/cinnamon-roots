import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { getAllSchemas } from "@/lib/schema";

export const viewport: Viewport = {
  themeColor: "#F5F0E7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Hands-on Cinnamon Tour in Sri Lanka | Ceylon Cinnamon Roots",
  description:
    "Experience authentic Ceylon cinnamon in Sri Lanka. Walk the plantation, learn traditional peeling, taste local treats, and book your hands-on visit today.",
  keywords: [
    "Ceylon cinnamon",
    "Sri Lanka cinnamon plantation",
    "Cinnamon peeling experience",
    "Sri Lanka cultural tour",
    "Authentic Ceylon cinnamon",
    "Plantation to quill",
    "Sri Lanka agritourism",
    "Traditional craftsmanship Sri Lanka",
  ],
  metadataBase: new URL("https://cinnamonroots.com/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Hands-on Cinnamon Tour in Sri Lanka | Ceylon Cinnamon Roots",
    description:
      "Experience authentic Ceylon cinnamon in Sri Lanka. Walk the plantation, learn traditional peeling, taste local treats, and book your hands-on visit today.",
    url: "https://cinnamonroots.com/",
    locale: "en_GB",
    siteName: "Ceylon Cinnamon Roots",
    images: [
      {
        url: "https://images.unsplash.com/photo-1703566324597-9aa71bbab450?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Sri Lankan rainforest landscape, supporting editorial imagery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hands-on Cinnamon Tour in Sri Lanka | Ceylon Cinnamon Roots",
    description:
      "Experience authentic Ceylon cinnamon in Sri Lanka. Walk the plantation, learn traditional peeling, taste local treats, and book your hands-on visit today.",
    images: [
      "https://images.unsplash.com/photo-1703566324597-9aa71bbab450?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "google-site-verification-token",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredDataGraph = getAllSchemas();

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="font"
          href="/fonts/instrument-serif-latin-400-normal.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/manrope-latin-wght-normal.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {structuredDataGraph.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
