import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getAllSchemas } from "@/lib/schema";

export const viewport: Viewport = {
  themeColor: "#F5F0E7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Ceylon Cinnamon Roots | A Hands-on Cinnamon Experience in Sri Lanka",
  description:
    "Discover authentic Ceylon cinnamon through a 120-minute plantation experience in Sri Lanka. Explore, learn the traditional craft, make cinnamon quills and enjoy local refreshments.",
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
    title: "Ceylon Cinnamon Roots | Come closer to the craft",
    description:
      "A hands-on journey from plantation to quill. Discover the people, traditions and craft behind authentic Ceylon cinnamon.",
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
    title: "Ceylon Cinnamon Roots",
    description:
      "An authentic Ceylon cinnamon experience, rooted in Sri Lankan heritage.",
    images: [
      "https://images.unsplash.com/photo-1703566324597-9aa71bbab450?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
  icons: {
    icon: "/favicon.svg",
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
      <body>{children}</body>
    </html>
  );
}
