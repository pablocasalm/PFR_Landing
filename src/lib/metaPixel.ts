/**
 * Píxel de Meta, solo en la landing (tarjeta de Trello «Píxel de Meta en la landing», 26/10/2026).
 *
 * Nada de Meta se descarga hasta que la persona acepta las cookies de marketing en el aviso de
 * Lawwwing: ni el script (connect.facebook.net) ni ninguna llamada. Lawwwing no tiene un atributo
 * para bloquear scripts, pero sí una API y eventos (leídos de su propio script, lawwwing-core.js):
 *  - `window.Lawwwing.consent.is_granted("marketing")`
 *  - `lawwwing:consent:restored` (ya había aceptado en otra visita), `…:granted` y `…:changed`
 *    (acaba de aceptar o de cambiar sus preferencias), lanzados en `document`.
 * Cuando el píxel ya está cargado, Lawwwing le pasa él mismo el consentimiento (fbq "consent"
 * grant/revoke), así que si luego lo retira, Meta deja de recibir datos.
 *
 * Eventos: PageView en cada carga de página (la landing no navega por dentro) y, a partir de
 * los eventos que ya lanza la web (trackEvent):
 *  - "Lead" al apuntarse con el formulario (lista de espera o alta abierta),
 *  - "InitiateCheckout" al elegir un plan en Precios.
 */

// ID del píxel (Business Manager de Meta → Orígenes de datos). No es secreto. Vacío = apagado.
const META_PIXEL_ID = "";

const EVENT_MAP: Record<string, string> = {
  waitlist_submit_success: "Lead",
  pricing_plan_click: "InitiateCheckout",
};

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown; callMethod?: (...args: unknown[]) => void };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    Lawwwing?: { consent?: { is_granted?: (category: string) => boolean } };
  }
}

let loaded = false;

const marketingGranted = () => {
  try {
    return window.Lawwwing?.consent?.is_granted?.("marketing") === true;
  } catch {
    return false;
  }
};

/** El snippet oficial de Meta, cargado solo ahora (tras el consentimiento). */
function loadPixel() {
  if (loaded || !META_PIXEL_ID) return;
  loaded = true;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("consent", "grant");
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/** Llamar una vez al arrancar la web. */
export function setupMetaPixel() {
  if (!META_PIXEL_ID || typeof window === "undefined") return;
  const tryLoad = () => {
    if (marketingGranted()) loadPixel();
  };
  for (const name of ["lawwwing:consent:restored", "lawwwing:consent:granted", "lawwwing:consent:changed", "lawwwing:consent:ready"]) {
    document.addEventListener(name, tryLoad);
  }
  // Por si Lawwwing ya había terminado antes de que llegáramos aquí.
  tryLoad();
}

/** Traduce un evento de la web (trackEvent) al de Meta, si el píxel está cargado. */
export function sendMetaEvent(event: string) {
  const metaEvent = EVENT_MAP[event];
  if (!metaEvent || !loaded || !window.fbq) return;
  window.fbq("track", metaEvent);
}
