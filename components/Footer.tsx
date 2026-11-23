import Link from "next/link";
import { company } from "@/data/company";
import { Logo } from "./Logo";

const links = [
  { href: "/#stores", label: "Stores" },
  { href: "/our-story", label: "Our Story" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/store-policies", label: "Store Policies" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/accessibility", label: "Accessibility" },
];

export function Footer() {
  const { office, social } = company;
  return (
    <footer className="grid gap-10 border-t-4 border-magenta px-5 py-12 sm:px-10 md:grid-cols-[1fr_auto_auto] md:gap-20">
      <div>
        <div className="w-56">
          <Logo trimmed />
        </div>
      </div>
      <address className="text-lg leading-relaxed not-italic">
        <strong className="font-semibold">{company.legalName}</strong>
        <br />
        {office.street}
        <br />
        {office.city}, {office.state} {office.zip}
        <br />
        <a
          href={social.instagram.url}
          className="font-semibold underline underline-offset-4 hover:text-magenta"
        >
          Instagram {social.instagram.handle}
        </a>
      </address>
      <ul className="columns-2 gap-10 text-lg leading-relaxed md:columns-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline-offset-4 hover:text-magenta hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
