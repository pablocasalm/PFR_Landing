/**
 * Las páginas de la landing. Cualquier otra dirección es un 404: Netlify la sirve con estado 404
 * (ver netlify.toml) y aquí se pinta la página «no existe», en vez de la portada (antes cualquier
 * URL inventada devolvía la home con un 200 y Google la veía como una copia).
 */
export type Route = "home" | "pricing" | "confirm" | "notFound";

export const ROUTE_PATHS: Record<Exclude<Route, "notFound">, string> = {
  home: "",
  pricing: "/precios",
  confirm: "/confirmar",
};

/** Dirección que se está pintando al publicar (prerender, ver scripts/prerender.mjs), donde no hay
 * `window`. En el navegador no se usa. */
let serverPathname = "/";
export function setServerPathname(pathname: string) {
  serverPathname = pathname;
}

export function currentRoute(pathname?: string): Route {
  const path = (pathname ?? (typeof window === "undefined" ? serverPathname : window.location.pathname)).replace(/\/+$/, "");
  const found = (Object.keys(ROUTE_PATHS) as (keyof typeof ROUTE_PATHS)[]).find((r) => ROUTE_PATHS[r] === path);
  return found ?? "notFound";
}
