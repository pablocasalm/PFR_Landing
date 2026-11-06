import { execSync } from "node:child_process";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { es } from "./src/i18n/es";
import { stripLinks } from "./src/lib/inlineLinks";
import { SAMPLE_CLIP, STREAM_HOST, TEASER, TEASER_SECONDS, streamThumbnail } from "./src/lib/media";

/**
 * SEO de la landing (auditorías de HeyCatch del 26/10/2026), todo en el HTML que se publica para
 * que lo lean los buscadores y las IAs que no ejecutan JavaScript:
 * - Cada página con su título, descripción, canonical y etiquetas para redes (portada, /precios
 *   y 404), sacados de los textos de es.ts (el idioma por defecto). Al cambiar de idioma, la web
 *   los actualiza en el navegador (LanguageContext).
 * - Organization (schema.org) en todas, y la FAQ (FAQPage) y los vídeos (VideoObject: teaser y
 *   clip de muestra, para que Google pueda enseñarlos en sus resultados) solo en la portada.
 * - sitemap.xml con la fecha real del último cambio de cada página (git).
 * Los textos cambiados solo en la base de datos no llegan aquí.
 */
const SITE = "https://padelfilmroom.com";

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Padel Film Room",
  url: `${SITE}/`,
  logo: `${SITE}/favicon.png`,
  email: "hello@padelfilmroom.com",
  sameAs: [
    "https://www.instagram.com/padelfilmroom/",
    "https://www.tiktok.com/@padelfilmroom",
    "https://www.linkedin.com/company/padelfilmroom/",
  ],
};

const FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: stripLinks(item.a) },
  })),
};

/** Vídeos de la portada en Cloudflare Stream (lib/media.ts), en español. */
const video = (uid: string, name: string, description: string, uploadDate: string, seconds?: number) => ({
  "@type": "VideoObject",
  name,
  description,
  inLanguage: "es",
  thumbnailUrl: streamThumbnail(uid),
  uploadDate,
  contentUrl: `${STREAM_HOST}/${uid}/manifest/video.m3u8`,
  embedUrl: `${STREAM_HOST}/${uid}/iframe`,
  ...(seconds ? { duration: `PT${seconds}S` } : {}),
});

const VIDEOS = {
  "@context": "https://schema.org",
  "@graph": [
    video(TEASER.es, es.problemInsight.teaser.name, es.problemInsight.teaser.description, "2026-11-06", TEASER_SECONDS),
    ...(SAMPLE_CLIP.es
      ? [video(SAMPLE_CLIP.es, es.languageSection.sampleClip.title, es.languageSection.sampleClip.insight, "2026-11-06")]
      : []),
  ],
};

// "<" escapado: un texto con "</script>" no puede cerrar la etiqueta antes de tiempo.
const jsonLd = (data: unknown, id: string) =>
  `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

type PageMeta = { title: string; description: string; path: string | null };

/** Pone título, descripción, canonical y etiquetas para redes de una página. path null = sin
 * canonical ni og:url (404), y además noindex. */
function withMeta(html: string, { title, description, path }: PageMeta) {
  const set = (attr: string, key: string, value: string) =>
    (html = html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${escapeAttr(value)}$2`));
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  set("name", "description", description);
  set("property", "og:title", title);
  set("property", "og:description", description);
  set("name", "twitter:title", title);
  set("name", "twitter:description", description);
  if (path === null) {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "").replace(/\s*<meta property="og:url"[^>]*>/, "");
    html = html.replace("</title>", '</title>\n    <meta name="robots" content="noindex" />');
  } else {
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}${path}$2`);
    set("property", "og:url", `${SITE}${path}`);
  }
  return html;
}

/** Fecha (AAAA-MM-DD) del último commit que tocó esos archivos; hoy si git no está disponible. */
function lastModified(paths: string[]) {
  try {
    const date = execSync(`git log -1 --format=%cs -- ${paths.join(" ")}`, { encoding: "utf8" }).trim();
    if (date) return date;
  } catch {
    // Sin git (o sin historial): la fecha de la publicación.
  }
  return new Date().toISOString().slice(0, 10);
}

function seoPages(): Plugin {
  return {
    name: "pfr-seo-pages",
    // Al final: index.html ya está en el bundle cuando se generan las otras páginas.
    enforce: "post",
    transformIndexHtml: (html) =>
      withMeta(html, { title: es.meta.title, description: es.meta.description, path: "/" }).replace(
        "</head>",
        `    ${jsonLd(ORGANIZATION, "ld-organization")}\n    ${jsonLd(FAQ, "ld-faq")}\n    ${jsonLd(VIDEOS, "ld-videos")}\n  </head>`,
      ),
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") return;
      const home = String(index.source);
      const withoutFaq = home.replace(/\s*<script type="application\/ld\+json" id="ld-(faq|videos)">.*?<\/script>/gs, "");

      this.emitFile({
        type: "asset",
        // precios.html y no precios/index.html: con la carpeta, Netlify redirige /precios a /precios/.
        fileName: "precios.html",
        source: withMeta(withoutFaq, { title: es.meta.pricingTitle, description: es.meta.pricingDescription, path: "/precios" }),
      });
      // Netlify sirve 404.html con estado 404 para cualquier dirección que no exista.
      this.emitFile({
        type: "asset",
        fileName: "404.html",
        source: withMeta(withoutFaq, { title: es.meta.notFoundTitle, description: es.meta.description, path: null }),
      });

      const pages = [
        { path: "/", lastmod: lastModified(["index.html", "src/components", "src/i18n/es.ts", "src/i18n/en.ts", "public/*.webp", "public/*.jpg"]) },
        { path: "/precios", lastmod: lastModified(["src/pages/Precios.tsx", "src/i18n/es.ts", "src/i18n/en.ts"]) },
      ];
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          pages.map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>\n`).join("") +
          `</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), seoPages()],
});
