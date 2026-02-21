import { FormEvent, useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "./Motion";
import type { FormStatus } from "../types";
import { trackEvent } from "../lib/analytics";
import { submitLandingEmail } from "../../services/landingService";

const EMAIL_KEY = "pfr_waitlist_email";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type WaitlistFormSource = "hero" | "final_cta";

type WaitlistFormProps = {
  compact?: boolean;
  source?: WaitlistFormSource;
};

export function WaitlistForm({ compact = false, source = "final_cta" }: WaitlistFormProps) {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const inputId = useId();

  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const submitToWebhook = async (submittedEmail: string) => {
    await submitLandingEmail(submittedEmail);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Introduce un email valido.");
      trackEvent("waitlist_submit_error", { source, reason: "invalid_email" });
      return;
    }

    try {
      setStatus("loading");
      setMessage("Enviando...");
      trackEvent("waitlist_submit_start", { source });
      await submitToWebhook(normalizedEmail);
      localStorage.setItem(EMAIL_KEY, normalizedEmail);
      setStatus("success");
      setMessage("Dentro. Te avisaremos antes del lanzamiento.");
      trackEvent("waitlist_submit_success", { source });
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Error inesperado.";
      setMessage(errorMessage);
      trackEvent("waitlist_submit_error", { source, reason: "request_failed" });
    } 
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-3"
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
      variants={reduceMotion ? undefined : fadeUp(12)}
      aria-live="polite"
    >
      <label htmlFor={inputId} className="block text-sm font-medium text-text">
        Email
      </label>
      <div className={`flex flex-col gap-2 ${compact ? "sm:flex-row sm:items-center" : "sm:flex-row"}`}>
        <input
          id={inputId}
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="nombre@ejemplo.com"
          aria-invalid={status === "error"}
          aria-describedby={`${inputId}-help ${inputId}-status`}
          className="focus-ring min-h-12 w-full rounded-full border border-border bg-surface-2 px-5 text-base text-text placeholder:text-muted/80"
          required
        />
        <button
          type="submit"
          className="focus-ring min-h-12 shrink-0 rounded-full border border-accent-cyan/50 bg-accent-cyan px-6 font-semibold text-bg shadow-glow transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-75"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Unete a la waitlist"}
        </button>
      </div>
      <p id={`${inputId}-help`} className="text-sm text-muted">
        Lista de espera del lanzamiento. Cero spam. Puedes salir cuando quieras.
      </p>
      <p
        id={`${inputId}-status`}
        className={`text-sm ${
          status === "success" ? "text-accent-lime" : status === "error" ? "text-red-300" : "text-muted"
        }`}
      >
        {message || " "}
      </p>
    </motion.form>
  );
}
