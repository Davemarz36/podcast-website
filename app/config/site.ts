export const siteConfig = {
  name: "[PROJECT NAME]",
  tagline: "Honest conversations for people still becoming.",
  belief: "Every person carries a story worth hearing.",
  mission:
    "To create thoughtful and vulnerable conversations that help everyday people tell their stories, understand their journeys and inspire others to move forward with greater courage.",
  vision:
    "To build a global storytelling platform where people feel seen, unfinished journeys are valued and ordinary experiences become a source of clarity and courage for others.",
  description:
    "A story-led platform exploring faith, identity, migration, ambition, struggle and the unfinished process of becoming.",
  siteUrl: "https://stories-still-becoming.officialdavemarz.chatgpt.site",
  contactEmail: "hello@projectname.example",
  newsletterIntegration: "REPLACE_WITH_NEWSLETTER_PROVIDER",
  storySubmissionUrl:
    "mailto:hello@projectname.example?subject=I%20have%20a%20story%20to%20share",
  heroImage: {
    src: "/images/hero-reflection.jpg",
    alt: "A thoughtful young man sitting beside a window in natural light.",
  },
  navigation: [
    { label: "Mission", href: "#mission" },
    { label: "Why We Exist", href: "#why" },
    { label: "Conversations", href: "#conversations" },
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
    "[PROJECT NAME] is an independently developed storytelling platform. References to mentors or communities in its founding story do not automatically represent official ownership or endorsement.",
} as const;

export type SocialPlatform = keyof typeof siteConfig.socials;
