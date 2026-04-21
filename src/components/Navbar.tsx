import { trackEvent } from "../lib/analytics";
import type { MouseEvent } from "react";

const links = [
  { href: "#que-es", label: "Qué es" },
  { href: "#como-aprenderas", label: "Cómo aprenderás" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#ejemplo", label: "Ejemplo" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/75 backdrop-blur-xl">
      <div className="w-full px-4 py-3 sm:px-6 sm:py-4">
        <nav className="flex items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]" aria-label="Navegación principal">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="focus-ring min-w-0 shrink rounded-lg md:justify-self-start"
            aria-label="Padel Film Room"
          >
            <img
              src="/download.jpg"
              alt=""
              className="h-16 w-auto object-contain sm:h-20 md:h-16"
            />
          </a>

          <ul className="hidden flex-wrap items-center justify-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted md:flex">
            {links.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  onClick={(event) => handleSectionClick(event, link.href)}
                  className="focus-ring rounded-md border border-transparent px-2 py-1 transition hover:border-border hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#waitlist-final"
            onClick={(event) => {
              trackEvent("cta_navbar_click", { location: "navbar" });
              handleSectionClick(event, "#waitlist-final");
            }}
            className="focus-ring shrink-0 rounded-md border border-accent-cyan/40 bg-accent-cyan px-3 py-2 text-xs font-semibold text-bg shadow-glow transition hover:brightness-105 sm:px-4 sm:text-sm md:justify-self-end"
          >
            <span className="sm:hidden">Lista privada</span>
            <span className="hidden sm:inline">Únete a la lista privada</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
