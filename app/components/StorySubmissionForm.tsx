"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { storyOptions } from "../data/content";

type FormErrors = Record<string, string>;

export function StorySubmissionForm() {
  const [selection, setSelection] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const reduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: FormErrors = {};
    const required = ["name", "email", "location", "summary", "importance", "contact"];

    required.forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) nextErrors[field] = "This field is required.";
    });
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!data.get("consent")) nextErrors.consent = "Please confirm your consent to continue.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    // INTEGRATION: Send the validated payload to your secure form API or CRM here.
    await new Promise((resolve) => window.setTimeout(resolve, 950));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="mt-10 border border-charcoal/20 bg-paper p-7" role="status" aria-live="polite">
        <Check className="h-7 w-7 text-clay" aria-hidden="true" />
        <h3 className="mt-5 font-display text-4xl text-charcoal">Your story is safely with us.</h3>
        <p className="mt-4 max-w-xl leading-7 text-ink/65">
          Thank you for trusting us with it. This is a private mock submission for now; no information has been sent to an external service.
        </p>
        <button
          type="button"
          onClick={() => {
            setSelection("");
            setStatus("idle");
          }}
          className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-clay underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
        >
          Share another
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid gap-3 md:grid-cols-3" role="group" aria-label="Choose how you would like to contribute">
        {storyOptions.map((option) => {
          const active = selection === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelection(option.id)}
              className={`min-h-32 border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay ${
                active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/20 bg-transparent text-charcoal hover:border-clay"
              }`}
            >
              <span className="block font-display text-2xl">{option.label}</span>
              <span className={`mt-3 block text-xs leading-5 ${active ? "text-white/55" : "text-ink/55"}`}>{option.caption}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selection && (
          <motion.form
            key={selection}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit}
            noValidate
            className="overflow-hidden"
            aria-label="Story submission"
          >
            <input type="hidden" name="storyType" value={selection} />
            <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
              <InputField id="name" label="Name" error={errors.name} autoComplete="name" />
              <InputField id="email" label="Email" type="email" error={errors.email} autoComplete="email" />
              <InputField id="location" label="Location" error={errors.location} autoComplete="country-name" />
              <div>
                <label htmlFor="contact" className="form-label">Preferred contact method</label>
                <select id="contact" name="contact" defaultValue="" aria-invalid={Boolean(errors.contact)} className="form-control">
                  <option value="" disabled>Select one</option>
                  <option>Email</option>
                  <option>Phone or WhatsApp</option>
                  <option>Video call</option>
                </select>
                <ErrorText id="contact" error={errors.contact} />
              </div>
              <TextAreaField id="summary" label="Short description" error={errors.summary} />
              <TextAreaField id="importance" label="Why this story matters" error={errors.importance} />
            </div>
            <div className="mt-6">
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink/70">
                <input name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-clay" aria-invalid={Boolean(errors.consent)} />
                <span>I consent to being contacted about this submission. I understand this form is currently a local mock experience.</span>
              </label>
              <ErrorText id="consent" error={errors.consent} />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-charcoal px-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-clay disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:w-auto"
            >
              {status === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === "loading" ? "Submitting…" : "Submit the story"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputField({ id, label, type = "text", error, autoComplete }: { id: string; label: string; type?: string; error?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="form-control" />
      <ErrorText id={id} error={error} />
    </div>
  );
}

function TextAreaField({ id, label, error }: { id: string; label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      <textarea id={id} name={id} rows={5} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="form-control resize-y" />
      <ErrorText id={id} error={error} />
    </div>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? <p id={`${id}-error`} className="mt-2 text-sm font-medium text-[#8a3f2e]" role="alert">{error}</p> : null;
}
