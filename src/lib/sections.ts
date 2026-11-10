import { useEffect } from "react";
import { trackEvent } from "./analytics";

/**
 * Nombre de cada sección de la portada para la analítica (GA4 vía GTM, 10/11/2026), por su id en
 * la página. Lo usan `section_view` (hasta dónde llega la gente) y `nav_click` (qué pulsa en el
 * menú), así los dos hablan de las mismas secciones.
 */
export const SECTION_NAMES: Record<string, string> = {
  "por-que-existe": "problema",
  "que-es": "que_cambia",
  lenguaje: "en_la_practica",
  testimonios: "testimonios",
  "como-aprenderas": "como_funciona",
  ejemplo: "metodo",
  "quienes-somos": "equipo",
  club: "club",
  faq: "faq",
  "waitlist-final": "precio_fundador",
};

/** `section_view` la primera vez que cada sección se ve al menos en un 40 % (una vez por visita). */
export function useSectionViews() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          trackEvent("section_view", { section: SECTION_NAMES[id] });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );
    // Las secciones se pintan con la página; un instante después ya están todas.
    const timer = window.setTimeout(() => {
      for (const id of Object.keys(SECTION_NAMES)) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    }, 300);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
