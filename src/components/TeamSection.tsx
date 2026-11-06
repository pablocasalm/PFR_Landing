import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { fadeUp } from "./Motion";
import { useLanguage } from "../i18n/LanguageContext";
import { INSTAGRAM_GUILLE, INSTAGRAM_PFR } from "../lib/social";
import { InstagramIcon } from "./InstagramIcon";

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
      {/* Foto vertical de los tres hermanos (06/11/2026). En escritorio, en una columna más
          estrecha que el texto para que no quede gigante; en móvil, a todo el ancho. Cada pantalla
          descarga el tamaño que necesita (480, 800 o 1200 px de ancho, en WebP). */}
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.article variants={reduceMotion ? undefined : fadeUp()} className="glass-panel mx-auto w-full max-w-md rounded-lg p-4 sm:p-5 lg:max-w-none">
          {/* srcSet y sizes antes que src: React pone los atributos en este orden, y Safari empieza
              a descargar en cuanto ve src (bajaba dos tamaños de la foto). */}
          <img
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 448px, 100vw"
            srcSet="/hermanos-padel-film-room-pablo-guille-andrea-480.webp 480w, /hermanos-padel-film-room-pablo-guille-andrea-800.webp 800w, /hermanos-padel-film-room-pablo-guille-andrea-1200.webp 1200w"
            src="/hermanos-padel-film-room-pablo-guille-andrea-800.webp"
            alt={t.team.photoAlt}
            width={800}
            height={1088}
            loading="lazy"
            decoding="async"
            className="aspect-[800/1088] w-full rounded-md object-cover"
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
            {/* Perfiles de Instagram como tarjetas: icono, quién es y el usuario. */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { href: INSTAGRAM_PFR, label: t.team.instagram, handle: "@padelfilmroom" },
                { href: INSTAGRAM_GUILLE, label: t.team.instagramGuille, handle: "@guillecasalpadel" },
              ].map((profile) => (
                <a
                  key={profile.href}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex min-h-11 min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-surface-2 px-4 py-3 transition hover:border-accent-cyan/60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan to-accent-lime text-bg">
                    <InstagramIcon />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-xs text-muted">{profile.label}</span>
                    <span className="mt-1 block truncate text-sm font-semibold text-text group-hover:text-accent-cyan">{profile.handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
}
