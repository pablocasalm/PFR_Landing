import type { Language, Translations } from "./types";

/**
 * Textos de la landing guardados en la base de datos de PFR (misma tabla de traducciones que la
 * app, área "landing"). Los de `es.ts` / `en.ts` siguen siendo la base: se pintan al instante y
 * son lo que se ve si la API no responde. Lo que haya en la base de datos los pisa, así que un
 * texto se puede corregir sin volver a publicar la web.
 *
 * Cada texto es una clave "landing." + su ruta dentro de `Translations`, con los índices de las
 * listas como un tramo más: "landing.hero.subtitle", "landing.faq.items.2.q".
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "https://azureapi.padelfilmroom.com";
const PREFIX = "landing";
const cacheKey = (lang: Language) => `pfr_landing_texts_${lang}`;

type Dict = Record<string, string>;

/** Copia de `base` con cada texto sustituido por el de `dict`, si lo hay. Las listas pueden
 * crecer: si `dict` trae elementos más allá de los de `base` (otra pregunta en el FAQ, por
 * ejemplo), se añaden con la forma del primero. */
function overlay<T>(base: T, dict: Dict, path: string): T {
  if (typeof base === "string") return (dict[path] ?? base) as T;
  if (Array.isArray(base)) {
    const result: unknown[] = base.map((item, index) => overlay(item, dict, `${path}.${index}`));
    const template: unknown = base[0];
    for (let index = base.length; template !== undefined; index++) {
      const itemPath = `${path}.${index}`;
      const exists = Object.keys(dict).some((key) => key === itemPath || key.startsWith(`${itemPath}.`));
      if (!exists) break;
      result.push(overlay(blank(template), dict, itemPath));
    }
    return result as T;
  }
  if (base && typeof base === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base)) result[key] = overlay(value, dict, `${path}.${key}`);
    return result as T;
  }
  return base;
}

/** Misma forma que `value`, con todos los textos vacíos (plantilla para elementos nuevos de una lista). */
function blank(value: unknown): unknown {
  if (typeof value === "string") return "";
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, blank(v)]));
  return value;
}

export const applyRemote = (base: Translations, dict: Dict | null): Translations => (dict ? overlay(base, dict, PREFIX) : base);

/** Lo último que se descargó para ese idioma en este navegador: se aplica ya al arrancar, para
 * que un visitante que vuelve no vea primero el texto antiguo y luego el corregido. */
export function readCachedTexts(lang: Language): Dict | null {
  try {
    const raw = localStorage.getItem(cacheKey(lang));
    return raw ? (JSON.parse(raw) as Dict) : null;
  } catch {
    return null;
  }
}

/** Descarga los textos de la landing en ese idioma. Devuelve null si falla (sin red, API caída…):
 * la web sigue con los textos que ya tiene. */
export async function fetchRemoteTexts(lang: Language): Promise<Dict | null> {
  try {
    const res = await fetch(`${API_BASE}/api/i18n/${lang}?area=${PREFIX}`);
    if (!res.ok) return null;
    const all = (await res.json()) as Dict;
    // Solo las claves de la landing (un backend sin el filtro por área devuelve también las de la app).
    const dict = Object.fromEntries(Object.entries(all).filter(([key]) => key.startsWith(`${PREFIX}.`)));
    try {
      localStorage.setItem(cacheKey(lang), JSON.stringify(dict));
    } catch {
      /* modo privado: sin caché, no pasa nada */
    }
    return dict;
  } catch {
    return null;
  }
}
