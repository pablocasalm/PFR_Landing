import { useLanguage } from "../i18n/LanguageContext";
import { legalUrl, type LegalDoc } from "../lib/legal";

export function Footer() {
  const { t, lang } = useLanguage();
  const links: [LegalDoc, string][] = [
    ["legalNotice", t.footer.legalNotice],
    ["privacy", t.footer.privacy],
    ["cookies", t.footer.cookies],
    ["terms", t.footer.terms],
  ];

  return (
    <footer className="border-t border-border/80 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-muted">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Padel Film Room</p>
          <p className="font-mono uppercase tracking-[0.16em]">{t.footer.tagline}</p>
        </div>
        {/* Documentos legales: se abren en Lawwwing, en el idioma de la web. */}
        <nav aria-label={t.footer.legalNav} className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map(([doc, label]) => (
            <a
              key={doc}
              href={legalUrl(doc, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring underline-offset-4 transition hover:text-text hover:underline"
            >
              {label}
            </a>
          ))}
          {/* Pulsa el "Configurar" del pie de Lawwwing, que tenemos oculto (index.css). */}
          <button
            type="button"
            onClick={() => document.querySelector<HTMLElement>("#lw-footer .lw-consent-edit")?.click()}
            className="focus-ring underline-offset-4 transition hover:text-text hover:underline"
          >
            {t.footer.cookieSettings}
          </button>
        </nav>
      </div>
    </footer>
  );
}
