import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../i18n/LanguageContext";
import { isOpenSignup } from "../i18n/openSignup";
import { TestimonialQuote } from "./TestimonialQuote";

/**
 * PFR Club: qué añade el plan Club (masterclass mensual, plan del mes y archivo) y una mención a
 * Coach. Mismo esqueleto y estilos que "Cómo funciona" (LearnInsideSection): etiqueta + título +
 * texto y un panel con tarjetas. En la Fase A (landing con lista de espera) el botón lleva al
 * formulario final; cuando se abran los pagos pasará a llevar a los planes.
 */
export function ClubSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent("cta_club_click", { location: "club" });
    if (!isOpenSignup()) return; // tras la beta, el enlace lleva a /precios
    event.preventDefault();
    document.querySelector<HTMLElement>("#waitlist-final")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.section
      id="club"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.club.eyebrow} title={t.club.title} subtitle={t.club.subtitle} />

        <motion.div
          className="glass-panel mt-12 overflow-hidden rounded-lg"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <ul className="grid gap-3 p-6 sm:p-8 md:grid-cols-3">
            {t.club.cards.map((card, index) => (
              <motion.li
                key={index}
                variants={reduceMotion ? undefined : fadeUp(24)}
                className="rounded-md border border-border bg-surface-2 px-4 py-5"
              >
                <h3 className="font-display text-xl uppercase leading-tight text-text sm:text-2xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{card.text}</p>
              </motion.li>
            ))}
          </ul>

          {/* Lo que dice una beta tester de la masterclass (aprobado por ella). */}
          <motion.div variants={reduceMotion ? undefined : fadeUp(32)} className="px-6 pb-6 sm:px-8 sm:pb-8">
            <TestimonialQuote item={t.club.quote} />
          </motion.div>

          <motion.article
            variants={reduceMotion ? undefined : fadeUp(40)}
            className="flex flex-col gap-4 border-t border-border/80 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{t.club.coachNote}</p>
            <a
              href={isOpenSignup() ? "#waitlist-final" : "/precios"}
              onClick={handleCtaClick}
              className="focus-ring shrink-0 rounded-full border border-accent-cyan/40 bg-accent-cyan px-5 py-2.5 text-center text-sm font-semibold text-bg shadow-glow transition hover:brightness-105"
            >
              {t.club.cta}
            </a>
          </motion.article>
        </motion.div>
      </div>
    </motion.section>
  );
}
