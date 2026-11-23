// Single source of truth for company facts. See docs/brief.md, section 4.
// Only CONFIRMED facts are rendered. Anything the brief tags VERIFY sits under
// `unverified` and must not be shown until the client signs off.

export const company = {
  name: "Danice Stores",
  legalName: "Danice Stores, Inc.",
  founded: 1934,
  tagline: "Great style. Great price.",
  summary:
    "Women's fashion, shoes, and accessories for every size. A New York family business since 1934.",
  url: "https://danicestores.com",
  office: {
    street: "525 Seventh Avenue, Suite 507",
    city: "New York",
    state: "NY",
    zip: "10018",
  },
  social: {
    instagram: { handle: "@danicestores", url: "https://www.instagram.com/danicestores" },
    linkedin: { url: "https://www.linkedin.com/company/danice-stores-inc" },
  },
  // Shown under "Our Team" on the Our Story page. Title and wording come from
  // public listings and must be approved by the person named before launch.
  team: [
    {
      name: "BJ Sara",
      title: "Chief Operating Officer",
      bio: "BJ leads retail operations at Danice, looking after the stores and the teams who run them. His focus is the same as the company\u2019s: keeping great style within reach in every neighborhood we serve.",
    },
  ],
  unverified: {
    officePhone: "(212) 776-1001",
    customerServiceEmail: "customerservice@danicestores.com",
    founder: "Herman Moscot",
  },
} as const;
