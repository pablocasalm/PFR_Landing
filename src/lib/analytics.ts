import { sendMetaEvent } from "./metaPixel";

type EventPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  const data = { event, ...payload };
  // Píxel de Meta: solo si ya hay consentimiento de marketing (ver metaPixel.ts).
  sendMetaEvent(event);

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(data);
    return;
  }

  // Fallback for local debugging when no analytics provider is connected.
  console.debug("[analytics]", data);
}

