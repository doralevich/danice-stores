import Link from "next/link";
import { company } from "@/data/company";
import { visibleStores } from "@/data/stores";
import { Button } from "@/components/Button";
import { HangTag } from "@/components/HangTag";
import { PhotoBlock } from "@/components/PhotoBlock";
import { Ticker } from "@/components/Ticker";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  foundingDate: String(company.founded),
  sameAs: [company.social.instagram.url, company.social.linkedin.url],
};

const sectionHeading = "font-display text-[clamp(2.5rem,7vw,5.5rem)] text-magenta";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      {/* The sign band: the one loud element. The type is the image. */}
      <section className="bg-magenta px-5 py-10 sm:px-10 sm:py-14">
        <h1 className="font-display text-[11.4vw] text-white">
          Great style.
          <br />
          Great price.
          <br />
          Since 1934.
        </h1>
      </section>

      <Ticker />

      {/* The window */}
      <section className="grid items-center gap-8 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <PhotoBlock label="125th Street" className="aspect-[4/3] lg:aspect-[3/2]" />
        <div>
          <p className="font-display text-[clamp(2rem,4.2vw,3.75rem)] text-magenta">
            Women&rsquo;s fashion for every size, in your neighborhood.
          </p>
          <p className="mt-5 max-w-[40ch] text-xl">
            New styles every week. Every size. Always.
          </p>
          <p className="mt-8">
            <Button href="/#stores">Find a store</Button>
          </p>
        </div>
      </section>

      {/* Find your Danice */}
      <section id="stores" className="scroll-mt-6 px-5 pb-16 sm:px-10 sm:pb-24">
        <h2 className={sectionHeading}>Find your Danice</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleStores.map((store) => (
            <HangTag key={store.slug} store={store} />
          ))}
        </div>
      </section>

      {/* What we carry: uneven panels, not a card grid */}
      <section className="px-5 pb-16 sm:px-10 sm:pb-24">
        <h2 className={sectionHeading}>What we carry</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:grid-rows-[22rem_16rem]">
          <PhotoBlock label="Clothing" className="min-h-64 lg:col-span-8" />
          <PhotoBlock label="Plus size" tone="blush" className="min-h-80 lg:col-span-4 lg:row-span-2" />
          <PhotoBlock label="Shoes" tone="blush" className="min-h-56 lg:col-span-3" />
          <PhotoBlock label="Accessories" className="min-h-56 lg:col-span-5" />
        </div>
      </section>

      {/* 1934 */}
      <section className="grid items-end gap-6 px-5 pb-16 sm:px-10 sm:pb-24 lg:grid-cols-[auto_minmax(22rem,1fr)] lg:gap-16">
        <h2 className="font-display text-[clamp(7rem,20vw,20rem)] leading-[0.8] text-magenta">
          1934
        </h2>
        <div className="max-w-[46ch] lg:pb-4">
          <p className="text-2xl leading-snug font-semibold">
            A New York family business.
          </p>
          <p className="mt-4 text-xl leading-relaxed">
            Danice opened on 14th Street in 1934. Four generations later, we are
            still a family business, still in New York, and still doing the same
            thing.
          </p>
          <p className="mt-5 text-xl font-semibold">
            <Link
              href="/our-story"
              className="underline underline-offset-4 hover:text-magenta"
            >
              Read our story
            </Link>
          </p>
        </div>
      </section>

      {/* Work here */}
      <section className="bg-magenta px-5 py-14 sm:px-10 sm:py-20">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white">
          We are hiring in our stores.
        </h2>
        <p className="mt-8">
          <Button href="/careers" variant="white">
            See open jobs
          </Button>
        </p>
      </section>
    </>
  );
}
