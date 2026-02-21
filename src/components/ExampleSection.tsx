import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const steps = [
  {
    key: "Contexto",
    detail:
      "40-40, segundo saque rival, pareja cerrando por el medio. Qué está pasando antes de que salga la bola.",
  },
  {
    key: "Señal",
    detail: "El restador pisa dentro y abre hombros demasiado pronto. Muestra intención de cruzado rápido.",
  },
  {
    key: "Decisión",
    detail: "No buscar winner: bloquear paralelo profundo al cuerpo del volea y recuperar red en dos apoyos.",
  },
  {
    key: "Consecuencia",
    detail:
      "Forzamos volea incómoda, sube bola corta y cerramos el punto en transición alta. Patrón repetible.",
  },
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
          title="Como se ve un analisis"
          subtitle="Desglosamos decisiones punto a punto para que puedas trasladarlas tal cual a tus partidos."
        />

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted sm:text-base">
          Aquí no hay highlights aislados: hay lectura táctica real en partido para decidir mejor bajo
          presión.
        </p>

        <motion.div
          className="glass-panel mt-12 rounded-3xl p-6 sm:p-8"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={reduceMotion ? undefined : fadeUp()}
              className="group relative border-b border-border/80 py-5 last:border-b-0"
            >
              <div className="grid gap-3 md:grid-cols-[180px_1fr] md:gap-6">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
                  {`0${index + 1}`} {step.key}
                </p>
                <p className="text-sm leading-relaxed text-text sm:text-base">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

