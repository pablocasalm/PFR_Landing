import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { fadeUp, staggerContainer } from "./Motion";
import { TestimonialQuote } from "./TestimonialQuote";
import { TrialCta } from "./TrialCta";

/** Mínimo de testimonios reales para enseñar la sección (tarjeta de Trello: «se publica cuando
 * estén los 3»). Con menos, no aparece nada: ni título ni hueco. Ahora hay 4 (30/10). */
const MIN_TESTIMONIALS = 3;

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const items = t.testimonials.items.filter((item) => item.text.trim());
  if (items.length < MIN_TESTIMONIALS) return null;

  return (
    <motion.section
      id="testimonios"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={reduceMotion ? undefined : staggerContainer}
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent-cyan">{t.testimonials.eyebrow}</p>
        {/* 2×2 en escritorio: los textos son largos (tarjeta de Andrea); en móvil, una debajo de otra. */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div key={index} variants={reduceMotion ? undefined : fadeUp(24)}>
              <TestimonialQuote item={item} className="h-full" />
            </motion.div>
          ))}
        </div>
        <TrialCta location="testimonials" className="mt-10" />
      </div>
    </motion.section>
  );
}
