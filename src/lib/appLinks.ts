import type { Language } from "../i18n/types";

/** Enlaces a la app, en el idioma en que se ve la landing (LoginPage lee ?lang). */
const APP_URL = "https://app.padelfilmroom.com";

/** Login para quien ya tiene cuenta. Si ya tenía la sesión abierta, la app le lleva directa a Inicio. */
export const loginUrl = (lang: Language) => `${APP_URL}/login?lang=${lang}`;

/** Crear la cuenta con un plan (desde /precios): al crearla, la app abre Stripe Checkout. */
export const registerUrl = (lang: Language, plan: "Essential" | "Club" | "Coach") => `${APP_URL}/register?plan=${plan}&lang=${lang}`;
