/** Frase de un usuario, con su nombre y un dato (p. ej. su nivel en Playtomic). */
export type Testimonial = { text: string; name: string; detail: string };

export type Translations = {
  nav: {
    howYouLearn: string;
    whoWeAre: string;
    example: string;
    club: string;
    faq: string;
    pricing: string;
    joinWaitlist: string;
    joinWaitlistMobile: string;
    login: string;
    loginShort: string;
    loginMenu: string;
    /** Botón para crear la cuenta en la app (sin plan: elige el plan después, en /suscripcion). */
    createAccount: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    mainNav: string;
    mainNavMobile: string;
    langToggle: string;
    langToggleLabel: string;
  };
  /** Título de la pestaña y descripción de la página: cambian con el idioma (ver LanguageContext). */
  meta: {
    title: string;
    description: string;
    /** /precios: título y descripción propios (tarjeta «SEO técnico», punto 2). */
    pricingTitle: string;
    pricingDescription: string;
    /** Página que no existe (404). */
    notFoundTitle: string;
  };
  /** Página 404: cualquier dirección que no sea /, /precios o /confirmar. */
  notFound: {
    title: string;
    text: string;
    backHome: string;
  };
  hero: {
    line1: string;
    line2: string;
    subtitle: string;
    /** Línea pequeña bajo el subtítulo: idiomas en que está disponible. */
    languagesNote: string;
    bullets: string[];
    seeExample: string;
    mockupAlt: string;
    /** Botón que sustituye al formulario de email tras la beta: lleva a /precios. También en la sección final. */
    trialCta: string;
    /** Línea bajo el botón principal: qué se paga hoy y cuándo (tarjeta «SEO técnico», punto 4). */
    trialNote: string;
    /** Franja sobre el titular: qué es PFR y cuánto contenido hay (punto 5). */
    catalogStrip: string;
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
    steps: { key: string; detail: string }[];
  };
  languageSection: {
    eyebrow: string;
    title: string;
    practiceCards: { label: string; text: string }[];
    /** Línea pequeña al final de la sección. */
    note: string;
  };
  team: {
    eyebrow: string;
    title: string;
    imgAlt: string;
    paragraphs: string[];
    /** Enlaces bajo el texto (tarjeta «SEO técnico», punto 7). */
    instagram: string;
    instagramGuille: string;
  };
  club: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; text: string }[];
    /** Línea pequeña final, sobre PFR Coach. */
    coachNote: string;
    cta: string;
    /** Frase de una beta tester sobre la masterclass, aprobada por ella (tarjeta de testimonios). */
    quote: Testimonial;
  };
  /** Testimonios de beta testers (entre «El método» y «Quiénes somos»). La sección solo se
   * enseña cuando hay 3: hasta entonces no aparece nada. Son sus palabras: no se retocan. */
  testimonials: {
    eyebrow: string;
    items: Testimonial[];
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
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    comingSoon: string;
    mostPopular: string;
    monthlySuffix: string;
    availabilityLabel: string;
    availabilityOpen: string;
    availabilityLimited: string;
    planNames: { starter: string; club: string; coach: string };
    /** Frase bajo el nombre de cada plan. */
    taglines: { starter: string; club: string; coach: string };
    /** 7 filas, mismo orden que FEATURE_TIERS en Precios.tsx (qué planes incluyen cada una). */
    featureRows: string[];
    ctaBandTitle: string;
    ctaBandButton: string;
    /** Botón de Essential y Club: crear cuenta y empezar la prueba de 7 días en Stripe. */
    startTrial: string;
    /** Botón de Coach (sin prueba). */
    subscribeCoach: string;
    /** Coach sin plazas. */
    full: string;
    /** Debajo del botón: Essential y Club. */
    trialNote: string;
    /** Debajo del botón: Coach. */
    coachNote: string;
    founder: string;
    /** {count} = plazas de fundador libres. */
    founderLeft: string;
    /** Coach: {count} plazas libres de {total}, mientras el fundador sigue abierto. */
    coachLeftFounder: string;
    /** Coach: lo mismo, con el fundador ya cerrado. */
    coachLeft: string;
    /** Para lectores de pantalla, junto al precio tachado. {price} = precio normal. */
    regularPrice: string;
    /** Bajo los planes: con quién se paga. */
    securePayment: string;
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    /** Contador de plazas de fundador (el mismo que en /precios). {count} = plazas libres. */
    spotsLeft: string;
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
    /** Frase bajo el formulario: texto + enlace a la política de privacidad. */
    privacyPrefix: string;
    privacyLink: string;
  };
  /** Página /confirmar: a la que llega quien pulsa el botón del email de acceso anticipado. */
  confirm: {
    loading: string;
    title: string;
    eyebrow: string;
    paragraphs: string[];
    /** Recordatorio de qué pasa después de confirmar: el acceso llega por email. */
    nextTitle: string;
    nextSteps: string[];
    signature: string;
    signatureRole: string;
    backHome: string;
    errorTitle: string;
    errorText: string;
    errorJoin: string;
  };
  footer: {
    tagline: string;
    /** Enlaces a los documentos legales (Lawwwing). */
    legalNav: string;
    legalNotice: string;
    privacy: string;
    cookies: string;
    terms: string;
    /** Vuelve a abrir la configuración de cookies de Lawwwing. */
    cookieSettings: string;
    /** Enlaces del sitio en el pie (auditoría SEO: enlaces internos y contacto). */
    siteNav: string;
    home: string;
    contact: string;
  };
};

export type Language = "es" | "en";
