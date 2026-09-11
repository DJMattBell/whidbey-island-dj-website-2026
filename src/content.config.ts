import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

const site = defineCollection({
  loader: glob({ pattern: "site.yaml", base: "src/content/settings" }),
  schema: z.object({
    businessName: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.string(),
    serviceArea: z.string(),
    responsePromiseHours: z.number().int().default(24),
    yearsActive: z.number().int().optional(),
    eventsPlayed: z.number().int().optional(),
    socialLinks: z
      .array(z.object({ platform: z.string(), url: z.string().url() }))
      .default([]),
    reviewBadges: z
      .array(
        z.object({
          platform: z.string(),
          rating: z.number(),
          count: z.number().int(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

const djs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/djs" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    specialties: z.array(z.string()),
    philosophy: z.string(),
    musicFavorites: z
      .object({
        goToAnthem: z.string(),
        guiltyPleasure: z.string(),
        forTheParents: z.string(),
        lastSong: z.string(),
      })
      .optional(),
    sortOrder: z.number().int().default(0),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/services" }),
  schema: z.object({
    title: z.string(),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    heroImage: z.string().optional(),
    highlightVideoUrl: z.string().url().optional(),
  }),
});

const pricingTiers = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/pricing-tiers" }),
  schema: z.object({
    name: z.string(),
    priceCents: z.number().int(),
    priceLabel: z.string().optional(),
    description: z.string(),
    features: z.array(z.string()),
    badge: z.string().optional(),
    highlight: z.boolean().default(false),
    sortOrder: z.number().int().default(0),
  }),
});

const addons = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/addons" }),
  schema: z.object({
    name: z.string(),
    priceCents: z.number().int(),
    description: z.string(),
    category: z.enum(["dj", "ceremony", "lighting", "photobooth"]),
    sortOrder: z.number().int().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/faq" }),
  schema: z.object({
    question: z.string(),
    category: z.enum([
      "booking",
      "music",
      "logistics",
      "pricing",
      "photobooth",
    ]),
    sortOrder: z.number().int().default(0),
    published: z.boolean().default(true),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/reviews" }),
  schema: z.object({
    attribution: z.string(),
    source: z.enum([
      "theknot",
      "weddingwire",
      "google",
      "facebook",
      "zola",
      "direct",
    ]),
    sourceUrl: z.string().url().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    date: z.string().optional(),
    eventType: z.enum(["wedding", "school", "auction", "community", "private"]),
    dj: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/gallery" }),
  schema: z.object({
    kind: z.enum(["photo", "video", "reel"]),
    image: z.string().optional(),
    videoUrl: z.string().url().optional(),
    caption: z.string().optional(),
    alt: z.string().optional(),
    tags: z
      .array(
        z.enum([
          "wedding",
          "event",
          "lighting",
          "photobooth",
          "ceremony",
          "team",
        ]),
      )
      .default([]),
    pinned: z.boolean().default(false),
    sortOrder: z.number().int().default(0),
  }),
});

const equipment = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/equipment" }),
  schema: z.object({
    name: z.string(),
    category: z.enum(["sound", "lighting", "wireless", "power", "photobooth"]),
    photo: z.string().optional(),
    whatItDoes: z.string(),
    sortOrder: z.number().int().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["giglog", "essay"]),
    publishedAt: z.string(),
    draft: z.boolean().default(true),
    excerpt: z.string(),
    coverImage: z.string().optional(),
  }),
});

const recommendations = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/content/recommendations" }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(["vendor", "resource"]),
    category: z.string(),
    url: z.string().url(),
    blurb: z.string(),
    sortOrder: z.number().int().default(0),
  }),
});

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const collections = {
  site,
  djs,
  services,
  pricingTiers,
  addons,
  faq,
  reviews,
  gallery,
  equipment,
  blog,
  recommendations,
};
