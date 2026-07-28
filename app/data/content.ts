export const storyThemes = [
  {
    number: "01",
    title: "Life Abroad",
    description:
      "Stories of migration, belonging, identity and rebuilding life in unfamiliar places.",
    image: "/images/portrait-man.jpg",
  },
  {
    number: "02",
    title: "Faith and Identity",
    description:
      "Honest reflections on belief, doubt, conviction and becoming grounded in who you are.",
    image: "/images/portrait-woman.jpg",
  },
  {
    number: "03",
    title: "Work and Calling",
    description:
      "Conversations about career, purpose, contribution and the tension between survival and meaningful work.",
    image: "/images/hero-conversation.jpg",
  },
  {
    number: "04",
    title: "Building from Nothing",
    description:
      "The realities of creating businesses, communities, projects and opportunities with limited resources.",
    image: "/images/team-one.jpg",
  },
  {
    number: "05",
    title: "Family and Relationships",
    description:
      "The people, responsibilities and relationships that shape the person we become.",
    image: "/images/team-two.jpg",
  },
  {
    number: "06",
    title: "Fear and Courage",
    description:
      "Stories about rejection, uncertainty, difficult decisions and moving despite fear.",
    image: "/images/team-three.jpg",
  },
  {
    number: "07",
    title: "Mentorship and Growth",
    description:
      "How guidance, accountability and community can transform thinking and behaviour.",
    image: "/images/portrait-man.jpg",
  },
  {
    number: "08",
    title: "Starting Again",
    description:
      "Conversations with people rebuilding after failure, disappointment, relocation or unexpected change.",
    image: "/images/portrait-woman.jpg",
  },
] as const;

export const conversationStages = [
  {
    number: "01",
    title: "Speak Honestly",
    description:
      "A conversation begins when someone feels safe enough to move beyond the polished version of their story.",
  },
  {
    number: "02",
    title: "See Differently",
    description:
      "Thoughtful questions help reveal patterns, turning points, assumptions and lessons that may previously have gone unnoticed.",
  },
  {
    number: "03",
    title: "Find Clarity",
    description:
      "Guests and listeners begin to name what they are experiencing and understand what matters in their current season.",
  },
  {
    number: "04",
    title: "Take the Next Step",
    description:
      "Clarity becomes useful when it produces the courage to make a decision, begin again or continue moving.",
  },
] as const;

export const manifesto = [
  "We believe every person carries a story worth hearing.",
  "We believe people should not have to become famous before their experiences are considered valuable.",
  "We believe unfinished journeys deserve to be documented.",
  "We believe vulnerability should be handled with dignity.",
  "We believe thoughtful questions can unlock personal clarity.",
  "We believe another person’s courage can give someone else permission to move.",
  "We believe no honest story is insignificant.",
] as const;

export const storyOptions = [
  { id: "self", label: "Share My Story", caption: "A chapter you are living now" },
  { id: "nominate", label: "Nominate Someone", caption: "A story the world should meet" },
  { id: "subject", label: "Suggest a Conversation", caption: "A subject worth examining" },
] as const;
