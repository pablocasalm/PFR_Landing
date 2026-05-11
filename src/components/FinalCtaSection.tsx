import { motion, useReducedMotion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { useLanguage } from "../i18n/LanguageContext";

export function FinalCtaSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.section
      id="waitlist-final"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="glass-panel mx-auto max-w-4xl rounded-3xl p-6 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent-cyan">{t.finalCta.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-[0.98] text-text sm:text-5xl">
          {t.finalCta.heading}
        </h2>
        <p className="mt-5 text-base text-muted sm:text-lg">
          {t.finalCta.subtitle}
        </p>
        <div className="mt-8">
          <WaitlistForm source="final_cta" />
        </div>
      </div>
    </motion.section>
  );
}
