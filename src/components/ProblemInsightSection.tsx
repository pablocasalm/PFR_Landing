import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";

export function ProblemInsightSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.section
      id="que-es"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.problemInsight.eyebrow} title={t.problemInsight.title} />

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {t.problemInsight.blocks.map((block) => (
            <motion.article
              key={block.eyebrow}
              variants={reduceMotion ? undefined : fadeUp()}
              className="glass-panel rounded-lg p-6 sm:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan">
                {block.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl uppercase leading-[1] text-text">
                {block.title}
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
