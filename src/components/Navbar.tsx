import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/types";

const langOptions: { code: Language; display: string; ariaLabel: string }[] = [
  { code: "es", display: "ES", ariaLabel: "Español" },
  { code: "en", display: "EN", ariaLabel: "English" },
];

function LangSwitcher() {
  const { lang, setLanguage } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-border bg-surface-2 p-1">
      {langOptions.map(({ code, display, ariaLabel }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-label={ariaLabel}
          aria-pressed={lang === code}
          className="relative flex h-7 w-8 items-center justify-center rounded-full font-mono text-xs font-semibold uppercase tracking-wide"
        >
          {lang === code && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-surface-1 shadow-sm"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span
            className={`relative z-10 leading-none transition-colors duration-150 ${
              lang === code ? "text-text" : "text-muted hover:text-text/60"
            }`}
          >
            {display}
          </span>
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const links = [
    { href: "#que-es", label: t.nav.whatIs },
    { href: "#como-aprenderas", label: t.nav.howYouLearn },
    { href: "#quienes-somos", label: t.nav.whoWeAre },
    { href: "#ejemplo", label: t.nav.example },
    { href: "#faq", label: t.nav.faq },
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isMenuOpen]);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/95 backdrop-blur-xl">
      <div className="w-full px-4 py-3 sm:px-6">
        <nav className="md:hidden" aria-label={t.nav.mainNavMobile}>
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMenuOpen(false);
              }}
              className="focus-ring rounded-md px-1 py-1 font-display text-sm uppercase tracking-[0.05em] text-text"
            >
              Padel Film Room
            </a>
            <div className="flex items-center gap-2">
              <LangSwitcher />
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="focus-ring inline-flex h-9 w-9 appearance-none items-center justify-center rounded-full border-0 bg-transparent text-text shadow-none outline-none transition hover:bg-transparent hover:opacity-80 active:bg-transparent"
              >
                <span className="relative block h-4 w-4">
                  <span
                    className={`absolute left-0 top-0.5 block h-0.5 w-4 rounded bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] block h-0.5 w-4 rounded bg-current transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute left-0 top-[13px] block h-0.5 w-4 rounded bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                id="mobile-nav-menu"
                key="mobile-nav-menu"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.22, ease: "easeOut" }}
                className="fixed inset-0 z-[120]"
              >
                <button
                  type="button"
                  aria-label={t.nav.closeMenu}
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute inset-0 bg-black/85 backdrop-blur-[48px]"
                />
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { y: -10, opacity: 0.96 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { y: -8, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.26, ease: "easeOut" }}
                  className="relative flex h-screen w-screen items-start justify-center"
                >
                  <div className="h-screen w-screen bg-[rgba(5,7,12,0.95)] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-display text-sm uppercase tracking-[0.05em] text-text">{t.nav.menu}</span>
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label={t.nav.closeMenu}
                        className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-text transition hover:bg-surface-1"
                      >
                        <span className="relative block h-4 w-4">
                          <span className="absolute left-0 top-[7px] block h-0.5 w-4 rotate-45 rounded bg-current" />
                          <span className="absolute left-0 top-[7px] block h-0.5 w-4 -rotate-45 rounded bg-current" />
                        </span>
                      </button>
                    </div>

                    <ul className="space-y-4 px-1">
                      {links.map((link, index) => (
                        <motion.li
                          key={link.href}
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                          transition={{
                            duration: shouldReduceMotion ? 0.1 : 0.22,
                            ease: "easeOut",
                            delay: shouldReduceMotion ? 0 : index * 0.04,
                          }}
                        >
                          <a
                            href={link.href}
                            onClick={(event) => handleSectionClick(event, link.href)}
                            className="focus-ring flex w-full items-center justify-center px-5 py-4 text-center font-mono text-sm uppercase tracking-[0.14em] text-text transition hover:opacity-80"
                          >
                            {link.label.toUpperCase()}
                          </a>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.a
                      href="#waitlist-final"
                      onClick={(event) => {
                        trackEvent("cta_navbar_click", { location: "navbar" });
                        handleSectionClick(event, "#waitlist-final");
                      }}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: shouldReduceMotion ? 0.1 : 0.24, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.14 }}
                      className="focus-ring mt-4 flex w-full items-center justify-center rounded-2xl bg-accent-cyan px-5 py-4 text-center font-mono text-sm font-semibold uppercase tracking-[0.12em] text-bg shadow-glow transition hover:brightness-105"
                    >
                      {t.nav.joinWaitlistMobile}
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>

        <nav className="hidden grid-cols-[1fr_auto_1fr] items-center gap-3 md:grid" aria-label={t.nav.mainNav}>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="focus-ring justify-self-start rounded-lg px-2 py-1 font-display text-xl uppercase tracking-[0.06em] text-text"
          >
            Padel Film Room
          </a>

          <ul className="flex items-center justify-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
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

          <div className="flex items-center justify-self-end gap-3">
            <LangSwitcher />
            <a
              href="#waitlist-final"
              onClick={(event) => {
                trackEvent("cta_navbar_click", { location: "navbar" });
                handleSectionClick(event, "#waitlist-final");
              }}
              className="focus-ring rounded-full border border-accent-cyan/40 bg-accent-cyan px-4 py-2 text-sm font-semibold text-bg shadow-glow transition hover:brightness-105"
            >
              {t.nav.joinWaitlist}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
