import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { confirmEarlyAccess } from "../../services/landingService";
import { trackEvent } from "../lib/analytics";

/**
 * Confirmar — a donde llega quien pulsa "Cuenta conmigo" / "Count me in" en el email de acceso
 * anticipado (/confirmar?t=<token>&lang=es|en). El enlace lleva un token, nunca el email.
 *
 * La confirmación se envía desde aquí, al cargarse la página, y no por el mero hecho de abrir
 * el enlace: los filtros de correo abren los enlaces por su cuenta pero no ejecutan la página,
 * así que no confirman a nadie ni pisan el idioma.
 */

const CONTACT_EMAIL = "hello@padelfilmroom.com";

type Status = "loading" | "ok" | "error";

export function Confirmar() {
  const { t, lang, setLanguage } = useLanguage();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("t")?.trim() ?? "";
    const param = params.get("lang");
    // El idioma del botón pulsado manda sobre el que tuviera guardado la landing.
    const buttonLang = param === "en" || param === "es" ? param : lang;
    if (buttonLang !== lang) setLanguage(buttonLang);

    // Solo en local: ?preview=ok|error enseña la página sin llamar al servidor, para revisar el diseño.
    const preview = import.meta.env.DEV ? params.get("preview") : null;
    if (preview === "ok" || preview === "error") {
      setStatus(preview);
      return;
    }

    if (!token) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    confirmEarlyAccess(token, buttonLang)
      .then((ok) => {
        if (cancelled) return;
        setStatus(ok ? "ok" : "error");
        trackEvent(ok ? "early_access_confirm" : "early_access_confirm_error", { lang: buttonLang });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
    // Solo al entrar: el token y el idioma vienen de la URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "ok") document.title = `${t.confirm.title} | Padel Film Room`;
  }, [status, t.confirm.title]);

  return (
    <section className="relative flex min-h-[calc(100dvh-9.5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(40, 240, 224, 0.14)" }}
        aria-hidden
      />
      <div className="glass-panel relative mx-auto w-full max-w-xl rounded-lg p-6 text-center sm:p-10" aria-live="polite">
        {status === "loading" && <p className="py-10 text-base text-muted">{t.confirm.loading}</p>}

        {status === "ok" && (
          <>
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-accent-cyan"
              style={{ background: "rgba(40, 240, 224, 0.12)", border: "1px solid rgba(40, 240, 224, 0.45)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.26em] text-accent-cyan">{t.confirm.eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl uppercase leading-[0.98] text-text sm:text-5xl">{t.confirm.title}</h1>
            {t.confirm.paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-base sm:text-lg ${index === 0 ? "mt-6 text-text" : "mt-4 text-muted"}`}>
                {paragraph}
              </p>
            ))}

            {/* Recordatorio de lo que viene después: el acceso llegará por email. */}
            <div className="mt-8 rounded-lg border border-border bg-surface-2 p-5 text-left">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{t.confirm.nextTitle}</p>
              <ol className="mt-4 space-y-3">
                {t.confirm.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-text/90 sm:text-base">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs text-accent-cyan"
                      style={{ background: "rgba(40, 240, 224, 0.14)" }}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 break-words">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-display text-lg text-text">{t.confirm.signature}</p>
              <p className="mt-1 text-sm text-muted">{t.confirm.signatureRole}</p>
            </div>
            <a href="/" className="focus-ring mt-6 inline-block text-sm text-muted underline-offset-4 transition hover:text-text hover:underline">
              {t.confirm.backHome}
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-display text-2xl uppercase leading-[1.02] text-text sm:text-4xl">{t.confirm.errorTitle}</h1>
            <p className="mt-6 text-base text-muted sm:text-lg">{t.confirm.errorText}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="focus-ring mt-2 inline-block text-base text-accent-cyan underline-offset-4 hover:underline sm:text-lg">
              {CONTACT_EMAIL}
            </a>
            <div>
              <a
                href="/#waitlist-final"
                className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-accent-cyan px-6 text-sm font-semibold text-bg shadow-glow transition hover:brightness-105"
              >
                {t.confirm.errorJoin}
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
