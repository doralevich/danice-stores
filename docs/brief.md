# Danice Stores Inc. Website Build Brief

Prepared for Claude Code. Research date: November 23, 2026.

Note on the name: the company is **Danice** Stores Inc. (not Denise). The logo confirms it.

---

## 1. How to use this brief

Everything here is tagged one of three ways:

- **CONFIRMED**: appears on the logo or on multiple independent sources.
- **VERIFY**: found publicly but stale, conflicting, or single-source. Do not publish until the client signs off.
- **RECOMMENDED**: my suggestion, not a researched fact.

Build the site so every VERIFY item lives in one data file (`/data/stores.ts`, `/data/company.ts`) and can be corrected without touching components.

---

## 2. Project setup

- Framework: Next.js (App Router, TypeScript), Tailwind CSS
- Repo: new standalone GitHub repository, suggested name `danice-stores-web`
- Hosting: new standalone Vercel project, connected to that repo, preview deploys on every PR
- Content: no CMS for v1. Typed data files in the repo. Add a CMS later only if the client wants to edit deals or store hours themselves.
- Domain: `danicestores.com` is listed as the company website on LinkedIn, Yelp, BBB, Facebook, and D&B. It resolves today but serves an empty page, and the company email runs on it. **Get DNS access from whoever manages it, and do not disturb the mail records when pointing the site at Vercel.** Every directory listing already links to it, which is free traffic on day one.
- Contact form: server action that emails the client. Pick the provider at build time (Resend is fine). Add spam protection.
- Analytics: Vercel Analytics plus Google Search Console.

---

## 3. Brand

**Logo** (supplied by client, file: `7d98fb4a-image.png`, 554x554 PNG)

- Wordmark "Danice" in heavy extended sans, hot magenta
- Tagline lockup: "GREAT STYLE" [overlapping petal flower mark] "GREAT PRICE"
- "Est. 1934"
- Pale pink background

**Colors** (sampled by eye from the PNG, confirm against a vector file)

- Magenta: approx `#EC008C`
- Pale pink background: approx `#F9E4F5`
- Flower mark: lighter translucent pinks layered over the magenta
- Full palette and usage rules are in the Design direction section.

**Asset gap**: the PNG is low resolution. Ask the client for a vector (SVG, AI, or EPS). If none exists, the wordmark needs to be redrawn before it goes in a header at retina sizes.

**Voice**: friendly, confident, neighborhood. Plain words. Value without sounding cheap. The company's own language leans on "high fashion at affordable prices" and "affordable fashion for women of any size."

---

## Design direction (read this before writing any UI)

The client does not want a site that looks like a template. Follow this section over your own defaults.

### The idea: the store sign and the price tag

Danice is a street-level New York retailer. Its stores sit on shopping strips like 125th Street, with a big sign over the door and sale signs in the window. The site should feel like walking up to that storefront, not like a software landing page. Two things from that world carry the design:

1. **The sign band.** The strip of signage over a shop door. On the site it is a full-width magenta band with very large, wide, heavy lettering that echoes the Danice wordmark. This is the one loud element. Everything else stays quiet.
2. **The hang tag.** The price tag on a garment. Store details (address, hours, phone) appear on tag-shaped cards with one clipped corner and a punched hole. Use it for store cards only, nowhere else.

### Color

Stay inside the logo. Every color on the site comes from the logo file: its magenta, its pale pink background, and the lighter pinks in the flower. The only addition is a deep plum for text, because the logo has no dark color and body text needs one. No other hues.

Commit to pink. Most retail sites put a brand color on a white page as an accent. Here pink is the page.

| Name | Hex | Use |
|---|---|---|
| Danice magenta | `#EC008C` | Sign bands, large display type, primary buttons |
| Blush | `#F9E4F5` | Default page background |
| Plum ink | `#3B0A2A` | All body text and small text. Replaces black. |
| Petal pink | `#F57EC0` (approx, sample from the flower mark) | Only for things that are live or time-bound: "Open now", a current sale, a new-arrivals flag. Also the neighborhood strip. Text on it is plum ink. |
| White | `#FFFFFF` | Hang tags, form fields, photo mats |

Contrast rule: white on magenta is for large type only (24px and up, bold). Never put small text on magenta. Small text is plum ink on blush or white.

### Type

One family, used at two widths: **Archivo** (variable, has a width axis, free on Google Fonts, load with `next/font` and confirm the width axis is available).

- Display: Archivo at maximum width, weight 800 to 900, tight leading, sentence case. This is deliberately close to the wide, heavy letters of the logo so headlines feel like they came off the same sign.
- Text: Archivo at normal width, weight 400 and 600, 17 to 18px body, line length under 75 characters.

Headlines are big enough to be the picture. The hero headline should fill the band edge to edge on desktop and wrap to two or three stacked lines on a phone.

### Layout

Left aligned throughout. Full-bleed bands alternate with content set on a simple wide grid. Photos are large, squared off, and sit in white mats like prints taped in a window. No card grids.

```
+------------------------------------------------------+
| [logo]                    Stores  Our Story  Careers |   blush
+------------------------------------------------------+
|                                                      |
|  Great style.                                        |   magenta sign band,
|  Great price.                                        |   white extended type,
|  Since 1934.                                         |   fills the width
|                                                      |
+------------------------------------------------------+
|  Harlem   Jamaica   Fulton Street   The Hub   ...    |   petal pink strip, slow ticker
+------------------------------------------------------+
|  +----------------------------+                      |
|  |                            |   Women's fashion    |   blush
|  |   big storefront or        |   for every size,    |
|  |   customer photo           |   in your            |
|  |                            |   neighborhood.      |
|  +----------------------------+   [Find a store]     |
+------------------------------------------------------+
|  Find your Danice                                    |
|  +--o-------+  +--o-------+  +--o-------+            |   hang tags, one per store
|  | Harlem   |  | ...      |  | ...      |            |
|  | 305 W 125|  |          |  |          |            |
|  | Open now |  |          |  |          |            |
|  +----------+  +----------+  +----------+            |
+------------------------------------------------------+
|  1934                                    (b/w photo) |   Our Story teaser:
|  A New York family business.                         |   giant year, short text
+------------------------------------------------------+
```

### Photography

- Real stores, real streets, real customers and staff. Shot at street level in daylight, or with direct flash inside. Slightly raw is right. Polished stock models are wrong.
- Storefront photos include the street: the sign, the sidewalk, the block.
- Archival photos on Our Story run as magenta duotones (black and white image tinted with Danice magenta).
- Until client photos arrive, use solid magenta or blush blocks with the store name set large. Do not use stock photography as a stand-in.

### Small details that make it theirs

- The logo sits top left on every page at a generous size, on the blush background it was designed for.
- The tagline "Great style. Great price." and "Est. 1934" come straight from the logo and are the hero headline. Do not write a different slogan.

- The petal flower from the logo is the map pin on the store locator and the bullet in lists. Do not use a generic icon set.
- Each store is named by its street, the way customers say it: "Danice on 125th", "Danice on Jamaica Ave".
- Hours show a petal pink "Open now" or a plain "Opens 9:30 am" computed from the store data.
- Buttons are solid magenta rectangles with square corners and plain labels: "Find a store", "Get directions", "Call the store".
- Copy reads like good store signage: short, plain, confident. "New styles every week." "Every size. Always."

### Motion

One moving thing: the petal pink strip under the hero scrolls the store neighborhoods slowly, like a window sign. It stops when `prefers-reduced-motion` is set. Nothing else animates on its own. Hover and focus states are instant color changes.

### Do not do any of these

- Any color outside the logo palette above
- Redrawing, recoloring, stretching, or restyling the logo. Use it as supplied, on blush or white, with clear space around it.

- Cream or off-white background with a serif headline
- Dark mode with one neon accent
- Rows of identical rounded cards with soft grey shadows
- Three icons in a row with a heading and a sentence under each
- Small all-caps tracked labels above headings
- Gradient backgrounds, blurred color blobs, glass effects
- Fade-and-slide-up on every section as you scroll
- Arrows appended to button or link text
- Inter, Playfair Display, Poppins, or a monospace font for labels
- Numbered sections (01, 02, 03)
- Invented stats ("90+ years, 1M+ customers") in a counter row
- Stock photos of models

### Check before calling it done

Screenshot the home page at phone and desktop widths. If you could swap the logo for another retailer's and nothing would look out of place, it is not finished.

---

## 4. Company facts

| Fact | Detail | Status |
|---|---|---|
| Legal name | Danice Stores, Inc. | CONFIRMED |
| Founded | 1934, on 14th Street near Union Square, Manhattan | CONFIRMED (logo, LinkedIn). BBB says 1933, MapQuest says 1935. Use 1934. |
| Founder | Herman Moscot, an immigrant who started the store to build a life for his family | VERIFY (from the company's Facebook "Our Story") |
| Ownership | Family owned and operated, four generations | CONFIRMED across sources |
| Current management | "Under the direction of the BJ Sara Group" | VERIFY (Facebook, circa 2019 to 2020) |
| Corporate office | 525 Seventh Avenue (Fashion Ave), Suite 507, New York, NY 10018 | CONFIRMED (BBB, D&B, MapQuest) |
| Office phone | (212) 776-1001 | VERIFY (BBB) |
| What they sell | Women's clothing, shoes, and accessories. Misses and plus sizes. | CONFIRMED |
| Positioning | Off-price women's fashion. "High fashion at affordable prices." | CONFIRMED |
| Plus size claim | "One of the first clothing stores to ever provide plus size clothing" | VERIFY before publishing. Strong claim, single source (their own Facebook). |
| Price range | Roughly $10 to $50 per item | VERIFY (third-party roundup) |
| Service area | NYC five boroughs, Long Island, New Jersey | CONFIRMED historically. Current footprint needs verification. |
| Store count | "Several" per the client. Google Maps shows 1 open (Harlem). LinkedIn claims "over 50". | **Need the exact list from the client. See Section 5.** |
| Employees | 650+ in LinkedIn copy. LinkedIn itself shows 116 linked employees. | VERIFY. Leave numbers off the site unless the client supplies one. |
| BBB | A+ rating, not accredited, no complaints in last 3 years | CONFIRMED (BBB profile) |
| Instagram | @danicestores, 12.5K followers. Bio: women's fashion, shoes, and accessories since 1934, "Great Style, Great Price". Highlights include Press, Style Squad, #DaniceItGirl. | CONFIRMED live. VERIFY how recently they post. |
| Facebook | facebook.com/Danicestores, 2.7K followers. Describes itself as "Women's Clothing, Accessories, Shoes, and Beauty Brand." Most recent post visible without login: October 22, 2024. Lists the phone of the closed Church Ave store. | CONFIRMED live. Looks dormant. |
| Customer service email | customerservice@danicestores.com | VERIFY it is monitored (from Facebook) |
| LinkedIn | linkedin.com/company/danice-stores-inc, 340 followers, tagline "Great Style - Great Price" | CONFIRMED live |
| Domain | danicestores.com resolves but returns an empty page | CONFIRMED live. Someone still holds the domain. |
| Hashtag | #DaniceItGirl | CONFIRMED (Instagram) |

---

## 5. Store locations (checked on Google Maps, November 23, 2026)

**The client confirms Danice has several open stores.** Google Maps disagrees: it shows one open store and marks every other Danice listing "Permanently closed." So the Google listings are wrong or out of date, and the store list below cannot be built from public sources. **The client must supply the list of open stores (address, phone, hours).** Build a multi-store locator.

Fixing those Google listings matters as much as the website. A shopper who searches for a store and sees "Permanently closed" will not come.

### Shown as open on Google

| Location | Address | Google rating | Notes |
|---|---|---|---|
| Danice Harlem | 305 W 125th St, New York, NY 10027 | 4.0 (310 reviews) | Listed as open, closing 7 PM on a Monday. No phone or website on the Google listing. Older directories show (212) 665-0389 and hours to 9 PM. Reviewers mention posted hours not matching real hours. VERIFY phone and hours. |
| Corporate office | 525 Seventh Ave, Suite 507, New York, NY 10018 | 3.0 (4 reviews) | (212) 776-1001. Listed as open, closing 6 PM. Not a retail store. |

### Marked "Permanently closed" on Google Maps

Publish only the ones the client confirms are open. Each confirmed store needs its Google listing reopened or re-created.

- Brooklyn: 482 Fulton St, 534 Fulton St, 1268 Fulton St (now a Foot Locker), 438 Utica Ave, 2101 Church Ave, 2147 86th St, 144 E 98th St, 450 Rockaway Ave
- Bronx: 2883 3rd Ave, 845 White Plains Rd, 1591 Westchester Ave, 773 E Tremont Ave, 119 E Fordham Rd, 3431 Jerome Ave, 220 E 161st St
- Queens: 163-27 Jamaica Ave, 160-04 Jamaica Ave, 88-01 Queens Blvd (Elmhurst), 253-01 Rockaway Blvd (Rosedale), 133-40 79th St, 34-56 48th St (Long Island City)
- Long Island: 1726 Hempstead Tpke (Elmont)
- Staten Island: 2040 Forest Ave
- New Jersey: 2853 JFK Blvd (Jersey City), 768 Broad St (Newark), 88 Broad St (Elizabeth)

### No Danice listing found at the address

- 953 Southern Blvd, Bronx (now Rainbow Shops)
- 5546 Broadway, Bronx
- 161-01 Jamaica Ave, Jamaica
- Green Acres Mall, Valley Stream
- 600 Hempstead Tpke, Elmont (now Home Depot)

### The conflict to resolve with the client

The LinkedIn page, read live today, says "over 50 stores throughout New York, New Jersey, Long Island, Philadelphia and Florida" and "650+ team members." The client says "several." Do not publish a store count or the Philadelphia and Florida claim until the client gives the real number. Also ask whether any stores trade under a name other than Danice, which would explain why Google cannot find them.

Data shape for `/data/stores.ts`:

```ts
export type Store = {
  slug: string;            // "harlem-125th-st"
  name: string;            // "Danice Harlem"
  street: string;
  city: string;
  state: string;
  zip: string;
  region: string;
  phone?: string;
  hours?: { day: string; open: string; close: string }[];
  lat: number;
  lng: number;
  verified: boolean;       // only render stores where verified === true
  photo?: string;
};
```

Seed it from the client's list. Until that arrives, use Harlem plus placeholder entries with `verified: false` so the locator can be built and tested.

---

## 6. What customers say (use to shape copy, not as testimonials)

Paraphrased themes from Yelp, Atly, BBB, and local roundups. **Do not invent or paraphrase these into quoted reviews on the site.** Only publish real reviews the client supplies with permission, or embed a live Google reviews feed.

Liked:
- Low prices and frequent sales
- "Cute and affordable" styles, wide variety
- Real plus size selection
- Convenient neighborhood locations, friendly staff

Friction:
- Returns are store credit only, no refunds. This is the most common complaint.
- Sizing varies by item. Shoppers are advised to try things on.
- Price labels not always clear.

What this means for the site: publish the return policy plainly and early. A clear policy page removes the top complaint before it happens.

---

## 7. Sitemap

The client asked for Home, About Our Stores, and Contact. Recommended full set:

1. **Home**
2. **Our Story** (the "About" page)
3. **Stores** (locator index plus one page per store)
4. **What We Carry** (categories, sizes)
5. **Careers**
6. **Contact**
7. **Store Policies** (returns and exchanges)
8. **Privacy Policy**, **Accessibility Statement** (footer)

RECOMMENDED for phase 2: Deals / What's New, email and SMS signup, Spanish language version.

---

## 8. Page specs and draft copy

Draft copy uses only CONFIRMED facts unless marked.

### Home

Sections, in order. See the wireframe in the Design direction section.

1. **Sign band hero.** Full-width magenta. Headline in white extended type: "Great style. Great price. Since 1934." No photo behind it. The type is the image.
2. **Neighborhood strip.** Petal pink band listing store neighborhoods, scrolling slowly. Built from the store data.
3. **Window.** One large photo in a white mat, with a short statement beside it: "Women's fashion for every size, in your neighborhood." Button: "Find a store".
4. **Find your Danice.** Hang-tag cards, one per store, showing street name, address, and open status. Links to each store page and to the full locator.
5. **What we carry.** Four large photo panels with a plain label on each: Clothing, Plus size, Shoes, Accessories. Not a card grid: two wide, two tall, uneven sizes.
6. **1934.** The year set huge in magenta on blush, with two or three sentences: "Danice opened on 14th Street in 1934. Four generations later, we are still a family business, still in New York, and still doing the same thing." Link: "Read our story". Archival photo if the client has one.
7. **Work here.** A plain magenta band: "We are hiring in our stores." Button: "See open jobs".
8. **Footer.** Corporate address, customer service email, Instagram @danicestores, policies.

### Our Story

- Headline: "A New York family business since 1934."
- Body draft:
  "Danice opened its doors in 1934 on 14th Street in Manhattan. It started the way a lot of New York stories start: with a family, a storefront, and a lot of work. [VERIFY: Founded by Herman Moscot.]
  Four generations later, Danice is still family owned and operated. We have grown from that one store into a group of neighborhood shops across New York City, Long Island, and New Jersey.
  [Adjust the regions in the sentence above to match the client's store list.]
  What we do has not changed. We bring in the styles women want right now and price them so you can actually buy them. Every size is welcome here, and always has been."
- Timeline component: 1934 first store on 14th Street. Add milestones from the client (first Brooklyn store, first NJ store, etc.).
- Photo slots: archival family or storefront photos if the client has any. This page is where a 90-plus-year history earns trust, so old photos matter.
- Mission line: "Affordable fashion for women of any size."

### Stores

- Index: map plus list, filter by region, "Use my location" button.
- Each store page (`/stores/[slug]`): name, address, phone (tap to call), hours, "Get Directions" link to Google Maps, storefront photo, nearby transit (RECOMMENDED), and the three nearest other stores.
- Each store page gets its own title and meta description for local search, e.g. "Danice Harlem | Women's Clothing on 125th Street".

### What We Carry

- Categories: Dresses, Tops, Bottoms, Activewear, Shoes, Accessories. VERIFY the category list with the client.
- Sizes: Misses and Plus. VERIFY the actual size range.
- No prices or product listings in v1. This is a brand and store site, not ecommerce.

### Careers

- Short pitch: family business, neighborhood stores, room to grow.
- Roles to list: Sales Associate, Cashier, Stock, Assistant Manager, Store Manager. VERIFY with client.
- Simple application form or "Apply in store" instructions. Ask the client which.

### Contact

- Corporate office: 525 Seventh Avenue, Suite 507, New York, NY 10018
- Phone: (212) 776-1001 (VERIFY)
- Form with a topic dropdown: Customer Service, Careers, Real Estate / Leasing, Vendors, Press.
- Line under the form: "Question about a specific store? Call the store directly." Link to Stores.

### Store Policies

- Returns and exchanges. Public reviews indicate store credit only, no cash refunds. **Get the exact written policy from the client.** State the time window, receipt requirement, and final sale items.

---

## 9. SEO and technical requirements

- `LocalBusiness` (subtype `ClothingStore`) JSON-LD on every store page: name, address, geo, phone, openingHours, url.
- `Organization` JSON-LD on the home page with foundingDate 1934 and sameAs links to verified social profiles.
- Unique title and description per page. Sitemap.xml and robots.txt generated by Next.
- Target phrases: "women's clothing store [neighborhood]", "plus size clothing [borough]", "affordable women's clothing NYC".
- Mobile first. Most visitors will be on a phone looking for an address or hours. Tap-to-call and Get Directions above the fold on store pages.
- Accessibility: WCAG 2.1 AA. Check magenta on pink contrast everywhere.
- Performance: next/image for all photos, static generation for store pages.
- Name, address, and phone on the site must match Google Business Profile, Yelp, and Yellow Pages exactly.

---

## 10. Gaps: what we need from the client

Ranked by how much they block the build.

1. **Store list.** The client has several stores, but public sources cannot tell us which. Need address, phone, and hours for each from the client.
2. **Photography.** Storefronts, interiors, merchandise, people. Nothing usable exists publicly. Without it the site will look generic. Budget a half-day shoot at two or three stores if they have nothing.
3. **Vector logo.**
4. **Domain access** for danicestores.com.
5. **Return and exchange policy** in writing.
6. **Company story sign-off.** Founder name, family history, who runs it now, any archival photos.
7. **Numbers they are comfortable publishing.** Store count, employee count, or none.
8. **Contact routing.** Which email addresses receive customer service, careers, and leasing inquiries.
9. **Social accounts.** Confirm Instagram and Facebook are active and who controls them.
10. **Hiring process.** Online application or apply in store.
11. **Gift cards, layaway, loyalty program.** Unknown whether any exist.
12. **Languages.** Many stores serve Spanish-speaking neighborhoods. Ask if they want Spanish at launch.

Also recommended, outside the website itself:

- Claim a Google Business Profile for every open store and get the wrong "Permanently closed" flags removed. This is the fastest win available. The Harlem listing also has no phone and no website, and reviewers complain the hours are wrong.
- Update the Facebook page, which still lists a closed store's phone number.
- Fix or retire the LinkedIn "over 50 stores" copy so it matches reality.
- Update Yelp, Yellow Pages, and BBB listings to match the new site.

---

## 11. Out of scope for v1

- Ecommerce and online ordering
- Customer accounts
- Inventory or price display
- CMS

---

## 12. Research notes

Second pass, November 23, 2026: Google Maps, LinkedIn, Facebook, and Instagram were read live in a browser, signed out. Yelp refused the browser, so Yelp content comes from search-engine copies. The Facebook "Our Story" text (founder, BJ Sara Group) comes from a mirror dated roughly 2019 to 2020. Google Maps open and closed flags are crowd-maintained and can be wrong, so treat them as strong evidence, not proof.

Sources:

- LinkedIn company page: https://www.linkedin.com/company/danice-stores-inc
- BBB profile: https://www.bbb.org/us/ny/new-york/profile/clothing/danice-stores-inc-0121-83077
- Yellow Pages listings: https://www.yellowpages.com/brooklyn-ny/danice-stores
- Yelp, Downtown Brooklyn: https://www.yelp.com/biz/danice-stores-brooklyn
- Yelp, Bronx: https://www.yelp.com/biz/danice-stores-the-bronx
- Yelp, Long Island City (closed): https://www.yelp.com/biz/danice-stores-long-island-city
- Facebook page mirror: https://www.globuya.com/US/New-York/360441047128/Danice-Stores
- MapQuest: https://www.mapquest.com/us/new-york/danice-stores-inc-357435781
- CREHQ profile: https://crehq.com/companies/danice-stores/
- Atly, Harlem store: https://www.atly.com/location/Danice
- Manhattan Sideways, Harlem store: https://sideways.nyc/discover/1Ynk9vu8pjSA3OcUD92oth/danice
- QNS, LIC closing (2018): https://qns.com/2018/04/danice-is-closing-48th-street-store/
- Queens Gazette, LIC closing: https://www.qgazette.com/articles/danice-chain-closing-48th-street-store/
- RocketReach: https://rocketreach.co/danice-stores-inc-profile_b54c0cdcf9dbd5b6
