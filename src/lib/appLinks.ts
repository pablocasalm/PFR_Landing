import type { Language } from "../i18n/types";

/** Enlaces a la app, en el idioma en que se ve la landing (LoginPage lee ?lang). */
const APP_URL = "https://app.padelfilmroom.com";

/** Login para quien ya tiene cuenta. Si ya tenía la sesión abierta, la app le lleva directa a Inicio. */
export const loginUrl = (lang: Language) => `${APP_URL}/login?lang=${lang}`;

// Código de descuento (11/11/2026, tarjeta #46): el enlace de un colaborador lleva `?codigo=` a
// cualquier página de la landing; se guarda en la pestaña y viaja a la app al elegir plan, que lo
// aplica en el pago. sessionStorage, como en la app: no se queda en un ordenador compartido.
const DISCOUNT_KEY = "pfr_discount";

/** Guarda el `?codigo=` de la dirección (se llama al arrancar la landing). */
export const captureDiscountCode = () => {
  try {
    const code = new URLSearchParams(window.location.search).get("codigo")?.trim().toUpperCase();
    if (code && /^[A-Z0-9_-]{3,32}$/.test(code)) sessionStorage.setItem(DISCOUNT_KEY, code);
  } catch {
    /* modo privado sin almacenamiento */
  }
};

const storedDiscountCode = () => {
  try {
    return sessionStorage.getItem(DISCOUNT_KEY) ?? "";
  } catch {
    return "";
  }
};

/** Crear la cuenta con un plan (desde /precios): al crearla, la app abre Stripe Checkout. */
export const registerUrl = (lang: Language, plan: "Essential" | "Club" | "Coach") => {
  const code = storedDiscountCode();
  return `${APP_URL}/register?plan=${plan}&lang=${lang}${code ? `&codigo=${encodeURIComponent(code)}` : ""}`;
};
