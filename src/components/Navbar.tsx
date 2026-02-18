import { trackEvent } from "../lib/analytics";
import type { MouseEvent } from "react";

const links = [
  { href: "#recomendaciones", label: "Recomendaciones" },
  { href: "#ejemplo", label: "Ejemplo" },
  { href: "#contenido", label: "Contenido" },
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
      <div className="w-full px-4 py-4 sm:px-6">
        <nav className="flex items-center justify-between gap-3" aria-label="Navegación principal">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="focus-ring rounded-lg px-2 py-1 font-display text-lg uppercase tracking-[0.06em] text-text sm:text-xl"
          >
            Padel Film Room
          </a>
          <a
            href="#waitlist-final"
            onClick={(event) => {
              trackEvent("cta_navbar_click", { location: "navbar" });
              handleSectionClick(event, "#waitlist-final");
            }}
            className="focus-ring rounded-full border border-accent-cyan/40 bg-accent-cyan px-4 py-2 text-sm font-semibold text-bg shadow-glow transition hover:brightness-105"
          >
            Únete a la lista privada
          </a>
        </nav>
        <ul className="mt-3 flex flex-wrap gap-5 pb-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
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
      </div>
    </header>
  );
}
