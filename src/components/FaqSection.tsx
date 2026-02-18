import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const faqs = [
  {
    q: "¿Esto sirve si no soy jugador avanzado?",
    a: "Sí. El foco está en leer mejor el punto y decidir con criterio. Es útil desde nivel amateur.",
  },
  {
    q: "¿Qué voy a recibir exactamente?",
    a: "Análisis táctico aplicado, patrones repetibles y ejemplos para trasladar decisiones reales a tu próximo partido.",
  },
  {
    q: "¿Puedo darme de baja?",
    a: "Sí. Baja inmediata en un clic desde cualquier correo.",
  },
  {
    q: "¿Me vais a enviar spam?",
    a: "No. Solo contenido relevante de la waitlist y avisos del lanzamiento.",
  },
];

export function FaqSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="faq"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" />
        <motion.div
          className="mt-12 grid gap-4"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {faqs.map((item) => (
            <motion.details
              key={item.q}
              variants={reduceMotion ? undefined : fadeUp()}
              className="glass-panel group rounded-2xl px-5 py-4"
            >
              <summary className="focus-ring cursor-pointer list-none pr-6 text-base font-semibold text-text">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

