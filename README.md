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

## Replace launch content

The editable launch details are centralised in `app/config/site.ts`:

- Change `name` once to replace the working title throughout the page and metadata.
- Update `mission`, `vision`, `belief`, `contactEmail`, `socials` and `disclaimer` with approved launch content.
- Replace `storySubmissionUrl` with the final external form or email route.
- Replace `newsletterIntegration` with the chosen email provider identifier, then connect its API in `app/components/NewsletterForm.tsx` at the `INTEGRATION` comment.
- Update `heroImage` after placing the approved documentary photograph in `public/images/`. Keep a portrait-orientation source with a meaningful crop for mobile.
- Replace `public/og-v2.jpg` and `public/favicon.svg` with final brand assets if required.

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

The form validates in the browser and currently uses a short local delay for loading and success states. It does not transmit or store data. Add server-side validation, bot protection, consent handling and secure secret management before connecting a production provider.
