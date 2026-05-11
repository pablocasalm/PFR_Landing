export type Translations = {
  nav: {
    recommendations: string;
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
  recommendations: {
    eyebrow: string;
    title: string;
    topics: { category: string; exampleClip: string }[];
    thumbnailAlt: string;
  };
  example: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    steps: { key: string; detail: string }[];
  };
  whatIs: {
    eyebrow: string;
    title: string;
    cards: { title: string; bullets: string[] }[];
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
