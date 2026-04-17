import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const blocks = [
  {
    eyebrow: "Problema",
    title: "Ves mucho. Aplicas poco.",
    paragraphs: [
      "Hoy puedes ver miles de videos de padel. Golpes, trucos, consejos y puntos espectaculares.",
      "Pero cuando vuelves a pista, es dificil aplicar todo eso. Porque el padel no se decide solo en el golpe. Se decide en lo que pasa antes.",
    ],
  },
  {
    eyebrow: "Insight",
    title: "Los mejores no solo ejecutan mejor.",
    paragraphs: [
      "Toman mejores decisiones. Y esas decisiones se repiten una y otra vez en los partidos.",
      "Si aprendes a reconocerlas, empiezas a entender el juego de una forma mucho mas util que viendo highlights sueltos.",
    ],
  },
];

export function ProblemInsightSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="que-es"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Por que existe"
          title="El juego no cambia cuando ves mas padel. Cambia cuando empiezas a leerlo."
        />

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {blocks.map((block) => (
            <motion.article
              key={block.eyebrow}
              variants={reduceMotion ? undefined : fadeUp()}
              className="glass-panel rounded-lg p-6 sm:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
                {block.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl uppercase leading-[1] text-text">
                {block.title}
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
