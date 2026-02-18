import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const comparison = [
  {
    title: "Canal típico",
    bullets: [
      "Tips sueltos sin contexto real de punto.",
      "Golpes perfectos en situaciones artificiales.",
      "Mejora técnica, poca transferencia táctica.",
    ],
  },
  {
    title: "Padel Film Room",
    bullets: [
      "Partidos reales, presión real, decisiones reales.",
      "Lectura de contexto y señales antes del golpe.",
      "Framework aplicable: Contexto -> Señal -> Decisión -> Consecuencia.",
    ],
  },
];

export function WhatIsSection() {
  const reduceMotion = useReducedMotion();

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
        <SectionTitle eyebrow="Qué es" title="No es otro canal de pádel" />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {comparison.map((card) => (
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
