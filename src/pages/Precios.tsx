import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "../components/SectionTitle";
import { fadeUp, staggerContainer } from "../components/Motion";
import { useLanguage } from "../i18n/LanguageContext";
import { trackEvent } from "../lib/analytics";

/**
 * Precios — comparativa de los 3 planes (§Stripe 3 planes, Fase 4).
 *
 * §Temporal (a propósito, pedido explícitamente): precios y features son estáticos (hardcoded,
 * mismo contenido que src/i18n/{es,en}.ts → pricing), y NINGÚN plan es clicable todavía —
 * "Próximamente" en los tres, Starter y Coach incluidos. Solo existe en Stripe el precio de
 * siempre (9,99€, el que hoy representa a Club en BD — no coincide con el 24,90€ de aquí, no
 * importa mientras nada sea clicable). Cuando se cree de verdad Starter/Coach en Stripe y se
 * decida abrir el checkout, retomar getBillingPlans()/billingService.ts (ya soporta tiers desde
 * la Fase 0 del backend) para volver a hacer esto dinámico, en vez de PLAN_PRICES de abajo.
 */

const PLAN_PRICES: Record<"starter" | "club" | "coach", number> = { starter: 14.9, club: 24.9, coach: 74.9 };

// Qué planes incluye cada fila de features — mismo orden que t.pricing.featureRows. Es lógica
// (no texto), así que no vive en el diccionario de idiomas.
const FEATURE_TIERS: ("starter" | "club" | "coach")[][] = [
  ["starter", "club", "coach"],
  ["starter", "club", "coach"],
  ["club", "coach"],
  ["club", "coach"],
  ["club", "coach"],
  ["club", "coach"],
  ["coach"],
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-4 w-4 shrink-0" aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function Precios() {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = `${t.pricing.eyebrow} | Padel Film Room`;
    trackEvent("pricing_page_view");
  }, [t.pricing.eyebrow]);

  const currencyFormat = (amount: number) =>
    new Intl.NumberFormat(lang === "en" ? "en-GB" : "es-ES", { style: "currency", currency: "EUR" }).format(amount);

  const plans: { key: "starter" | "club" | "coach"; name: string; accent: boolean; availability: string }[] = [
    { key: "starter", name: t.pricing.planNames.starter, accent: false, availability: t.pricing.availabilityOpen },
    { key: "club", name: t.pricing.planNames.club, accent: true, availability: t.pricing.availabilityOpen },
    { key: "coach", name: t.pricing.planNames.coach, accent: false, availability: t.pricing.availabilityLimited },
  ];

  return (
    <>
      {/* Cabecera con el mismo glow radial que el Hero */}
      <section className="relative overflow-hidden px-4 pb-4 pt-20 sm:px-6 lg:pt-24">
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(40, 240, 224, 0.14)" }}
          aria-hidden
        />
        <motion.div
          className="relative mx-auto max-w-3xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
        >
          <SectionTitle eyebrow={t.pricing.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} />
        </motion.div>
      </section>

      {/* 3 planes en tarjetas, ninguno clicable todavía */}
      <section className="px-4 pb-8 sm:px-6">
        <motion.div
          className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          variants={reduceMotion ? undefined : staggerContainer}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              variants={reduceMotion ? undefined : fadeUp(20)}
              className={`glass-panel relative flex flex-col rounded-lg border p-6 sm:p-8 ${
                plan.accent ? "border-accent-cyan/50 bg-accent-cyan/[0.04]" : "border-border/80"
              }`}
            >
              {plan.accent && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent-cyan px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-bg">
                  {t.pricing.mostPopular}
                </span>
              )}

              <h3 className="font-display text-lg text-text">{plan.name}</h3>
              <p className="mt-2 font-display text-4xl leading-none text-text">
                {currencyFormat(PLAN_PRICES[plan.key])}
                <span className="ml-1 align-middle text-sm font-normal text-muted">{t.pricing.monthlySuffix}</span>
              </p>
              <p className="mt-2 text-xs text-muted">
                {t.pricing.availabilityLabel} {plan.availability}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {t.pricing.featureRows.map((label, i) => {
                  const included = FEATURE_TIERS[i]?.includes(plan.key);
                  return (
                    <li key={label} className={`flex items-start gap-2.5 ${included ? "text-text/90" : "text-muted/50"}`}>
                      <span className={included ? "mt-0.5 text-accent-lime" : "mt-0.5 text-muted/40"}>
                        {included ? <CheckIcon /> : <DashIcon />}
                      </span>
                      {label}
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                disabled
                className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-surface-2 py-3 text-sm font-semibold text-muted"
              >
                <ClockIcon />
                {t.pricing.comingSoon}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Barra de CTA final, mismo patrón que FinalCtaSection — independiente de qué plan se elija */}
      <motion.section
        className="px-4 py-16 sm:px-6 lg:py-20"
        initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="glass-panel mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <h2 className="font-display text-2xl uppercase leading-[0.98] text-text sm:text-3xl">{t.pricing.ctaBandTitle}</h2>
          <a
            href="https://app.padelfilmroom.com/register"
            onClick={() => trackEvent("pricing_cta_click", { destination: "register" })}
            className="focus-ring shrink-0 rounded-full bg-accent-cyan px-6 py-3.5 text-center font-semibold text-bg shadow-glow transition hover:brightness-105"
          >
            {t.pricing.ctaBandButton}
          </a>
        </div>
      </motion.section>
    </>
  );
}
