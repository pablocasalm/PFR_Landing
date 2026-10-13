/**
 * Origen del visitante: los parámetros del enlace por el que llegó (utm_source, utm_medium,
 * utm_campaign y ref). Se envían con el formulario de la lista de espera, para saber después qué
 * canal trae a la gente que se queda.
 *
 * No se guarda nada en el navegador (ni cookie, ni localStorage, ni sessionStorage): escribir en
 * el dispositivo algo que no es imprescindible exige consentimiento previo. El origen vive solo
 * en la URL: se lee de ella al enviar el formulario y, para que no se pierda al pasar de la
 * portada a /precios, se arrastra en los enlaces internos.
 */
export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referral?: string;
};

const PARAMS: [keyof Attribution, string][] = [
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["referral", "ref"],
];

/** El origen que trae la URL actual (vacío si no trae ninguno). */
export function getAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const [field, param] of PARAMS) {
    const value = params.get(param)?.trim().slice(0, 100);
    if (value) found[field] = value;
  }
  return found;
}

/**
 * Al pulsar un enlace que lleva a otra página de esta misma web, le añade los parámetros de
 * origen de la URL actual (si no los lleva ya). Un solo listener para todos los enlaces, en vez
 * de tocar cada uno. Los enlaces a otros sitios y los que solo mueven dentro de la página
 * ("#seccion") no se tocan.
 */
export function keepAttributionOnInternalLinks() {
  document.addEventListener(
    "click",
    (event) => {
      const current = new URLSearchParams(window.location.search);
      const carried = PARAMS.map(([, param]) => param).filter((param) => current.get(param));
      if (carried.length === 0) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      const raw = anchor?.getAttribute("href");
      if (!anchor || !raw || raw.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(raw, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      for (const param of carried) {
        if (!url.searchParams.has(param)) url.searchParams.set(param, current.get(param)!);
      }
      anchor.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    },
    true,
  );
}
