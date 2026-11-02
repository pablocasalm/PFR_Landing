// Prerender de la landing (ver src/entry-server.tsx): mete el HTML de cada página dentro de
// <div id="root"> en los archivos ya generados por `vite build`. Va después del build normal y
// del build de servidor (dist-ssr), en `npm run build`.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render, loadServerTexts } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

// Si la API no responde, se publica con los textos de es.ts (lo mismo que vería un visitante sin red).
const texts = await loadServerTexts();
if (!texts) console.warn("prerender: sin textos de la base de datos, se usan los de es.ts");

const pages = [
  { file: "index.html", path: "/" },
  { file: "precios.html", path: "/precios" },
  { file: "404.html", path: "/esta-pagina-no-existe" },
];

for (const { file, path } of pages) {
  const target = `${root}dist/${file}`;
  const html = readFileSync(target, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`prerender: ${file} no tiene ${marker}`);
  const body = render(path, texts);
  writeFileSync(target, html.replace(marker, `<div id="root">${body}</div>`));
  console.log(`prerender: ${file} (${path}) ${Math.round(body.length / 1024)} KB`);
}

rmSync(`${root}dist-ssr`, { recursive: true, force: true });
