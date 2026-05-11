import type { Translations } from "./types";

export const es: Translations = {
  nav: {
    whatIs: "Qué es",
    howYouLearn: "Cómo aprenderás",
    whoWeAre: "Quiénes somos",
    example: "Ejemplo",
    faq: "FAQ",
    joinWaitlist: "Unete a la waitlist",
    joinWaitlistMobile: "UNETE A LA WAITLIST",
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
    menu: "Menu",
    mainNav: "Navegacion principal",
    mainNavMobile: "Navegacion principal movil",
    langToggle: "EN",
    langToggleLabel: "Switch to English",
  },
  hero: {
    line1: "Deja de copiar golpes.",
    line2: "Empieza a copiar decisiones.",
    subtitle: "Decisiones correctas bajo presion, el porque de cada punto y los patrones que se repiten.",
    bullets: ["Patrones aplicables a amateur/intermedio", "Plaza en la lista de espera"],
    seeExample: "Ver un ejemplo",
  },
  problemInsight: {
    eyebrow: "Por qué existe",
    title: "El juego no cambia cuando ves más pádel. Cambia cuando empiezas a leerlo.",
    blocks: [
      {
        eyebrow: "Problema",
        title: "Ves mucho. Aplicas poco.",
        paragraphs: [
          "Hoy puedes ver miles de vídeos de pádel. Golpes, trucos, consejos y puntos espectaculares.",
          "Pero cuando vuelves a pista, es difícil aplicar todo eso. Porque el pádel no se decide solo en el golpe. Se decide en lo que pasa antes.",
        ],
      },
      {
        eyebrow: "Insight",
        title: "Los mejores no solo ejecutan mejor.",
        paragraphs: [
          "Toman mejores decisiones. Y esas decisiones se repiten una y otra vez en los partidos.",
          "Si aprendes a reconocerlas, empiezas a entender el juego de una forma mucho más útil que viendo highlights sueltos.",
        ],
      },
    ],
  },
  whatIs: {
    eyebrow: "Qué es",
    title: "No es otro canal de pádel",
    cards: [
      {
        title: "Canal típico",
        bullets: [
          "Tips sueltos sin contexto real de punto.",
          "Golpes perfectos en situaciones artificiales.",
          "Mejora técnica, poca transferencia táctica.",
        ],
      },
      {
        title: "Padel Film Room",
        bullets: [
          "Partidos reales, presión real, decisiones reales.",
          "Lectura de contexto y señales antes del golpe.",
          "Framework aplicable: Contexto -> Señal -> Decisión -> Consecuencia.",
        ],
      },
    ],
  },
  learnInside: {
    eyebrow: "Cómo aprenderás dentro",
    title: "No verás vídeos sueltos.",
    subtitle: "Verás un sistema pensado para que puedas entender el juego de verdad y elegir cómo aprender en cada momento.",
    imgAlt: "Jugadores de pádel durante un punto en partido real.",
    pillars: [
      {
        title: "Bloques de aprendizaje",
        bullets: [
          "Un mismo concepto repetido en distintos partidos.",
          "Para que puedas reconocerlo en pista cuando vuelve a aparecer.",
          "No vídeos sueltos. Mismo patrón, distintas situaciones.",
        ],
      },
      {
        title: "Análisis de partidos completos",
        bullets: [
          "Para entender cómo se conectan las decisiones dentro del juego real.",
          "Cómo se construyen los puntos y dónde se decide cada juego.",
          "Qué patrones se repiten durante todo el partido.",
        ],
      },
    ],
    changeEyebrow: "Qué cambia por dentro",
    changeText: "No tienes que analizar partidos por tu cuenta. Nosotros seleccionamos, ordenamos y explicamos lo importante para que tú solo tengas que verlo y entenderlo.",
  },
  example: {
    eyebrow: "Ejemplo",
    title: "Como se ve un analisis",
    subtitle: "Desglosamos decisiones punto a punto para que puedas trasladarlas tal cual a tus partidos.",
    note: "Aquí no hay highlights aislados: hay lectura táctica real en partido para decidir mejor bajo presión.",
    steps: [
      {
        key: "Contexto",
        detail: "40-40, segundo saque rival, pareja cerrando por el medio. Qué está pasando antes de que salga la bola.",
      },
      {
        key: "Señal",
        detail: "El restador pisa dentro y abre hombros demasiado pronto. Muestra intención de cruzado rápido.",
      },
      {
        key: "Decisión",
        detail: "No buscar winner: bloquear paralelo profundo al cuerpo del volea y recuperar red en dos apoyos.",
      },
      {
        key: "Consecuencia",
        detail: "Forzamos volea incómoda, sube bola corta y cerramos el punto en transición alta. Patrón repetible.",
      },
    ],
  },
  languageSection: {
    eyebrow: "Lenguaje",
    title: "Estamos construyendo un lenguaje simple para leer lo que pasa en cada punto.",
    intro1: "No queremos que solo veas contenido.",
    intro2: "Queremos que aprendas a identificar lo que está pasando en un punto.",
    situations: [
      "Cuándo estás bajo presión.",
      "Cuándo tienes ventaja.",
      "Qué decisión corresponde en cada momento.",
    ],
    outro: "Cuando empiezas a verlo así, el juego cambia completamente.",
    practiceEyebrow: "En la práctica",
    practiceCards: [
      { label: "Situación", text: "Segundo saque rival. Te cierran el medio." },
      { label: "Lectura", text: "Estás defendiendo, no cerrando el punto." },
      { label: "Decisión", text: "Elegir bien antes de pegar mejor." },
    ],
  },
  team: {
    eyebrow: "Quiénes somos",
    title: "Somos Andrea, Guille y Pablo.",
    imgAlt: "Equipo reunido trabajando sobre una mesa.",
    paragraphs: [
      "Una familia vinculada al pádel desde siempre.",
      "Hemos competido, entrenado y vivido el juego desde dentro durante años.",
      "Guille, además, lleva años trabajando con jugadores y analizando partidos a nivel profesional.",
      "Ahora estamos construyendo Padel Film Room: una forma de traducir lo que pasa en los partidos para que cualquier jugador pueda entenderlo.",
    ],
  },
  content: {
    eyebrow: "Contenido",
    title: "Que recibiras en la waitlist",
    subtitle: "Contenido táctico, directo y accionable. Sin relleno.",
    pillars: [
      {
        title: "Film Room semanal",
        text: "Análisis de puntos reales con pausa táctica y decisiones alternativas en tiempo real.",
      },
      {
        title: "Decisiones, no golpes sueltos",
        text: "No highlights desconectados. Sí lectura táctica para actuar mejor en situaciones reales.",
      },
      {
        title: "Transferencia a pista",
        text: "Cada análisis termina con acciones concretas para aplicar en tu próximo partido.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Qué es exactamente Padel Film Room?",
        a: "Es una forma diferente de aprender pádel. Analizamos partidos reales y los convertimos en contenido estructurado para entender el juego a través de decisiones y patrones.",
      },
      {
        q: "¿Qué voy a encontrar dentro?",
        a: "Contenido organizado, no vídeos sueltos: bloques de aprendizaje por concepto y análisis de partidos completos.",
      },
      {
        q: "¿Qué son los bloques de aprendizaje?",
        a: "Colecciones de clips sobre un mismo concepto repetido en distintos contextos para que puedas reconocerlo en pista.",
      },
      {
        q: "¿Qué hace diferente este enfoque?",
        a: "Construimos un lenguaje simple para identificar situaciones de presión, ventaja y decisión, y poder aplicarlas luego jugando.",
      },
      {
        q: "¿Para qué sirven los análisis de partidos completos?",
        a: "Para ver cómo se conectan las decisiones dentro de un partido real, cuándo aparecen y cómo afectan al resultado.",
      },
      {
        q: "¿Trabajáis con partidos profesionales?",
        a: "Sí, porque ahí se ven mejor los patrones, pero todo está traducido a un lenguaje accesible.",
      },
      {
        q: "¿Tengo que analizar partidos por mi cuenta?",
        a: "No. Nosotros seleccionamos, organizamos y explicamos lo importante.",
      },
      {
        q: "¿Cuándo estará disponible?",
        a: "Estamos construyendo desde cero. Déjanos tu email y te avisaremos.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Waitlist privada",
    heading: "Estamos construyendo esto desde cero.",
    subtitle: "Si quieres aprender pádel de una forma diferente, déjanos tu email y te avisamos cuando lancemos los primeros contenidos.",
  },
  form: {
    emailLabel: "Email",
    placeholder: "nombre@ejemplo.com",
    submitButton: "Unete a la waitlist",
    sendingButton: "Enviando...",
    helpText: "Lista de espera del lanzamiento. Cero spam. Puedes salir cuando quieras.",
    errorInvalidEmail: "Introduce un email valido.",
    errorUnexpected: "Error inesperado.",
    successMessage: "Dentro. Te avisaremos antes del lanzamiento.",
    sendingMessage: "Enviando...",
    successModal: {
      title: "¡Ya estás dentro!",
      body: "Te avisaremos antes del lanzamiento. Revisa tu bandeja de entrada.",
      close: "Entendido",
    },
  },
  footer: {
    tagline: "Decisions over highlights",
  },
};
