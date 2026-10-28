import { useLanguage } from "../i18n/LanguageContext";

/** Dirección que no existe (404). */
export function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="px-4 py-28 text-center sm:px-6">
      <h1 className="font-display text-3xl uppercase leading-[0.98] text-text sm:text-5xl">{t.notFound.title}</h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-muted">{t.notFound.text}</p>
      <a
        href="/"
        className="focus-ring mt-8 inline-flex items-center justify-center rounded-full bg-accent-cyan px-7 py-3.5 font-semibold text-bg shadow-glow transition hover:brightness-105"
      >
        {t.notFound.backHome}
      </a>
    </section>
  );
}
