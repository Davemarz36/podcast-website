# [PROJECT NAME] — Storytelling platform

A concise, production-ready pre-launch site for a story-led video conversation platform. Built with the Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## Run locally

Use Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Run the full quality check before publishing:

```bash
pnpm lint
pnpm test
pnpm build
```

## Deploy to Vercel

The default scripts use the native Next.js production runtime expected by Vercel. Import the GitHub repository into Vercel or run `vercel deploy --prod` from the project root. Vercel detects pnpm from `pnpm-lock.yaml` and the framework from `vercel.json`.

Set `NEXT_PUBLIC_SITE_URL` to the final custom domain if one is available. When it is omitted, the metadata, canonical URL, sitemap and robots file use Vercel's production URL automatically.

### Connect story submissions to Supabase

1. Create or select a Supabase project.
2. Run `supabase/migrations/20260729190000_create_story_submissions.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` for local development.
4. Add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` to the Vercel project for Production, Preview and Development. A legacy `SUPABASE_SERVICE_ROLE_KEY` also works as a fallback.
5. Redeploy after adding the Vercel environment variables.

The secret key is used only inside the server route and must never be prefixed with `NEXT_PUBLIC_`. The database table has Row Level Security enabled and no public insert or read policy; form submissions are written by the server-only Supabase client.

The original Sites-compatible commands remain available as `pnpm dev:sites`, `pnpm build:sites` and `pnpm start:sites`.

## Replace launch content

The editable launch details are centralised in `app/config/site.ts`:

- Change `name` once to replace the working title throughout the page and metadata.
- Update `mission`, `vision`, `belief`, `contactEmail`, `socials` and `disclaimer` with approved launch content.
- `storySubmissionUrl` points to the on-page story form trigger.
- Replace `newsletterIntegration` with the chosen email provider identifier, then connect its API in `app/components/NewsletterForm.tsx` at the `INTEGRATION` comment.
- Update `heroImage` after placing the approved documentary photograph in `public/images/`. Keep a portrait-orientation source with a meaningful crop for mobile.
- Replace `public/og.png` and `public/favicon.svg` with final brand assets if required.

The four conversation pillars live in `app/data/content.ts` so their order and wording can be edited without changing component markup.

The current hero is a local pre-launch placeholder sourced from [Pexels](https://www.pexels.com/photo/man-sitting-by-a-window-8328481/). Replace it with commissioned or licensed project photography before the final brand launch.

## Structure

```text
app/
  components/     Navigation, five page sections, form and footer
  config/         Central brand and integration configuration
  data/           Four repeatable conversation pillars
  globals.css     Design tokens and global responsive styles
  layout.tsx      Fonts and SEO/social metadata
  page.tsx        Concise landing-page composition
public/
  images/         Local documentary photography
```

The newsletter form still uses a local mock. The story form validates in both the browser and server, sanitises its rich-text summary and stores accepted submissions in Supabase. The server includes a honeypot field for basic bot filtering; add managed rate limiting or CAPTCHA if submission abuse becomes an issue.
