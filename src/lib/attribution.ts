/**
 * Origen del visitante: los parámetros del enlace por el que llegó (utm_source, utm_medium,
 * utm_campaign y ref). Se leen al cargar la web y se envían con el formulario de la lista de
 * espera, para saber después qué canal trae a la gente que se queda.
 *
 * Se guardan en sessionStorage: duran lo que la pestaña, así que sobreviven a pasar de la portada
 * a /precios, pero no se conserva nada entre visitas.
 */
export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referral?: string;
};

const KEY = "pfr_attribution";

const PARAMS: [keyof Attribution, string][] = [
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["referral", "ref"],
];

/** Lee el origen de la URL actual y lo guarda. Si la URL no trae ninguno, deja lo que hubiera. */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const [field, param] of PARAMS) {
      const value = params.get(param)?.trim().slice(0, 100);
      if (value) found[field] = value;
    }
    if (Object.keys(found).length > 0) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* modo privado: sin origen, no pasa nada */
  }
}

export function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
