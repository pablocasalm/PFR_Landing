export type Translations = {
  nav: {
    whatIs: string;
    howYouLearn: string;
    whoWeAre: string;
    example: string;
    faq: string;
    joinWaitlist: string;
    joinWaitlistMobile: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    mainNav: string;
    mainNavMobile: string;
    langToggle: string;
    langToggleLabel: string;
  };
  hero: {
    line1: string;
    line2: string;
    subtitle: string;
    bullets: string[];
    seeExample: string;
  };
  problemInsight: {
    eyebrow: string;
    title: string;
    blocks: { eyebrow: string; title: string; paragraphs: string[] }[];
  };
  whatIs: {
    eyebrow: string;
    title: string;
    cards: { title: string; bullets: string[] }[];
  };
  learnInside: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imgAlt: string;
    pillars: { title: string; bullets: string[] }[];
    changeEyebrow: string;
    changeText: string;
  };
  example: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    steps: { key: string; detail: string }[];
  };
  languageSection: {
    eyebrow: string;
    title: string;
    intro1: string;
    intro2: string;
    situations: string[];
    outro: string;
    practiceEyebrow: string;
    practiceCards: { label: string; text: string }[];
  };
  team: {
    eyebrow: string;
    title: string;
    imgAlt: string;
    paragraphs: string[];
  };
  content: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: { title: string; text: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    subtitle: string;
  };
  form: {
    emailLabel: string;
    placeholder: string;
    submitButton: string;
    sendingButton: string;
    helpText: string;
    errorInvalidEmail: string;
    errorUnexpected: string;
    successMessage: string;
    sendingMessage: string;
    successModal: {
      title: string;
      body: string;
      close: string;
    };
  };
  footer: {
    tagline: string;
  };
};

export type Language = "es" | "en";
