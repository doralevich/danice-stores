"use server";

import { contactTopics } from "./topics";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "topic" | "message", string>>;
  values: { name: string; email: string; topic: string; message: string };
};

const clean = (value: FormDataEntryValue | null, max: number) =>
  (typeof value === "string" ? value : "").trim().slice(0, max);

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: oneLine(clean(formData.get("name"), 100)),
    email: clean(formData.get("email"), 200),
    topic: clean(formData.get("topic"), 50),
    message: clean(formData.get("message"), 5000),
  };

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (clean(formData.get("company_website"), 200) !== "") {
    return { status: "sent", message: "", errors: {}, values: emptyValues };
  }

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter an email address we can reply to.";
  if (!contactTopics.includes(values.topic)) errors.topic = "Choose a topic.";
  if (values.message.length < 10) errors.message = "Tell us a little more.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields.", errors, values };
  }

  // Delivery goes through Mandrill (Mailchimp Transactional), configured with
  // environment variables in Vercel: MANDRILL_API_KEY, CONTACT_TO_EMAIL,
  // CONTACT_FROM_EMAIL. The from address must be on a domain verified in Mandrill.
  const { MANDRILL_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!MANDRILL_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return {
      status: "error",
      message:
        "This form is not connected to an inbox yet, so your message was not sent.",
      errors: {},
      values,
    };
  }

  try {
    const response = await fetch("https://mandrillapp.com/api/1.0/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: MANDRILL_API_KEY,
        message: {
          from_email: CONTACT_FROM_EMAIL,
          from_name: "Danice Stores website",
          to: CONTACT_TO_EMAIL.split(",").map((address) => ({
            email: address.trim(),
            type: "to",
          })),
          headers: { "Reply-To": values.email },
          subject: `[${values.topic}] Website message from ${values.name}`,
          text: `Topic: ${values.topic}\nName: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
        },
      }),
    });
    if (!response.ok) throw new Error(`Mandrill responded ${response.status}`);
    // Mandrill answers 200 with a per-recipient status even when it refuses.
    const results: { status?: string; reject_reason?: string }[] = await response.json();
    const accepted = results.some((r) => r.status === "sent" || r.status === "queued");
    if (!accepted) {
      throw new Error(
        `Mandrill did not accept the message: ${results.map((r) => `${r.status} ${r.reject_reason ?? ""}`).join(", ")}`,
      );
    }
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return {
      status: "error",
      message: "We could not send your message. Please try again in a few minutes.",
      errors: {},
      values,
    };
  }

  return { status: "sent", message: "", errors: {}, values: emptyValues };
}

const emptyValues = { name: "", email: "", topic: "", message: "" };
