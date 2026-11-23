import Link from "next/link";
import { Logo } from "./Logo";

const nav = [
  { href: "/#stores", label: "Stores" },
  { href: "/#story", label: "Our story" },
  { href: "/contact", label: "Contact" },
];

// Blush band: the background the logo was drawn on.
export function Header() {
  return (
    <header className="bg-blush">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
        <Link href="/" className="block w-40 shrink-0 sm:w-48">
          <Logo trimmed priority />
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-5 text-lg font-semibold sm:gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:text-magenta-deep hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
