import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Danice opened on 14th Street in New York City in 1934. More than 90 years and four generations later, it is still family owned, with the same vision: high fashion at affordable prices.",
};

// Copy is drawn from the company's own LinkedIn "About" text and the facts the
// brief marks CONFIRMED. Left out until the client confirms current figures:
// the store count ("over 50"), the states listed, and the team size ("650+").
// Also still to verify: the founder's name and further milestones.
const timeline = [
  {
    year: "1934",
    text: "The first Danice opens on 14th Street, near Union Square in Manhattan.",
  },
  {
    year: "Today",
    text: "More than 90 years and four generations later, Danice is still family owned and operated.",
  },
];

export default function OurStory() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <h1 className="max-w-[18ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-tight">
          A New York family business{" "}
          <span className="text-magenta">since 1934.</span>
        </h1>
        <div className="mt-8 max-w-[60ch] space-y-5 text-xl leading-relaxed">
          <p>
            Danice opened its doors in 1934 on 14th Street in New York City.
            More than 90 years and the best customers in the business later, we
            are still here, and still growing, with the same vision: high
            fashion at affordable prices.
          </p>
          <p>
            For nine decades and counting, trend-savvy shoppers have known
            Danice as the place for today&rsquo;s hottest styles at the best
            possible prices. We work to stay ahead, and we never compromise on
            style.
          </p>
          <p>
            Danice is family owned and operated, now in its fourth generation.
            Along the way we have turned the off-price store into something
            closer to a fashion boutique, where every size is welcome and always
            has been.
          </p>
          <p>
            We are proud of that history, and we are looking forward to what
            comes next.
          </p>
        </div>
      </section>

      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="sr-only">Timeline</h2>
          <dl className="grid gap-8 md:grid-cols-2 md:gap-14">
            {timeline.map((item) => (
              <div key={item.year}>
                <dt className="text-5xl leading-none font-extrabold tracking-tight text-magenta sm:text-6xl">
                  {item.year}
                </dt>
                <dd className="mt-3 max-w-[36ch] text-xl leading-relaxed">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Our Team</h2>
        <ul className="mt-8 grid gap-10">
          {company.team.map((person) => (
            <li
              key={person.name}
              className="grid items-start gap-8 md:grid-cols-2 md:gap-14"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={800}
                  height={800}
                  className="size-48 shrink-0 object-cover sm:size-56"
                  sizes="224px"
                />
                <div>
                  <h3 className="text-2xl leading-tight font-bold">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-magenta-deep">
                    {person.title}
                  </p>
                  <p className="mt-3 max-w-[48ch] text-lg leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </div>
              <figure className="border-l-4 border-magenta bg-blush p-6 sm:p-8">
                <blockquote className="text-2xl leading-snug font-semibold">
                  &ldquo;{person.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-base leading-relaxed">
                  {person.name}, {person.quote.source}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="max-w-[22ch] text-3xl leading-tight font-extrabold sm:text-4xl">
          Where fashion meets finance.
        </p>
        <p className="mt-4 max-w-[40ch] text-xl leading-relaxed">
          Affordable fashion for women of any size.
        </p>
        <p className="mt-8">
          <Button href="/stores">Find a store</Button>
        </p>
      </section>
    </>
  );
}
