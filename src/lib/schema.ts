import { FAQS } from "./data";

/**
 * Builds Schema.org Organization structured data.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ceylon Cinnamon Roots",
    url: "https://cinnamonroots.com/",
    logo: "https://cinnamonroots.com/favicon.svg",
    description:
      "An authentic Ceylon cinnamon plantation and cultural experience in Sri Lanka.",
    sameAs: ["https://cinnamonroots.com/"],
  };
}

/**
 * Builds Schema.org TouristAttraction & LocalBusiness structured data
 * optimized for travel entity graphs and search engine local panels.
 */
export function buildTouristAttractionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "LocalBusiness"],
    name: "Ceylon Cinnamon Roots",
    description:
      "A hands-on Ceylon cinnamon plantation and cultural experience in Sri Lanka. Approximately 120 minutes for 1–10 guests, including plantation exploration, traditional bark harvesting, scraping, peeling, quill-making, and local refreshments.",
    url: "https://cinnamonroots.com/",
    image:
      "https://images.unsplash.com/photo-1703566324597-9aa71bbab450?auto=format&fit=crop&w=1200&h=630&q=80",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "LK",
    },
    touristType: [
      "Cultural Tourism",
      "Agritourism",
      "Eco Tourism",
      "Heritage Tourism",
    ],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Plantation Exploration",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Hands-on Cinnamon Peeling & Quill Making",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Cinnamon Tastings & Refreshments",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Small Group Intimacy (1 to 10 guests)",
        value: true,
      },
    ],
    offers: {
      "@type": "Offer",
      name: "Plantation to Quill Experience",
      description:
        "120-minute guided cinnamon plantation and craft workshop for 1–10 guests.",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://cinnamonroots.com/#booking",
    },
  };
}

/**
 * Builds Schema.org FAQPage structured data to fuel Google Rich Snippets
 * and direct Answer Engine Optimization (AEO) citations.
 */
export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Aggregates all JSON-LD schemas into a structured graph array.
 */
export function getAllSchemas() {
  return [
    buildOrganizationSchema(),
    buildTouristAttractionSchema(),
    buildFaqSchema(),
  ];
}
