import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { es } from "./src/i18n/es";

/**
 * FAQ como datos estructurados (schema.org FAQPage) dentro del index.html, para buscadores e IAs
 * que leen el HTML sin ejecutar JavaScript (el acordeón solo pinta la respuesta al abrirla). Sale
 * de las mismas preguntas que la FAQ visible (es.ts, el idioma por defecto), así que si cambian
 * en el código, cambian aquí al publicar. Los textos cambiados solo en la base de datos no llegan.
 */
function faqJsonLd(): Plugin {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: es.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return {
    name: "faq-json-ld",
    transformIndexHtml: () => [
      {
        tag: "script",
        attrs: { type: "application/ld+json" },
        // "<" escapado: un texto con "</script>" no puede cerrar la etiqueta antes de tiempo.
        children: JSON.stringify(data).replace(/</g, "\\u003c"),
        injectTo: "head",
      },
    ],
  };
}

export default defineConfig({
  plugins: [react(), faqJsonLd()],
});
