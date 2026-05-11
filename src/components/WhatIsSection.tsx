import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";

export function WhatIsSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.section
      id="que-es"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.whatIs.eyebrow} title={t.whatIs.title} />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {t.whatIs.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={reduceMotion ? undefined : fadeUp()}
              className="glass-panel rounded-3xl p-6"
            >
              <h3 className="font-display text-2xl uppercase text-text">{card.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted sm:text-base">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-border/70 bg-surface-2 p-3">
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
