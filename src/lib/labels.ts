// ---------------------------------------------------------------------------
// Enum types — must match the z.enum() values in src/content.config.ts
// ---------------------------------------------------------------------------

type ReviewSource =
  "theknot" | "weddingwire" | "google" | "facebook" | "zola" | "direct";
type EventType = "wedding" | "school" | "auction" | "community" | "private" | "photobooth";
type EquipmentCategory =
  "sound" | "lighting" | "wireless" | "power" | "photobooth";
type GalleryTag =
  "wedding" | "event" | "lighting" | "photobooth" | "ceremony" | "team";
type BlogCategory = "giglog" | "essay";
type FaqCategory = "booking" | "music" | "logistics" | "pricing" | "photobooth";

// ---------------------------------------------------------------------------
// Human-readable labels
// ---------------------------------------------------------------------------

export const sourceLabels: Record<ReviewSource, string> = {
  theknot: "The Knot",
  weddingwire: "WeddingWire",
  google: "Google",
  facebook: "Facebook",
  zola: "Zola",
  direct: "Direct",
};

export const eventLabels: Record<EventType, string> = {
  wedding: "Wedding",
  school: "School Dance",
  auction: "Auction / Fundraiser",
  community: "Community Event",
  private: "Private Party",
  photobooth: "Photobooth Only",
};

export const equipmentCategoryLabels: Record<EquipmentCategory, string> = {
  sound: "Sound",
  lighting: "Lighting",
  wireless: "Wireless / Ceremony",
  power: "Power",
  photobooth: "Photobooth",
};

export const galleryTagLabels: Record<GalleryTag, string> = {
  wedding: "Weddings",
  event: "Events",
  lighting: "Lighting",
  photobooth: "Photobooth",
  ceremony: "Ceremony",
  team: "Team",
};

export const blogCategoryLabels: Record<BlogCategory, string> = {
  giglog: "Gig Log",
  essay: "Essay",
};

export const faqCategoryLabels: Record<FaqCategory, string> = {
  booking: "Booking",
  music: "Music",
  logistics: "Logistics",
  pricing: "Pricing",
  photobooth: "Photobooth",
};

// ---------------------------------------------------------------------------
// Display order — controls how grouped pages render categories
// ---------------------------------------------------------------------------

export const equipmentCategoryOrder: EquipmentCategory[] = [
  "sound",
  "lighting",
  "wireless",
  "power",
  "photobooth",
];

export const faqCategoryOrder: FaqCategory[] = [
  "booking",
  "music",
  "logistics",
  "pricing",
  "photobooth",
];
