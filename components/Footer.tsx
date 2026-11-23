import Link from "next/link";
import { company } from "@/data/company";

export function Footer() {
  const { office, social } = company;
  return (
    <footer className="bg-blush">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-base leading-relaxed sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <address className="not-italic">
          <strong className="font-semibold">{company.legalName}</strong>
          <br />
          {office.street}
          <br />
          {office.city}, {office.state} {office.zip}
        </address>
        <p className="flex flex-col gap-1 sm:items-end">
          <Link href="/contact" className="font-semibold underline underline-offset-4 hover:text-magenta-deep">
            Contact us
          </Link>
          <a
            href={social.instagram.url}
            className="font-semibold underline underline-offset-4 hover:text-magenta-deep"
          >
            Instagram {social.instagram.handle}
          </a>
        </p>
      </div>
    </footer>
  );
}
