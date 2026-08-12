-- WIDC Production Schema
-- Run this in Supabase SQL Editor to set up all tables
-- Version: 1.0 (August 12, 2026)

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  attribution text not null,
  event_type text,
  dj_slug text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Public read access" on public.testimonials
  for select using (true);

create policy "Authenticated manage" on public.testimonials
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- PRICING TIERS
-- ============================================================
create table public.pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null,             -- cents ($2,100 = 210000)
  price_label text,                   -- display override ("$0 / Forever")
  description text not null,
  features jsonb not null default '[]',
  badge text,
  highlight boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pricing_tiers enable row level security;

create policy "Public read access" on public.pricing_tiers
  for select using (true);

create policy "Authenticated manage" on public.pricing_tiers
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- PRICING ADD-ONS
-- ============================================================
create table public.pricing_addons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null,             -- cents
  description text not null,
  category text,                      -- "dj", "photobooth", etc.
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pricing_addons enable row level security;

create policy "Public read access" on public.pricing_addons
  for select using (true);

create policy "Authenticated manage" on public.pricing_addons
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- FAQ ENTRIES
-- ============================================================
create table public.faq_entries (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.faq_entries enable row level security;

create policy "Public read published" on public.faq_entries
  for select using (published = true);

create policy "Authenticated manage" on public.faq_entries
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- GALLERY ITEMS
-- ============================================================
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('photo', 'video')),
  src text not null,
  youtube_url text,
  caption text,
  event_type text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "Public read access" on public.gallery_items
  for select using (true);

create policy "Authenticated manage" on public.gallery_items
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- BLOG POSTS
-- ============================================================
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  body text not null,
  category text not null check (category in ('post', 'giglog')),
  featured_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Public read published" on public.blog_posts
  for select using (published = true);

create policy "Authenticated manage" on public.blog_posts
  for all using (auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.update_updated_at();

-- ============================================================
-- INQUIRIES (contact form submissions)
-- ============================================================
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  event_date date,
  event_type text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Anyone can submit an inquiry (public form)
create policy "Public insert" on public.inquiries
  for insert with check (true);

-- Only authenticated users can read/manage inquiries
create policy "Authenticated read" on public.inquiries
  for select using (auth.role() = 'authenticated');

create policy "Authenticated update" on public.inquiries
  for update using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA: Testimonials (from old site audit)
-- ============================================================
insert into public.testimonials (quote, attribution, event_type, featured, sort_order) values
  (
    'Our DJ cancelled 4 days before our wedding. Lucky we found Matt who was available, reasonably priced, provided all his own equipment, had an amazing set up, and played awesome music that the crowd loved. He was also super easy going, flexible, and great to communicate with. I highly recommend him!',
    'Brittany B.',
    'Wedding',
    true,
    1
  ),
  (
    'DJ Matt Bell did a fabulous job at our wedding! He was professional, fun, and kept the dance floor packed all night. I''m going to have to request him for a birthday party next!',
    'Brandon A.',
    'Wedding',
    true,
    2
  ),
  (
    'Matt was incredible to work with from start to finish. He was so organized with the planning process, making sure every detail was covered. On the day of our wedding, he kept everything running smoothly and the dance floor was never empty. His music selection was perfect and he really read the room well. We couldn''t have asked for a better DJ!',
    'Ana W.',
    'Wedding',
    true,
    3
  ),
  (
    'We hired Matt for our wedding and he exceeded all expectations. He was so attentive to what we wanted and made sure our special day was perfect. The music was amazing and he kept the party going all night. We had so many guests compliment us on how great the DJ was. Would absolutely recommend to anyone!',
    'Veronika L.',
    'Wedding',
    true,
    4
  ),
  (
    'I am very particular with my taste in music so I was nervous about choosing a DJ. Matt was awesome to work with — super professional and created such a good vibe. The dance party was a hit and everyone had a blast!',
    'Wedding Client',
    'Wedding',
    false,
    5
  );

-- ============================================================
-- SEED DATA: Pricing Tiers (Matt's launch pricing, Aug 2026)
-- ============================================================
insert into public.pricing_tiers (name, price, price_label, description, features, badge, highlight, sort_order) values
  (
    'Saturday DJ Package',
    210000,
    null,
    'Everything you need for your Saturday event — sound, DJ/MC, and lighting included.',
    '["Professional sound system", "DJ & MC services", "Dance floor lighting & uplights", "Planning meetings (as many as you need)", "6 hours of service", "Setup & teardown included"]'::jsonb,
    'Most Popular',
    true,
    1
  ),
  (
    'Non-Saturday DJ Package',
    190000,
    null,
    'Same full package, any day but Saturday.',
    '["Professional sound system", "DJ & MC services", "Dance floor lighting & uplights", "Planning meetings (as many as you need)", "6 hours of service", "Setup & teardown included"]'::jsonb,
    null,
    false,
    2
  ),
  (
    'Upcharges',
    0,
    '$0 / Forever',
    'We find upcharges annoying. You will never be surprised by hidden fees.',
    '["Extra uplights & dance lights — included", "Extra microphones — included", "Planning meetings — included", "Setup & teardown — included", "Deeply caring about your event — included"]'::jsonb,
    'Our Promise',
    false,
    3
  );

-- ============================================================
-- SEED DATA: Pricing Add-ons
-- ============================================================
insert into public.pricing_addons (name, price, description, category, sort_order) values
  (
    'Ceremony Sound',
    30000,
    'Two wireless microphones, two ceremony speakers, an extra hour of service, and custom ceremony music edits.',
    'dj',
    1
  ),
  (
    'Jazz Piano',
    30000,
    'Live jazz piano for cocktail hour or ceremony.',
    'dj',
    2
  ),
  (
    'Sensory Experience',
    20000,
    'A curated kids'' sensory experience for ages 3–8 during your reception.',
    'dj',
    3
  ),
  (
    'Photobooth — 4 Hours',
    80000,
    'Four hours of open-air photobooth fun.',
    'photobooth',
    4
  ),
  (
    'Photobooth — 4 Hours + Printing',
    100000,
    'Four hours with on-site photo printing. Includes backdrop and dress-up props.',
    'photobooth',
    5
  ),
  (
    'Photobooth — Printing + Attendant',
    120000,
    'Four hours with printing and a dedicated booth attendant. Includes backdrop and dress-up props.',
    'photobooth',
    6
  ),
  (
    'Photobooth Extra Hour',
    15000,
    'Each additional hour beyond the included four.',
    'photobooth',
    7
  );

-- ============================================================
-- SEED DATA: FAQ (real answers from old site, not template placeholders)
-- ============================================================
insert into public.faq_entries (question, answer, category, sort_order) values
  (
    'Why do I need a DJ and not just an iPod?',
    'A DJ does more than press play. We read the room, mix tracks seamlessly, manage energy throughout the night, and handle lighting and sound so you don''t have to think about it. An iPod can''t notice that the dance floor is clearing and switch gears, or make a mic announcement when dinner is served.',
    'general',
    1
  ),
  (
    'Why are DJs so expensive?',
    'Professional DJ equipment represents a significant investment — our gear alone is valued at over $22,000. But the cost also reflects years of experience reading crowds, managing events, and the hours of preparation that go into every booking: planning meetings, building playlists, coordinating with your other vendors, and showing up hours early to set up.',
    'general',
    2
  ),
  (
    'How do you choose what to play?',
    'We send you a music planning form well before your event where you can share your must-plays, do-not-plays, and general vibe. On the day, we use that as our foundation and read the room from there — adjusting energy, tempo, and genre based on what''s actually getting people on the dance floor.',
    'general',
    3
  ),
  (
    'Why should I hire you and not the other guy?',
    'We bring a unique combination: the patience and attentiveness of a teacher, the energy and stage presence of a performer, and the technical expertise of a sound engineer. We''re not just playing music — we''re facilitating your event, reading the room, and making sure every guest feels included.',
    'general',
    4
  );
