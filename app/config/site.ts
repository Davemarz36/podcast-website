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
  storySubmissionUrl: "#share-story",
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
      charcoal: "#000000",
      ink: "#f5f5f5",
      ivory: "#ffffff",
      paper: "#050505",
      clay: "#ffffff",
      copper: "#ffffff",
      darkHeading: "#090503",
    },
    fonts: {
      display: "Manrope",
      body: "Manrope",
    },
  },
  disclaimer:
    "[PROJECT NAME] is an independently developed storytelling platform. References to mentors or communities in its founding story do not automatically represent official ownership or endorsement.",
} as const;

export type SocialPlatform = keyof typeof siteConfig.socials;
