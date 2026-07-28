"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type Errors = { firstName?: string; email?: string };

export function NewsletterForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const nextErrors: Errors = {};

    if (firstName.length < 2) nextErrors.firstName = "Please enter your first name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    // INTEGRATION: Replace this local delay with your email platform or newsletter API.
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="border border-copper/35 bg-copper/10 p-6 text-ivory" role="status" aria-live="polite">
        <Check className="h-6 w-6 text-copper" aria-hidden="true" />
        <h3 className="mt-5 font-display text-3xl">You are on the first-listeners list.</h3>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Thank you. We will let you know when the first conversation is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8" aria-label="Join the First Listeners">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label="First name" error={errors.firstName} />
        <Field id="email" label="Email address" type="email" error={errors.email} />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-clay px-6 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-copper disabled:cursor-wait disabled:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper sm:w-auto"
      >
        {status === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "loading" ? "Joining…" : "Join the First Listeners"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/65">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id === "email" ? "email" : "given-name"}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 min-h-12 w-full border border-white/20 bg-white/5 px-4 text-base text-white outline-none transition focus:border-copper focus:ring-1 focus:ring-copper"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#e7aa8e]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
