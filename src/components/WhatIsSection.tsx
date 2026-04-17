import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const points = [
  {
    title: "Partidos reales",
    text: "En Padel Film Room analizamos partidos reales y detectamos patrones que se repiten constantemente.",
  },
  {
    title: "Lenguaje simple",
    text: "Los traducimos a un lenguaje simple y te los enseñamos de forma que puedas reconocerlos en pista.",
  },
  {
    title: "Diferencial",
    text: "No tienes que analizar partidos. Nosotros lo hacemos por ti y ordenamos lo importante para que puedas entenderlo.",
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
        <SectionTitle
          eyebrow="Qué es Padel Film Room"
          title="No es solo contenido. Es una forma de entender el pádel."
        />
        <motion.div
          className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <motion.article variants={reduceMotion ? undefined : fadeUp()} className="glass-panel rounded-lg p-4 sm:p-5">
            <img
              src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80"
              alt="Pista de pádel durante un intercambio."
              loading="lazy"
              className="aspect-[4/5] w-full rounded-md object-cover"
            />
          </motion.article>

          <motion.div
            variants={reduceMotion ? undefined : fadeUp(36)}
            className="grid gap-5"
          >
            {points.map((point) => (
              <article key={point.title} className="glass-panel rounded-lg p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
                  {point.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text sm:text-lg">{point.text}</p>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
