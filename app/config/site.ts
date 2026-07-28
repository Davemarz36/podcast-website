export const siteConfig = {
  name: "[PROJECT NAME]",
  tagline: "Honest conversations for people still becoming.",
  belief: "Every person carries a story worth hearing.",
  mission:
    "To uncover and preserve the stories of everyday people through thoughtful, vulnerable conversations that help guests and listeners find clarity, courage and momentum.",
  description:
    "Thoughtful conversations with everyday people about faith, identity, ambition, struggle, migration, mentorship and the courage to keep moving forward.",
  siteUrl: "https://project-name.example.com",
  contactEmail: "hello@projectname.example",
  trailerUrl: "",
  newsletterIntegration: "local-mock",
  navigation: [
    { label: "Vision", href: "#vision" },
    { label: "Stories", href: "#stories" },
    { label: "The Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Share Your Story", href: "#share" },
  ],
  socials: {
    youtube: "#",
    instagram: "#",
    facebook: "#",
  },
  theme: {
    colors: {
      charcoal: "#171716",
      ink: "#22211f",
      ivory: "#f1ece2",
      paper: "#faf7f0",
      clay: "#a56549",
      copper: "#bd8060",
    },
    fonts: {
      display: "Instrument Serif",
      body: "Manrope",
    },
  },
  disclaimer:
    "[PROJECT NAME] is an independently developed storytelling platform. Any mentors, communities or organisations mentioned in our founding story do not automatically represent official ownership or endorsement.",
} as const;

export type SocialPlatform = keyof typeof siteConfig.socials;
