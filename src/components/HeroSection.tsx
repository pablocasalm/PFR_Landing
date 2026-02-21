import { motion, useReducedMotion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { trackEvent } from "../lib/analytics";
import type { MouseEvent } from "react";

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const valueBullets = ["Patrones aplicables a amateur/intermedio", "Plaza en la lista de espera", "sexdungeon"];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const handleExampleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackEvent("hero_example_click", { location: "hero" });
    const target = document.querySelector<HTMLElement>("#ejemplo");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] items-center justify-center overflow-hidden bg-bg px-4 py-14 sm:px-6 sm:py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(40, 240, 224, 0.12)" }}
        aria-hidden
      />

      <motion.div
        className="relative mx-auto w-full max-w-5xl text-center"
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        variants={reduceMotion ? undefined : heroContainer}
      >
        <motion.h1
          className="mx-auto max-w-4xl font-display text-5xl uppercase leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl lg:text-8xl"
          variants={reduceMotion ? undefined : titleVariant}
        >
          <span className="hero-gradient-text hero-gradient-cyan block">Deja de copiar golpes.</span>
          <span className="hero-gradient-text hero-gradient-lime block">Empieza a copiar decisiones.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl"
          variants={reduceMotion ? undefined : itemVariant}
        >
          Decisiones correctas bajo presion, el porque de cada punto y los patrones que se repiten.
        </motion.p>

        <motion.ul
          className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted"
          variants={reduceMotion ? undefined : itemVariant}
        >
          {valueBullets.map((bullet) => (
            <li key={bullet} className="font-medium">
              {bullet}
            </li>
          ))}
        </motion.ul>

        <motion.div className="mx-auto mt-8 max-w-2xl" variants={reduceMotion ? undefined : itemVariant}>
          <WaitlistForm compact source="hero" />
        </motion.div>

        <motion.p className="mt-5 text-sm text-muted" variants={reduceMotion ? undefined : itemVariant}>
          <a
            href="#ejemplo"
            onClick={handleExampleClick}
            className="focus-ring cursor-pointer rounded px-1 text-accent-cyan underline decoration-accent-cyan underline-offset-4 transition-opacity hover:opacity-80"
          >
            Ver un ejemplo
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
