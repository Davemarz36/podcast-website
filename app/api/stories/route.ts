import { createClient } from "@supabase/supabase-js";
import sanitizeHtml from "sanitize-html";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const maxRequestBytes = 64_000;

type StoryRequest = {
  name?: unknown;
  email?: unknown;
  background?: unknown;
  storySummaryHtml?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Send this form as JSON." }, { status: 415 });
  }

  const rawBody = await request.text();
  if (rawBody.length > maxRequestBytes) {
    return NextResponse.json({ error: "This story is too long to submit." }, { status: 413 });
  }

  let body: StoryRequest;
  try {
    body = JSON.parse(rawBody) as StoryRequest;
  } catch {
    return NextResponse.json({ error: "We could not read this submission." }, { status: 400 });
  }

  // Quietly accept bot-filled submissions without writing them to the database.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const background = cleanText(body.background);
  const storySummaryHtml = sanitizeHtml(typeof body.storySummaryHtml === "string" ? body.storySummaryHtml : "", {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "ul", "ol", "li", "blockquote", "div"],
    allowedAttributes: {},
    transformTags: {
      b: "strong",
      i: "em",
      div: "p",
    },
  });
  const storySummaryText = sanitizeHtml(storySummaryHtml, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (background.length < 20 || background.length > 2_000) {
    return NextResponse.json({ error: "Please tell us a little more about yourself." }, { status: 400 });
  }
  if (storySummaryText.length < 50 || storySummaryText.length > 10_000) {
    return NextResponse.json({ error: "Please share a little more of your story." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseSecret) {
    console.error("Story submission is missing Supabase server environment variables.");
    return NextResponse.json(
      { error: "Story submissions are not available just now. Please try again later." },
      { status: 503 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseSecret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { error } = await supabase.from("story_submissions").insert({
    name,
    email,
    background,
    story_summary_html: storySummaryHtml,
    story_summary_text: storySummaryText,
    source: "website",
    status: "new",
  });

  if (error) {
    console.error("Supabase story submission failed:", error.code, error.message);
    return NextResponse.json(
      { error: "We could not save your story just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}
