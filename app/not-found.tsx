import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="px-5 py-20 sm:px-10 sm:py-28">
      <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] text-magenta">
        This page is not here yet.
      </h1>
      <p className="mt-6 max-w-[50ch] text-xl">
        We are still building this part of the site. In the meantime, find your
        nearest Danice.
      </p>
      <p className="mt-8">
        <Button href="/#stores">Find a store</Button>
      </p>
    </section>
  );
}
