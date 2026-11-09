import type { MetadataRoute } from "next";

/**
 * Generates the dynamic XML sitemap for search crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cinnamonroots.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
