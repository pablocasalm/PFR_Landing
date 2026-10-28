import { useLanguage } from "../i18n/LanguageContext";
import { legalUrl, type LegalDoc } from "../lib/legal";
import { INSTAGRAM_PFR } from "../lib/social";

// Zona táctil de 44 px de alto en todos los enlaces del pie (en móvil costaba tocarlos).
const linkClass = "focus-ring inline-flex min-h-11 items-center underline-offset-4 transition hover:text-text hover:underline";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
        {/* Páginas del sitio y contacto, en todas las páginas (auditoría SEO: enlaces internos,
            «quiénes somos» y una vía de contacto real). */}
        <nav aria-label={t.footer.siteNav} className="flex flex-wrap items-center gap-x-5 text-sm">
          <a href="/" className={linkClass}>
            {t.footer.home}
          </a>
          <a href="/precios" className={linkClass}>
            {t.nav.pricing}
          </a>
          <a href="/#quienes-somos" className={linkClass}>
            {t.nav.whoWeAre}
          </a>
          <a href="mailto:hello@padelfilmroom.com" className={linkClass}>
            {t.footer.contact}
          </a>
          <a href={INSTAGRAM_PFR} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${linkClass} min-w-11 justify-center`}>
            <InstagramIcon />
          </a>
        </nav>
        {/* Documentos legales: se abren en Lawwwing, en el idioma de la web. */}
        <nav aria-label={t.footer.legalNav} className="flex flex-wrap gap-x-5">
          {links.map(([doc, label]) => (
            <a key={doc} href={legalUrl(doc, lang)} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {label}
            </a>
          ))}
          {/* Pulsa el "Configurar" del pie de Lawwwing, que tenemos oculto (index.css). */}
          <button
            type="button"
            onClick={() => document.querySelector<HTMLElement>("#lw-footer .lw-consent-edit")?.click()}
            className={linkClass}
          >
            {t.footer.cookieSettings}
          </button>
        </nav>
      </div>
    </footer>
  );
}
