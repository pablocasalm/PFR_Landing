/** Frase de un usuario, con su nombre y un dato (p. ej. su nivel en Playtomic). */
/** Testimonio: sus palabras (`text`, tal cual), nombre, país (para lectores de pantalla; se ve la
 * bandera), bandera (código: es, ch, de…) y nivel de Playtomic (solo la cifra: «2,74»). */
export type Testimonial = { text: string; name: string; country: string; flag: string; level: string };

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
    /** Titular (H1) desde el 06/11/2026 (tarjeta #138): la frustración más votada en las encuestas. */
    question: string;
    /** Subtítulo bajo el titular. Clave nueva el 06/11/2026: la anterior ("subtitle") se queda sin
     * usar en la base de datos, así el texto nuevo sale a la vez que el código. */
    lead: string;
    /** La firma «Deja de copiar golpes. / Empieza a copiar decisiones.»: era el titular; desde el
     * 06/11/2026 va en su propio bloque al final de la portada (SignatureSection). */
    line1: string;
    line2: string;
    /** Línea pequeña bajo el subtítulo: idiomas en que está disponible. */
    languagesNote: string;
    /** Enlace que baja hasta el clip de muestra (antes "seeExample", a «El método»). */
    seeClip: string;
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
    /** Teaser de 18 s al principio de la sección: nombre (title del reproductor y del VideoObject)
     * y descripción (VideoObject). */
    teaser: { name: string; description: string };
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
    /** Frase que presenta el clip de muestra (antes "note", sin clip debajo). */
    clipIntro: string;
    /** Clip de muestra 013_02, como se ve en la app. `source`: de dónde son las imágenes. */
    sampleClip: { badge: string; title: string; insight: string; tags: string[]; source: string };
  };
  team: {
    eyebrow: string;
    title: string;
    /** Texto alternativo de la foto de los tres hermanos. Clave nueva el 06/11/2026 con la foto
     * nueva: la anterior ("imgAlt") tenía en la base de datos un texto de otra foto. */
    photoAlt: string;
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
   * enseña con 3 o más: con menos no aparece nada. Son sus palabras: no se retocan. */
  testimonials: {
    eyebrow: string;
    /** Etiqueta encima de la cifra del nivel, en cada tarjeta. */
    levelLabel: string;
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
