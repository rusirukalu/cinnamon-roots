import { FAQS, PACKAGES, SITE_METADATA } from "./data";

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
    telephone: SITE_METADATA.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 53, Palassa, Thiththagalla",
      addressLocality: "Ahangama",
      addressRegion: "Galle, Southern Province",
      addressCountry: "LK",
    },
    description:
      "An authentic Ceylon cinnamon plantation and cultural experience hosted by Deshan Chathuranga in Ahangama, Galle, Sri Lanka.",
    sameAs: [
      "https://cinnamonroots.com/",
      SITE_METADATA.googleMapsUrl,
    ],
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
      "A locally hosted Ceylon cinnamon plantation experience in Palassa, Thiththagalla, Ahangama, Galle. Approximately 1 to 1.5 hours with harvesting, rough skin scraping, bark rubbing, delicate peeling, warm cinnamon tea, snacks, and souvenirs.",
    url: "https://cinnamonroots.com/",
    telephone: SITE_METADATA.whatsappNumber,
    hasMap: SITE_METADATA.googleMapsUrl,
    image:
      "https://images.unsplash.com/photo-1703566324597-9aa71bbab450?auto=format&fit=crop&w=1200&h=630&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 53, Palassa, Thiththagalla",
      addressLocality: "Ahangama",
      addressRegion: "Galle, Southern Province",
      addressCountry: "LK",
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
      "Culinary Tourism",
    ],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Plantation Walk",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Harvesting & Bark Peeling Demonstrations",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Hands-on Guest Participation",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Warm Cinnamon Tea & Snack",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Complimentary Cinnamon Gift & Brochure",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Tour Operator Partner Rates",
        value: true,
      },
    ],
    offers: PACKAGES.filter((p) => p.priceLkr !== null).map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.description,
      price: pkg.priceLkr,
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
      url: "https://cinnamonroots.com/#booking",
    })),
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
 * Builds Schema.org WebSite structured data (Module 18)
 * with internal search action / navigation intent.
 */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ceylon Cinnamon Roots",
    url: "https://cinnamonroots.com/",
    description:
      "Authentic Ceylon cinnamon plantation & hands-on cultural experience in Sri Lanka.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cinnamonroots.com/#experience",
      "query-input": "required name=search_term_string",
    },
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
    buildWebSiteSchema(),
  ];
}
