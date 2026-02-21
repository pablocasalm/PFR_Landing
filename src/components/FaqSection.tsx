import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const faqs = [
  {
    q: "Esto sirve si no soy jugador avanzado?",
    a: "Si. El foco esta en leer mejor el punto y decidir con criterio. Es util desde nivel amateur.",
  },
  {
    q: "Que voy a recibir exactamente?",
    a: "Analisis tactico aplicado y patrones repetibles para trasladar decisiones reales a tu proximo partido.",
  },
  {
    q: "Puedo darme de baja?",
    a: "Si. Baja inmediata en un clic desde cualquier correo.",
  },
  {
    q: "Me vais a enviar spam?",
    a: "No. Solo contenido relevante de la waitlist y avisos del lanzamiento.",
  },
];

export function FaqSection() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
        <div className="mt-12 grid gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={item.q} className="glass-panel overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="focus-ring flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-text"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className={`text-accent-cyan transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? false : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? false : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

