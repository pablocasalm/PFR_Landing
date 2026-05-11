import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    whatIs: "What it is",
    howYouLearn: "How you'll learn",
    whoWeAre: "Who we are",
    example: "Example",
    faq: "FAQ",
    joinWaitlist: "Join the waitlist",
    joinWaitlistMobile: "JOIN THE WAITLIST",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    mainNav: "Main navigation",
    mainNavMobile: "Mobile main navigation",
    langToggle: "ES",
    langToggleLabel: "Cambiar a Español",
  },
  hero: {
    line1: "Stop copying shots.",
    line2: "Start copying decisions.",
    subtitle: "Right decisions under pressure, the why behind each point, and the patterns that repeat.",
    bullets: ["Patterns applicable to amateur/intermediate players", "Spot on the waitlist"],
    seeExample: "See an example",
  },
  recommendations: {
    eyebrow: "Recommendations",
    title: "Trending now",
    topics: [
      { category: "Wall exit", exampleClip: "Example clip: Bandeja and transition" },
      { category: "Aggressive return", exampleClip: "Example clip: Reading the signal" },
      { category: "Golden point", exampleClip: "Example clip: 40-40 context" },
      { category: "Deep defense", exampleClip: "Example clip: Don't force the winner" },
      { category: "Volley finish", exampleClip: "Example clip: Pattern consequence" },
    ],
    thumbnailAlt: "Cover for category:",
  },
  example: {
    eyebrow: "Example",
    title: "What an analysis looks like",
    subtitle: "We break down decisions point by point so you can apply them directly to your matches.",
    note: "No isolated highlights here: real tactical reading in-match to make better decisions under pressure.",
    steps: [
      {
        key: "Context",
        detail:
          "40-40, opponent's second serve, rivals closing through the middle. What's happening before the ball comes out.",
      },
      {
        key: "Signal",
        detail:
          "The returner steps inside and opens shoulders too early. Shows intent for a quick cross-court shot.",
      },
      {
        key: "Decision",
        detail:
          "Don't go for the winner: block a deep parallel to the volleyer's body and recover the net in two steps.",
      },
      {
        key: "Consequence",
        detail:
          "We force an uncomfortable volley, the ball comes up short and we close the point in a high transition. Repeatable pattern.",
      },
    ],
  },
  whatIs: {
    eyebrow: "What it is",
    title: "Not just another padel channel",
    cards: [
      {
        title: "Typical channel",
        bullets: [
          "Isolated tips with no real point context.",
          "Perfect shots in artificial situations.",
          "Technical improvement, little tactical transfer.",
        ],
      },
      {
        title: "Padel Film Room",
        bullets: [
          "Real matches, real pressure, real decisions.",
          "Reading context and signals before the shot.",
          "Applicable framework: Context → Signal → Decision → Consequence.",
        ],
      },
    ],
  },
  content: {
    eyebrow: "Content",
    title: "What you'll receive on the waitlist",
    subtitle: "Tactical, direct, actionable content. No filler.",
    pillars: [
      {
        title: "Weekly Film Room",
        text: "Tactical analysis of real points with pause and live decision alternatives.",
      },
      {
        title: "Decisions, not isolated shots",
        text: "No disconnected highlights. Yes to tactical reading to perform better in real situations.",
      },
      {
        title: "Transfer to the court",
        text: "Every analysis ends with concrete actions to apply in your next match.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "Does this work if I'm not an advanced player?",
        a: "Yes. The focus is on reading the point better and deciding with criteria. It's useful from amateur level.",
      },
      {
        q: "What will I receive exactly?",
        a: "Applied tactical analysis and repeatable patterns to transfer real decisions to your next match.",
      },
      {
        q: "Can I unsubscribe?",
        a: "Yes. Instant unsubscribe in one click from any email.",
      },
      {
        q: "Will you send me spam?",
        a: "No. Only relevant waitlist content and launch announcements.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Waitlist",
    heading: "Playing better isn't about hitting harder. It's about deciding better.",
    subtitle: "Join today to get on the launch waitlist.",
  },
  form: {
    emailLabel: "Email",
    placeholder: "name@example.com",
    submitButton: "Join the waitlist",
    sendingButton: "Sending...",
    helpText: "Launch waitlist. Zero spam. Leave whenever you want.",
    errorInvalidEmail: "Please enter a valid email.",
    errorUnexpected: "Unexpected error.",
    successMessage: "You're in. We'll let you know before the launch.",
    sendingMessage: "Sending...",
    successModal: {
      title: "You're in!",
      body: "We'll reach out before the launch. Check your inbox.",
      close: "Got it",
    },
  },
  footer: {
    tagline: "Decisions over highlights",
  },
};
