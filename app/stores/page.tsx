import type { Metadata } from "next";
import { visibleStores } from "@/data/stores";
import { StoreCard } from "@/components/StoreCard";

export const metadata: Metadata = {
  title: "Our Stores",
  description:
    "Find a Danice store near you: addresses, directions, and opening hours.",
};

export default function Stores() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-tight">
        Our Stores
      </h1>
      <p className="mt-5 max-w-[46ch] text-xl leading-relaxed">
        Find your Danice. Stop in for new styles every week, in every size.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStores.map((store) => (
          <StoreCard key={store.slug} store={store} />
        ))}
      </div>
    </section>
  );
}
