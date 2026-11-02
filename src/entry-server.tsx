import { renderToString } from "react-dom/server";
import App from "./App";
import { setServerPathname } from "./lib/route";
import { fetchRemoteTexts } from "./i18n/remote";

/**
 * Prerender (auditorías de HeyCatch, tarjetas #126 y #131): al publicar se pinta cada página en
 * español y su HTML va dentro de <div id="root">, para que los buscadores y las IAs que no
 * ejecutan JavaScript lean el texto. En el navegador, main.tsx monta la web igual que siempre
 * (createRoot, no hydrate) y sustituye ese HTML: así un visitante con el inglés guardado no ve
 * nada raro. Ver scripts/prerender.mjs.
 */
export const loadServerTexts = () => fetchRemoteTexts("es");

export function render(pathname: string, serverTexts: Record<string, string> | null) {
  setServerPathname(pathname);
  return renderToString(<App serverTexts={serverTexts} />);
}
