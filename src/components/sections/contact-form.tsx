"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type Fields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

/** Minimal shape check. Real validation belongs on the server too. */
function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (!fields.name.trim()) errors.name = "Please tell us your name.";

  if (!fields.email.trim()) {
    errors.email = "We need an email address to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }

  if (!fields.message.trim()) {
    errors.message = "Let us know how we can help.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "A little more detail will get you a better answer.";
  }

  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    // Clear the error as soon as the user starts fixing the field.
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    // ---------------------------------------------------------------------
    // TODO: BACKEND NOT WIRED UP.
    //
    // This is a front-end-only stub — nothing is sent anywhere. Replace the
    // console.log + delay below with a real submission, e.g.:
    //
    //   const response = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(fields),
    //   });
    //   if (!response.ok) throw new Error("Request failed");
    //
    // That route handler should: validate server-side, add spam protection
    // (honeypot/captcha + rate limiting), and forward to interconnection@
    // chat-link.net or your CRM. Read the destination and any keys from env
    // vars — never hardcode them. See `.env.example`.
    // ---------------------------------------------------------------------
    console.log("[contact] submission (stub, not sent anywhere):", fields);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-accent/30 bg-accent/5 flex flex-col items-start gap-4 rounded-xl border p-8"
      >
        <CheckCircle2 className="text-accent size-8" aria-hidden="true" />
        <h2 className="text-fg text-xl font-semibold tracking-tight">Thanks — that&apos;s in.</h2>
        <p className="text-fg-muted leading-relaxed text-pretty">
          {/* TODO: nothing was actually sent — the submit handler is still a
              stub. Also confirm the response-time promise below. */}
          We&apos;ll be in touch shortly. If it&apos;s urgent, email us directly at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-accent font-medium hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={fields.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={fields.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
        />
      </div>

      <Field
        id="phone"
        label="Phone number"
        type="tel"
        value={fields.phone}
        error={errors.phone}
        onChange={(value) => update("phone", value)}
        autoComplete="tel"
      />

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-fg text-sm font-medium">
          Message
          <span className="text-accent ml-1" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us which destinations you need, your monthly volume, and whether you're after voice, SMS, or both."
          className={cn(
            "border-border bg-surface text-fg placeholder:text-fg-subtle focus:border-accent resize-y rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none",
            errors.message && "border-red-500/70",
          )}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="text-sm text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-500">
          Something went wrong sending that. Please try again, or email us directly.
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send
            </>
          )}
        </Button>
        <p className="text-fg-subtle text-xs leading-relaxed text-pretty">
          {/* TODO: link to the real privacy policy once /privacy exists. */}
          By submitting this form you agree to us contacting you about your enquiry.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  autoComplete,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-fg text-sm font-medium">
        {label}
        {required ? (
          <span className="text-accent ml-1" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "border-border bg-surface text-fg placeholder:text-fg-subtle focus:border-accent h-11 rounded-lg border px-3 text-sm transition-colors outline-none",
          error && "border-red-500/70",
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
