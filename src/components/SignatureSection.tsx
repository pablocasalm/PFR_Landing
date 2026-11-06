import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

/** La firma «Deja de copiar golpes. / Empieza a copiar decisiones.», con el estilo del antiguo
 * titular del hero (los dos colores). Desde el 06/11/2026 va sola, justo antes de «Precio
 * fundador» (tarjeta #138); el hero lleva ahora la pregunta. */
export function SignatureSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  return (
    <motion.section
      className="px-4 py-16 sm:px-6 lg:py-20"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <h2 className="mx-auto max-w-5xl text-center font-display text-5xl uppercase leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="hero-gradient-text hero-gradient-cyan block">{t.hero.line1}</span>
        <span className="hero-gradient-text hero-gradient-lime block">{t.hero.line2}</span>
      </h2>
    </motion.section>
  );
}
