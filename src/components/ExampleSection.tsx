import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";

export function ExampleSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

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
          eyebrow={t.example.eyebrow}
          title={t.example.title}
          subtitle={t.example.subtitle}
        />

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted sm:text-base">
          {t.example.note}
        </p>

        <motion.div
          className="glass-panel mt-12 rounded-3xl p-6 sm:p-8"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {t.example.steps.map((step, index) => (
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
