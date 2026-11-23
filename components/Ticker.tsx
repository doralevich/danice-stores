import { visibleStores } from "@/data/stores";
import { Petal } from "./Petal";

function Run({ names }: { names: string[] }) {
  return (
    <ul className="flex shrink-0 items-center">
      {names.map((name, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-5 sm:px-7">{name}</span>
          <Petal className="w-6 sm:w-7" />
        </li>
      ))}
    </ul>
  );
}

// The one moving thing on the site: store neighborhoods scrolling slowly, like
// a window sign. Stops under prefers-reduced-motion (see globals.css).
export function Ticker() {
  const names = visibleStores.map((s) => s.neighborhood);
  // Repeat so a short list still fills a wide screen.
  const filled = Array.from({ length: Math.ceil(12 / names.length) }, () => names).flat();

  return (
    <div className="overflow-hidden bg-petal py-3 text-xl font-semibold sm:text-2xl">
      <p className="sr-only">Our neighborhoods: {names.join(", ")}.</p>
      <div className="ticker flex w-max" aria-hidden="true">
        <Run names={filled} />
        <Run names={filled} />
      </div>
    </div>
  );
}
