import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const pillars = [
  {
    title: "Bloques de aprendizaje",
    bullets: [
      "Un mismo concepto repetido en distintos partidos.",
      "Para que puedas reconocerlo en pista cuando vuelve a aparecer.",
      "No vídeos sueltos. Mismo patrón, distintas situaciones.",
    ],
  },
  {
    title: "Análisis de partidos completos",
    bullets: [
      "Para entender cómo se conectan las decisiones dentro del juego real.",
      "Cómo se construyen los puntos y dónde se decide cada juego.",
      "Qué patrones se repiten durante todo el partido.",
    ],
  },
];

export function LearnInsideSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="como-aprenderas"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Cómo aprenderás dentro"
          title="No verás vídeos sueltos."
          subtitle="Verás un sistema pensado para que puedas entender el juego de verdad y elegir cómo aprender en cada momento."
        />

        <motion.div
          className="glass-panel mt-12 overflow-hidden rounded-lg"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <motion.article variants={reduceMotion ? undefined : fadeUp()} className="border-b border-border/80 p-4 sm:p-5">
            <img
              src="https://images.unsplash.com/photo-1542144582-1ba00456b5e3?auto=format&fit=crop&w=1200&q=80"
              alt="Jugadores de pádel durante un punto en partido real."
              loading="lazy"
              className="aspect-[21/9] w-full rounded-md object-cover"
            />
          </motion.article>

          <div className="divide-y divide-border/80">
            {pillars.map((pillar) => (
              <motion.article
                key={pillar.title}
                variants={reduceMotion ? undefined : fadeUp(24)}
                className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[260px_1fr]"
              >
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight text-text sm:text-3xl">
                    {pillar.title}
                  </h3>
                </div>

                <ul className="grid gap-3 sm:grid-cols-3">
                  {pillar.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-md border border-border bg-surface-2 px-4 py-4 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <motion.article
            variants={reduceMotion ? undefined : fadeUp(40)}
            className="border-t border-border/80 px-6 py-5 sm:px-8"
          >
            <div className="grid gap-3 lg:grid-cols-[260px_1fr] lg:items-start">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
                Qué cambia por dentro
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-text sm:text-lg">
                No tienes que analizar partidos por tu cuenta. Nosotros seleccionamos, ordenamos y
                explicamos lo importante para que tú solo tengas que verlo y entenderlo.
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </motion.section>
  );
}
