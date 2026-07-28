# [PROJECT NAME] — Storytelling platform

A production-ready, responsive pre-launch landing page for a story-led video podcast and media platform. Built with the Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## Run locally

You need Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. To verify a production build:

```bash
pnpm build
pnpm test
```

## Content and brand updates

The most common launch changes are intentionally centralised:

- **Project name, tagline, mission, colours, font names, navigation, email, social links, trailer URL and disclaimer:** edit `app/config/site.ts`. Changing `name` replaces the working title throughout the interface and metadata.
- **Story themes, conversation stages, manifesto and story-sharing options:** edit `app/data/content.ts`.
- **Team members:** edit `app/data/team.ts`. Each entry supports a portrait, name, role, personal statement and social URL.
- **Photography:** replace the files in `public/images/` while keeping their filenames, or update the image paths in the content and component files. The on-page labels identify images that are still placeholders. Preserve roughly the same portrait/landscape aspect ratios for predictable crops.
- **Trailer:** add the final YouTube URL to `trailerUrl` in `app/config/site.ts`, then replace the visual placeholder in `app/components/VideoPlaceholder.tsx` with the approved embed or consent-aware video component.
- **Social sharing image and favicon:** replace `public/og.png` and `public/favicon.svg` with final branded assets.

## Form integrations

Both forms validate in the browser and currently use a short local delay to demonstrate loading and success states. They do not transmit or persist data.

- Connect the newsletter provider in `app/components/NewsletterForm.tsx` at the `INTEGRATION` comment.
- Connect the story-submission API or CRM in `app/components/StorySubmissionForm.tsx` at the `INTEGRATION` comment.

Before connecting production services, add server-side validation, bot protection, consent logging, privacy-policy links and secure secret management.

## Structure

```text
app/
  components/     Reusable page, navigation, form and media components
  config/         Central site and brand configuration
  data/           Repeatable editorial and team content
  globals.css     Global design tokens and responsive utilities
  layout.tsx      Fonts and SEO/social metadata
  page.tsx        Landing-page section composition
public/
  images/         Local documentary photography placeholders
```

The layout respects reduced-motion preferences, includes semantic landmarks and accessible form feedback, and uses local responsive images to minimise layout shift.
