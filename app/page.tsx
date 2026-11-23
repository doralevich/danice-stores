import Link from "next/link";
import { company } from "@/data/company";
import { visibleStores } from "@/data/stores";
import { Button } from "@/components/Button";
import { GoogleStoreMap } from "@/components/GoogleStoreMap";
import { HeroFlower } from "@/components/HeroFlower";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Petal } from "@/components/Petal";
import { StoreCard } from "@/components/StoreCard";
import { StoreMap } from "@/components/StoreMap";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  foundingDate: String(company.founded),
  sameAs: [company.social.instagram.url, company.social.linkedin.url],
};

// A Google map is used once NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set in Vercel.
// Until then the OpenStreetMap version shows, so the page always has a map.
const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const carry = ["Clothing", "Plus size", "Shoes", "Accessories"];

const wrap = "mx-auto max-w-6xl px-5 sm:px-8";
const h2 = "text-3xl font-extrabold sm:text-4xl";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      {/* Hero */}
      <section className="overflow-hidden">
        <div className={`${wrap} grid items-center gap-10 py-14 sm:py-20 md:grid-cols-[3fr_2fr]`}>
          <div>
            <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] font-extrabold tracking-tight">
              Great style.
              <br />
              <span className="text-magenta">Great price.</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
              Women&rsquo;s fashion, shoes, and accessories for every size. A
              New York family business since 1934.
            </p>
            <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/stores">Find a store</Button>
              <Link
                href="/our-story"
                className="text-lg font-semibold underline underline-offset-4 hover:text-magenta-deep"
              >
                Our Story
              </Link>
            </p>
          </div>
          <HeroFlower />
        </div>
      </section>

      {/* What we carry */}
      <section className="bg-blush">
        <div className={`${wrap} py-12 sm:py-14`}>
          <h2 className="sr-only">What we carry</h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-2xl font-extrabold sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:text-4xl">
            {carry.map((item, i) => (
              <li key={item} className="flex items-center gap-x-5 sm:gap-x-7">
                {i > 0 ? <Petal className="hidden w-8 sm:block" /> : null}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stores */}
      <section>
        <div className={`${wrap} py-14 sm:py-20`}>
          <h2 className={h2}>Find your Danice</h2>
          <div className="mt-8">
            {googleMapsKey ? (
              <GoogleStoreMap stores={visibleStores} apiKey={googleMapsKey} />
            ) : (
              <StoreMap stores={visibleStores} />
            )}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleStores.map((store) => (
              <StoreCard key={store.slug} store={store} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-plum/15">
        <div className={`${wrap} grid gap-6 py-14 sm:py-20 md:grid-cols-[auto_1fr] md:gap-14`}>
          <p className="text-7xl leading-none font-extrabold tracking-tight text-magenta sm:text-8xl">
            1934
          </p>
          <div>
            <h2 className={h2}>A New York family business.</h2>
            <p className="mt-4 text-xl leading-relaxed">
              Danice opened on 14th Street in 1934. Four generations later, we
              are still a family business, still in New York, and still doing
              the same thing.
            </p>
            <p className="mt-5 text-lg font-semibold">
              <Link href="/our-story" className="underline underline-offset-4 hover:text-magenta-deep">
                Read Our Story
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="border-t border-plum/15">
        <div className={`${wrap} py-14 sm:py-20`}>
          <h2 className={h2}>Follow us on Instagram</h2>
          <p className="mt-3 text-xl leading-relaxed">
            New arrivals and store news, {company.social.instagram.handle}.
          </p>
          <div className="mt-8">
            <InstagramFeed
              url={company.social.instagram.url}
              handle={company.social.instagram.handle}
            />
          </div>
        </div>
      </section>
    </>
  );
}
