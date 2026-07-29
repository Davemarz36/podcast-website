"use client";

import { Bold, Check, Italic, List, ListOrdered, LoaderCircle, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";

type SubmissionStatus = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "background" | "story" | "form", string>>;

const limits = {
  name: 120,
  background: 2_000,
  story: 10_000,
};

export function StorySubmissionDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [storyText, setStoryText] = useState("");

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function openDialog() {
    setStatus("idle");
    setErrors({});
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    window.setTimeout(() => nameRef.current?.focus(), 0);
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleClose() {
    document.body.style.overflow = "";
    triggerRef.current?.focus();
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeDialog();
  }

  function formatStory(command: "bold" | "italic" | "insertUnorderedList" | "insertOrderedList") {
    editorRef.current?.focus();
    document.execCommand(command);
    updateStoryValue();
  }

  function updateStoryValue() {
    setStoryText(editorRef.current?.innerText.trim() ?? "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const background = String(data.get("background") ?? "").trim();
    const storySummaryHtml = editorRef.current?.innerHTML.trim() ?? "";
    const summaryText = editorRef.current?.innerText.trim() ?? "";
    const website = String(data.get("website") ?? "");
    const nextErrors: FieldErrors = {};

    if (name.length < 2 || name.length > limits.name) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (background.length < 20 || background.length > limits.background) {
      nextErrors.background = "Tell us a little about yourself (at least 20 characters).";
    }
    if (summaryText.length < 50 || summaryText.length > limits.story) {
      nextErrors.story = "Share at least 50 characters so we can understand the heart of your story.";
    }

    setErrors(nextErrors);
    setStatus("idle");
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, background, storySummaryHtml, website }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error || "Submission failed");

      form.reset();
      if (editorRef.current) editorRef.current.innerHTML = "";
      setStoryText("");
      setStatus("success");
    } catch (error) {
      setErrors({
        form: error instanceof Error
          ? error.message
          : "We could not save your story just now. Please try again.",
      });
      setStatus("error");
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        id="share-story"
        type="button"
        onClick={openDialog}
        className="group inline-flex min-h-12 items-center justify-center border border-white/45 bg-black/60 px-5 py-3 text-sm font-bold tracking-[-0.01em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-7"
      >
        Share a Story
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="story-dialog-title"
        aria-describedby="story-dialog-description"
        onClose={handleClose}
        onClick={handleBackdropClick}
        className="story-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[min(calc(100%-1.5rem),58rem)] overflow-y-auto border border-black/20 bg-white p-0 text-[#090503] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/12 bg-white px-5 py-4 sm:px-8">
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-black/48">Share a story</p>
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close story form"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/20 text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 py-16 sm:px-12 sm:py-24" role="status" aria-live="polite">
            <Check className="h-7 w-7" aria-hidden="true" />
            <h2 id="story-dialog-title" className="mt-8 max-w-2xl text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Thank you for trusting us with your story.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-black/58">
              Your submission has been received. Our team will read it with care and contact you if it is a fit for a future conversation.
            </p>
            <button
              type="button"
              onClick={closeDialog}
              className="mt-9 inline-flex min-h-12 items-center justify-center border border-black bg-black px-7 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Return to the site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-black/12 bg-[#f5f5f3] px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
              <h2 id="story-dialog-title" className="text-[clamp(2.7rem,6vw,4.7rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                Your story matters before it is finished.
              </h2>
              <p id="story-dialog-description" className="mt-6 max-w-md text-sm leading-7 text-black/58">
                Tell us who you are and share the part of your journey you believe someone else may need to hear. You do not need to have every answer.
              </p>
              <p className="mt-8 border-t border-black/12 pt-6 text-xs leading-6 text-black/45">
                We will use these details only to review your story and contact you about a possible conversation.
              </p>
            </div>

            <div className="px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField ref={nameRef} id="name" label="Your name" autoComplete="name" error={errors.name} />
                <TextField id="email" label="Email address" type="email" autoComplete="email" error={errors.email} />
              </div>

              <div className="mt-6">
                <label htmlFor="background" className="block text-sm font-bold">A little about you</label>
                <p className="mt-1 text-xs leading-5 text-black/48">Where you are from, what you do, or the season of life you are navigating.</p>
                <textarea
                  id="background"
                  name="background"
                  rows={4}
                  maxLength={limits.background}
                  aria-invalid={Boolean(errors.background)}
                  aria-describedby={errors.background ? "background-error" : undefined}
                  className="mt-3 w-full resize-y border border-black/22 bg-white px-4 py-3 text-base leading-7 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
                {errors.background && <FieldError id="background-error">{errors.background}</FieldError>}
              </div>

              <div className="mt-6">
                <label id="story-summary-label" className="block text-sm font-bold">A summary of your story</label>
                <p className="mt-1 text-xs leading-5 text-black/48">What happened, what changed, and why this story may help someone else.</p>
                <div className="mt-3 border border-black/22 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <div className="flex gap-1 border-b border-black/14 bg-[#f5f5f3] p-2" role="toolbar" aria-label="Story formatting">
                    <FormatButton label="Bold" onClick={() => formatStory("bold")}><Bold aria-hidden="true" /></FormatButton>
                    <FormatButton label="Italic" onClick={() => formatStory("italic")}><Italic aria-hidden="true" /></FormatButton>
                    <FormatButton label="Bulleted list" onClick={() => formatStory("insertUnorderedList")}><List aria-hidden="true" /></FormatButton>
                    <FormatButton label="Numbered list" onClick={() => formatStory("insertOrderedList")}><ListOrdered aria-hidden="true" /></FormatButton>
                  </div>
                  <div
                    ref={editorRef}
                    contentEditable
                    role="textbox"
                    aria-multiline="true"
                    aria-labelledby="story-summary-label"
                    aria-invalid={Boolean(errors.story)}
                    aria-describedby={errors.story ? "story-error" : undefined}
                    data-placeholder="Begin wherever the story feels most honest…"
                    onInput={updateStoryValue}
                    suppressContentEditableWarning
                    className="rich-text-editor min-h-52 px-4 py-4 text-base leading-7 outline-none"
                  />
                </div>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <div>{errors.story && <FieldError id="story-error">{errors.story}</FieldError>}</div>
                  <span className="shrink-0 text-xs text-black/40">{storyText.length.toLocaleString()} / {limits.story.toLocaleString()}</span>
                </div>
              </div>

              <div className="absolute left-[-10000px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {errors.form && <p className="mt-6 border-l-2 border-black pl-4 text-sm leading-6" role="alert">{errors.form}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 border border-black bg-black px-7 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {status === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {status === "loading" ? "Sharing your story…" : "Submit My Story"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}

const TextField = forwardRef<HTMLInputElement, {
  id: string;
  label: string;
  type?: string;
  autoComplete: string;
  error?: string;
}>(function TextField({ id, label, type = "text", autoComplete, error }, ref) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold">{label}</label>
      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        maxLength={id === "name" ? limits.name : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-3 min-h-12 w-full border border-black/22 bg-white px-4 text-base outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
});

function FieldError({ id, children }: { id: string; children: string }) {
  return <p id={id} className="mt-2 text-sm leading-5 text-black/68" role="alert">{children}</p>;
}

function FormatButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center text-black/62 transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black [&>svg]:h-4 [&>svg]:w-4"
    >
      {children}
    </button>
  );
}
