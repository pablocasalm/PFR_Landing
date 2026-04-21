import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp } from "./Motion";

export function TeamSection() {
  const reduceMotion = useReducedMotion();

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
            src="/WhatsApp Image 2026-04-20 at 09.31.19.jpeg"
            alt="Equipo reunido trabajando sobre una mesa."
            loading="lazy"
            className="aspect-[2896/2170] h-full w-full rounded-md object-cover"
          />
        </motion.article>

        <motion.article variants={reduceMotion ? undefined : fadeUp(36)} className="glass-panel flex rounded-lg p-6 sm:p-8">
          <div className="self-center">
          <SectionTitle eyebrow="Quiénes somos" title="Somos Andrea, Guille y Pablo." />
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            <p>Una familia vinculada al pádel desde siempre.</p>
            <p>Hemos competido, entrenado y vivido el juego desde dentro durante años.</p>
            <p>
              Guille, además, lleva años trabajando con jugadores y analizando partidos a nivel
              profesional.
            </p>
            <p>
              Ahora estamos construyendo Padel Film Room: una forma de traducir lo que pasa en los
              partidos para que cualquier jugador pueda entenderlo.
            </p>
          </div>
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
}
