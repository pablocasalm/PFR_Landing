import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";

const faqs = [
  {
    q: "¿Que es exactamente Padel Film Room?",
    a: "Es una forma diferente de aprender padel. Analizamos partidos reales y los convertimos en contenido estructurado para entender el juego a traves de decisiones y patrones.",
  },
  {
    q: "¿Que voy a encontrar dentro?",
    a: "Contenido organizado, no videos sueltos: bloques de aprendizaje por concepto y analisis de partidos completos.",
  },
  {
    q: "¿Que son los bloques de aprendizaje?",
    a: "Colecciones de clips sobre un mismo concepto repetido en distintos contextos para que puedas reconocerlo en pista.",
  },
  {
    q: "¿Que hace diferente este enfoque?",
    a: "Construimos un lenguaje simple para identificar situaciones de presion, ventaja y decision, y poder aplicarlas luego jugando.",
  },
  {
    q: "¿Para que sirven los analisis de partidos completos?",
    a: "Para ver como se conectan las decisiones dentro de un partido real, cuando aparecen y como afectan al resultado.",
  },
  {
    q: "¿Trabajais con partidos profesionales?",
    a: "Si, porque ahi se ven mejor los patrones, pero todo esta traducido a un lenguaje accesible.",
  },
  {
    q: "¿Tengo que analizar partidos por mi cuenta?",
    a: "No. Nosotros seleccionamos, organizamos y explicamos lo importante.",
  },
  {
    q: "¿Cuando estara disponible?",
    a: "Estamos construyendo desde cero. Dejanos tu email y te avisaremos.",
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
              className="glass-panel group rounded-lg px-5 py-4"
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
