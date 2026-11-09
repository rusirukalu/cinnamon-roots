import { describe, it, expect } from "vitest";
import {
  buildOrganizationSchema,
  buildTouristAttractionSchema,
  buildFaqSchema,
  buildWebSiteSchema,
  getAllSchemas,
} from "@/lib/schema";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Structured Data / Schema.org (SEO & AEO)", () => {
  it("builds a valid Organization schema with host location", () => {
    const schema = buildOrganizationSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Ceylon Cinnamon Roots");
    expect(schema.url).toBe("https://cinnamonroots.com/");
    expect(schema.telephone).toBe("+94 75 145 8653");
    expect(schema.address.streetAddress).toContain("Palassa, Thiththagalla");
  });

  it("builds a valid TouristAttraction & LocalBusiness schema with verified packages", () => {
    const schema = buildTouristAttractionSchema();
    expect(schema["@type"]).toContain("TouristAttraction");
    expect(schema["@type"]).toContain("LocalBusiness");
    expect(schema.address.addressCountry).toBe("LK");
    expect(schema.hasMap).toContain("goo.gl/maps");
    expect(Array.isArray(schema.offers)).toBe(true);
    expect(schema.offers.length).toBeGreaterThan(0);
    expect(schema.offers[0].priceCurrency).toBe("LKR");
    expect(schema.amenityFeature.length).toBeGreaterThan(0);
  });

  it("builds a valid FAQPage schema with all 8 Q&As for AEO direct answers", () => {
    const schema = buildFaqSchema();
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(8);

    const firstFaq = schema.mainEntity[0];
    expect(firstFaq["@type"]).toBe("Question");
    expect(firstFaq.name).toBe("Where is Ceylon Cinnamon Roots located?");
    expect(firstFaq.acceptedAnswer["@type"]).toBe("Answer");
    expect(firstFaq.acceptedAnswer.text).toContain("Palassa, Thiththagalla");
  });

  it("builds a valid WebSite schema with search action", () => {
    const schema = buildWebSiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.name).toBe("Ceylon Cinnamon Roots");
    expect(schema.url).toBe("https://cinnamonroots.com/");
    expect(schema.potentialAction).toBeDefined();
  });

  it("aggregates all schemas into a complete graph with 4 root schemas", () => {
    const schemas = getAllSchemas();
    expect(schemas).toHaveLength(4);
  });
});

describe("Dynamic Metadata Routes (robots.ts & sitemap.ts)", () => {
  it("robots() explicitly permits AI search bots, answer engines, and disallows internal paths", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://cinnamonroots.com/sitemap.xml");

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const aiRule = rules.find((r) => Array.isArray(r.userAgent) && r.userAgent.includes("GPTBot"));
    expect(aiRule).toBeDefined();
    expect(aiRule?.allow).toBe("/");
    expect(aiRule?.disallow).toEqual(["/api/", "/_next/"]);

    const generalRule = rules.find((r) => r.userAgent === "*");
    expect(generalRule).toBeDefined();
    expect(generalRule?.allow).toBe("/");
    expect(generalRule?.disallow).toEqual(["/api/", "/_next/"]);
  });

  it("sitemap() returns accurate URL entry with proper frequency and priority", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe("https://cinnamonroots.com/");
    expect(entries[0].priority).toBe(1.0);
    expect(entries[0].changeFrequency).toBe("weekly");
  });
});
