import type { MetadataRoute } from "next";

/**
 * Generates dynamic robots.txt with dedicated permissions for search crawlers
 * and AI search / Answer Engine Optimization (AEO) bots.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Explicitly permit modern AI answer engines and search agents
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
      },
    ],
    sitemap: "https://cinnamonroots.com/sitemap.xml",
  };
}
