export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: {
          id: string;
          quote: string;
          attribution: string;
          event_type: string | null;
          dj_slug: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["testimonials"]["Row"],
          "id" | "created_at"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["testimonials"]["Row"],
              "id" | "created_at"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      };
      pricing_tiers: {
        Row: {
          id: string;
          name: string;
          price: number;
          price_label: string | null;
          description: string;
          features: string[];
          badge: string | null;
          highlight: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["pricing_tiers"]["Row"],
          "id" | "created_at"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["pricing_tiers"]["Row"],
              "id" | "created_at"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["pricing_tiers"]["Row"]>;
      };
      pricing_addons: {
        Row: {
          id: string;
          name: string;
          price: number;
          description: string;
          category: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["pricing_addons"]["Row"],
          "id" | "created_at"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["pricing_addons"]["Row"],
              "id" | "created_at"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["pricing_addons"]["Row"]>;
      };
      faq_entries: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string | null;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["faq_entries"]["Row"],
          "id" | "created_at"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["faq_entries"]["Row"],
              "id" | "created_at"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["faq_entries"]["Row"]>;
      };
      gallery_items: {
        Row: {
          id: string;
          type: "photo" | "video";
          src: string;
          youtube_url: string | null;
          caption: string | null;
          event_type: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["gallery_items"]["Row"],
          "id" | "created_at"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["gallery_items"]["Row"],
              "id" | "created_at"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["gallery_items"]["Row"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          body: string;
          category: "post" | "giglog";
          featured_image: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["blog_posts"]["Row"],
          "id" | "created_at" | "updated_at"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["blog_posts"]["Row"],
              "id" | "created_at" | "updated_at"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          event_date: string | null;
          event_type: string | null;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["inquiries"]["Row"],
          "id" | "created_at" | "read"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["inquiries"]["Row"],
              "id" | "created_at" | "read"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Row"]>;
      };
    };
  };
}
