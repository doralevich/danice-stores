import Link from "next/link";
import { Logo } from "./Logo";

const nav = [
  { href: "/#stores", label: "Stores" },
  { href: "/our-story", label: "Our Story" },
  { href: "/careers", label: "Careers" },
];

export function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-4 sm:px-10">
      <Link href="/" className="block w-52 shrink-0 sm:w-64">
        <Logo trimmed priority />
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-6 text-lg font-semibold sm:gap-9">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="underline-offset-4 hover:text-magenta hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
