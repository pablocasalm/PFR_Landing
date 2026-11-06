import { useLanguage } from "../i18n/LanguageContext";
import { trackEvent } from "../lib/analytics";

/** Botón «Empieza tu prueba gratis de 7 días» → /precios, el mismo en varias secciones de la
 * portada (tarjeta #138). `location` va a la analítica para saber desde dónde se pulsa. */
export function TrialCta({ location, className = "" }: { location: string; className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`text-center ${className}`}>
      <a
        href="/precios"
        onClick={() => trackEvent("cta_trial_click", { location })}
        className="focus-ring inline-flex items-center justify-center rounded-full bg-accent-cyan px-7 py-3.5 text-center font-semibold text-bg shadow-glow transition hover:brightness-105"
      >
        {t.hero.trialCta}
      </a>
    </div>
  );
}
