import Link from "next/link";
import { excerpt, formatPostDate, sortedPosts } from "@/data/blog";
import { company } from "@/data/company";
import { Button } from "@/components/Button";
import { HeroFlower } from "@/components/HeroFlower";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Petal } from "@/components/Petal";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: company.url,
  foundingDate: String(company.founded),
  sameAs: [company.social.instagram.url, company.social.linkedin.url],
};

const carry = ["Clothing", "Plus size", "Footwear", "Accessories"];

const wrap = "mx-auto max-w-6xl px-5 sm:px-8";
const h2 = "text-3xl font-extrabold sm:text-4xl";

const latestPosts = sortedPosts.slice(0, 3);

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
              Women&rsquo;s fashion, footwear, and accessories for every size. A
              New York family business since 1934.
            </p>
            <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/our-story">Our Story</Button>
              <Link
                href="/contact"
                className="text-lg font-semibold underline underline-offset-4 hover:text-magenta-deep"
              >
                Contact us
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
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-extrabold tracking-tight">
            Stores throughout <span className="text-magenta">NY, NJ, PA, FL</span>
          </h2>
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

      {/* Latest blog posts */}
      {latestPosts.length > 0 ? (
        <section className="border-t border-plum/15">
          <div className={`${wrap} py-14 sm:py-20`}>
            <h2 className={h2}>From the blog</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <article className="flex h-full flex-col rounded-[10px] border border-plum/15 p-6">
                    <p className="text-base font-semibold text-magenta-deep">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    </p>
                    <h3 className="mt-2 text-xl leading-snug font-extrabold">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-magenta-deep hover:underline hover:underline-offset-4"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed">{excerpt(post, 140)}</p>
                    <p className="mt-auto pt-5 text-lg font-semibold">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="underline underline-offset-4 hover:text-magenta-deep"
                      >
                        Read more<span className="sr-only">: {post.title}</span>
                      </Link>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg font-semibold">
              <Link href="/blog" className="underline underline-offset-4 hover:text-magenta-deep">
                See all posts
              </Link>
            </p>
          </div>
        </section>
      ) : null}

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
