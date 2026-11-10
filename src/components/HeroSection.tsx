import { motion, useReducedMotion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { isOpenSignup } from "../i18n/openSignup";
import { trackEvent } from "../lib/analytics";
import type { MouseEvent } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const handleExampleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackEvent("hero_example_click", { location: "hero" });
    const target = document.querySelector<HTMLElement>("#clip-de-muestra");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] items-center justify-center overflow-hidden bg-bg px-4 py-14 sm:px-6 sm:py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(40, 240, 224, 0.12)" }}
        aria-hidden
      />

      <motion.div
        className="relative mx-auto w-full max-w-5xl text-center"
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        variants={reduceMotion ? undefined : heroContainer}
      >
        {/* Qué es PFR y cuánto hay, antes del titular (auditoría: la categoría no se veía arriba). */}
        {/* En móvil, cada parte en su línea y sin píldora (en una sola no cabe); desde sm, en
            una línea dentro de la píldora. */}
        <motion.p
          className="mx-auto mb-6 flex flex-col items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-cyan sm:inline-flex sm:flex-row sm:gap-2 sm:rounded-full sm:border sm:border-accent-cyan/30 sm:bg-accent-cyan/[0.06] sm:px-4 sm:py-1.5 sm:text-xs"
          variants={reduceMotion ? undefined : itemVariant}
        >
          {t.hero.catalogStrip.split(" · ").map((part, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:inline" aria-hidden>·</span>}
              {part}
            </span>
          ))}
        </motion.p>

        {/* Titular: una pregunta (tarjeta #138), más pequeño que la antigua firma para que en el
            móvil el botón de la prueba se vea sin hacer scroll (375×812 y 375×667). */}
        <motion.h1
          className="mx-auto max-w-4xl font-display text-[2rem] uppercase leading-[1.05] tracking-tight text-text min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          variants={reduceMotion ? undefined : titleVariant}
        >
          <span className="hero-gradient-text hero-gradient-cyan block">{t.hero.question}</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-base text-muted sm:mt-6 sm:text-lg md:text-xl"
          variants={reduceMotion ? undefined : itemVariant}
        >
          {t.hero.lead}
        </motion.p>

        <motion.p className="mx-auto mt-3 text-sm text-muted" variants={reduceMotion ? undefined : itemVariant}>
          {t.hero.languagesNote}
        </motion.p>

        <motion.div className="mx-auto mt-6 max-w-2xl sm:mt-8" variants={reduceMotion ? undefined : itemVariant}>
          {isOpenSignup() ? (
            <WaitlistForm compact source="hero" />
          ) : (
            <>
              <a
                href="/precios"
                onClick={() => trackEvent("cta_trial_click", { location: "hero" })}
                className="focus-ring inline-flex items-center justify-center rounded-full bg-accent-cyan px-7 py-3.5 text-center font-semibold text-bg shadow-glow transition hover:brightness-105"
              >
                {t.hero.trialCta}
              </a>
              <p className="mt-3 text-sm text-muted">{t.hero.trialNote}</p>
            </>
          )}
        </motion.div>

        <motion.p className="mt-5 text-sm text-muted" variants={reduceMotion ? undefined : itemVariant}>
          <a
            href="#clip-de-muestra"
            onClick={handleExampleClick}
            className="focus-ring cursor-pointer rounded px-1 text-accent-cyan underline decoration-accent-cyan underline-offset-4 transition-opacity hover:opacity-80"
          >
            {t.hero.seeClip}
          </a>
        </motion.p>
        {/* Sin la imagen de los tres móviles desde el 10/11/2026: el teaser y el clip de muestra
            ya enseñan cómo es PFR. */}
      </motion.div>
    </section>
  );
}
