import type { MetadataRoute } from "next";

/**
 * Generates dynamic robots.txt adhering to Module 2 of the Universal SEO standard:
 * - Public crawlers allowed to root
 * - Internal /api/ and /_next/ paths protected
 * - Dedicated permissions for modern AI answer engines (AEO)
 * - Canonical sitemap reference
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "GoogleOther",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://cinnamonroots.com/sitemap.xml",
  };
}
