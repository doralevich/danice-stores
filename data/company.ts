// Single source of truth for company facts. See docs/brief.md, section 4.
// Only CONFIRMED facts belong here without a note. Anything tagged VERIFY in
// the brief stays out until the client signs off.

export const company = {
  name: "Danice Stores",
  legalName: "Danice Stores, Inc.",
  founded: 1934,
  tagline: "Great style. Great price.",
  // One short line about what Danice is. Confirmed facts only.
  summary:
    "Women's fashion, shoes, and accessories for every size. A New York family business since 1934.",
  url: "https://danicestores.com",
} as const;
