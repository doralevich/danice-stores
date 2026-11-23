import { Logo } from "@/components/Logo";
import { company } from "@/data/company";

export default function ComingSoon() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 items-end justify-center px-6 pt-6 sm:pt-10">
        <Logo className="h-auto w-full max-w-[19rem] sm:max-w-[25rem]" />
      </div>

      {/* The sign band: the one loud element. */}
      <div className="bg-magenta px-6 py-9 text-center sm:py-12">
        <h1 className="font-display text-[clamp(2.75rem,11.5vw,9rem)] text-white">
          Coming soon
        </h1>
      </div>

      <div className="flex flex-1 items-start justify-center px-6 pt-8 pb-12 sm:pt-10">
        <p className="max-w-[34ch] text-center sm:max-w-[50ch] text-lg leading-snug font-semibold text-balance sm:text-xl">
          {company.summary}
        </p>
      </div>
    </main>
  );
}
