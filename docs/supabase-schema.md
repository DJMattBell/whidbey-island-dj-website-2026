# Supabase Schema Reference

**Migration file:** `supabase/migrations/001_initial_schema.sql`

## Tables

### `testimonials`
Client quotes displayed on homepage and DJ profile pages. Matt adds these via Supabase table editor.

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| quote | text | — | The full testimonial |
| attribution | text | — | "Brittany B." |
| event_type | text | null | "Wedding", "School Dance", etc. |
| dj_slug | text | null | "matt" or "lee" — links to DJ |
| featured | boolean | false | Show on homepage |
| sort_order | integer | 0 | Display order |
| created_at | timestamptz | now() | |

**RLS:** Public SELECT. Authenticated all.

---

### `pricing_tiers`
Main pricing packages shown on /pricing.

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| name | text | — | "Saturday DJ Package" |
| price | integer | — | Cents ($2,100 = 210000) |
| price_label | text | null | Override display ("$0 / Forever") |
| description | text | — | Short card description |
| features | jsonb | [] | Array of included items |
| badge | text | null | Card badge ("Most Popular") |
| highlight | boolean | false | Visually emphasized tier |
| sort_order | integer | 0 | |
| created_at | timestamptz | now() | |

**RLS:** Public SELECT. Authenticated all.

---

### `pricing_addons`
Individual add-on items (ceremony, photobooth options, etc.).

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| name | text | — | |
| price | integer | — | Cents |
| description | text | — | |
| category | text | null | "dj" or "photobooth" |
| sort_order | integer | 0 | |
| created_at | timestamptz | now() | |

**RLS:** Public SELECT. Authenticated all.

---

### `faq_entries`
FAQ questions and answers. Supports markdown in the answer field.

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| question | text | — | |
| answer | text | — | Supports basic markdown |
| category | text | null | For grouping |
| sort_order | integer | 0 | |
| published | boolean | true | Only published shown publicly |
| created_at | timestamptz | now() | |

**RLS:** Public SELECT where published=true. Authenticated all.

---

### `gallery_items`
Event photos and videos for the gallery page.

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| type | text | — | "photo" or "video" |
| src | text | — | Image path or URL |
| youtube_url | text | null | For video items |
| caption | text | null | |
| event_type | text | null | |
| featured | boolean | false | |
| sort_order | integer | 0 | |
| created_at | timestamptz | now() | |

**RLS:** Public SELECT. Authenticated all.

---

### `blog_posts`
Blog posts and gig logs. Matt writes in the Supabase table editor.

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| title | text | — | |
| slug | text (unique) | — | URL-safe slug |
| body | text | — | Markdown content |
| category | text | — | "post" or "giglog" |
| featured_image | text | null | |
| published | boolean | false | Only published shown publicly |
| published_at | timestamptz | null | Set when published |
| created_at | timestamptz | now() | |
| updated_at | timestamptz | now() | Auto-updated via trigger |

**RLS:** Public SELECT where published=true. Authenticated all.

---

### `inquiries`
Contact form submissions. Matt's lead inbox.

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid PK | gen_random_uuid() | |
| name | text | — | |
| email | text | — | |
| event_date | date | null | |
| event_type | text | null | |
| message | text | — | |
| read | boolean | false | Matt marks read in dashboard |
| created_at | timestamptz | now() | |

**RLS:** Public INSERT (form submissions). Authenticated SELECT/UPDATE (Matt's dashboard).

---

## Environment Variables

Set in Vercel dashboard (not committed to repo):

- `SUPABASE_URL` — Project URL (https://xxx.supabase.co)
- `SUPABASE_ANON_KEY` — Anon/public key (server-side only, not exposed to browser)

## How Matt Edits Content

1. Log in to Supabase dashboard
2. Open Table Editor
3. Edit rows directly (add testimonial, change price, write blog post, etc.)
4. Changes are live on next page load — no code or rebuild needed
