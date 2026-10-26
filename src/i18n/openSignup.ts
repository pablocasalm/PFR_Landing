import type { Language } from "./types";

/**
 * Alta abierta (decidido el 24/10/2026): hasta el lunes 26/10 a las 23:59 (Madrid), quien deja su
 * email no entra en la lista de espera, sino que recibe al momento la invitación para crear su
 * cuenta con 14 días gratis (lo hace el backend, POST /api/invite-requests). Mientras dure, estos
 * textos pisan a los de siempre, también a los de la base de datos; pasada la fecha, la landing
 * pasa sola a la web tras la beta (prueba de 7 días: botones a /precios en vez del formulario,
 * «Crear cuenta» en el menú; ver `isOpenSignup` en los componentes) sin tener que publicar nada.
 *
 * Mismas claves que remote.ts ("landing." + ruta dentro de `Translations`).
 */
export const OPEN_SIGNUP_UNTIL = new Date("2026-10-26T22:59:59Z"); // lunes 26/10, 23:59 en Madrid (CET)

// Solo en local (npm run dev): «?preview=tras-beta» enseña ya la web de después del alta abierta.
const previewAfterBeta = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "tras-beta";

export const isOpenSignup = (now: Date = new Date()) => !previewAfterBeta && now < OPEN_SIGNUP_UNTIL;

export const OPEN_SIGNUP_TEXTS: Record<Language, Record<string, string>> = {
  es: {
    "landing.nav.joinWaitlist": "Prueba 14 días gratis",
    "landing.nav.joinWaitlistMobile": "PRUEBA 14 DÍAS GRATIS",
    "landing.hero.bullets.1": "14 días gratis, sin tarjeta",
    "landing.club.cta": "Prueba 14 días gratis",
    "landing.faq.items.8.q": "¿Cuándo estará disponible?",
    "landing.faq.items.8.a": "Ya. Hasta el lunes 26 por la noche, déjanos tu email y te enviamos al momento el enlace para crear tu cuenta, con 14 días gratis.",
    "landing.finalCta.eyebrow": "Acceso abierto hasta el lunes",
    "landing.finalCta.subtitle": "Hasta el lunes 26 por la noche no hay lista de espera: déjanos tu email y te enviamos al momento el enlace para crear tu cuenta, con 14 días gratis y sin tarjeta. Los primeros 50 miembros tendrán precio fundador.",
    "landing.form.submitButton": "Empieza tus 14 días gratis",
    "landing.form.helpText": "14 días gratis, sin tarjeta. Cero spam.",
    "landing.form.successMessage": "Listo. Revisa tu email para crear tu cuenta.",
    "landing.form.successModal.body": "Te acabamos de enviar un email con el enlace para crear tu cuenta. Si no lo ves, mira en spam o en promociones.",
  },
  en: {
    "landing.nav.joinWaitlist": "Try 14 days free",
    "landing.nav.joinWaitlistMobile": "TRY 14 DAYS FREE",
    "landing.hero.bullets.1": "14 days free, no card needed",
    "landing.club.cta": "Try 14 days free",
    "landing.faq.items.8.q": "When will it be available?",
    "landing.faq.items.8.a": "Now. Until Monday the 26th at night, leave us your email and we'll send you the link to create your account right away, with 14 days free.",
    "landing.finalCta.eyebrow": "Open access until Monday",
    "landing.finalCta.subtitle": "Until Monday the 26th at night there's no waitlist: leave us your email and we'll send you the link to create your account right away, with 14 days free and no card needed. Our first 50 members get the founding price.",
    "landing.form.submitButton": "Start your 14 free days",
    "landing.form.helpText": "14 days free, no card needed. Zero spam.",
    "landing.form.successMessage": "Done. Check your email to create your account.",
    "landing.form.successModal.body": "We've just sent you an email with the link to create your account. If you can't see it, check spam or promotions.",
  },
};
