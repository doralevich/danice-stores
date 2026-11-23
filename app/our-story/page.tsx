import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Danice opened on 14th Street in Manhattan in 1934. Four generations later it is still a family owned New York business.",
};

// Copy uses facts the brief marks CONFIRMED. Still to verify with the client
// before adding: the founder's name, the regions served today, and milestones.
const timeline = [
  {
    year: "1934",
    text: "The first Danice opens on 14th Street, near Union Square in Manhattan.",
  },
  {
    year: "Today",
    text: "Four generations later, Danice is still family owned and operated.",
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
            Danice opened its doors in 1934 on 14th Street in Manhattan. It
            started the way a lot of New York stories start: with a family, a
            storefront, and a lot of work.
          </p>
          <p>
            Four generations later, Danice is still family owned and operated.
            We have grown from that one store into a group of neighborhood
            shops.
          </p>
          <p>
            What we do has not changed. We bring in the styles women want right
            now and price them so you can actually buy them. Every size is
            welcome here, and always has been.
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
                <dd className="mt-3 max-w-[36ch] text-xl leading-relaxed">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="max-w-[22ch] text-3xl leading-tight font-extrabold sm:text-4xl">
          Affordable fashion for women of any size.
        </p>
        <p className="mt-8">
          <Button href="/stores">Find a store</Button>
        </p>
      </section>
    </>
  );
}
