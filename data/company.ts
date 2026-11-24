// Single source of truth for company facts. See docs/brief.md, section 4.
// Only CONFIRMED facts are rendered. Anything the brief tags VERIFY sits under
// `unverified` and must not be shown until the client signs off.

export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  photo?: string; // square image in public/team
  quote?: { text: string; source: string };
};

// Shown under "Our Team" on the Our Story page. Titles and wording must be
// approved by the person named.
const team: TeamMember[] = [
  {
    name: "Barry Group",
    title: "President and Owner",
    bio: "Barry is the president and owner of Danice Stores, leading the company and setting its direction, carrying forward the vision Danice has had since 1934: high fashion at affordable prices.",
  },
  {
    name: "BJ Sara",
    title: "Chief Operating Officer",
    photo: "/team/bj-sara.webp",
    quote: {
      text: "The technology isn\u2019t the win. The win is what happens with the time we get back: more selling, better customer experiences, more training, more coaching, and better merchandising.",
      source: "Retail Innovation & Transformation Assembly, The Millennium Alliance",
    },
    bio: "BJ leads retail operations at Danice, looking after the stores and the teams who run them. His focus is the same as the company\u2019s: keeping great style within reach in every neighborhood we serve.",
  },
];

export const company = {
  name: "Danice Stores",
  legalName: "Danice Stores, Inc.",
  founded: 1934,
  tagline: "Great style. Great price.",
  summary:
    "Women's fashion, footwear, and accessories for every size. A New York family business since 1934.",
  url: "https://danicestores.com",
  // Public contact address behind the footer email icon.
  email: "bjgroup@danicestores.com",
  office: {
    street: "525 Seventh Avenue, Suite 507",
    city: "New York",
    state: "NY",
    zip: "10018",
  },
  social: {
    instagram: { handle: "@danicestores", url: "https://www.instagram.com/danicestores" },
    linkedin: { url: "https://www.linkedin.com/company/danice-stores-inc" },
    facebook: { url: "https://www.facebook.com/Danicestores/" },
  },
  team,
  unverified: {
    officePhone: "(212) 776-1001",
    customerServiceEmail: "customerservice@danicestores.com",
    founder: "Herman Moscot",
  },
} as const;
