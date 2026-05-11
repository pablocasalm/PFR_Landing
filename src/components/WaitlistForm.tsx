import { FormEvent, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { fadeUp } from "./Motion";
import type { FormStatus } from "../types";
import { trackEvent } from "../lib/analytics";
import { submitLandingEmail } from "../../services/landingService";
import { useLanguage } from "../i18n/LanguageContext";

const EMAIL_KEY = "pfr_waitlist_email";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

type WaitlistFormSource = "hero" | "final_cta";

type WaitlistFormProps = {
  compact?: boolean;
  source?: WaitlistFormSource;
};

function SuccessModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="glass-panel relative z-10 w-full max-w-sm rounded-3xl p-8 text-center shadow-[0_0_0_1px_rgba(40,240,224,0.12),0_24px_48px_rgba(0,0,0,0.5)]"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-lime/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-accent-lime"
            aria-hidden
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={reduceMotion ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            />
          </svg>
        </div>

        <h2 className="font-display text-3xl uppercase leading-tight text-text">
          {t.form.successModal.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {t.form.successModal.body}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="focus-ring mt-7 w-full rounded-full bg-accent-cyan px-6 py-3 font-semibold text-bg shadow-glow transition hover:brightness-105"
        >
          {t.form.successModal.close}
        </button>
      </motion.div>
    </div>,
    document.body
  );
}

export function WaitlistForm({ compact = false, source = "final_cta" }: WaitlistFormProps) {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputId = useId();

  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_KEY);
    if (savedEmail) setEmail(savedEmail);

    const onCleared = () => {
      setEmail("");
      setStatus("idle");
      setMessage("");
    };
    window.addEventListener("pfr:email-cleared", onCleared);
    return () => window.removeEventListener("pfr:email-cleared", onCleared);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      setStatus("error");
      setMessage(t.form.errorInvalidEmail);
      trackEvent("waitlist_submit_error", { source, reason: "invalid_email" });
      return;
    }

    try {
      setStatus("loading");
      setMessage(t.form.sendingMessage);
      trackEvent("waitlist_submit_start", { source });
      await submitLandingEmail(normalizedEmail);
      localStorage.setItem(EMAIL_KEY, normalizedEmail);
      setStatus("success");
      setMessage(t.form.successMessage);
      setShowModal(true);
      trackEvent("waitlist_submit_success", { source });
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : t.form.errorUnexpected;
      setMessage(errorMessage);
      trackEvent("waitlist_submit_error", { source, reason: "request_failed" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <SuccessModal
            onClose={() => {
              setShowModal(false);
              localStorage.removeItem(EMAIL_KEY);
              window.dispatchEvent(new Event("pfr:email-cleared"));
            }}
          />
        )}
      </AnimatePresence>

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
          {t.form.emailLabel}
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
            placeholder={t.form.placeholder}
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
            {status === "loading" ? t.form.sendingButton : t.form.submitButton}
          </button>
        </div>
        <p id={`${inputId}-help`} className="text-sm text-muted">
          {t.form.helpText}
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
    </>
  );
}
