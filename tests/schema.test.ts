import { describe, it, expect } from "vitest";
import {
  buildOrganizationSchema,
  buildTouristAttractionSchema,
  buildFaqSchema,
  getAllSchemas,
} from "@/lib/schema";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Structured Data / Schema.org (SEO & AEO)", () => {
  it("builds a valid Organization schema", () => {
    const schema = buildOrganizationSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Ceylon Cinnamon Roots");
    expect(schema.url).toBe("https://cinnamonroots.com/");
    expect(schema.logo).toContain("/favicon.svg");
  });

  it("builds a valid TouristAttraction & LocalBusiness schema", () => {
    const schema = buildTouristAttractionSchema();
    expect(schema["@type"]).toContain("TouristAttraction");
    expect(schema["@type"]).toContain("LocalBusiness");
    expect(schema.address.addressCountry).toBe("LK");
    expect(schema.offers.name).toBe("Plantation to Quill Experience");
    expect(schema.amenityFeature.length).toBeGreaterThan(0);
  });

  it("builds a valid FAQPage schema with all 8 Q&As for AEO direct answers", () => {
    const schema = buildFaqSchema();
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(8);

    const firstFaq = schema.mainEntity[0];
    expect(firstFaq["@type"]).toBe("Question");
    expect(firstFaq.name).toBe("What is included in the experience?");
    expect(firstFaq.acceptedAnswer["@type"]).toBe("Answer");
    expect(firstFaq.acceptedAnswer.text).toContain("welcome");
  });

  it("aggregates all schemas into a complete graph", () => {
    const schemas = getAllSchemas();
    expect(schemas).toHaveLength(3);
  });
});

describe("Dynamic Metadata Routes (robots.ts & sitemap.ts)", () => {
  it("robots() explicitly permits AI search bots and answer engines", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://cinnamonroots.com/sitemap.xml");

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const aiRule = rules.find((r) => Array.isArray(r.userAgent) && r.userAgent.includes("GPTBot"));
    expect(aiRule).toBeDefined();
    expect(aiRule?.allow).toBe("/");
  });

  it("sitemap() returns accurate URL entry with proper frequency and priority", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe("https://cinnamonroots.com/");
    expect(entries[0].priority).toBe(1.0);
    expect(entries[0].changeFrequency).toBe("weekly");
  });
});
