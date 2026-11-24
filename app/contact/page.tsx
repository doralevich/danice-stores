import type { Metadata } from "next";
import { company } from "@/data/company";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Danice Stores corporate office about customer service, careers, leasing, vendors, or press.",
};

export default function Contact() {
  const { office } = company;
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[2fr_3fr] md:gap-16">
      <div>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] font-extrabold tracking-tight">
          Contact us
        </h1>
        <p className="mt-5 text-xl leading-relaxed">
          Send a message to our corporate office and we will get it to the
          right person.
        </p>

        <h2 className="mt-10 text-xl font-bold">Corporate office</h2>
        <address className="mt-2 text-lg leading-relaxed not-italic">
          {company.legalName}
          <br />
          {office.street}
          <br />
          {office.city}, {office.state} {office.zip}
        </address>
      </div>

      <ContactForm />
    </div>
  );
}
