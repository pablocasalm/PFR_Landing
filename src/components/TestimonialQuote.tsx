import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Testimonial } from "../i18n/types";

/** Banderas dibujadas (no emojis: en Windows salen como letras). Una por país de los testimonios. */
const FLAGS: Record<string, ReactNode> = {
  es: (
    <>
      <rect width="30" height="20" fill="#c60b1e" />
      <rect y="5" width="30" height="10" fill="#ffc400" />
    </>
  ),
  ch: (
    <>
      <rect width="30" height="20" fill="#da291c" />
      <rect x="13" y="4" width="4" height="12" fill="#fff" />
      <rect x="9" y="8" width="12" height="4" fill="#fff" />
    </>
  ),
  de: (
    <>
      <rect width="30" height="20" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
      <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
    </>
  ),
};

function Flag({ code, label }: { code: string; label: string }) {
  const flag = FLAGS[code];
  if (!flag) return <span className="text-xs text-muted">{label}</span>;
  return (
    <svg viewBox="0 0 30 20" role="img" aria-label={label} className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-white/15">
      <title>{label}</title>
      {flag}
    </svg>
  );
}

/**
 * Testimonio en tres partes: la frase (sus palabras, tal cual), una línea, y debajo la persona
 * (inicial, nombre y bandera) y su nivel de Playtomic como cifra destacada. En pantallas de
 * menos de 360 px la inicial no se enseña: no cabe todo en una línea.
 */
export function TestimonialQuote({ item, className = "" }: { item: Testimonial; className?: string }) {
  const { t } = useLanguage();
  return (
    <figure className={`glass-panel flex min-w-0 flex-col rounded-2xl border border-border/80 p-6 sm:p-7 ${className}`}>
      <svg viewBox="0 0 32 24" className="h-6 w-8 text-accent-cyan" fill="currentColor" aria-hidden>
        <path d="M0 24V14C0 6.3 4.2 1.6 11.4 0l1.4 3.4C8.6 4.8 6.6 7.6 6.4 11H12v13H0Zm19 0V14c0-7.7 4.2-12.4 11.4-14l1.4 3.4c-4.2 1.4-6.2 4.2-6.4 7.6H31v13H19Z" />
      </svg>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-text/90 sm:text-base">{item.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full max-[359px]:hidden bg-gradient-to-br from-accent-cyan to-accent-lime font-display text-lg text-bg"
          aria-hidden
        >
          {item.name.charAt(0)}
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <span className="font-semibold text-text">{item.name}</span>
          <Flag code={item.flag} label={item.country} />
        </span>
        <span className="ml-auto text-right leading-none">
          <span className="block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-muted">{t.testimonials.levelLabel}</span>
          <span className="mt-1.5 block font-display text-2xl text-accent-lime">{item.level}</span>
        </span>
      </figcaption>
    </figure>
  );
}
