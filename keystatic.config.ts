import { config, fields, collection, singleton } from "@keystatic/core";

const storage =
  process.env.NODE_ENV === "production"
    ? ({
        kind: "github" as const,
        repo:
          (process.env.KEYSTATIC_GITHUB_REPO as `${string}/${string}`) ??
          "DJMattBell/whidbey-island-dj-website-2026",
      } satisfies { kind: "github"; repo: `${string}/${string}` })
    : { kind: "local" as const };

export default config({
  storage,
  singletons: {
    site: singleton({
      label: "Site Settings",
      path: "src/content/settings/site",
      format: { data: "yaml" },
      schema: {
        businessName: fields.text({ label: "Business name" }),
        tagline: fields.text({ label: "Tagline" }),
        email: fields.text({ label: "Contact email" }),
        phone: fields.text({ label: "Phone" }),
        serviceArea: fields.text({ label: "Service area" }),
        responsePromiseHours: fields.integer({
          label: "Response promise (hours)",
          defaultValue: 24,
        }),
        yearsActive: fields.integer({
          label: "Years active (leave empty until compiled)",
        }),
        eventsPlayed: fields.integer({
          label: "Events played (leave empty until compiled)",
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: "Platform" }),
            url: fields.url({ label: "URL" }),
          }),
          { label: "Social links", itemLabel: (props) => props.fields.platform.value },
        ),
        reviewBadges: fields.array(
          fields.object({
            platform: fields.text({ label: "Platform" }),
            rating: fields.number({ label: "Rating" }),
            count: fields.integer({ label: "Review count" }),
            url: fields.url({ label: "Profile URL" }),
          }),
          {
            label: "Review badges",
            itemLabel: (props) => props.fields.platform.value,
          },
        ),
      },
    }),
  },
  collections: {
    djs: collection({
      label: "DJs",
      path: "src/content/djs/*",
      slugField: "name",
      format: { contentField: "body" },
      schema: {
        name: fields.text({ label: "Name" }),
        role: fields.text({ label: "Role" }),
        photo: fields.text({ label: "Photo path" }),
        specialties: fields.array(fields.text({ label: "Specialty" }), {
          label: "Specialties",
        }),
        philosophy: fields.text({ label: "Philosophy", multiline: true }),
        musicFavorites: fields.object(
          {
            goToAnthem: fields.text({ label: "Go-to anthem" }),
            guiltyPleasure: fields.text({ label: "Guilty pleasure" }),
            forTheParents: fields.text({ label: "For the parents" }),
            lastSong: fields.text({ label: "Last song" }),
          },
          { label: "Music favorites" },
        ),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
        body: fields.markdoc({ label: "Bio" }),
      },
    }),
    services: collection({
      label: "Services",
      path: "src/content/services/*",
      slugField: "title",
      format: { contentField: "body" },
      schema: {
        title: fields.text({ label: "Title" }),
        heroHeading: fields.text({ label: "Hero heading" }),
        heroSubheading: fields.text({ label: "Hero subheading" }),
        heroImage: fields.text({ label: "Hero image path" }),
        highlightVideoUrl: fields.url({ label: "Highlight video URL" }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    pricingTiers: collection({
      label: "Pricing Tiers",
      path: "src/content/pricing-tiers/*",
      slugField: "name",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name" }),
        priceCents: fields.integer({ label: "Price (cents)" }),
        priceLabel: fields.text({ label: "Price label override" }),
        description: fields.text({ label: "Description", multiline: true }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
        }),
        badge: fields.text({ label: "Badge text" }),
        highlight: fields.checkbox({ label: "Highlighted tier" }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
      },
    }),
    addons: collection({
      label: "Add-ons",
      path: "src/content/addons/*",
      slugField: "name",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name" }),
        priceCents: fields.integer({ label: "Price (cents)" }),
        description: fields.text({ label: "Description", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "DJ", value: "dj" },
            { label: "Ceremony", value: "ceremony" },
            { label: "Lighting", value: "lighting" },
            { label: "Photobooth", value: "photobooth" },
          ],
          defaultValue: "dj",
        }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
      },
    }),
    faq: collection({
      label: "FAQ",
      path: "src/content/faq/*",
      slugField: "question",
      format: { contentField: "body" },
      schema: {
        question: fields.text({ label: "Question" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Booking", value: "booking" },
            { label: "Music", value: "music" },
            { label: "Logistics", value: "logistics" },
            { label: "Pricing", value: "pricing" },
            { label: "Photobooth", value: "photobooth" },
          ],
          defaultValue: "booking",
        }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: true,
        }),
        body: fields.markdoc({ label: "Answer" }),
      },
    }),
    reviews: collection({
      label: "Reviews",
      path: "src/content/reviews/*",
      slugField: "attribution",
      format: { contentField: "body" },
      schema: {
        attribution: fields.text({ label: "Attribution" }),
        source: fields.select({
          label: "Source",
          options: [
            { label: "The Knot", value: "theknot" },
            { label: "WeddingWire", value: "weddingwire" },
            { label: "Google", value: "google" },
            { label: "Facebook", value: "facebook" },
            { label: "Zola", value: "zola" },
            { label: "Direct", value: "direct" },
          ],
          defaultValue: "direct",
        }),
        sourceUrl: fields.url({ label: "Source URL" }),
        rating: fields.integer({ label: "Rating (1–5)" }),
        date: fields.date({ label: "Date" }),
        eventType: fields.select({
          label: "Event type",
          options: [
            { label: "Wedding", value: "wedding" },
            { label: "School", value: "school" },
            { label: "Auction", value: "auction" },
            { label: "Community", value: "community" },
            { label: "Private", value: "private" },
          ],
          defaultValue: "wedding",
        }),
        dj: fields.text({ label: "DJ slug (e.g. matt)" }),
        featured: fields.checkbox({ label: "Featured on homepage" }),
        body: fields.markdoc({ label: "Review text" }),
      },
    }),
    gallery: collection({
      label: "Gallery",
      path: "src/content/gallery/*",
      slugField: "caption",
      format: { data: "yaml" },
      schema: {
        kind: fields.select({
          label: "Kind",
          options: [
            { label: "Photo", value: "photo" },
            { label: "Video", value: "video" },
            { label: "Reel", value: "reel" },
          ],
          defaultValue: "photo",
        }),
        image: fields.text({ label: "Image path" }),
        videoUrl: fields.url({ label: "Video URL" }),
        caption: fields.text({ label: "Caption" }),
        alt: fields.text({ label: "Alt text" }),
        tags: fields.multiselect({
          label: "Tags",
          options: [
            { label: "Wedding", value: "wedding" },
            { label: "Event", value: "event" },
            { label: "Lighting", value: "lighting" },
            { label: "Photobooth", value: "photobooth" },
            { label: "Ceremony", value: "ceremony" },
            { label: "Team", value: "team" },
          ],
        }),
        pinned: fields.checkbox({ label: "Pinned" }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
      },
    }),
    equipment: collection({
      label: "Equipment",
      path: "src/content/equipment/*",
      slugField: "name",
      format: { contentField: "body" },
      schema: {
        name: fields.text({ label: "Name" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Sound", value: "sound" },
            { label: "Lighting", value: "lighting" },
            { label: "Wireless", value: "wireless" },
            { label: "Power", value: "power" },
            { label: "Photobooth", value: "photobooth" },
          ],
          defaultValue: "sound",
        }),
        photo: fields.text({ label: "Photo path" }),
        whatItDoes: fields.text({
          label: "What it does",
          multiline: true,
        }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
        body: fields.markdoc({ label: "Why it matters" }),
      },
    }),
    blog: collection({
      label: "Blog",
      path: "src/content/blog/*",
      slugField: "title",
      format: { contentField: "body" },
      schema: {
        title: fields.text({ label: "Title" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Gig Log", value: "giglog" },
            { label: "Essay", value: "essay" },
          ],
          defaultValue: "giglog",
        }),
        publishedAt: fields.date({ label: "Published date" }),
        draft: fields.checkbox({ label: "Draft", defaultValue: true }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        coverImage: fields.text({ label: "Cover image path" }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    recommendations: collection({
      label: "Recommendations",
      path: "src/content/recommendations/*",
      slugField: "name",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name" }),
        kind: fields.select({
          label: "Kind",
          options: [
            { label: "Vendor", value: "vendor" },
            { label: "Resource", value: "resource" },
          ],
          defaultValue: "vendor",
        }),
        category: fields.text({ label: "Category" }),
        url: fields.url({ label: "URL" }),
        blurb: fields.text({ label: "Blurb" }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
      },
    }),
  },
});
