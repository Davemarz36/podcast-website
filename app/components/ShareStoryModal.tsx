"use client";

import { Check, LoaderCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { getSupabaseClient } from "../lib/supabase-client";
import { RichTextEditor } from "./RichTextEditor";

type Errors = {
  name?: string;
  email?: string;
  background?: string;
  story?: string;
  form?: string;
};
type Status = "idle" | "loading" | "success" | "error";

export function ShareStoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [story, setStory] = useState({ html: "", text: "" });

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // Reset transient state when the modal is fully closed.
  useEffect(() => {
    if (open) return;
    const timeout = window.setTimeout(() => {
      setStatus("idle");
      setErrors({});
      setStory({ html: "", text: "" });
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const background = String(data.get("background") ?? "").trim();

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (background.length < 10) nextErrors.background = "Tell us a little about who you are.";
    if (story.text.length < 20) nextErrors.story = "Please write at least a short summary of your story.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("stories").insert({
        name,
        email,
        background,
        story_html: story.html,
        story_text: story.text,
      });
      if (error) throw error;
      form.reset();
      setStory({ html: "", text: "" });
      setStatus("success");
    } catch (error) {
      console.log("[v0] Story submission failed:", error);
      setErrors({ form: "We could not send your story just now. Please try again." });
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative my-auto w-full max-w-2xl border border-white/18 bg-[#0a0a0a] p-6 font-sans text-white shadow-2xl sm:p-9"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="py-6" role="status" aria-live="polite">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white">
              <Check className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <h2 id={titleId} className="mt-6 text-3xl font-medium tracking-[-0.04em]">
              Thank you for trusting us.
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-white/62">
              We have received your story. If it is the right fit for an upcoming conversation, we will reach out by email.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 border border-white bg-white px-7 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow text-white/64">Share a story</p>
            <h2 id={titleId} className="mt-3 text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
              Tell us about your story.
            </h2>
            <p id={descId} className="mt-3 max-w-lg text-base leading-7 text-white/62">
              Every conversation begins with someone willing to speak honestly. Share who you are and the story you would like us to hear.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5">
              <Field id="name" label="Your name" autoComplete="name" error={errors.name} />
              <Field id="email" label="Email address" type="email" autoComplete="email" error={errors.email} />

              <div>
                <label htmlFor="background" className="block text-sm font-semibold text-white/72">
                  A little about who you are
                </label>
                <textarea
                  id="background"
                  name="background"
                  rows={3}
                  aria-invalid={Boolean(errors.background)}
                  aria-describedby={errors.background ? "background-error" : undefined}
                  className="mt-2 w-full resize-y border border-white/28 bg-transparent px-4 py-3 text-base leading-7 text-white outline-none transition focus:border-white focus:ring-1 focus:ring-white"
                />
                {errors.background && (
                  <p id="background-error" className="mt-2 text-sm text-white/72" role="alert">
                    {errors.background}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="story" className="block text-sm font-semibold text-white/72">
                  Your story
                </label>
                <div className="mt-2">
                  <RichTextEditor
                    id="story"
                    ariaLabel="Your story"
                    onChange={setStory}
                    onEmptyChange={() => {
                      if (errors.story) setErrors((prev) => ({ ...prev, story: undefined }));
                    }}
                  />
                </div>
                {errors.story && (
                  <p className="mt-2 text-sm text-white/72" role="alert">
                    {errors.story}
                  </p>
                )}
              </div>

              {status === "error" && errors.form && (
                <p className="text-sm text-white/72" role="alert">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 inline-flex min-h-12 w-full items-center justify-center gap-3 border border-white bg-white px-6 text-sm font-bold tracking-[-0.01em] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-wait disabled:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {status === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {status === "loading" ? "Sending…" : "Send my story"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-white/72">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 min-h-12 w-full border border-white/28 bg-transparent px-4 text-base text-white outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-white/72" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
