import type { Translations } from "./types";

export const es: Translations = {
  nav: {
    recommendations: "Recomendaciones",
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
  recommendations: {
    eyebrow: "Recomendaciones",
    title: "Tendencias ahora",
    topics: [
      { category: "Salida de pared", exampleClip: "Clip de ejemplo: Bandeja y transición" },
      { category: "Resto agresivo", exampleClip: "Clip de ejemplo: Lectura de señal" },
      { category: "Bola de oro", exampleClip: "Clip de ejemplo: Contexto 40-40" },
      { category: "Defensa profunda", exampleClip: "Clip de ejemplo: No forzar winner" },
      { category: "Cierre en volea", exampleClip: "Clip de ejemplo: Consecuencia del patrón" },
    ],
    thumbnailAlt: "Portada de la categoria:",
  },
  example: {
    eyebrow: "Ejemplo",
    title: "Como se ve un analisis",
    subtitle: "Desglosamos decisiones punto a punto para que puedas trasladarlas tal cual a tus partidos.",
    note: "Aquí no hay highlights aislados: hay lectura táctica real en partido para decidir mejor bajo presión.",
    steps: [
      {
        key: "Contexto",
        detail:
          "40-40, segundo saque rival, pareja cerrando por el medio. Qué está pasando antes de que salga la bola.",
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
        detail:
          "Forzamos volea incómoda, sube bola corta y cerramos el punto en transición alta. Patrón repetible.",
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
        q: "Esto sirve si no soy jugador avanzado?",
        a: "Si. El foco esta en leer mejor el punto y decidir con criterio. Es util desde nivel amateur.",
      },
      {
        q: "Que voy a recibir exactamente?",
        a: "Analisis tactico aplicado y patrones repetibles para trasladar decisiones reales a tu proximo partido.",
      },
      {
        q: "Puedo darme de baja?",
        a: "Si. Baja inmediata en un clic desde cualquier correo.",
      },
      {
        q: "Me vais a enviar spam?",
        a: "No. Solo contenido relevante de la waitlist y avisos del lanzamiento.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Waitlist",
    heading: "Jugar mejor no es golpear mas fuerte. Es decidir mejor.",
    subtitle: "Unete hoy para entrar en la lista de espera del lanzamiento.",
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
