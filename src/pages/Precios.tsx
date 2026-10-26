import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "../components/SectionTitle";
import { fadeUp, staggerContainer } from "../components/Motion";
import { useLanguage } from "../i18n/LanguageContext";
import { trackEvent } from "../lib/analytics";
import { getBillingPlans, type BillingPlans, type PlanTier } from "../../services/billingService";
import { registerUrl } from "../lib/appLinks";

/**
 * Precios — comparativa de los 3 planes (§Stripe 3 planes), igual que la pantalla de Precios de
 * la app (PFR/src/pages/App/pages/Precios.tsx).
 *
 * Desde el 24/10/2026 los precios salen del servidor (GET /api/billing/plans, el mismo que usa la
 * app): el que le toca a quien mira (fundador mientras queden plazas, España o resto del mundo),
 * las plazas de fundador que quedan y si Coach está completo. Nada de precios fijos aquí: si
 * cambian en Stripe o se acaban las plazas, la landing lo enseña sola.
 *
 * Con precio fundador, al lado va tachado el precio normal (los dos salen de Stripe). Coach lleva
 * su propio contador: como mucho 5 personas, sea o no precio fundador.
 *
 * Cada plan lleva a crear la cuenta en la app con ese plan (/register?plan=…), que después abre
 * Stripe Checkout: Essential y Club con 7 días de prueba (tarjeta, sin cobro hasta el día 7),
 * Coach pagando al momento.
 */


const TIER_BY_KEY: Record<"starter" | "club" | "coach", PlanTier> = { starter: "Starter", club: "Club", coach: "Coach" };

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

export function Precios() {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  // null mientras carga; si falla, se queda en null y las tarjetas enseñan "—" en el precio.
  const [backend, setBackend] = useState<BillingPlans | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    getBillingPlans().then(setBackend).catch(() => setLoadFailed(true));
  }, []);

  useEffect(() => {
    document.title = `${t.pricing.eyebrow} | Padel Film Room`;
    trackEvent("pricing_page_view");
  }, [t.pricing.eyebrow]);

  const currencyFormat = (amount: number, currency = "EUR") =>
    new Intl.NumberFormat(lang === "en" ? "en-GB" : "es-ES", { style: "currency", currency }).format(amount);

  const monthlyPrice = (key: "starter" | "club" | "coach") =>
    backend?.plans?.find((p) => p.tier === TIER_BY_KEY[key])?.prices.find((p) => p.interval === "Monthly") ?? null;

  const founderText = backend?.isFounder
    ? backend.founderSlotsLeft
      ? t.pricing.founderLeft.replace("{count}", String(backend.founderSlotsLeft))
      : t.pricing.founder
    : null;

  // Coach: sus propias plazas (5), no las 50 de fundador. Sin el dato (backend antiguo), solo
  // «Precio fundador» si toca, para no enseñar un número que no es el suyo.
  const coachText = (() => {
    if (!backend) return null;
    if (backend.coachSlotsLeft == null || !backend.coachMaxMembers) return backend.isFounder ? t.pricing.founder : null;
    const text = backend.isFounder ? t.pricing.coachLeftFounder : t.pricing.coachLeft;
    return text.replace("{count}", String(backend.coachSlotsLeft)).replace("{total}", String(backend.coachMaxMembers));
  })();

  const plans: { key: "starter" | "club" | "coach"; name: string; tagline: string; accent: boolean }[] = [
    { key: "starter", name: t.pricing.planNames.starter, tagline: t.pricing.taglines.starter, accent: false },
    { key: "club", name: t.pricing.planNames.club, tagline: t.pricing.taglines.club, accent: true },
    { key: "coach", name: t.pricing.planNames.coach, tagline: t.pricing.taglines.coach, accent: false },
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

      {/* 3 planes en tarjetas: cada una lleva a crear la cuenta con ese plan */}
      <section id="planes" className="scroll-mt-24 px-4 pb-8 sm:px-6">
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
              <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
              {(() => {
                const price = monthlyPrice(plan.key);
                const regular = price?.regularAmount && price.regularAmount > price.displayAmount ? price.regularAmount : null;
                return (
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 font-display text-4xl leading-none text-text">
                    {regular != null && price && (
                      <del className="text-2xl text-muted decoration-2" aria-label={t.pricing.regularPrice.replace("{price}", currencyFormat(regular, price.currency))}>
                        {currencyFormat(regular, price.currency)}
                      </del>
                    )}
                    <span>
                      {price ? currencyFormat(price.displayAmount, price.currency) : loadFailed ? "—" : "…"}
                      <span className="ml-1 align-middle text-sm font-normal text-muted">{t.pricing.monthlySuffix}</span>
                    </span>
                  </p>
                );
              })()}
              {(plan.key === "coach" ? coachText : founderText) && (
                <p className="mt-2 text-xs font-semibold text-accent-lime">{plan.key === "coach" ? coachText : founderText}</p>
              )}

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

              {plan.key === "coach" && backend?.coachFull ? (
                <span className="mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-full border border-border bg-surface-2 py-3 text-sm font-semibold text-muted">
                  {t.pricing.full}
                </span>
              ) : (
                <a
                  href={registerUrl(lang, plan.key === "starter" ? "Essential" : plan.key === "club" ? "Club" : "Coach")}
                  onClick={() => trackEvent("pricing_plan_click", { plan: plan.key })}
                  className={`focus-ring mt-6 flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold transition hover:brightness-105 ${
                    plan.accent ? "bg-accent-cyan text-bg shadow-glow" : "border border-border bg-surface-2 text-text hover:border-accent-cyan/60"
                  }`}
                >
                  {plan.key === "coach" ? t.pricing.subscribeCoach : t.pricing.startTrial}
                </a>
              )}
              <p className="mt-2 text-center text-xs text-muted">{plan.key === "coach" ? t.pricing.coachNote : t.pricing.trialNote}</p>
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
            href="#planes"
            onClick={(event) => {
              event.preventDefault();
              trackEvent("pricing_cta_click", { destination: "plans" });
              document.getElementById("planes")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
            }}
            className="focus-ring shrink-0 rounded-full bg-accent-cyan px-6 py-3.5 text-center font-semibold text-bg shadow-glow transition hover:brightness-105"
          >
            {t.pricing.ctaBandButton}
          </a>
        </div>
      </motion.section>
    </>
  );
}
