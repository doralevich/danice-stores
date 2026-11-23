import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <h1 className="text-4xl font-extrabold sm:text-5xl">This page is not here yet.</h1>
      <p className="mt-5 max-w-[50ch] text-xl">
        We are still building this part of the site. In the meantime, find your
        nearest Danice.
      </p>
      <p className="mt-8">
        <Button href="/stores">Find a store</Button>
      </p>
    </section>
  );
}
