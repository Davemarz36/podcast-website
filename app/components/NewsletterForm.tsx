"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type Errors = { firstName?: string; email?: string; form?: string };
type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const nextErrors: Errors = {};

    if (firstName.length < 2) nextErrors.firstName = "Please enter your first name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    setStatus("idle");
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    try {
      // INTEGRATION: Replace this local mock with the provider named in siteConfig.newsletterIntegration.
      const result = await mockNewsletterSignup(email);
      if (!result.ok) throw new Error("Mock newsletter request failed");
      form.reset();
      setStatus("success");
    } catch {
      setErrors({ form: "We could not add you just now. Please try again." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-l-2 border-white bg-white/[0.04] p-6 text-white" role="status" aria-live="polite">
        <Check className="h-5 w-5 text-white" aria-hidden="true" />
        <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em]">You are on the list.</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/58">
          We will let you know when the first conversation is ready.
        </p>
      </div>
    );
  }

  return (
    <form id="newsletter-form" onSubmit={handleSubmit} noValidate aria-label="Join the First Listeners">
      <div className="grid gap-5">
        <Field id="firstName" label="First name" error={errors.firstName} />
        <Field id="email" label="Email address" type="email" error={errors.email} />
      </div>
      {status === "error" && errors.form && (
        <p className="mt-4 text-sm text-white/72" role="alert">{errors.form}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 border border-white bg-white px-6 text-sm font-bold tracking-[-0.01em] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-wait disabled:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {status === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "loading" ? "Joining…" : "Join the First Listeners"}
      </button>
    </form>
  );
}

async function mockNewsletterSignup(email: string) {
  await new Promise((resolve) => window.setTimeout(resolve, 700));
  return { ok: !email.toLowerCase().endsWith("@example.invalid") };
}

function Field({ id, label, error, type = "text" }: { id: string; label: string; error?: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-white/72">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id === "email" ? "email" : "given-name"}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 min-h-12 w-full border border-white/28 bg-transparent px-4 text-base text-white outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />
      {error && <p id={`${id}-error`} className="mt-2 text-sm text-white/72" role="alert">{error}</p>}
    </div>
  );
}
