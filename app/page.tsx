import { Logo } from "@/components/Logo";

export default function ComingSoon() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <h1 className="sr-only">Danice Stores. Coming soon.</h1>
      <Logo className="h-auto w-full max-w-[22rem] sm:max-w-[30rem]" />
    </main>
  );
}
