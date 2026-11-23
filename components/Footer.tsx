import Link from "next/link";
import { company } from "@/data/company";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "./SocialIcons";

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
        <div className="flex flex-col gap-3 sm:items-end">
          <Link href="/contact" className="font-semibold underline underline-offset-4 hover:text-magenta-deep">
            Contact us
          </Link>
          <ul className="flex gap-4">
            {[
              { href: social.instagram.url, label: "Danice on Instagram", Icon: InstagramIcon },
              { href: social.facebook.url, label: "Danice on Facebook", Icon: FacebookIcon },
              { href: social.linkedin.url, label: "Danice on LinkedIn", Icon: LinkedInIcon },
              { href: `mailto:${company.email}`, label: "Email Danice", Icon: EmailIcon },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} className="block hover:text-magenta-deep">
                  <Icon className="size-8" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
