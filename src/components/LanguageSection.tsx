import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";

export function LanguageSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.section
      id="lenguaje"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.languageSection.eyebrow} title={t.languageSection.title} />

        <motion.div
          className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.9fr]"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <motion.article
            variants={reduceMotion ? undefined : fadeUp()}
            className="glass-panel rounded-lg p-6 sm:p-8"
          >
            <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>{t.languageSection.intro1}</p>
              <p>{t.languageSection.intro2}</p>
              <ul className="space-y-3 pt-2 text-text">
                {t.languageSection.situations.map((situation) => (
                  <li key={situation} className="border-l border-accent-lime/60 pl-4">
                    {situation}
                  </li>
                ))}
              </ul>
              <p className="pt-2">{t.languageSection.outro}</p>
            </div>
          </motion.article>

          <motion.article
            variants={reduceMotion ? undefined : fadeUp(36)}
            className="glass-panel rounded-lg p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
              {t.languageSection.practiceEyebrow}
            </p>
            <div className="mt-5 space-y-4">
              {t.languageSection.practiceCards.map((card) => (
                <div key={card.label} className="rounded-md border border-border bg-surface-2 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">{card.label}</p>
                  <p className="mt-2 text-base text-text">{card.text}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </motion.div>
      </div>
    </motion.section>
  );
}
