import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const contentPillars = [
  {
    title: "Film Room semanal",
    text: "Análisis de puntos reales con pausa táctica y decisiones alternativas en tiempo real.",
  },
  {
    title: "Decisiones, no golpes sueltos",
    text: "No highlights desconectados. Sí lectura táctica para actuar mejor en situaciones reales.",
  },
  {
    title: "Transferencia a pista",
    text: "Cada análisis termina con acciones concretas para aplicar en tu próximo partido.",
  },
];

export function ContentSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contenido"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Contenido"
          title="Que recibiras en la waitlist"
          subtitle="Contenido táctico, directo y accionable. Sin relleno."
        />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {contentPillars.map((item) => (
            <motion.article
              key={item.title}
              variants={reduceMotion ? undefined : fadeUp()}
              className="glass-panel rounded-3xl p-6"
            >
              <h3 className="font-display text-2xl uppercase text-text">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
