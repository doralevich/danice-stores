// Store list. See docs/brief.md, section 5.
//
// Every store listed here is shown on the site, at the site owner's request.
// `verified: false` marks entries taken from old public listings that the
// client has not yet confirmed are open. They carry no hours or phone, since
// those were never confirmed. Replace them with the client's list when it
// arrives.

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Store = {
  slug: string;
  name: string; // "Danice Harlem"
  streetName: string; // how customers say it: "Danice on 125th"
  neighborhood: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  region: string;
  phone?: string;
  hours?: { day: Day; open: string; close: string }[]; // 24h "HH:MM", New York time
  lat: number;
  lng: number;
  verified: boolean;
  photo?: string;
};

export const stores: Store[] = [
  {
    slug: "harlem-125th-st",
    name: "Danice Harlem",
    streetName: "Danice on 125th",
    neighborhood: "Harlem",
    street: "305 W 125th St",
    city: "New York",
    state: "NY",
    zip: "10027",
    region: "Manhattan",
    // VERIFY with client before adding: phone (212) 665-0389, hours.
    // Approximate: just west of Frederick Douglass Blvd. Confirm the pin.
    lat: 40.8107,
    lng: -73.9521,
    verified: true,
  },
  // Below: addresses from old public listings, not yet confirmed by the client.
  {
    slug: "jamaica-ave",
    name: "Danice Jamaica",
    streetName: "Danice on Jamaica Ave",
    neighborhood: "Jamaica",
    street: "163-27 Jamaica Ave",
    city: "Jamaica",
    state: "NY",
    zip: "11432",
    region: "Queens",
    lat: 40.7046,
    lng: -73.7969,
    verified: false,
  },
  {
    slug: "fulton-st",
    name: "Danice Downtown Brooklyn",
    streetName: "Danice on Fulton Street",
    neighborhood: "Fulton Street",
    street: "482 Fulton St",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    region: "Brooklyn",
    lat: 40.6904,
    lng: -73.9843,
    verified: false,
  },
  {
    slug: "the-hub-3rd-ave",
    name: "Danice The Hub",
    streetName: "Danice on 3rd Ave",
    neighborhood: "The Hub",
    street: "2883 3rd Ave",
    city: "Bronx",
    state: "NY",
    zip: "10455",
    region: "Bronx",
    lat: 40.8163,
    lng: -73.9179,
    verified: false,
  },
  {
    slug: "fordham-rd",
    name: "Danice Fordham",
    streetName: "Danice on Fordham Road",
    neighborhood: "Fordham Road",
    street: "119 E Fordham Rd",
    city: "Bronx",
    state: "NY",
    zip: "10468",
    region: "Bronx",
    lat: 40.8625,
    lng: -73.8985,
    verified: false,
  },
  {
    slug: "newark-broad-st",
    name: "Danice Newark",
    streetName: "Danice on Broad Street",
    neighborhood: "Newark",
    street: "768 Broad St",
    city: "Newark",
    state: "NJ",
    zip: "07102",
    region: "New Jersey",
    lat: 40.7368,
    lng: -74.1716,
    verified: false,
  },
];

export const visibleStores = stores;

export function directionsUrl(store: Store) {
  const destination = `${store.street}, ${store.city}, ${store.state} ${store.zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
