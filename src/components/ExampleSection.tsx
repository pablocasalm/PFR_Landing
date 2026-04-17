import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const bullets = [
  "Mismo concepto en distintos puntos reales.",
  "Diferentes jugadores en la misma situación.",
  "Cuándo usarlo y por qué funciona.",
];

export function ExampleSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="ejemplo"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Ejemplo"
          title="Ejemplo de lo que verás dentro"
          subtitle="Uso del globo. Globo para quitar presión."
        />

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted sm:text-base">
          No se trata de un highlight aislado. Se trata de ver un mismo patrón varias veces hasta que
          puedas reconocerlo tú también.
        </p>

        <motion.div
          className="glass-panel mt-12 grid gap-5 rounded-lg p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr]"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <motion.article variants={reduceMotion ? undefined : fadeUp()} className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
              Concepto
            </p>
            <h3 className="font-display text-3xl uppercase leading-[1] text-text">
              Globo para quitar presión
            </h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Verás el mismo concepto repetido en distintos partidos para entender qué situación lo
              activa, qué decisión lo convierte en una buena solución y por qué termina funcionando.
            </p>

            <ul className="space-y-3 pt-2 text-sm leading-relaxed text-text sm:text-base">
              {bullets.map((bullet) => (
                <li key={bullet} className="border-l border-accent-cyan/40 pl-4">
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article variants={reduceMotion ? undefined : fadeUp(36)} className="rounded-md border border-border bg-surface-2 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
              Lo que aprendes a ver
            </p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                Cuando el rival te aprieta y no te conviene acelerar, el globo deja de ser un recurso
                defensivo genérico y pasa a ser una decisión concreta para quitar presión.
              </p>
              <p>
                Ese cambio de lectura es lo que intentamos entrenar: no solo que sepas que existe el
                golpe, sino que sepas identificar cuándo corresponde.
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </motion.section>
  );
}
