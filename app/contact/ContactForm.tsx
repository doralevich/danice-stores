"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";
import { contactTopics } from "./topics";

const initialState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", email: "", topic: "", message: "" },
};

const field =
  "mt-1.5 block w-full rounded-[10px] border border-plum/40 bg-white px-3.5 py-2.5 text-lg text-plum focus:border-magenta focus:outline-2 focus:outline-offset-0 focus:outline-magenta aria-invalid:border-magenta-deep";
const label = "block text-lg font-semibold";

function FieldError({ id, text }: { id: string; text?: string }) {
  return text ? (
    <p id={id} className="mt-1.5 font-semibold text-magenta-deep">
      {text}
    </p>
  ) : null;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-[10px] border-l-4 border-magenta bg-blush p-6">
        <h2 className="text-2xl font-bold">Thank you. Your message is on its way.</h2>
        <p className="mt-2 text-lg">We will reply to the email address you gave us.</p>
      </div>
    );
  }

  const { errors, values } = state;
  return (
    <form action={formAction} noValidate className="grid gap-5">
      {state.status === "error" ? (
        <p role="alert" className="rounded-[10px] border-l-4 border-magenta-deep bg-blush p-4 text-lg font-semibold">
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          defaultValue={values.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={field}
        />
        <FieldError id="name-error" text={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={values.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={field}
        />
        <FieldError id="email-error" text={errors.email} />
      </div>

      <div>
        <label htmlFor="topic" className={label}>
          Topic
        </label>
        <select
          // Remount after a failed submit so the chosen topic is kept.
          key={values.topic}
          id="topic"
          name="topic"
          required
          defaultValue={values.topic}
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={errors.topic ? "topic-error" : undefined}
          className={field}
        >
          <option value="">Choose one</option>
          {contactTopics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
        <FieldError id="topic-error" text={errors.topic} />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={field}
        />
        <FieldError id="message-error" text={errors.message} />
      </div>

      {/* Honeypot for bots. Hidden from people and assistive technology. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-[10px] bg-magenta px-6 py-3 text-xl font-bold text-white hover:bg-magenta-deep focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-plum disabled:bg-plum/50"
        >
          {pending ? "Sending" : "Send message"}
        </button>
      </div>
    </form>
  );
}
