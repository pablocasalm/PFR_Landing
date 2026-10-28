import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";
import { INSTAGRAM_GUILLE, INSTAGRAM_PFR } from "../lib/social";

export function TeamSection() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.section
      id="quienes-somos"
      className="px-4 py-20 sm:px-6 lg:py-24"
      initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.article variants={reduceMotion ? undefined : fadeUp()} className="glass-panel rounded-lg p-4 sm:p-5">
          <img
            src="/pfr-equipo-andrea-guille-pablo.jpg"
            alt={t.team.imgAlt}
            width={1100}
            height={824}
            loading="lazy"
            className="aspect-[1100/824] h-full w-full rounded-md object-cover"
          />
        </motion.article>

        <motion.article variants={reduceMotion ? undefined : fadeUp(36)} className="glass-panel flex rounded-lg p-6 sm:p-8">
          <div className="self-center">
            <SectionTitle eyebrow={t.team.eyebrow} title={t.team.title} />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              {t.team.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={INSTAGRAM_PFR} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center text-accent-cyan underline-offset-4 hover:underline">
                {t.team.instagram}
              </a>
              <a href={INSTAGRAM_GUILLE} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center text-accent-cyan underline-offset-4 hover:underline">
                {t.team.instagramGuille}
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
}
