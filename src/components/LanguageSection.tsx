import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp, staggerContainer } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";
import { StreamVideo } from "./StreamVideo";
import { TrialCta } from "./TrialCta";
import { SAMPLE_CLIP } from "../lib/media";

export function LanguageSection() {
  const reduceMotion = useReducedMotion();
  const { t, lang } = useLanguage();
  const clip = t.languageSection.sampleClip;

  return (
    <motion.section
      id="lenguaje"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.languageSection.eyebrow} title={t.languageSection.title} />

        <motion.div
          className="mx-auto mt-12 max-w-xl"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          <motion.article
            variants={reduceMotion ? undefined : fadeUp()}
            className="glass-panel rounded-lg p-6 sm:p-8"
          >
            <div className="space-y-4">
              {t.languageSection.practiceCards.map((card, index) => (
                <div key={index} className="rounded-md border border-border bg-surface-2 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">{card.label}</p>
                  <p className="mt-2 text-base text-text">{card.text}</p>
                </div>
              ))}
            </div>
          </motion.article>
          <motion.p variants={reduceMotion ? undefined : fadeUp(24)} className="mt-8 text-center text-base text-text">
            {t.languageSection.clipIntro}
          </motion.p>
        </motion.div>

        {/* Clip de muestra 013_02 con el aspecto de la app (reproductor, etiqueta, título, insight y
            conceptos), sin cuenta (tarjeta #138). En inglés, la versión doblada. */}
        <motion.article
          id="clip-de-muestra"
          className="mx-auto mt-6 max-w-3xl scroll-mt-24"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {SAMPLE_CLIP[lang] && <StreamVideo uid={SAMPLE_CLIP[lang]} variant="clip" title={clip.title} />}
          <p className="mt-2 text-xs text-muted">{clip.source}</p>
          <div className="mt-5 space-y-4">
            <span className="inline-block rounded border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-cyan">
              {clip.badge}
            </span>
            <h3 className="text-2xl font-bold text-text sm:text-3xl">{clip.title}</h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{clip.insight}</p>
            <ul className="flex flex-wrap gap-2">
              {clip.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-accent-cyan/40 px-3 py-1 text-xs font-medium text-accent-cyan">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <TrialCta location="sample_clip" className="mt-8" />
        </motion.article>
      </div>
    </motion.section>
  );
}
